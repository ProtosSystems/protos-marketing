# Protos Marketing Site

Marketing website for Protos Systems, built with Next.js and Tailwind CSS, with blog content managed in Sanity.

## Local setup

1. Install dependencies:

```bash
npm install
```

2. Ensure `.env.local` includes:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- optional: `NEXT_PUBLIC_SANITY_API_VERSION`
- optional: `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` (for Search Console ownership tag)
- optional: `SANITY_REVALIDATE_SECRET` (required to support automatic revalidation from Sanity webhooks)

3. Start dev server:

```bash
npm run dev
```

4. Open:

- Site: http://localhost:3000
- Studio: http://localhost:3000/studio

## Production checks

Before deploying:

```bash
npm run lint
npm run build
```

## Sanity webhook for live publishing

To make new or updated blog posts appear on `protos.fi` without a redeploy:

1. Set `SANITY_REVALIDATE_SECRET` in the production environment and in local `.env.local`.
2. In Sanity, create a webhook targeting:

```text
https://www.protos.fi/api/revalidate?secret=YOUR_SECRET
```

3. Use `POST` and send JSON.
4. Filter to post publishes and updates, for example:

```groq
_type == "post"
```

5. Use this projection:

```groq
{
  "_type": _type,
  "slug": slug.current,
  "tags": tags[]->slug.current
}
```

The endpoint revalidates the blog index, post page, tag pages, RSS feed, and sitemap.
