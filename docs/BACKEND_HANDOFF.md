# Backend handoff

The site is a React + TypeScript + Vite single-page app. **There is no database yet**: catalogue data is mock data in
`src/data/`, the cart and chosen branch live in the browser (`localStorage`), and form submissions go to one endpoint.
This document lists exactly what to replace.

## 1. Mock data → API

| File | Holds | Suggested endpoint |
|---|---|---|
| `src/data/branches.ts` | The 3 branches (id, name, address, map info) | `GET /branches` |
| `src/data/products.ts` | Parts catalogue, **per-branch prices** | `GET /products?branch=<id>` · `GET /products/:slug` |
| `src/data/services.ts` | Services list | `GET /services` |
| `src/data/vehicles.ts` | Make → model map, years, time slots | `GET /vehicles` (or keep static) |
| `src/data/testimonials.ts` | Sample quotes | `GET /testimonials` |
| `src/data/site.ts` | Phones, email, WhatsApp, hours, credentials | static config or CMS |

Components import these arrays **synchronously** (`PRODUCTS`, `getProduct`, `SERVICES`, `BRANCHES`…). To go live, replace the
imports with data-fetching hooks (React Query / SWR) in: `PartsPage`, `ProductDetailsPage`, `FeaturedParts`, `ProductCard`,
`ServicesPage`, `ServicesOverview`, `BookingPage`, `CartContext` (it resolves cart lines against `PRODUCTS`) and `BranchContext`.
Types are in `src/types/index.ts` — treat them as the API contract. Note `Service.icon` is a React component; have the API return an
icon key and map it to a lucide icon in the frontend.

## 2. Branches and pricing
- `Product.price` is the default price; `Product.branchPrices` (`{ [branchId]: number }`) overrides it per branch. `priceFor(product, branchId)`
  in `src/utils/pricing.ts` is the only place this is resolved. Unlisted branches fall back to the default price.
- The selected branch is global (`src/context/BranchContext.tsx`, persisted in `localStorage`). Changing it re-prices the product
  lists, product page and cart, and is sent with every booking/order as `location` (name) and `branchId`.
- Suggested tables: `branches`, `products`, `product_branch_prices(product_id, branch_id, price)`, and later `product_branch_stock(product_id, branch_id, quantity)`.
  `Product.inStock` is currently one global flag; per-branch stock is the natural next step.

## 3. Form payloads
All fields are strings. `reference` is generated in the browser for the confirmation screen — **issue it server-side** in production.

**`service-request`** (Book a service) — required: `location, service, make, model, year, date, time, name, phone`

| Field | Example / values |
|---|---|
| `reference` | `PG-S-4F7K2` |
| `location` / `branchId` | `Adabraka` / `adabraka` |
| `service` / `serviceSlug` | `Brakes` / `brakes` |
| `make`, `model`, `year` | `Toyota`, `Corolla`, `2019` |
| `date` | `2026-10-12` (YYYY-MM-DD) — a *preferred* date, not a confirmed booking |
| `time` | `9:00 am` |
| `handover` | `drive-in` \| `pickup` |
| `name`, `phone`, `email` (optional), `notes` (optional) | |

**`order-request`** (Cart) — required: `location, parts, make, model, name, phone`

| Field | Example / values |
|---|---|
| `reference` | `PG-P-9XK3M` |
| `location` / `branchId` | `Achimota` / `achimota` |
| `items` | JSON string: `[{"slug":"brake-pad-set-corolla-front","quantity":2}]` — **use this** |
| `parts` | human-readable summary (for emails) |
| `subtotal` | client-calculated, **untrusted** — recompute from the branch price list |
| `make`, `model`, `year` (optional) | |
| `fulfilment` | `delivery` \| `pickup` (pickup = collect from the chosen branch) |
| `name`, `phone`, `email` (optional), `notes` (optional) | |

**`enquiry`** (Contact) — required: `name, phone, message`; also `reference`, `email`, `topic`.

No payment is taken anywhere: every form is a *request* that staff confirm by phone/WhatsApp.

### Form delivery (Netlify Forms)
This variant has no server code. `src/utils/submitForm.ts` POSTs url-encoded data to `/`; Netlify matches it to the
hidden forms in `index.html` (`service-request`, `order-request`, `enquiry`) and stores it under **Forms** in the dashboard.
**If you add or rename a field in a page you must add it to the matching hidden form in `index.html`**, or Netlify drops it.
Form detection must be enabled in Site configuration → Forms. To move to a real database, replace `submitForm.ts`
with a call to your own API (see the Vercel variant's `api/forms.js` for a ready-made request/response contract).

## 4. Before going to production
- Re-validate everything server-side (the browser checks are convenience only) and recompute prices.
- Add spam protection / rate limiting to the form endpoint (honeypot field, CAPTCHA, or a WAF rule).
- Consider routing notifications per branch (each branch emails its own staff) using `branchId`.
- Replace the client-generated `reference` with a server-issued one.
- Confirm contact details, opening hours, per-branch addresses and the WhatsApp number (`TODO(client)` markers in `src/data/site.ts` and `src/data/branches.ts`).

## 5. Where things live
- Pages: `src/pages/` · reusable UI: `src/components/ui/` · styling tokens: `src/styles/tokens.css`
- Branch state: `src/context/BranchContext.tsx` · cart: `src/context/CartContext.tsx`
- Form plumbing: `index.html` (hidden forms), `src/utils/submitForm.ts`, `src/hooks/useFormSubmit.ts`, `src/hooks/useFormState.ts`, `src/utils/validation.ts`
