# Trend Corner

Static site for Trend Corner, a streetwear brand from Silapathar, Assam. Plain HTML, CSS and vanilla JS: no framework, no build step.

## Run it

Open `index.html` directly, or serve the folder:

```bash
npx serve .
```

## Structure

```
index.html          home
product.html        product detail, driven by ?id=<product id>
products.html       full collection with ALL / TEES / PANTS filter
accessories.html    accessories grid
about.html          about page (placeholder copy)
css/styles.css      the one shared stylesheet
js/data.js          products, accessories, fallback copy, contact constants
js/main.js          nav, card rendering, product page, cart, buy now, reveal
assets/             images used by the site
```

Cards are rendered from `js/data.js`. To add or edit a product, change the arrays there.

The nav and footer markup is repeated in every HTML file. If you change one, change all five.

## Hero hover effect

The five hotspots over the hero rack are polygons in an inline SVG in `index.html`, in the photo's own pixel coordinates (1672 × 941). Each polygon is both the link and the red tint shape. The tint is masked by the photo's alpha, so only garment pixels get painted. If `hero-image.png` is replaced with a different photo, the polygon points need redrawing.

This uses an inline SVG `<mask>` instead of CSS `mask-image: url(...)` because CSS image masks are blocked when the page is opened from `file://`.

## To replace before launch

- **Logo:** `assets/logo.png` is used everywhere (nav, footer, favicon). It's the supplied logo, but check that it's the final version. A smaller export (about 400px) or an SVG would be lighter.
- **Prices:** every item has `price: null` in `js/data.js`, which renders `₹ XXXX` on cards and `₹ X,XXX` on the product page. Set a number to show a real price.
- **Accessory names:** the design only says "T-SHIRT NAME". The four names in `ACCESSORIES` are placeholders.
- **Accessory and pants copy:** the taglines, descriptions and specs for pants and accessories were written to fill the layout. Only the Heaven Calls tee copy comes from the design.
- **Sizes:** all "Available Sizes" values are placeholders.
- **Contact details:** `CONTACT` at the top of `js/data.js` holds the WhatsApp number (`91XXXXXXXXXX`), Instagram URL and email. The footer links and BUY NOW use these. The HTML `href`s are fallbacks with the same placeholders.
- **Footer white box:** `<div class="footer-slot">` is an empty placeholder for a store map embed or a QR code.
- **About page copy:** placeholder paragraphs in `about.html`.
- **Cart:** ADD TO CART only saves to `localStorage` (`tc_cart`) and updates the `CART (n)` count. There's no cart page or checkout yet.

## Performance notes

- The product and accessory PNGs are 1–1.5k px and about 1–2 MB each. For production, convert them to WebP at about 800px wide. Cards display them at about 300px.
- `hero-image.png` (2.1 MB) and `your-fit-your-rules-image.png` (1.9 MB) would also benefit from WebP or AVIF versions.
- The Figma design exports (`assets/*-figma-design-image.png`, about 86 MB) are gitignored. They're reference only and no page uses them, so they live on the designer's machine, not in the repo.
