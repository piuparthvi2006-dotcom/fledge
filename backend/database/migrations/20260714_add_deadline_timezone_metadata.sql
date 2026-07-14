alter table public.opportunities
  add column if not exists deadline_has_time boolean not null default false,
  add column if not exists deadline_source_timezone text,
  add column if not exists deadline_source_text text;
