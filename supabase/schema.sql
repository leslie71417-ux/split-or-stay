-- =====================================================================
-- Split or Stay — database schema for Supabase
-- Run this whole file once in: Supabase Dashboard → SQL Editor → New query → Run
-- Then run seed.sql.
-- =====================================================================

create extension if not exists pgcrypto;

-- ---------- Tables ----------------------------------------------------

create table if not exists public.posts (
  id          uuid primary key default gen_random_uuid(),
  text        text not null check (char_length(text) between 30 and 800),
  tags        text[] not null default '{}' check (coalesce(array_length(tags, 1), 0) <= 9),
  len         text check (len in ('a','b','c','d','m')),
  lang        text not null default 'en' check (lang in ('en','ja')),
  region      text not null default 'other' check (region in ('us','jp','other')),
  aud         text not null default 'global' check (aud in ('us','jp','global')),
  author      uuid default auth.uid() references auth.users(id) on delete set null,
  followup    text check (followup is null or char_length(followup) <= 300),
  hidden      boolean not null default false,
  created_at  timestamptz not null default now()
);
create index if not exists posts_created_idx on public.posts (created_at desc);
create index if not exists posts_author_idx  on public.posts (author);

create table if not exists public.votes (
  post_id     uuid not null references public.posts(id) on delete cascade,
  user_id     uuid not null default auth.uid() references auth.users(id) on delete cascade,
  choice      text not null check (choice in ('break','stay')),
  region      text not null default 'other' check (region in ('us','jp','other')),
  comment     text check (comment is null or char_length(comment) <= 280),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  primary key (post_id, user_id)
);
create index if not exists votes_user_idx on public.votes (user_id);

-- One row per visitor, used only for the admin page's active-user numbers.
create table if not exists public.profiles (
  user_id     uuid primary key default auth.uid() references auth.users(id) on delete cascade,
  region      text,
  lang        text,
  first_seen  timestamptz not null default now(),
  last_seen   timestamptz not null default now()
);

create table if not exists public.reports (
  id          bigint generated always as identity primary key,
  post_id     uuid not null references public.posts(id) on delete cascade,
  user_id     uuid not null default auth.uid() references auth.users(id) on delete cascade,
  created_at  timestamptz not null default now(),
  unique (post_id, user_id)
);

-- Who may open admin.html. Add yourself after your first admin login (see README).
create table if not exists public.admins (
  user_id     uuid primary key references auth.users(id) on delete cascade
);

-- ---------- Helpers ---------------------------------------------------

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;

-- True for changes made by the system itself (SQL editor, internal triggers).
create or replace function public.is_internal()
returns boolean language sql stable as $$
  select auth.uid() is null or coalesce(current_setting('sos.internal', true), '') = '1';
$$;

-- ---------- Guards & rate limits -------------------------------------

create or replace function public.guard_post()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if public.is_internal() then
    return new;
  end if;
  if tg_op = 'INSERT' then
    if (select count(*) from public.posts
         where author = auth.uid() and created_at > now() - interval '1 hour') >= 5 then
      raise exception 'rate_limited';
    end if;
    new.author := auth.uid();
    new.created_at := now();
    new.hidden := false;
    new.followup := null;
  elsif tg_op = 'UPDATE' and not public.is_admin() then
    -- Authors may only add or change their follow-up.
    new.text := old.text; new.tags := old.tags; new.len := old.len;
    new.lang := old.lang; new.region := old.region; new.aud := old.aud;
    new.author := old.author; new.created_at := old.created_at; new.hidden := old.hidden;
  end if;
  return new;
end $$;
drop trigger if exists guard_post on public.posts;
create trigger guard_post before insert or update on public.posts
  for each row execute function public.guard_post();

create or replace function public.guard_vote()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if public.is_internal() then
    return new;
  end if;
  if tg_op = 'INSERT' then
    if (select count(*) from public.votes
         where user_id = auth.uid() and created_at > now() - interval '1 hour') >= 300 then
      raise exception 'rate_limited';
    end if;
    new.user_id := auth.uid();
    new.created_at := now();
  else
    new.post_id := old.post_id; new.user_id := old.user_id; new.created_at := old.created_at;
  end if;
  new.updated_at := now();
  return new;
end $$;
drop trigger if exists guard_vote on public.votes;
create trigger guard_vote before insert or update on public.votes
  for each row execute function public.guard_vote();

-- Three separate reports hide a post automatically until you review it.
create or replace function public.auto_hide()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if (select count(*) from public.reports where post_id = new.post_id) >= 3 then
    perform set_config('sos.internal', '1', true);
    update public.posts set hidden = true where id = new.post_id;
    perform set_config('sos.internal', '0', true);
  end if;
  return new;
end $$;
drop trigger if exists auto_hide on public.reports;
create trigger auto_hide after insert on public.reports
  for each row execute function public.auto_hide();

-- ---------- Row level security ---------------------------------------

alter table public.posts    enable row level security;
alter table public.votes    enable row level security;
alter table public.profiles enable row level security;
alter table public.reports  enable row level security;
alter table public.admins   enable row level security;

drop policy if exists posts_read   on public.posts;
drop policy if exists posts_insert on public.posts;
drop policy if exists posts_update on public.posts;
drop policy if exists posts_delete on public.posts;
create policy posts_read   on public.posts for select using (not hidden or author = auth.uid() or public.is_admin());
create policy posts_insert on public.posts for insert to authenticated with check (author = auth.uid());
create policy posts_update on public.posts for update to authenticated
  using (author = auth.uid() or public.is_admin()) with check (author = auth.uid() or public.is_admin());
