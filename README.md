# Navineshraj R — portfolio

React 18 + TypeScript + Vite. Live at **https://navinesh-infopsykid.github.io/navi-portfolio/**

```
src/data/portfolio.ts      ← ALL text: profile, projects, experience, skills
public/media/<project>/    ← screenshots (.webp) and demo videos (.mp4 + .webm)
src/components/            ← one component + CSS file per section
.github/workflows/         ← deploy.yml (GitHub Pages), docker.yml (GHCR image)
Dockerfile, deploy/        ← container build + nginx config
```

## Run locally

```bash
npm ci
cp .env.example .env      # optional: EmailJS keys for the contact form
npm run dev               # http://localhost:5173/navi-portfolio/
```

## Deploy to GitHub Pages (free)

One-time setup:

1. **Settings → Pages → Build and deployment → Source: "GitHub Actions"**
   (not "Deploy from a branch"). This is the setting that makes the new workflow work.
2. **Settings → Secrets and variables → Actions → New repository secret**, add
   `VITE_EMAIL_SERVICE_ID`, `VITE_EMAIL_TEMPLATE_ID`, `VITE_EMAIL_PUBLIC_KEY`
   (values from your old `.env`). Without them the site still deploys and the contact
   form opens the visitor's email app instead.
3. **Settings → Environments → github-pages → Deployment branches**: make sure `main` is allowed
   (it is by default).

Then every push to `main` builds and deploys. Pushes to `develop_branch` only build, which catches
errors before you merge. You can also run it by hand: **Actions → Deploy to GitHub Pages → Run workflow**.

### What was wrong before

| Problem | Fix |
| --- | --- |
| `vite.config.ts` built into `docs/` but the workflow published `./dist`, so nothing was deployed | Build goes to `dist/`, the workflow uploads `dist/` |
| Workflow only ran on `develop_branch`; the `github-pages` environment only accepts the default branch | Deploys from `main`; `develop_branch` only builds |
| Third-party `peaceiris/actions-gh-pages` pushing to a `gh-pages` branch, plus a committed `docs/` build | Official `actions/upload-pages-artifact` + `actions/deploy-pages`; no build output in git |
| Node 18 (end of life) and `npm install` | Node 22 and `npm ci` (exact lockfile, cached) |
| `npm run lint` had no ESLint config | Added `.eslintrc.cjs`; lint runs in CI |
| `.env` committed to git | `.env` is ignored; keys live in repo secrets |

After the first successful deploy you can delete the old `gh-pages` branch and the `docs/` folder.

## Deploy with Docker (any host)

```bash
docker build -t navi-portfolio .
docker run -p 8080:8080 navi-portfolio        # http://localhost:8080
# or
docker compose up --build
```

The image builds the site with Node, then serves it from a small non-root nginx image. It serves from `/`
rather than `/navi-portfolio/` and listens on `$PORT` (default 8080), so it works as-is on:

- **Google Cloud Run**: `gcloud run deploy navi-portfolio --source . --region asia-south1 --allow-unauthenticated`
- **Render / Railway / Koyeb**: new Web Service → point at this repo → "Docker" runtime.
- **Fly.io**: `fly launch` (it detects the Dockerfile).
- **A VPS**: `docker compose up -d --build`.

Every push to `main` also publishes a ready image to `ghcr.io/navinesh-infopsykid/navi-portfolio:latest`
(see `.github/workflows/docker.yml`), so a host can pull that instead of building.

> GitHub Pages can't run Docker. It only serves static files, so the Pages workflow is the free option
> for github.io and the Dockerfile is for every other host.

## Adding or updating a project

1. Put images in `public/media/<id>/` (WebP or PNG, ~1600 px wide) and an optional demo video
   (`demo.mp4` H.264, plus `demo.webm` for browsers without H.264).
2. Add an entry to `projects` in `src/data/portfolio.ts`. `featured: true` gives it a full case study.

Re-encode a screen recording for the web:

```bash
ffmpeg -i recording.mov -vf "fps=30,scale=1440:-2" -c:v libx264 -crf 27 -pix_fmt yuv420p -movflags +faststart -an demo.mp4
ffmpeg -i demo.mp4 -c:v libvpx-vp9 -b:v 0 -crf 40 -an demo.webm
```
