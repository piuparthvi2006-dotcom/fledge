alter table public.opportunities
  add column if not exists deadline_source text not null default 'unknown',
  add column if not exists external_deadline timestamptz,
  add column if not exists external_deadline_has_time boolean not null default false,
  add column if not exists external_deadline_source_timezone text,
  add column if not exists external_deadline_source_text text,
  add column if not exists deadline_conflict boolean not null default false,
  add column if not exists deadline_note text;

alter table public.opportunities
  drop constraint if exists opportunities_deadline_source_check,
  drop constraint if exists opportunities_deadline_conflict_valid;

alter table public.opportunities
  add constraint opportunities_deadline_source_check
  check (deadline_source in ('nus', 'organiser', 'unknown')),
  add constraint opportunities_deadline_conflict_valid
  check (
    not deadline_conflict
    or (
      deadline_source = 'nus'
      and external_deadline is not null
      and deadline is distinct from external_deadline
    )
  );

create index if not exists opportunities_external_deadline_idx
on public.opportunities(external_deadline)
where external_deadline is not null;

create or replace function public.normalize_opportunity_identity(value text)
returns text
language sql
immutable
set search_path = public
as $$
  select btrim(
    regexp_replace(lower(coalesce(value, '')), '[^a-z0-9]+', ' ', 'g')
  );
$$;

