alter table public.opportunities
add column if not exists source_priority integer not null default 99;

alter table public.opportunity_candidates
add column if not exists source_priority integer not null default 99;

create index if not exists opportunities_source_priority_idx
on public.opportunities(source_priority);

create index if not exists opportunity_candidates_source_priority_idx
on public.opportunity_candidates(source_priority);
