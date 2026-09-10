# OctoFit Tracker — Presentation tier

React 19 + Vite + Bootstrap + react-router-dom.

## Environment variables

`VITE_CODESPACE_NAME` must be defined when running in GitHub Codespaces. Create
`octofit-tracker/frontend/.env.local` (see `.env.example`):

```bash
VITE_CODESPACE_NAME=your-codespace-name
```

The API base URL is built as:

```text
https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api
```

If `VITE_CODESPACE_NAME` is unset, the app falls back to `http://localhost:8000/api`
instead of producing an invalid `https://undefined-8000...` URL.

## Scripts

```bash
npm install --prefix octofit-tracker/frontend
npm run dev --prefix octofit-tracker/frontend
```

## Routes

| Route | Component | API endpoint |
| --- | --- | --- |
| `/activities` | `Activities` | `/api/activities/` |
| `/leaderboard` | `Leaderboard` | `/api/leaderboard/` |
| `/teams` | `Teams` | `/api/teams/` |
| `/users` | `Users` | `/api/users/` |
| `/workouts` | `Workouts` | `/api/workouts/` |

Responses are normalized so both plain arrays and paginated/keyed objects
(`results`, `items`, `data`, or the resource name) are supported.
