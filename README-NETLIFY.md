# Deploying to Netlify (Quick Steps)

1. Ensure the repo is pushed to GitHub (already done).
2. In Netlify, choose "New site from Git" and connect your GitHub account.
3. Select the `Shredchain-Core` repository and branch `main`.
4. Set the build command to `npm run build` and the publish directory to `out` (configured in `netlify.toml`).
5. Add any environment variables if needed (e.g., `NEXT_PUBLIC_*`, API keys) in Netlify site settings.
6. Trigger deploy — Netlify will run `npm ci` then `npm run build` and publish `out/`.

Notes:
- This project uses `next export` for a static build. Dynamic server features will not work on the exported site.
- If you want server-side features, deploy to Vercel or use Netlify Functions.
