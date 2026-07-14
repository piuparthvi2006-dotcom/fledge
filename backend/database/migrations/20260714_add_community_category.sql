alter table public.opportunities
drop constraint if exists opportunities_category_check;

alter table public.opportunities
add constraint opportunities_category_check
check (
  category in (
    'internship',
    'competition',
    'research',
    'exchange',
    'summer_programme',
    'winter_programme',
    'volunteer',
    'community',
    'mentorship',
    'networking',
    'entrepreneurship',
    'other'
  )
);
