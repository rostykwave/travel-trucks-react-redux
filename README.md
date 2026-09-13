# TravelTrucks

A campervan rental catalog: browse, filter and book campers. Built for a
front-end test assignment.

## Live

Not deployed yet — `vercel.json` is ready (SPA rewrites so `/catalog/:id`
doesn't 404 on direct entry), deployment itself is pending.

## Stack

- **React 19** + **TypeScript** (strict) on **Vite**
- **Redux Toolkit** — `createAsyncThunk` + a typed store, no RTK Query
- **React Router 7** — `/`, `/catalog`, `/catalog/:id`
- **Axios** for HTTP, against `https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers`
- **CSS Modules** + a CSS-variable design token layer (no CSS-in-JS, no Tailwind)
- **React Hook Form** + **Zod** for the booking form
- **react-hot-toast** for the success notification
- Filters enter through the URL (`useSearchParams`) and are held in a Redux
  `filters` slice as the active set — shareable links and working back/forward,
  while Load More and Retry read the filters the current list was built from
- Favorites persist to `localStorage` through a thin Redux middleware

## Getting started

Requires Node 20+ (built and tested on Node 22).

```bash
npm install
npm run dev       # http://localhost:5173
```

## Scripts

| Script                 | Does                                                        |
| ---------------------- | ----------------------------------------------------------- |
| `npm run dev`          | Start the Vite dev server                                   |
| `npm run build`        | Type-check (`tsc -b`) and build for production into `dist/` |
| `npm run preview`      | Serve the production build locally                          |
| `npm run lint`         | ESLint (flat config, type-aware rules)                      |
| `npm run lint:fix`     | ESLint with autofix                                         |
| `npm run format`       | Prettier, writes changes                                    |
| `npm run format:check` | Prettier, check only                                        |
