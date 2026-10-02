# PowerGlide Premier Auto Service Center — Frontend

React + TypeScript + Vite. Built from the Figma file **POWERGLIDE → High-Fidelity** (desktop 1440px + mobile 393px frames).

## Run
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build
```
Deploy: any static host (Vercel / Netlify). Add an SPA fallback so all routes serve `index.html`.

## Where to add images
Drop files into `public/images/…` using the paths in `src/data/*.ts`. Until a file exists, a labelled
placeholder shows the exact path expected.
- `public/images/hero/workshop.jpg` · `about/` (workshop-tools, team, parts-counter)
- `public/images/services/<slug>.jpg` · `public/images/products/*.jpg`

## Edit content (no component changes needed)
- `src/data/services.ts` – add/replace services · `src/data/products.ts` – parts catalogue (mock)
- `src/data/site.ts` – phone, WhatsApp, email, address, hours, map embed URL (**placeholders — client to confirm**)

## Structure
```
src/
  styles/      tokens.css (colours, radii, type scale) · base · components · sections · pages
  components/  ui/ (Button, fields, ImageFrame…) · layout/ · cards/ · home/
  pages/       Home, Services, Booking, Parts, ProductDetails, Cart, About, Contact, Confirmation
  context/     CartContext (localStorage)     data/  mock data     hooks/ utils/ types/
```
Routes: `/ /services /book /parts /parts/:slug /cart /about /contact /confirmation/:kind`

## Assumptions / things to check
- Tokens (gold `#f4b942`, ink `#2a1b14`, Inter, 10/16/24px radii) were read from Figma. Mobile type sizes are interpolated.
- I read the desktop frames' code in detail. The mobile frames and the three confirmation screens were only
  inspected structurally, so confirmation/About copy is written in the design's tone — compare against Figma.
- Figma lists "Tyre" and a "Diagnostic Scanner" as products; both are kept as sample data.
- Hover/active/focus states were not specified in Figma; they are my additions.

## Change the company's phone / email / WhatsApp
Edit `src/data/site.ts` only (`phone`, `email`, `whatsapp` = international digits, no `+`). Header, footer,
contact page, tel:/mailto:/wa.me links and confirmation text all update. Then delete the two
"placeholder / awaiting client confirmation" notes in `src/pages/ContactPage.tsx`.

## Where form submissions go (Netlify Forms)
Three forms post to Netlify: `service-request`, `order-request`, `enquiry`
(hidden copies in `index.html`; sender in `src/utils/submitForm.ts`). View them in the Netlify dashboard → **Forms**.
Add an email alert: Site configuration → Notifications → Form submission notifications.
In `npm run dev` submissions are only logged to the console; real sending works on Netlify.
If field names change in a page, update the matching hidden form in `index.html`.

## Deploy to Netlify
1. Push the project to GitHub. 2. Netlify → Add new project → Import from Git → pick the repo.
3. Build command `npm run build`, publish directory `dist` (already set in `netlify.toml`). 4. Deploy.
