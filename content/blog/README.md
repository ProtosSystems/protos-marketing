This directory stores editorial source and Sanity import payloads for blog posts that are authored in-repo before being published through the Sanity dataset.

For this post:

1. Review the source draft in `content/blog/point-in-time-financial-data-the-missing-contract.md`.
2. Import `content/blog/point-in-time-financial-data-the-missing-contract.ndjson` into the configured Sanity dataset.
3. Publish the imported `post` document in Studio if you want it live on the site.

Example import command:

```bash
npx sanity dataset import content/blog/point-in-time-financial-data-the-missing-contract.ndjson "$NEXT_PUBLIC_SANITY_DATASET" --replace
```
