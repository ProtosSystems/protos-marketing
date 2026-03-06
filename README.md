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
