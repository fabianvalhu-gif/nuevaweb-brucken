-- Reset ONLY app tables in public schema (does not delete auth users).
-- Run in Supabase SQL Editor, then run schema.sql again.

begin;

drop table if exists public.insights cascade;
drop table if exists public.admins cascade;
drop function if exists public.set_updated_at() cascade;

commit;

