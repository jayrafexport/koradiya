# Koradiya Group Impex — Website (v4, multi-page)

A full rebuild: 8 real pages instead of one long scroll, with motion,
data visualizations and a design system grounded in the actual
material (porcelain white, kiln charcoal, fired-clay terracotta,
brand teal) instead of a generic template look.

## What's new vs. the old single-page version

- **8 separate pages**, matching your real nav: Home, Company Profile,
  Infrastructure, Products, E-Catalogue, Packing Details, Global, Contact.
- **Hero slider** with Ken Burns zoom, dot navigation, scroll cue.
- **Animated counters** that count up when scrolled into view (designs,
  countries, sizes, support).
- **Manufacturing process flow chart** — a connected 6-step diagram
  that draws itself in as you scroll.
- **Bar charts & donut chart** (Infrastructure, Company Profile pages) —
  pure CSS/JS, no library.
- **Cards everywhere** with real hover motion — lift, image zoom, and a
  border reveal — not flat static tiles.
- **Testimonial slider**, **country grid**, tabbed **product size charts**.
- Scroll-triggered reveals throughout, staggered on card grids.
- A recurring **"tile grid" motif** (grout-line pattern) used as section
  dividers — a small signature detail tying it back to the product.

## Files — what to edit for what

- **`media.js`** — image paths only. Add real photos to `assets/images/`
  and point these at them.
- **`assets/js/content.js`** — all the *wording and numbers*: stats,
  process steps, product descriptions, countries, testimonials, packing
  steps, infrastructure copy. Edit this, not the HTML, to change text.
- **`assets/css/style.css`** — colors, spacing, type. Color variables
  are at the top (`:root`) if you want to adjust the palette.
- **`assets/js/partials.js`** — the shared header/footer HTML. Edit
  here once and it updates on all 8 pages (nav links, footer columns,
  social links).
- Each **`.html`** file — page-specific structure and copy that isn't
  in `content.js` (e.g. the Company Profile paragraphs).

## Content you should verify

- **Infrastructure page** and **Packing Details page** copy is written
  generically for a tile manufacturer — check it matches your actual
  equipment and packing process, and edit `content.js` accordingly.
- **Donut chart on Company Profile** (72% export / 28% domestic) is a
  placeholder split — replace with your real figures in
  `company-profile.html`.
- **Catalogue PDF**: `assets/brochure/catalogue.pdf` doesn't exist yet
  — add your real file there (see `assets/brochure/README.txt`).
- **Photos**: several images still point to your old (compromised)
  site so pages aren't empty. Replace with real photography in
  `assets/images/` per `media.js` and `assets/images/README.txt`.

## Publishing to GitHub Pages

1. Create a GitHub repository and upload everything in this folder,
   keeping the same structure.
2. Add real photos to `assets/images/` and your catalogue PDF to
   `assets/brochure/`.
3. In the repo: **Settings → Pages** → source branch `main`, folder
   `/ (root)` → Save.
4. Live at `https://<your-username>.github.io/<repo-name>/`.

You can also upload this folder directly to your WordPress host's
`public_html/` (once it's cleaned up) as a static site, replacing
WordPress entirely if you don't need a CMS — or keep it as a separate
static mirror while WordPress is being fixed.

## Still outstanding from before

Your live WordPress site was compromised (spam-injected `/products/`
page, backdoor files, malicious `.htaccess` rule). That's separate
from this redesign — please still get that cleaned up with your host
before pointing your domain anywhere.
