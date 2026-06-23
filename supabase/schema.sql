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
--  DONATION SETTINGS
--  A single editable row holding the fundraising goal and amount raised,
--  shown on the public Donate page and edited from the admin dashboard.
-- ---------------------------------------------------------------------------
create table if not exists public.donation_settings (
  id            integer primary key default 1,
  goal_amount   integer not null default 6000,
  raised_amount integer not null default 3420,
  updated_at    timestamptz not null default now(),
  constraint donation_settings_single_row check (id = 1)
);

insert into public.donation_settings (id) values (1) on conflict (id) do nothing;

-- ---------------------------------------------------------------------------
--  SPONSORS  (shown on the Sponsorship page)
-- ---------------------------------------------------------------------------
create table if not exists public.sponsors (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  website    text,
  logo_url   text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);
create index if not exists sponsors_order_idx on public.sponsors (sort_order, created_at);

-- ---------------------------------------------------------------------------
--  TEAM MEMBERS  (shown on the About page)
-- ---------------------------------------------------------------------------
create table if not exists public.team_members (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  role       text not null,
  photo_url  text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);
create index if not exists team_members_order_idx on public.team_members (sort_order, created_at);

-- Seed placeholder members (only on an empty table). Edit or delete these from
-- the admin panel and add your own.
insert into public.team_members (name, role, sort_order)
select v.name, v.role, v.ord
from (values
  ('Aarav S.', 'Team Principal', 1),
  ('Maya L.', 'Design Engineer', 2),
  ('Ethan R.', 'Manufacturing Lead', 3),
  ('Priya K.', 'Aerodynamicist', 4),
  ('Leo M.', 'Marketing & Sponsorship', 5),
  ('Sofia D.', 'Resources & Finance', 6)
) as v(name, role, ord)
where not exists (select 1 from public.team_members);

-- ---------------------------------------------------------------------------
--  Row Level Security
--  The app talks to the database with the service-role key from the server
--  only, which bypasses RLS. These policies are the safety net for anything
--  using the public (anon) key.
-- ---------------------------------------------------------------------------
alter table public.admins             enable row level security;
alter table public.news_posts         enable row level security;
alter table public.admin_invites      enable row level security;
alter table public.donation_settings  enable row level security;
alter table public.sponsors           enable row level security;
alter table public.team_members       enable row level security;

-- admins / admin_invites: no policies => the anon key can read/write nothing.
-- Only the server (service-role key) can touch these tables.

-- news_posts: anyone may READ published posts; writes are server-only.
drop policy if exists "Public read published posts" on public.news_posts;
create policy "Public read published posts"
  on public.news_posts for select
  using (published = true);

-- donation_settings: anyone may READ; writes are server-only.
drop policy if exists "Public read donation settings" on public.donation_settings;
create policy "Public read donation settings"
  on public.donation_settings for select
  using (true);

-- sponsors / team_members: anyone may READ; writes are server-only.
drop policy if exists "Public read sponsors" on public.sponsors;
create policy "Public read sponsors"
  on public.sponsors for select
  using (true);

drop policy if exists "Public read team members" on public.team_members;
create policy "Public read team members"
  on public.team_members for select
  using (true);

-- ---------------------------------------------------------------------------
--  Storage buckets for images (post covers, sponsor logos, team photos).
--  Public read; uploads are authorized per-file via server-issued signed URLs.
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public) values ('news-images', 'news-images', true) on conflict (id) do nothing;
insert into storage.buckets (id, name, public) values ('sponsor-logos', 'sponsor-logos', true) on conflict (id) do nothing;
insert into storage.buckets (id, name, public) values ('team-photos', 'team-photos', true) on conflict (id) do nothing;

drop policy if exists "Public read news images" on storage.objects;
create policy "Public read news images"
  on storage.objects for select
  using (bucket_id = 'news-images');

drop policy if exists "Public read sponsor logos" on storage.objects;
create policy "Public read sponsor logos"
  on storage.objects for select
  using (bucket_id = 'sponsor-logos');

drop policy if exists "Public read team photos" on storage.objects;
create policy "Public read team photos"
  on storage.objects for select
  using (bucket_id = 'team-photos');

-- ---------------------------------------------------------------------------
--  Create your admins with the helper script (recommended) so the password
--  gets bcrypt-hashed:
--
--      node --env-file=.env.local scripts/create-admin.mjs <username> <password> "Display Name"
--
--  ...run it once per owner.
-- ---------------------------------------------------------------------------
