# Trend Corner — Website Build Instructions

You are building a static e-commerce-style website for **Trend Corner (TC)**, a streetwear brand from Silapathar, Assam. Use **plain HTML, CSS and vanilla JS only**: no frameworks, no build step and no libraries. The site has to run by opening `index.html` or from any static host.

The Figma exports in `assets/` are the source of truth. Match them closely. Where these instructions and the designs disagree on layout, the designs win. Where they disagree on fonts or colours, these instructions win.

---

## 1. Reference files (read these first)

| File | What it shows |
|---|---|
| `assets/home-page-figma-design-image.png` | Full home page, top to bottom |
| `assets/product-page-figma-design-image.png` | Product detail page (Heaven Calls Graphic Tee) |
| `assets/hero-section-figma-design-image.png` | Hero section, default state |
| `assets/hero-section-product-hovered-animation-figma-design-image.png` | Hero with one tee hovered (red gradient tint) |
| `assets/nav-bar-figma-design-image.png` | Nav bar close-up |

The design exports are very large (6912px wide; the home page is 6912×19948). Downscale them before viewing. **Do not ship them on the site.**

### Production assets

| File | Use |
|---|---|
| `assets/hero-image.png` | Hero clothes rack (1672×941, **transparent PNG**) |
| `assets/your-fit-your-rules-image.png` | Full-bleed dark banner photo (1672×941) |
| `assets/products/1.png` – `8.png` | Product cut-outs (transparent) |
| `accessories/1.png` – `4.png` | Accessory cut-outs (transparent) |

Ignore `.DS_Store` and `__MACOSX`.

---

## 2. Design tokens

```css
:root {
  --bg:      #F1EFEB;  /* off-white page background */
  --ink:     #1E1E1E;  /* text, footer background, logo circle */
  --accent:  #CD3A36;  /* red: rules, card borders, button borders, hover tint */

  --font-head: 'Anton', sans-serif;
  --font-body: 'Space Grotesk', sans-serif;
  --font-mono: 'IBM Plex Mono', monospace;
}
```

Load all three from Google Fonts:
- Anton 400
- Space Grotesk 400/500
- IBM Plex Mono 400/500

### Typography rules
- **Anton** for every heading and display line: "WEAR IT LOUD.", "OUR COLLECTION", "ACCESSORIES", "NOT HERE TO FIT IN.", "SIMILAR TEES", product titles, card product names, "YOUR FIT. YOUR RULES." and "₹ X,XXX" on the product page. Uppercase where the design is uppercase. Use tight line-height (~1.0).
- **Space Grotesk** for body copy: the hero sub-copy, "About the Tee", the spec list, "Streetwear essentials from Silapathar, Assam." and "YOUR STYLE. NO RULES."
- **IBM Plex Mono** for the nav, every button, the footer links and the card prices. Uppercase with wide letter-spacing: ~0.3em in the nav and footer, ~0.08em on buttons.

### Suggested sizes (desktop 1440 → mobile 375; use `clamp()`)
- Hero H1 "WEAR IT LOUD.": `clamp(48px, 7vw, 104px)`
- Section titles: `clamp(40px, 5vw, 72px)`, centred
- "YOUR FIT. YOUR RULES.": `clamp(40px, 6vw, 96px)`, letter-spacing ~0.15em, colour `--bg`
- Product page title: `clamp(36px, 4.5vw, 64px)`
- Nav links: 15–16px mono, letter-spacing 0.3em
- Body: 16–18px
- Card name: Anton 14–16px
- Card buttons: mono 10–11px
- Card price: mono 13px

### Recurring UI elements
- **Red rule:** a 2px `--accent` horizontal line under the nav, inset to the page margins (not full-bleed).
- **Outline button:** transparent background, 1.5–2px `--accent` border, `--ink` mono uppercase text, square corners, padding ~10px 16px. The small card variant uses ~4px 8px.
- **Card:** 1px `--accent` border, square corners, `--bg` background, padding ~16px. The name sits top-left, the image is centred with `object-fit: contain`, and the bottom row has [BUY NOW] [ADD TO CART] on the left and "₹ XXXX" on the right.
- Page side margin is ~48px on desktop and 16px on mobile. Max content width is ~1440px.

---

## 3. File structure

```
/
├── index.html
├── product.html          ← one template, driven by ?id=
├── products.html         ← full collection grid (no design; reuse card grid)
├── accessories.html      ← accessories grid (no design; reuse card grid)
├── about.html            ← simple placeholder page in the same style (no design)
├── css/
│   └── styles.css
├── js/
│   ├── data.js           ← product + accessory data
│   └── main.js           ← nav, cards render, hero hover, cart, reveal
└── assets/
    ├── hero-image.png
    ├── your-fit-your-rules-image.png
    ├── logo.svg          ← NOT SUPPLIED YET, see §9
    ├── products/1-8.png
    └── accessories/1-4.png   ← move from /accessories into /assets
```

