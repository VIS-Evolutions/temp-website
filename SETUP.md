# VIS Evolutions — News + Admin setup

The public site runs without any backend. The **News** section and the hidden
**/admin** dashboard need Supabase. Follow these steps once.

## 1. Create a Supabase project
Go to [supabase.com](https://supabase.com), create a free project, and wait for
it to finish provisioning.

## 2. Run the SQL
In the Supabase dashboard: **SQL Editor → New query**, paste the whole of
[`supabase/schema.sql`](supabase/schema.sql), and click **Run**. This creates the
`admins` and `news_posts` tables, row-level security, and the `news-images`
storage bucket.

## 3. Add environment variables
Copy the example file and fill it in:

```bash
cp .env.local.example .env.local
```

- `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` — Supabase dashboard →
  **Project Settings → API**. Use the **service_role** key. It is only ever used
  server-side and must never be committed or shipped to the browser.
- `AUTH_SECRET` — any long random string. Generate one with:
  ```bash
  openssl rand -base64 32
  ```

## 4. Create the first admin
Make one admin from the command line to get started. The password is
bcrypt-hashed before it touches the database — only the hash is stored:

```bash
npm run create-admin -- alice "her-strong-password" "Alice Smith"
```

(Re-running with the same username resets that person's password.)

## 5. Invite the rest of the team
The other owners don't need the command line. Once you're signed in:

1. Go to **/admin/dashboard → Invite team**.
2. Generate an invite link (set an expiry and, optionally, a max number of uses).
3. Send that one link to your team.

Anyone who opens the link gets a **register** page where they choose their own
username and password. Only people with the link can see that page — the token
in the URL is required, and it's stored only as a hash. The link stops working
once it expires or hits its use limit.

## 6. Go
```bash
npm run dev
```

- Public news: **/news**
- Admin (not linked anywhere — type the URL): **/admin**

Owners sign in with their username + password, then create/edit/delete posts
(headline, summary, cover image, body, draft toggle) from the dashboard.
