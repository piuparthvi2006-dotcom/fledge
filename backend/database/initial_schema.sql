create extension if not exists "pgcrypto";

-- Canonical values use lowercase slugs (e.g. computer_science).
-- Display labels belong in the frontend/API layer, not in the database.

create table public.majors (
  slug text primary key,
  label text not null
);

create table public.interest_tags (
  slug text primary key,
  label text not null
);

create table public.career_tags (
  slug text primary key,
  label text not null
);

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  university text,
  faculty text,
  major text references public.majors(slug),
  year_of_study integer check (year_of_study between 1 and 4),
  -- lowercase slugs; must match public.interest_tags.slug
  interests text[] default '{}',
  -- lowercase slugs; must match public.career_tags.slug
  career_goals text[] default '{}',
  created_at timestamptz default now()
);

create table public.opportunities (
  id uuid primary key default gen_random_uuid(),

  title text not null,
  description text not null,

  category text not null check (
    category in (
      'internship',
      'competition',
      'research',
      'exchange',
      'summer_programme',
      'winter_programme',
      'volunteer',
      'mentorship',
      'networking',
      'entrepreneurship',
      'other'
    )
  ),

  organisation text,
  source_url text,
  eligibility text,

  year_min integer check (year_min between 1 and 4),
  year_max integer check (year_max between 1 and 4),

  -- lowercase slugs; must match public.interest_tags.slug
  interest_tags text[] default '{}',
  -- lowercase slugs; must match public.career_tags.slug
  career_tags text[] default '{}',
  -- lowercase slugs; empty array = open to all majors
  eligible_majors text[] default '{}',

  delivery_mode text not null default 'unspecified' check (
    delivery_mode in ('online', 'hybrid', 'in_person', 'unspecified')
  ),
  -- venue or campus name; null when not applicable (e.g. fully online)
  location text,
  deadline timestamptz,

  created_at timestamptz default now(),

  constraint opportunities_year_range_valid check (year_min <= year_max)
);

create table public.saved_opportunities (
  user_id uuid references auth.users(id) on delete cascade,
  opportunity_id uuid references public.opportunities(id) on delete cascade,
  created_at timestamptz default now(),

  primary key (user_id, opportunity_id)
);

alter table public.majors enable row level security;
alter table public.interest_tags enable row level security;
alter table public.career_tags enable row level security;
alter table public.profiles enable row level security;
alter table public.opportunities enable row level security;
alter table public.saved_opportunities enable row level security;

create policy "Anyone can view majors"
on public.majors
for select
to anon, authenticated
using (true);

create policy "Anyone can view interest tags"
on public.interest_tags
for select
to anon, authenticated
using (true);

create policy "Anyone can view career tags"
on public.career_tags
for select
to anon, authenticated
using (true);

create policy "Users can view their own profile"
on public.profiles
for select
to authenticated
using (auth.uid() = id);

create policy "Users can insert their own profile"
on public.profiles
for insert
to authenticated
with check (auth.uid() = id);

create policy "Users can update their own profile"
on public.profiles
for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

create policy "Anyone can view opportunities"
on public.opportunities
for select
to anon, authenticated
using (true);

create policy "Users can view their own saved opportunities"
on public.saved_opportunities
for select
to authenticated
using (auth.uid() = user_id);

create policy "Users can save opportunities"
on public.saved_opportunities
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "Users can remove their own saved opportunities"
on public.saved_opportunities
for delete
to authenticated
using (auth.uid() = user_id);

insert into public.majors (slug, label) values
  ('computer_science', 'Computer Science'),
  ('computer_engineering', 'Computer Engineering'),
  ('information_systems', 'Information Systems'),
  ('data_science', 'Data Science'),
  ('mathematics', 'Mathematics'),
  ('business', 'Business'),
  ('engineering', 'Engineering'),
  ('business_analytics', 'Business Analytics');

