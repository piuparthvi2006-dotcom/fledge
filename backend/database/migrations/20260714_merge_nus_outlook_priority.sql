update public.opportunities
set source_priority = 1
where source_priority = 2;

update public.opportunity_candidates
set source_priority = 1
where source_priority = 2;
