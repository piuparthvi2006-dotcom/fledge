create or replace function public.create_profile_for_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, university)
  values (
    new.id,
    nullif(btrim(new.raw_user_meta_data ->> 'full_name'), ''),
    'nus'
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists create_profile_after_signup on auth.users;

create trigger create_profile_after_signup
after insert on auth.users
for each row
execute function public.create_profile_for_new_user();

-- Backfill profiles for accounts created before this trigger was installed.
insert into public.profiles as existing_profile (id, full_name, university)
select
  auth_user.id,
  nullif(btrim(auth_user.raw_user_meta_data ->> 'full_name'), ''),
  'nus'
from auth.users as auth_user
on conflict (id) do update
set full_name = coalesce(existing_profile.full_name, excluded.full_name);

revoke all on function public.create_profile_for_new_user()
from public, anon, authenticated;
