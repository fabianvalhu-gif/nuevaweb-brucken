-- Supabase schema for Brücken Global insights/blog + single-admin gate.
-- Run in Supabase SQL Editor (new project).

-- Extensions
create extension if not exists pgcrypto;

-- Admin allowlist (single user):
-- Insert your auth user_id here once you create the user in Supabase Auth.
create table if not exists public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

-- Insights / Blog posts
create table if not exists public.insights (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text,
  content_md text not null,
  cover_image_url text,
  is_featured boolean not null default false,
  category text,
  author_name text,
  read_time_min integer,
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  created_by uuid references auth.users (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists insights_published_at_idx on public.insights (published_at desc);
create index if not exists insights_status_idx on public.insights (status);
-- Ensure only one published insight can be featured at a time.
create unique index if not exists insights_single_featured_published_idx
on public.insights ((1))
where (is_featured is true and status = 'published');

-- Keep updated_at fresh
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_insights_updated_at on public.insights;
create trigger trg_insights_updated_at
before update on public.insights
for each row execute function public.set_updated_at();

-- Row Level Security
alter table public.admins enable row level security;
alter table public.insights enable row level security;

-- Admin table policies:
-- Allow an authenticated user to read ONLY their own admin row.
-- This avoids circular RLS policies and lets the frontend verify admin access safely.
drop policy if exists "admin_self_read" on public.admins;
create policy "admin_self_read"
on public.admins
for select
to authenticated
using (user_id = auth.uid());

-- Public can read only published insights (and only once published_at is not in the future).
drop policy if exists "public_read_published_insights" on public.insights;
create policy "public_read_published_insights"
on public.insights
for select
to anon, authenticated
using (
  status = 'published'
  and (published_at is null or published_at <= now())
);

-- Only admins can read drafts and do writes.
drop policy if exists "admin_read_all_insights" on public.insights;
create policy "admin_read_all_insights"
on public.insights
for select
to authenticated
using (
  exists (select 1 from public.admins a where a.user_id = auth.uid())
);

drop policy if exists "admin_insert_insights" on public.insights;
create policy "admin_insert_insights"
on public.insights
for insert
to authenticated
with check (
  exists (select 1 from public.admins a where a.user_id = auth.uid())
);

drop policy if exists "admin_update_insights" on public.insights;
create policy "admin_update_insights"
on public.insights
for update
to authenticated
using (
  exists (select 1 from public.admins a where a.user_id = auth.uid())
)
with check (
  exists (select 1 from public.admins a where a.user_id = auth.uid())
);

drop policy if exists "admin_delete_insights" on public.insights;
create policy "admin_delete_insights"
on public.insights
for delete
to authenticated
using (
  exists (select 1 from public.admins a where a.user_id = auth.uid())
);

-- Seed admin allowlist (optional).
-- Safe to run multiple times. Inserts only if the user exists in auth.users.
-- Prefer the email-based insert if you don't want to hardcode a UUID.

-- 1) Seed by user_id (UUID):
insert into public.admins (user_id)
select '061feb25-88a9-491a-aece-93c4d2e513f5'::uuid
where exists (
  select 1 from auth.users where id = '061feb25-88a9-491a-aece-93c4d2e513f5'::uuid
)
on conflict (user_id) do nothing;

-- 2) Seed by email (replace with your admin email if needed):
insert into public.admins (user_id)
select id
from auth.users
where email = 'gerencia@bruckenglobal.com'
on conflict (user_id) do nothing;

-- -----------------------------------------------------------------------------
-- Storage (Cover images)
-- -----------------------------------------------------------------------------
-- The frontend renders cover images via a direct <img src="..."> URL.
-- For that to work, the bucket must be public.
-- Creates/updates the bucket and restricts uploads/edits to admins only.

-- Create (or set) a PUBLIC bucket for insight images.
insert into storage.buckets (id, name, public)
values ('insights', 'insights', true)
on conflict (id) do update set public = true;

-- Storage policies (needed for client-side uploads with Supabase Auth).
alter table storage.objects enable row level security;

drop policy if exists "public_read_insights_bucket" on storage.objects;
create policy "public_read_insights_bucket"
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'insights');

drop policy if exists "admin_insert_insights_bucket" on storage.objects;
create policy "admin_insert_insights_bucket"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'insights'
  and exists (select 1 from public.admins a where a.user_id = auth.uid())
);

drop policy if exists "admin_update_insights_bucket" on storage.objects;
create policy "admin_update_insights_bucket"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'insights'
  and exists (select 1 from public.admins a where a.user_id = auth.uid())
)
with check (
  bucket_id = 'insights'
  and exists (select 1 from public.admins a where a.user_id = auth.uid())
);

drop policy if exists "admin_delete_insights_bucket" on storage.objects;
create policy "admin_delete_insights_bucket"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'insights'
  and exists (select 1 from public.admins a where a.user_id = auth.uid())
);
