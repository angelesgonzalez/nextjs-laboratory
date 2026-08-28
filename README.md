# Casas Rurales — Next.js

Rural house rental listing built with Next.js (App Router) for the MetaFrameworks lab. Two screens: house listing and house detail, both pulling from a mock API server.

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4
- Mock API: [master-frontend-metaframeworks-lab](https://github.com/Lemoncode/master-frontend-metaframeworks-lab) (Hono server, port 3001)

## Decisions

**Rendering strategy per page.** The listing (`app/page.tsx`) uses ISR (`fetch` with `next: { revalidate: 3600 }`) — the list of houses doesn't change often, but I didn't want it frozen forever like pure SSG. The detail page (`app/houses/[id]/page.tsx`) uses `generateStaticParams` to pre-render all known house IDs at build time, since the mock API has a small, fixed set of houses — full SSG made more sense there than fetching on every request.

*At scale (thousands of houses)* this would need to change: pre-rendering every detail page at build time would blow up build times for pages nobody visits, so `generateStaticParams` should only cover a popular subset, letting the rest render on-demand and cache afterwards (Next does this automatically via `dynamicParams`). The listing would need real pagination instead of one page with everything, and probably on-demand revalidation (`revalidateTag`) triggered by actual data changes instead of a blind time-based `revalidate`.

**App Router over Pages Router.** It's the current recommended approach, and lets each route decide its own rendering strategy (Server Components, `generateStaticParams`) without extra config.

**Layer-based folder structure** (`app/` for routes, `components/` for UI, `lib/` for types/api/mappers) instead of feature-based. With a single domain (houses), splitting into `features/houses/...` would just add folder depth with no real benefit.

**API → ViewModel mappers** (`lib/mappers.ts`). Instead of passing the raw API shape (`House`) straight into components, I map it into view-specific shapes (`HouseCardVM`, `HouseDetailVM`) with already-formatted strings (price, location, image URL). Keeps formatting logic out of JSX and decoupled from the API contract.

**Two separate env vars for the same URL** (`API_URL` and `NEXT_PUBLIC_API_URL`). `API_URL` is used server-side only (data fetching in `lib/api.ts`). `NEXT_PUBLIC_API_URL` is used to build image URLs, which need to be resolvable from the client bundle. They happen to point to the same host here, but conceptually they're different concerns (private data API vs. public asset host).

**`next/image` with `remotePatterns`.** Needed to allow images from the mock server's host (`localhost:3001`). Also had to add `images.dangerouslyAllowLocalIP: true` — Next 16 blocks image optimization requests to hosts resolving to local/private IPs by default (SSRF protection), which includes `localhost` in dev.

**Defensive JSON parsing in `getHouseById`.** The mock API returns `200 OK` with an *empty body* (not a 404) when a house ID doesn't exist, which crashes `res.json()`. Reading the body as text first and checking for emptiness avoids that, and lets the page call `notFound()` cleanly for unknown IDs.

**Design.** Minimalist/editorial style inspired by a boutique hotel site reference (KOBU, via Mobbin): warm off-white background, large titles paired with small uppercase monospace labels for metadata (location, dates, price).

## What's implemented

- House listing (`/`) with cards (image, name, location, price)
- House detail (`/houses/[id]`) with description, address, room/bed/bath counts, and reviews
- Navigation between both screens
- Proper 404 handling for non-existent house IDs
- Optimized images via `next/image`

Not implemented (optional in the assignment): search/filter, booking button.

## Running locally

1. Start the mock API server (from the cloned `master-frontend-metaframeworks-lab/api-server` repo):
   ```
   npm install
   npm start
   ```
   Runs on `http://localhost:3001`.

2. In this project, create `.env.local`:
   ```
   API_URL=http://localhost:3001
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```

3. Install and run:
   ```
   npm install
   npm run dev
   ```
   Open `http://localhost:3000`.
