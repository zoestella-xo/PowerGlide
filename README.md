# PowerGlide Premier Auto Service Center — Frontend (Netlify edition)

React + TypeScript + Vite, built from the Figma file **POWERGLIDE → High-Fidelity**.

## Run
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into dist/
```

## Change content (no component code needed)
| What | Where |
|---|---|
| Phone numbers, email, WhatsApp, opening hours, ATRA wording | `src/data/site.ts` |
| Branches: names, addresses, Google Maps | `src/data/branches.ts` |
| Parts and **per-branch prices** | `src/data/products.ts` (`branchPrices`) |
| Services | `src/data/services.ts` |
| Vehicle makes and models | `src/data/vehicles.ts` |
| Colours, radii, type scale | `src/styles/tokens.css` |

**Google Maps:** per branch in `branches.ts`, fill `mapQuery` (an address, easiest), or paste Google's embed `<iframe>`/URL into `mapEmbedUrl`
(wrap it in single quotes), and a normal share link into `mapLink` for the "Open in Google Maps" button.

**Images:** drop files into `public/images/…` using the paths in `src/data/*.ts`. Until a file exists a labelled placeholder shows the expected path.

## How branches work
The customer picks a branch once (Parts, Services, Booking, Product, Cart and Contact all share the choice). Parts prices, the cart total and
every booking/order follow it. See `docs/BACKEND_HANDOFF.md`.

## Deploy to Netlify
1. Push the project to a GitHub repository.
2. Netlify → **Add new project → Import an existing project** → pick the repo. Settings come from `netlify.toml`
   (build `npm run build`, publish `dist`, SPA redirect so `/services`, `/cart`, … work on refresh).
3. **Site configuration → Forms → make sure form detection is enabled**, then deploy (or *Clear cache and deploy site*).
4. Check **Forms** in the dashboard: `service-request`, `order-request` and `enquiry` should be listed. Add an email alert under
   Site configuration → Notifications → Form submission notifications.
5. Submit one test of each form on the live site.

`npm run dev` logs form submissions to the console instead of sending them; real sending only works on a Netlify deployment.

## For backend developers
Read **`docs/BACKEND_HANDOFF.md`** — it lists every mock-data file to replace, the three form payloads, the branch-pricing model and a hardening checklist.

## Open items to confirm with the client
- Which phone number is on WhatsApp (`whatsapp` in `site.ts`; the 030 number is a landline).
- Opening hours, and exact street addresses for the Adabraka and Achimota branches.
- Real parts catalogue and branch price lists (current prices are sample figures).
