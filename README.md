# UET Panda

Monorepo for the UET Panda platform: student ordering, cafe admin dashboards, and super-admin tools. Built with [Next.js](https://nextjs.org), [Turborepo](https://turbo.build/repo), and [Firebase](https://firebase.google.com) (Auth + Realtime Database).

**Repository:** [github.com/kashaf955/UETPanda](https://github.com/kashaf955/UETPanda)

## Apps

| App           | Package        | Dev URL                    |
|---------------|----------------|----------------------------|
| Student       | `student`      | [http://localhost:3000](http://localhost:3000) |
| Cafe admin    | `admin`        | [http://localhost:3001](http://localhost:3001) |
| Super admin   | `super-admin`  | [http://localhost:3003](http://localhost:3003) |

## Packages

- **`@uet-panda/shared-config`** — Firebase client config, auth and cart context.
- **`@uet-panda/shared-ui`** — Shared UI (e.g. navbar, route guards).

## Prerequisites

- Node.js 18+ (recommended: match your deployment target)
- npm 10+

## Setup

```bash
npm install
```

Copy environment templates and fill in real values (never commit secrets):

```bash
# See .env.example at repo root for all variable names
```

For each Next.js app, create `.env.local` as needed with the `NEXT_PUBLIC_*` Firebase keys and any app-specific variables listed in `.env.example`.

### Firebase Admin (super-admin API & scripts)

- **Production / CI:** set `FIREBASE_SERVICE_ACCOUNT_JSON` to the full service account JSON string (single line).
- **Local:** copy `scripts/serviceAccountKey.json.example` to `scripts/serviceAccountKey.json`, paste your real key from Firebase Console, and keep that file **out of git** (it is listed in `.gitignore`).

Super-admin login uses `SUPER_ADMIN_USER` and `SUPER_ADMIN_PASS` in `apps/super-admin/.env.local`.

## Development

Run all apps in parallel:

```bash
npm run dev
```

Run a single app from the repo root:

```bash
npx turbo dev --filter=student
npx turbo dev --filter=admin
npx turbo dev --filter=super-admin
```

## Build

```bash
npm run build
```

## Scripts (`scripts/`)

Node scripts for seeding and maintenance expect `scripts/serviceAccountKey.json` locally (or equivalent credentials). See individual files for usage.

## Security notes

- Do not commit `.env`, `.env.local`, or `serviceAccountKey.json`.
- If a service account key was ever exposed, rotate it in the [Google Cloud Console](https://console.cloud.google.com/) and update your local and deployment secrets.

## License

Private project unless noted otherwise.