create or replace function public.reconcile_opportunity_deadlines(
  target_opportunity_id uuid
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  nus_deadline_data jsonb;
  organiser_deadline_data jsonb;
  nus_deadline timestamptz;
  organiser_deadline timestamptz;
  has_conflict boolean := false;
begin
  with classified_deadlines as (
    select
      candidate.id,
      candidate.confidence_score,
      candidate.last_seen_at,
      nullif(
        candidate.extracted_opportunity ->> 'deadline',
        ''
      )::timestamptz as deadline,
      coalesce(
        (candidate.extracted_opportunity ->> 'deadline_has_time')::boolean,
        false
      ) as deadline_has_time,
      nullif(
        candidate.extracted_opportunity ->> 'deadline_source_timezone',
        ''
      ) as deadline_source_timezone,
      nullif(
        candidate.extracted_opportunity ->> 'deadline_source_text',
        ''
      ) as deadline_source_text,
      case
        when candidate.extracted_opportunity ->> 'deadline_source'
          in ('nus', 'organiser')
          then candidate.extracted_opportunity ->> 'deadline_source'
        when candidate.source_type = 'public_web'
          and candidate.source_priority <= 1
          then 'nus'
        when candidate.source_type = 'outlook_email'
          and candidate.raw_sender ~* '@([a-z0-9-]+\.)*nus\.edu\.sg$'
          then 'nus'
        else 'organiser'
      end as deadline_authority
    from public.opportunity_sources as source
    join public.opportunity_candidates as candidate
      on candidate.id = source.candidate_id
    where source.opportunity_id = target_opportunity_id
      and candidate.status = 'approved'
  )
  select jsonb_build_object(
    'deadline', deadline,
    'deadline_has_time', deadline_has_time,
    'deadline_source_timezone', deadline_source_timezone,
    'deadline_source_text', deadline_source_text
  )
  into nus_deadline_data
  from classified_deadlines
  where deadline_authority = 'nus'
    and deadline is not null
    -- Keep a recently expired NUS deadline authoritative during retention.
    and deadline >= now() - interval '16 days'
  order by deadline, confidence_score desc, last_seen_at desc
  limit 1;

  with classified_deadlines as (
    select
      candidate.id,
      candidate.confidence_score,
      candidate.last_seen_at,
      nullif(
        candidate.extracted_opportunity ->> 'deadline',
        ''
      )::timestamptz as deadline,
      coalesce(
        (candidate.extracted_opportunity ->> 'deadline_has_time')::boolean,
        false
      ) as deadline_has_time,
      nullif(
        candidate.extracted_opportunity ->> 'deadline_source_timezone',
        ''
      ) as deadline_source_timezone,
      nullif(
        candidate.extracted_opportunity ->> 'deadline_source_text',
        ''
      ) as deadline_source_text,
      case
        when candidate.extracted_opportunity ->> 'deadline_source'
          in ('nus', 'organiser')
          then candidate.extracted_opportunity ->> 'deadline_source'
        when candidate.source_type = 'public_web'
          and candidate.source_priority <= 1
          then 'nus'
        when candidate.source_type = 'outlook_email'
          and candidate.raw_sender ~* '@([a-z0-9-]+\.)*nus\.edu\.sg$'
          then 'nus'
        else 'organiser'
      end as deadline_authority
    from public.opportunity_sources as source
    join public.opportunity_candidates as candidate
      on candidate.id = source.candidate_id
    where source.opportunity_id = target_opportunity_id
      and candidate.status = 'approved'
  )
  select jsonb_build_object(
    'deadline', deadline,
    'deadline_has_time', deadline_has_time,
    'deadline_source_timezone', deadline_source_timezone,
    'deadline_source_text', deadline_source_text
  )
  into organiser_deadline_data
  from classified_deadlines
  where deadline_authority = 'organiser'
    and deadline is not null
    and deadline >= now() - interval '16 days'
  order by confidence_score desc, deadline, last_seen_at desc
  limit 1;

  if nus_deadline_data is null and organiser_deadline_data is null then
    return;
  end if;

  nus_deadline := nullif(nus_deadline_data ->> 'deadline', '')::timestamptz;
  organiser_deadline := nullif(
    organiser_deadline_data ->> 'deadline',
    ''
  )::timestamptz;
  has_conflict := nus_deadline is not null
    and organiser_deadline is not null
    and nus_deadline is distinct from organiser_deadline;

  if nus_deadline is not null then
    update public.opportunities
    set
      deadline = nus_deadline,
      deadline_has_time = coalesce(
        (nus_deadline_data ->> 'deadline_has_time')::boolean,
        false
      ),
      deadline_source_timezone = nullif(
        nus_deadline_data ->> 'deadline_source_timezone',
        ''
      ),
      deadline_source_text = nullif(
        nus_deadline_data ->> 'deadline_source_text',
        ''
      ),
      deadline_source = 'nus',
      external_deadline = case when has_conflict then organiser_deadline end,
      external_deadline_has_time = case
        when has_conflict then coalesce(
          (organiser_deadline_data ->> 'deadline_has_time')::boolean,
          false
        )
        else false
      end,
      external_deadline_source_timezone = case
        when has_conflict then nullif(
          organiser_deadline_data ->> 'deadline_source_timezone',
          ''
        )
      end,
      external_deadline_source_text = case
        when has_conflict then nullif(
          organiser_deadline_data ->> 'deadline_source_text',
          ''
        )
      end,
      deadline_conflict = has_conflict,
      deadline_note = case
        when has_conflict then 'NUS internal application deadline'
      end,
      listing_expires_at = null,
      updated_at = now()
    where id = target_opportunity_id;
  else
    update public.opportunities
    set
      deadline = organiser_deadline,
      deadline_has_time = coalesce(
        (organiser_deadline_data ->> 'deadline_has_time')::boolean,
        false
      ),
      deadline_source_timezone = nullif(
        organiser_deadline_data ->> 'deadline_source_timezone',
        ''
      ),
      deadline_source_text = nullif(
        organiser_deadline_data ->> 'deadline_source_text',
        ''
      ),
      deadline_source = 'organiser',
      external_deadline = null,
      external_deadline_has_time = false,
      external_deadline_source_timezone = null,
      external_deadline_source_text = null,
      deadline_conflict = false,
      deadline_note = null,
      listing_expires_at = null,
      updated_at = now()
    where id = target_opportunity_id;
  end if;
end;
$$;

create or replace function public.reconcile_deadlines_after_source_change()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  perform public.reconcile_opportunity_deadlines(new.opportunity_id);

  if tg_op = 'UPDATE'
    and old.opportunity_id is distinct from new.opportunity_id
  then
    perform public.reconcile_opportunity_deadlines(old.opportunity_id);
  end if;

  return new;
end;
$$;

drop trigger if exists opportunity_source_deadline_reconciliation_trigger
on public.opportunity_sources;

create trigger opportunity_source_deadline_reconciliation_trigger
after insert or update of opportunity_id, content_hash
on public.opportunity_sources
for each row
execute function public.reconcile_deadlines_after_source_change();

-- Replace the Phase 8 wrapper. Before publishing, it can join an NUS source
-- and an organiser source only when their identity fields match exactly after
-- normalisation and their deadlines are within the same 90-day application
-- cycle. The existing dedupe key remains the first matching mechanism.
create or replace function public.crawler_publish_candidate(
  candidate_id uuid,
  required_status text
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  candidate_visibility text;
  candidate_owner_user_id uuid;
  candidate_application_url text;
  candidate_deadline timestamptz;
  candidate_deadline_has_time boolean;
  candidate_deadline_timezone text;
  candidate_deadline_source text;
  candidate_listing_expires_at timestamptz;
  candidate_opportunity_id uuid;
  candidate_dedupe_key text;
  candidate_school_slug text;
  candidate_title text;
  candidate_organisation text;
  candidate_category text;
  matched_opportunity_id uuid;
  published_opportunity_id uuid;
begin
  select
    visibility,
    owner_user_id,
    coalesce(
      nullif(extracted_opportunity ->> 'application_url', ''),
      nullif(application_url, '')
    ),
    nullif(extracted_opportunity ->> 'deadline', '')::timestamptz,
    coalesce((extracted_opportunity ->> 'deadline_has_time')::boolean, false),
    nullif(extracted_opportunity ->> 'deadline_source_timezone', ''),
    nullif(extracted_opportunity ->> 'deadline_source', ''),
    listing_expires_at,
    opportunity_id,
    coalesce(dedupe_key, nullif(extracted_opportunity ->> 'dedupe_key', '')),
    school_slug,
    nullif(extracted_opportunity ->> 'title', ''),
    nullif(extracted_opportunity ->> 'organisation', ''),
    nullif(extracted_opportunity ->> 'category', '')
  into
    candidate_visibility,
    candidate_owner_user_id,
    candidate_application_url,
    candidate_deadline,
    candidate_deadline_has_time,
    candidate_deadline_timezone,
    candidate_deadline_source,
    candidate_listing_expires_at,
    candidate_opportunity_id,
    candidate_dedupe_key,
    candidate_school_slug,
    candidate_title,
    candidate_organisation,
    candidate_category
  from public.opportunity_candidates
  where id = candidate_id
  for update;

  if not found then
    raise exception 'Opportunity candidate % was not found.', candidate_id;
  end if;

  if candidate_visibility = 'private' and candidate_owner_user_id is null then
    raise exception
      'Private Outlook candidate % has no owner. Set OUTLOOK_OWNER_USER_ID and crawl again.',
      candidate_id;
  end if;

  if candidate_deadline is null
    and (
      candidate_application_url is null
      or candidate_application_url !~* '^https?://'
    )
  then
    raise exception
      'Candidate % has neither a deadline nor a usable application URL.',
      candidate_id;
  end if;

  if not public.opportunity_is_active(
    candidate_deadline,
    candidate_deadline_has_time,
    candidate_deadline_timezone,
    candidate_listing_expires_at
  ) then
    raise exception 'Opportunity candidate % has expired.', candidate_id;
  end if;

  if candidate_opportunity_id is null
    and candidate_deadline is not null
    and candidate_deadline_source in ('nus', 'organiser')
    and candidate_title is not null
    and candidate_organisation is not null
    and candidate_category is not null
    and not exists (
      select 1
      from public.opportunities
      where dedupe_key = candidate_dedupe_key
    )
  then
    perform pg_advisory_xact_lock(
      hashtextextended(
        concat_ws(
          '|',
          'cross-source-opportunity',
          candidate_school_slug,
          candidate_visibility,
          candidate_owner_user_id::text,
          public.normalize_opportunity_identity(candidate_title),
          public.normalize_opportunity_identity(candidate_organisation),
          candidate_category
        ),
        0
      )
    );

    select opportunity.id
    into matched_opportunity_id
    from public.opportunities as opportunity
    where opportunity.school_slug = candidate_school_slug
      and opportunity.visibility = candidate_visibility
      and opportunity.owner_user_id is not distinct from candidate_owner_user_id
      and opportunity.category = candidate_category
      and opportunity.deadline_source in ('nus', 'organiser')
      and opportunity.deadline_source <> candidate_deadline_source
      and public.normalize_opportunity_identity(opportunity.title)
        = public.normalize_opportunity_identity(candidate_title)
      and public.normalize_opportunity_identity(opportunity.organisation)
        = public.normalize_opportunity_identity(candidate_organisation)
      and opportunity.deadline is not null
      and abs(
        extract(epoch from opportunity.deadline - candidate_deadline)
      ) <= 90 * 24 * 60 * 60
    order by opportunity.source_priority, opportunity.confidence_score desc
    limit 1
    for update;

    if matched_opportunity_id is not null then
      update public.opportunity_candidates
      set opportunity_id = matched_opportunity_id
      where id = candidate_id;
    end if;
  end if;

  published_opportunity_id := public.crawler_publish_candidate_data(
    candidate_id,
    required_status
  );

  update public.opportunities
  set
    visibility = candidate_visibility,
    owner_user_id = case
      when candidate_visibility = 'private' then candidate_owner_user_id
      else null
    end,
    listing_expires_at = case
      when candidate_deadline is null then candidate_listing_expires_at
      else null
    end,
    updated_at = now()
  where id = published_opportunity_id;

  -- The source trigger runs inside crawler_publish_candidate_data. Run this
  -- once more after visibility/expiry metadata is applied for a stable result.
  perform public.reconcile_opportunity_deadlines(published_opportunity_id);

  return published_opportunity_id;
end;
$$;

-- PostgreSQL expands SELECT * when a view is created. Recreate the view so
-- the new deadline source and host-deadline columns are available to clients.
drop view if exists public.active_opportunities;

create view public.active_opportunities
with (security_invoker = true)
as
select *
from public.opportunities
where public.opportunity_is_active(
  deadline,
  deadline_has_time,
  deadline_source_timezone,
  listing_expires_at
);

do $$
declare
  opportunity_row record;
begin
  for opportunity_row in
    select distinct opportunity_id as id
    from public.opportunity_sources
  loop
    perform public.reconcile_opportunity_deadlines(opportunity_row.id);
  end loop;
end;
$$;

revoke all on function public.normalize_opportunity_identity(text)
from public, anon, authenticated;

revoke all on function public.reconcile_opportunity_deadlines(uuid)
from public, anon, authenticated;

revoke all on function public.reconcile_deadlines_after_source_change()
from public, anon, authenticated;

revoke all on function public.crawler_publish_candidate(uuid, text)
from public, anon, authenticated;

grant execute on function public.reconcile_opportunity_deadlines(uuid)
to service_role;

grant execute on function public.crawler_publish_candidate(uuid, text)
to service_role;

grant select on public.active_opportunities to anon, authenticated;