insert into public.interest_tags (slug, label) values
  ('software_development', 'Software Development'),
  ('programming', 'Programming'),
  ('technology', 'Technology'),
  ('career', 'Career'),
  ('innovation', 'Innovation'),
  ('teamwork', 'Teamwork'),
  ('problem_solving', 'Problem Solving'),
  ('entrepreneurship', 'Entrepreneurship'),
  ('artificial_intelligence', 'Artificial Intelligence'),
  ('machine_learning', 'Machine Learning'),
  ('research', 'Research'),
  ('python', 'Python'),
  ('exchange', 'Exchange'),
  ('global', 'Global'),
  ('travel', 'Travel'),
  ('international', 'International'),
  ('startup', 'Startup'),
  ('business', 'Business'),
  ('data_science', 'Data Science'),
  ('analytics', 'Analytics'),
  ('volunteering', 'Volunteering'),
  ('community', 'Community'),
  ('social_impact', 'Social Impact'),
  ('leadership', 'Leadership'),
  ('mentorship', 'Mentorship'),
  ('networking', 'Networking'),
  ('guidance', 'Guidance'),
  ('business_model', 'Business Model'),
  ('pitching', 'Pitching'),
  ('general', 'General'),
  ('student_development', 'Student Development');

insert into public.career_tags (slug, label) values
  ('software_engineer', 'Software Engineer'),
  ('full_stack_developer', 'Full-Stack Developer'),
  ('tech_industry', 'Tech Industry'),
  ('entrepreneur', 'Entrepreneur'),
  ('product_manager', 'Product Manager'),
  ('innovator', 'Innovator'),
  ('researcher', 'Researcher'),
  ('data_scientist', 'Data Scientist'),
  ('academia', 'Academia'),
  ('global_professional', 'Global Professional'),
  ('international_career', 'International Career'),
  ('founder', 'Founder'),
  ('startup_founder', 'Startup Founder'),
  ('data_analyst', 'Data Analyst'),
  ('business_analyst', 'Business Analyst'),
  ('non_profit', 'Non-Profit'),
  ('community_leader', 'Community Leader'),
  ('career_growth', 'Career Growth'),
  ('professional_development', 'Professional Development'),
  ('venture_capital', 'Venture Capital'),
  ('startup_ecosystem', 'Startup Ecosystem'),
  ('startup_builder', 'Startup Builder'),
  ('general_career_exploration', 'General Career Exploration');

