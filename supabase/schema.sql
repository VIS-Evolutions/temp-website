-- ============================================================================
--  VIS Evolutions — Supabase schema
--  Paste this whole file into the Supabase SQL editor (Dashboard → SQL → New
--  query) and click "Run". Safe to re-run: everything uses IF NOT EXISTS /
--  ON CONFLICT.
-- ============================================================================

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
--  ADMINS  (the team owners who can post news)
--  Passwords are NEVER stored here — only a bcrypt hash in password_hash.
-- ---------------------------------------------------------------------------
create table if not exists public.admins (
  id            uuid primary key default gen_random_uuid(),
  username      text unique not null,
  password_hash text not null,
  display_name  text,
  created_at    timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
--  NEWS POSTS
-- ---------------------------------------------------------------------------
create table if not exists public.news_posts (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  slug        text unique not null,
  excerpt     text,
  content     text not null,
  image_url   text,
  author_id   uuid references public.admins(id) on delete set null,
  author_name text,
  published   boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists news_posts_created_idx   on public.news_posts (created_at desc);
create index if not exists news_posts_published_idx on public.news_posts (published);

-- ---------------------------------------------------------------------------
--  ADMIN INVITES
--  A shareable registration link. The link carries a random token; only its
--  SHA-256 hash is stored here, so a database leak can't reveal a usable link.
--  An invite can be multi-use (max_uses = null means unlimited) and can expire.
-- ---------------------------------------------------------------------------
create table if not exists public.admin_invites (
  id         uuid primary key default gen_random_uuid(),
  token_hash text unique not null,
  label      text,
  created_by uuid references public.admins(id) on delete set null,
  max_uses   integer,                      -- null = unlimited
  uses       integer not null default 0,
  expires_at timestamptz,                  -- null = never expires
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
--  Row Level Security
--  The app talks to the database with the service-role key from the server
--  only, which bypasses RLS. These policies are the safety net for anything
--  using the public (anon) key.
-- ---------------------------------------------------------------------------
alter table public.admins         enable row level security;
alter table public.news_posts     enable row level security;
alter table public.admin_invites  enable row level security;

-- admins / admin_invites: no policies => the anon key can read/write nothing.
-- Only the server (service-role key) can touch these tables.

-- news_posts: anyone may READ published posts; writes are server-only.
drop policy if exists "Public read published posts" on public.news_posts;
create policy "Public read published posts"
  on public.news_posts for select
  using (published = true);

-- ---------------------------------------------------------------------------
--  Storage bucket for post cover images
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('news-images', 'news-images', true)
on conflict (id) do nothing;

-- Public can view images; uploads happen server-side with the service-role key.
drop policy if exists "Public read news images" on storage.objects;
create policy "Public read news images"
  on storage.objects for select
  using (bucket_id = 'news-images');

-- ---------------------------------------------------------------------------
--  Create your admins with the helper script (recommended) so the password
--  gets bcrypt-hashed:
--
--      node --env-file=.env.local scripts/create-admin.mjs <username> <password> "Display Name"
--
--  ...run it once per owner.
-- ---------------------------------------------------------------------------