Use semantic HTML (`header`, `nav`, `main`, `section`, `footer`) and one shared stylesheet. Render the nav and footer markup identically on every page; copy-paste is fine, so don't use JS injection.

---

## 4. Product data (`js/data.js`)

The image numbers match the design order exactly.

```js
const PRODUCTS = [
  { id: 'heaven-calls-tee',      name: 'Heaven Calls Graphic Tee',      type: 'tee',   img: 'assets/products/1.png', price: null },
  { id: 'gothic-skull-tee',      name: 'Gothic Skull Oversized Tee',    type: 'tee',   img: 'assets/products/2.png', price: null },
  { id: 'distressed-star-tee',   name: 'Distressed Star Graphic Tee',   type: 'tee',   img: 'assets/products/3.png', price: null },
  { id: 'dark-gothic-tee',       name: 'Dark Gothic Graphic Tee',       type: 'tee',   img: 'assets/products/4.png', price: null },
  { id: 'shadow-grey-cargo',     name: 'Shadow Grey Cargo Pants',       type: 'pants', img: 'assets/products/5.png', price: null },
  { id: 'olive-utility-cargo',   name: 'Olive Utility Cargo Pants',     type: 'pants', img: 'assets/products/6.png', price: null },
  { id: 'desert-khaki-cargo',    name: 'Desert Khaki Cargo Pants',      type: 'pants', img: 'assets/products/7.png', price: null },
  { id: 'midnight-baggy-jeans',  name: 'Midnight Washed Baggy Jeans',   type: 'pants', img: 'assets/products/8.png', price: null },
];

// Accessory names are NOT in the design (it says "T-SHIRT NAME"). These are placeholders; keep them easy to change.
const ACCESSORIES = [
  { id: 'skull-link-chain',  name: 'Skull Link Wallet Chain',   img: 'assets/accessories/1.png', price: null },
  { id: 'web-pendant-chain', name: 'Spider Web Pendant Chain',  img: 'assets/accessories/2.png', price: null },
  { id: 'box-link-chain',    name: 'Box Link Knuckle Chain',    img: 'assets/accessories/3.png', price: null },
  { id: 'cross-drop-chain',  name: 'Cross Drop Chain',          img: 'assets/accessories/4.png', price: null },
];
```

- When `price` is `null`, render `₹ XXXX` (and `₹ X,XXX` on the product page). When a number is set, format it with `toLocaleString('en-IN')`.
- Each product also has optional fields `tagline`, `about` and `specs` (an array of `[label, value]` pairs). When they're missing, fall back to the Heaven Calls copy below so every product page looks complete.

**Heaven Calls copy (from the design):**
- Tagline: "FAITH NEVER FADES. / STYLE NEVER FOLLOWS."
- About the Tee: "Not your everyday graphic tee. Featuring a bold gothic-inspired print, washed-black finish and relaxed silhouette, the Heaven Calls Tee brings an edge to your everyday rotation. Made to stand out. Styled your way."
- Tee Specs:
  - Colour: Washed Black
  - Fit: Relaxed / Oversized Style
  - Neckline: Crew Neck
  - Sleeves: Short Sleeves
  - Design: Gothic Front Graphic
  - Style: Streetwear / Casual
  - Available Sizes: S, M, L, XL (placeholder)

For pants, label the sections "About the Fit" and "Fit Specs" and use sensible cargo or denim specs.

Render all cards from this data with JS. Don't hard-code 12 cards.

---

## 5. Pages

### 5.1 Nav (all pages)
- Layout: `HOME` `PRODUCTS` [logo] `ACCESSORIES` `ABOUT US`. The logo is centred with two links on each side, all evenly spaced.
- The logo is a black circle (~64px desktop) containing the white TC mark and "TREND CORNER". It links to `index.html`.
- The 2px red rule sits below the nav.
- Not sticky (keep it simple).
- **Mobile (<768px):** the logo goes left and a mono "MENU" text button goes right. The button toggles a full-width dropdown with the 4 links stacked in mono and letter-spaced. There's no hamburger icon library.
- The active page link is underlined in `--accent`.

### 5.2 Home (`index.html`), in order

