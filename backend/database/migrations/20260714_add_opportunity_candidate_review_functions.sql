create or replace function public.approve_opportunity_candidate(candidate_id uuid)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  candidate public.opportunity_candidates%rowtype;
  opportunity_data jsonb;
  approved_opportunity_id uuid;
begin
  select *
  into candidate
  from public.opportunity_candidates
  where id = candidate_id
  for update;

  if not found then
    raise exception 'Opportunity candidate % was not found.', candidate_id;
  end if;

  if candidate.status <> 'pending' then
    raise exception 'Opportunity candidate % is already %.', candidate_id, candidate.status;
  end if;

  opportunity_data := candidate.extracted_opportunity;

  insert into public.opportunities (
    school_slug,
    source_priority,
    title,
    description,
    category,
    organisation,
    source_url,
    eligibility,
    year_min,
    year_max,
    eligible_majors,
    delivery_mode,
    location,
    deadline,
    deadline_has_time,
    deadline_source_timezone,
    deadline_source_text
  )
  values (
    coalesce(nullif(opportunity_data ->> 'school_slug', ''), candidate.school_slug),
    coalesce((opportunity_data ->> 'source_priority')::integer, candidate.source_priority),
    opportunity_data ->> 'title',
    opportunity_data ->> 'description',
    opportunity_data ->> 'category',
    nullif(opportunity_data ->> 'organisation', ''),
    coalesce(nullif(opportunity_data ->> 'source_url', ''), candidate.source_url),
    nullif(opportunity_data ->> 'eligibility', ''),
    nullif(opportunity_data ->> 'year_min', '')::integer,
    nullif(opportunity_data ->> 'year_max', '')::integer,
    coalesce(
      array(select jsonb_array_elements_text(coalesce(opportunity_data -> 'eligible_majors', '[]'::jsonb))),
      '{}'::text[]
    ),
    coalesce(nullif(opportunity_data ->> 'delivery_mode', ''), 'unspecified'),
    nullif(opportunity_data ->> 'location', ''),
    nullif(opportunity_data ->> 'deadline', '')::timestamptz,
    coalesce((opportunity_data ->> 'deadline_has_time')::boolean, false),
    nullif(opportunity_data ->> 'deadline_source_timezone', ''),
    nullif(opportunity_data ->> 'deadline_source_text', '')
  )
  returning id into approved_opportunity_id;

  update public.opportunity_candidates
  set status = 'approved'
  where id = candidate_id;

  return approved_opportunity_id;
end;
$$;

create or replace function public.reject_opportunity_candidate(candidate_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.opportunity_candidates
  set status = 'rejected'
  where id = candidate_id
    and status = 'pending';

  if not found then
    raise exception 'Pending opportunity candidate % was not found.', candidate_id;
  end if;
end;
$$;

revoke all on function public.approve_opportunity_candidate(uuid) from public, anon, authenticated;
revoke all on function public.reject_opportunity_candidate(uuid) from public, anon, authenticated;
grant execute on function public.approve_opportunity_candidate(uuid) to service_role;
grant execute on function public.reject_opportunity_candidate(uuid) to service_role;