create policy posts_delete on public.posts for delete to authenticated using (public.is_admin());

drop policy if exists votes_read   on public.votes;
drop policy if exists votes_insert on public.votes;
drop policy if exists votes_update on public.votes;
create policy votes_read   on public.votes for select to authenticated using (user_id = auth.uid() or public.is_admin());
create policy votes_insert on public.votes for insert to authenticated
  with check (user_id = auth.uid() and exists (select 1 from public.posts p where p.id = post_id and not p.hidden));
create policy votes_update on public.votes for update to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());

drop policy if exists profiles_read   on public.profiles;
drop policy if exists profiles_insert on public.profiles;
drop policy if exists profiles_update on public.profiles;
create policy profiles_read   on public.profiles for select to authenticated using (user_id = auth.uid() or public.is_admin());
create policy profiles_insert on public.profiles for insert to authenticated with check (user_id = auth.uid());
create policy profiles_update on public.profiles for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

drop policy if exists reports_insert on public.reports;
drop policy if exists reports_read   on public.reports;
create policy reports_insert on public.reports for insert to authenticated with check (user_id = auth.uid());
create policy reports_read   on public.reports for select to authenticated using (public.is_admin());

-- admins: no policies → nobody can read or change it from the app. Manage it in the SQL editor.

-- ---------- Table access for the app ---------------------------------
-- Explicit grants, so this works even with "Automatically expose new tables" turned off.
-- Row level security above still decides which rows each user can see or change.
grant usage on schema public to anon, authenticated;
grant select on public.posts to anon, authenticated;
grant insert, update, delete on public.posts to authenticated;
grant select, insert, update on public.votes to authenticated;
grant select, insert, update on public.profiles to authenticated;
grant select, insert on public.reports to authenticated;
grant usage on all sequences in schema public to authenticated;
grant execute on function public.is_admin() to anon, authenticated;

-- ---------- Public vote feed (no voter ids) --------------------------
-- Everyone can see vote counts, regions and comments, but never who voted.
-- This view deliberately runs with the owner's rights so it can read votes
-- while exposing only these columns.
create or replace view public.vote_feed as
  select v.post_id, v.choice, v.region, v.comment, v.created_at, v.updated_at
  from public.votes v
  join public.posts p on p.id = v.post_id
  where not p.hidden;
grant select on public.vote_feed to anon, authenticated;

-- =====================================================================
-- v2: starter questions that retire themselves, translations,
--     editing/deleting your own questions and replies
-- Safe to run more than once.
-- =====================================================================

alter table public.posts add column if not exists seeded  boolean not null default false;
alter table public.posts add column if not exists text_tr text;

-- Users may edit their own question (text, tags, length, audience) and follow-up.
create or replace function public.guard_post()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if public.is_internal() then
    return new;
  end if;
  if tg_op = 'INSERT' then
    if (select count(*) from public.posts
         where author = auth.uid() and created_at > now() - interval '1 hour') >= 5 then
      raise exception 'rate_limited';
    end if;
    new.author := auth.uid();
    new.created_at := now();
    new.hidden := false;
    new.followup := null;
    new.seeded := false;
    new.text_tr := null;
  elsif tg_op = 'UPDATE' and not public.is_admin() then
    new.author := old.author; new.created_at := old.created_at; new.hidden := old.hidden;
    new.seeded := old.seeded; new.region := old.region; new.lang := old.lang;
    if new.text is distinct from old.text then new.text_tr := null; else new.text_tr := old.text_tr; end if;
  end if;
  return new;
end $$;

-- Every new question from a real person removes one starter question,
-- preferring the same audience and the one with the fewest votes.
create or replace function public.retire_seed()
returns trigger language plpgsql security definer set search_path = public as $$
declare victim uuid;
begin
  if new.seeded or new.author is null then
    return new;
  end if;
  select p.id into victim
    from public.posts p
   where p.seeded
   order by (p.aud = new.aud) desc,
            (select count(*) from public.votes v where v.post_id = p.id) asc,
            p.created_at asc
   limit 1;
  if victim is not null then
    delete from public.posts where id = victim;
  end if;
  return new;
end $$;
drop trigger if exists retire_seed on public.posts;
create trigger retire_seed after insert on public.posts
  for each row execute function public.retire_seed();

-- Owners can delete their own questions; voters can delete their own replies.
drop policy if exists posts_delete on public.posts;
create policy posts_delete on public.posts for delete to authenticated
  using (author = auth.uid() or public.is_admin());
drop policy if exists votes_delete on public.votes;
create policy votes_delete on public.votes for delete to authenticated
  using (user_id = auth.uid());
grant delete on public.votes to authenticated;

-- Hide the "seeded" flag from everyone: column-level read access.
revoke select on public.posts from anon, authenticated;
grant select (id, text, text_tr, tags, len, lang, region, aud, author, followup, hidden, created_at)
  on public.posts to anon, authenticated;

-- Admin-only: which questions are starter questions.
create or replace function public.seed_ids()
returns setof uuid language sql stable security definer set search_path = public as $$
  select id from public.posts where seeded and public.is_admin();
$$;
grant execute on function public.seed_ids() to authenticated;
