-- Reset ONLY app tables in public schema (does not delete auth users).
-- Run in Supabase SQL Editor, then run schema.sql again.

begin;

-- Storage cleanup (optional but recommended if you want a fully fresh blog setup).
-- Removes bucket policies + objects + bucket so schema.sql can recreate everything cleanly.
drop policy if exists "public_read_insights_bucket" on storage.objects;
drop policy if exists "admin_insert_insights_bucket" on storage.objects;
drop policy if exists "admin_update_insights_bucket" on storage.objects;
drop policy if exists "admin_delete_insights_bucket" on storage.objects;

delete from storage.objects where bucket_id = 'insights';
delete from storage.buckets where id = 'insights';

drop table if exists public.insights cascade;
drop table if exists public.admins cascade;
drop function if exists public.set_updated_at() cascade;

commit;