1. **Hero.** Top row: "WEAR IT LOUD." (Anton, left) and the sub-copy "Oversized fits. Statement graphics. Everyday essentials for those who dress differently." (Space Grotesk, right-aligned, max-width ~300px). Below that is `hero-image.png`, centred, about 75% of the content width. Bottom row: "YOUR STYLE. NO RULES." (Space Grotesk 500, uppercase, left) and a `SHOP COLLECTION` outline button (right) that links to `#collection`. **Hero hover:** see §6.1.
2. **Our Collection** (`id="collection"`). Centred Anton title, then a 4-column grid of the 8 products (row 1 is tees, row 2 is pants), gap ~24px. A centred `VIEW COLLECTION` button links to `products.html`.
3. **"YOUR FIT. YOUR RULES." banner.** Full-bleed (edge to edge, no side margin) with `your-fit-your-rules-image.png` as a cover background, height ~ `min(80vh, 720px)`, centred on the model. "YOUR FIT." sits left of the model and "YOUR RULES." sits right, both vertically centred, Anton, `--bg` colour, wide tracking. On mobile, stack them above and below the model, centred.
4. **Accessories.** Centred title, a 4-column grid of the 4 accessories, and a `VIEW COLLECTION` button that links to `accessories.html`.
5. **Closer.** "NOT HERE TO FIT IN." (Anton, centred, large) with "Streetwear essentials from Silapathar, Assam." below it in Space Grotesk. Generous vertical padding (~120px).
6. **Footer** (see 5.4).

### 5.3 Product page (`product.html?id=heaven-calls-tee`)
- Read `id` from `URLSearchParams`. If it's missing or unknown, show the first product.
- Set `<title>` to "{Product Name} — Trend Corner".
- **Main block (3 columns on desktop):**
  - Left column: the product title (Anton, spanning above the left and centre columns as in the design), "About the Tee" (Space Grotesk ~20px), the description (~15px, max-width ~340px) and the price "₹ X,XXX" (Anton ~28px), lower down.
  - Centre column: the product image, large (~520px).
  - Right column, right-aligned: the tagline (Space Grotesk uppercase ~18px, top-right), then "Tee Specs" (~20px), then the spec list (~15px, line-height ~1.9).
  - Thin vertical red lines (2px `--accent`) run down the far left and far right edges of this block, as in the design. Use pseudo-elements on the section.
- Centred below: the `BUY NOW` and `ADD TO CART` outline buttons (the larger variant).
- **Similar Tees** (or "SIMILAR FITS" for pants): a centred Anton title and 4 cards of the same `type`. Exclude the current product and fill with others if there are fewer than 4.
- On mobile everything stacks: title, image, price, buttons, about, specs (left-aligned), similar.

Accessory cards can link to `product.html?id=...` too. Use "About the Piece" and "Specs" labels for them.

### 5.4 Footer (all pages)
- `--ink` background with a ~4px `--accent` border on all four sides (as in the design). Padding ~64px.
- 4 columns:
  1. A large logo circle (~200px).
  2. Links: HOME, ABOUT US, SHOP COLLECTION, ACCESSORIES.
  3. Links: INSTAGRAM, WHATSAPP, EMAIL.
  4. A white square box (~300×270).
- Links are IBM Plex Mono, `--bg` colour, letter-spacing 0.3em, ~18px, line-height ~2.2.
- The white box has no content in the design. Make it a clearly marked placeholder (`<div class="footer-slot">`) intended for a store map embed or a QR code, and leave an HTML comment saying so.
- Social links use placeholder `href`s: `https://instagram.com/`, `https://wa.me/91XXXXXXXXXX`, `mailto:hello@trendcorner.in`. Put them in constants that are easy to find.
- Mobile: stack the columns and centre them. The logo goes on top.
- Add a small copyright line: "© 2026 Trend Corner. Silapathar, Assam." (mono, 11px, muted).

### 5.5 Pages without designs (keep them minimal and on-brand)
- `products.html`: an Anton title "THE COLLECTION", a simple mono filter row (ALL / TEES / PANTS) that filters client-side, and the same card grid.
- `accessories.html`: title plus card grid.
- `about.html`: "NOT HERE TO FIT IN." as the H1, 2–3 short placeholder paragraphs about the brand from Silapathar, Assam, and the full-bleed banner image reused.

---

## 6. Interactions and animation (keep it to these, nothing else)

Use only these **four** motions. All of them are CSS transitions of 200–400ms with `ease-out`. Wrap them all in `@media (prefers-reduced-motion: no-preference)`.

### 6.1 Hero garment hover (the signature effect)
The design shows a hovered tee getting a **red gradient tint**: solid-ish `--accent` at the top fading to transparent at the bottom. Only the garment is tinted, not the background.

Implementation:
- `hero-image.png` is a transparent PNG, so put one **overlay layer per garment** absolutely positioned over the whole image (`inset: 0`).
- Give each layer `mask-image: url(assets/hero-image.png); mask-size: 100% 100%;` (plus the `-webkit-` prefix) so it only paints where the image has pixels.
- Give it `clip-path: inset(top right bottom left)` so it only covers that one garment.
- Give it `background: linear-gradient(to bottom, rgba(205,58,54,.85) var(--g-start), rgba(205,58,54,0) var(--g-end))`.
- Its default is `opacity: 0`. It goes to `opacity: 1` on hover or focus of a matching transparent `<a>` hotspot that links to that product page.