insert into public.opportunities (
  title,
  description,
  category,
  organisation,
  source_url,
  eligibility,
  year_min,
  year_max,
  interest_tags,
  career_tags,
  eligible_majors,
  delivery_mode,
  location,
  deadline
)
values
(
  'Software Engineering Internship',
  'A practical internship for students interested in software development, web applications, backend systems, and real-world engineering projects.',
  'internship',
  'Tech Career Office',
  'https://example.com/software-engineering-internship',
  'Basic programming knowledge recommended.',
  1,
  4,
  array['software_development', 'programming', 'technology', 'career'],
  array['software_engineer', 'full_stack_developer', 'tech_industry'],
  array['computer_science', 'computer_engineering', 'information_systems'],
  'hybrid',
  null,
  now() + interval '40 days'
),
(
  'University Innovation Competition',
  'A student competition where individuals or teams propose innovative solutions to real-world problems.',
  'competition',
  'Innovation Centre',
  'https://example.com/university-innovation-competition',
  'Open to all students.',
  1,
  4,
  array['innovation', 'teamwork', 'problem_solving', 'entrepreneurship'],
  array['entrepreneur', 'product_manager', 'innovator'],
  '{}',
  'in_person',
  'On campus',
  now() + interval '25 days'
),
(
  'AI Research Assistant Programme',
  'A research opportunity for students interested in artificial intelligence, machine learning, data analysis, and academic research.',
  'research',
  'School of Computing',
  'https://example.com/ai-research-assistant-programme',
  'Basic Python knowledge recommended.',
  1,
  4,
  array['artificial_intelligence', 'machine_learning', 'research', 'python'],
  array['researcher', 'data_scientist', 'academia'],
  array['computer_science', 'data_science', 'mathematics'],
  'in_person',
  'School of Computing',
  now() + interval '30 days'
),
(
  'Global Exchange Information Session',
  'An information session about overseas exchange programmes, eligibility, application timelines, partner universities, and scholarship options.',
  'exchange',
  'International Office',
  'https://example.com/global-exchange-information-session',
  'Recommended for year 1 and year 2 students.',
  1,
  2,
  array['exchange', 'global', 'travel', 'international'],
  array['global_professional', 'international_career'],
  '{}',
  'online',
  null,
  now() + interval '21 days'
),
(
  'Summer Entrepreneurship Programme',
  'A summer programme for students who want to develop startup ideas, learn business validation, and pitch ideas to mentors.',
  'summer_programme',
  'Entrepreneurship Centre',
  'https://example.com/summer-entrepreneurship-programme',
  'Open to students interested in startups, innovation, or business.',
  1,
  4,
  array['entrepreneurship', 'startup', 'business', 'innovation'],
  array['founder', 'entrepreneur', 'startup_founder'],
  array['business', 'computer_science', 'engineering'],
  'in_person',
  'On campus',
  now() + interval '60 days'
),
(
  'Winter Data Science Bootcamp',
  'A winter programme teaching students basic data analysis, Python, data visualization, and introductory machine learning concepts.',
  'winter_programme',
  'Data Science Club',
  'https://example.com/winter-data-science-bootcamp',
  'No prior data science experience required.',
  1,
  4,
  array['data_science', 'python', 'machine_learning', 'analytics'],
  array['data_analyst', 'data_scientist', 'business_analyst'],
  array['computer_science', 'data_science', 'business_analytics'],
  'online',
  null,
  now() + interval '75 days'
),
(
  'Community Volunteer Programme',
  'A volunteering opportunity where students support local community projects, social impact initiatives, and charity events.',
  'volunteer',
  'Student Volunteer Office',
  'https://example.com/community-volunteer-programme',
  'Open to all students.',
  1,
  4,
  array['volunteering', 'community', 'social_impact', 'leadership'],
  array['social_impact', 'non_profit', 'community_leader'],
  '{}',
  'in_person',
  'Local community centre',
  now() + interval '20 days'
),
(
  'Career Mentorship Programme',
  'A mentorship programme that connects students with seniors, alumni, and industry professionals for academic and career guidance.',
  'mentorship',
  'Career Development Office',
  'https://example.com/career-mentorship-programme',
  'Open to students seeking academic or career advice.',
  1,
  4,
  array['mentorship', 'career', 'networking', 'guidance'],
  array['career_growth', 'professional_development'],
  '{}',
  'hybrid',
  null,
  now() + interval '35 days'
),
(
  'Startup Networking Night',
  'A networking event where students can meet startup founders, investors, alumni, and entrepreneurship mentors.',
  'networking',
  'Entrepreneurship Centre',
  'https://example.com/startup-networking-night',
  'Open to all students.',
  1,
  4,
  array['entrepreneurship', 'networking', 'business', 'startup'],
  array['founder', 'venture_capital', 'startup_ecosystem'],
  '{}',
  'in_person',
  'Main Auditorium',
  now() + interval '14 days'
),
(
  'Student Founder Incubator',
  'An entrepreneurship programme for students who want to build, validate, and test early-stage startup ideas.',
  'entrepreneurship',
  'University Incubator',
  'https://example.com/student-founder-incubator',
  'Students should have a startup idea or strong interest in entrepreneurship.',
  1,
  4,
  array['entrepreneurship', 'startup', 'business_model', 'pitching'],
  array['founder', 'entrepreneur', 'startup_builder'],
  array['business', 'computer_science', 'engineering'],
  'in_person',
  'Innovation Lab',
  now() + interval '50 days'
),
(
  'Open Student Opportunity',
  'A general opportunity for students that does not fit into the main categories.',
  'other',
  'Student Affairs Office',
  'https://example.com/open-student-opportunity',
  'Open to all students.',
  1,
  4,
  array['general', 'student_development', 'career'],
  array['general_career_exploration'],
  '{}',
  'unspecified',
  null,
  now() + interval '28 days'
);

create index opportunities_category_idx
on public.opportunities(category);

create index opportunities_delivery_mode_idx
on public.opportunities(delivery_mode);

create index opportunities_deadline_idx
on public.opportunities(deadline);

create index opportunities_year_min_idx
on public.opportunities(year_min);

create index opportunities_year_max_idx
on public.opportunities(year_max);

create index saved_opportunities_user_id_idx
on public.saved_opportunities(user_id);