Approximate garment boxes as a percentage of the hero image (top / left / width / height). Tune them visually against the hover design:

| Garment | Product id | top | left | width | height |
|---|---|---|---|---|---|
| Predator / star tee | distressed-star-tee | 13% | 12% | 22% | 56% |
| Godspeed tee | dark-gothic-tee | 14% | 33% | 20% | 54% |
| Khaki cargo | desert-khaki-cargo | 16% | 44% | 21% | 74% |
| Black baggy jeans | midnight-baggy-jeans | 16% | 61% | 17% | 75% |
| Heaven Calls tee | heaven-calls-tee | 16% | 72% | 25% | 61% |

The garments overlap slightly, so keep hotspots a little smaller than the clip boxes. Each hotspot gets `aria-label="View {product name}"`.

On touch devices (`@media (hover: none)`), don't run the tint; the hotspots just act as links.

### 6.2 Button hover
The background fills with `--accent` and the text turns `--bg` (transition 200ms). The same applies on `:focus-visible`, which also gets a 2px `--ink` outline offset 2px.

### 6.3 Card hover
The card image scales to `1.04` (300ms) and the border goes from 1px to look slightly heavier, done with `box-shadow: inset 0 0 0 1px var(--accent)` so the layout doesn't shift. There's no lift and no shadow.

### 6.4 Section reveal (subtle)
Section titles and card grids fade in and move up 16px **once** when they enter the viewport (IntersectionObserver, threshold 0.15, 400ms). If JS fails, content must still be visible: add the `.reveal` hidden state only after JS adds `js` to `<html>`.

**Don't add:** parallax, a loader, a marquee, cursor effects, carousels, page transitions or scroll-jacking.

---

## 7. Cart and Buy Now (light, front-end only)
- **ADD TO CART:** save `{id, qty}` to `localStorage` key `tc_cart`, wrapped in try/catch. Show a small toast at the bottom-centre ("ADDED TO CART", mono, `--ink` background, `--bg` text, 2s). Show the cart count in the nav as `CART (n)` in mono, right of ABOUT US on desktop and in the mobile menu. There's no cart page for now; leave a TODO.
- **BUY NOW:** open WhatsApp with a prefilled message: `https://wa.me/91XXXXXXXXXX?text=Hi Trend Corner, I want to buy: {Product Name}`, URL-encoded, in a new tab.
- Card buttons must not trigger the card's link. Make the card image and name the link and keep the buttons separate elements.

---

## 8. Responsive breakpoints
- **≥1200px:** layout as designed, 4-column grids.
- **768–1199px:** 3-column grids (the accessories grid can stay at 4 if it fits, otherwise 2). The hero image goes full content width.
- **<768px:** 2-column grids with smaller card text (the buttons can stack). The hero H1 goes above the sub-copy, both left-aligned. The hero image is full width. "YOUR STYLE. NO RULES." and SHOP COLLECTION stack. The product page is single column. The footer stacks.
- **<400px:** product grids can stay 2 columns, but there must be no horizontal scroll.

---

## 9. Missing or placeholder content (flag it, don't invent it)
- **Logo:** no file is supplied. Create `assets/logo.svg` as a simple placeholder: a black circle with white "TC" in Anton and tiny "TREND CORNER" text above it. Use it everywhere via `<img>` so swapping in the real file is one change.
- **Prices:** all placeholders (`price: null`).
- **Accessory names:** placeholders (see §4).
- **Sizes:** placeholder.
- **Footer white box:** placeholder slot.
- **Social URLs, phone and email:** placeholders in constants.
- **About page copy:** placeholder.

Put a short `README.md` in the root that lists everything above under "To replace before launch".

---

## 10. Performance and quality
- Add `loading="lazy"` and explicit `width`/`height` on every image except the hero.
- The product PNGs are 1–1.5k px. That's fine for now, but add a README note to convert them to WebP at ~800px for production.
- Accessible: `alt` text = product name on cards and a descriptive alt on the hero and banner. The nav is a `<nav>` with an `aria-label`. The mobile menu button has `aria-expanded`. Text contrast meets AA (red text on the off-white is only for borders, never for body text).
- Use `<meta name="viewport">`, a favicon (the logo) and a meta description on each page.
- No console errors. Test by opening `index.html` directly and via `npx serve`.

## 11. Done when
- The home page and product page visually match the Figma exports at 1440px.
- The hero tint works on all 5 garments and links to the right product.
- All 4 animations work, and nothing else animates.
- Every page works at 375px with no horizontal scroll.
- `product.html?id=...` works for all 12 items.
