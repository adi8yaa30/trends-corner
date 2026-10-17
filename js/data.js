/* =========================================================
   Trend Corner — product + accessory data
   price: null renders as a placeholder (₹ XXXX / ₹ X,XXX).
   Set a number (e.g. 1299) to show a real price.
   ========================================================= */

/* Contact details. The footer links in every HTML file are synced from these on load.
   whatsappNumber and email are still placeholders — replace before launch. */
const CONTACT = {
  whatsappNumber: '91XXXXXXXXXX',            // country code + number, digits only
  instagram:      'https://www.instagram.com/trendcorner_mes/',
  email:          'hello@trendcorner.in',
  maps:           'https://www.google.com/maps/place/TREND+CORNER/@27.6363933,94.7112942,17z/data=!4m6!3m5!1s0x3740ed8d0293919b:0x9f9eab0425245c39!8m2!3d27.6363933!4d94.7112942!16s%2Fg%2F11y7kydn2f',
};

const PRODUCTS = [
  { id: 'heaven-calls-tee',      name: 'Heaven Calls Graphic Tee',      type: 'tee',   img: 'assets/products/1.png', price: null },
  { id: 'gothic-skull-tee',      name: 'Gothic Skull Oversized Tee',    type: 'tee',   img: 'assets/products/2.png', price: null },
  { id: 'distressed-star-tee',   name: 'Distressed Star Graphic Tee',   type: 'tee',   img: 'assets/products/3.png', price: null },
  { id: 'dark-gothic-tee',       name: 'Dark Gothic Graphic Tee',       type: 'tee',   img: 'assets/products/4.png', price: null },
  {
    id: 'shadow-grey-cargo', name: 'Shadow Grey Cargo Pants', type: 'pants', img: 'assets/products/5.png', price: null,
    tagline: 'BUILT FOR THE STREET. / CUT FOR COMFORT.',
    about: 'A washed shadow-grey cargo with a wide, relaxed leg and deep utility pockets. Drawcord hems let you stack them over sneakers or cinch them up. Easy to throw on, hard to ignore.',
    specs: [['Colour', 'Shadow Grey'], ['Fit', 'Relaxed / Wide Leg'], ['Waist', 'Elastic with Drawcord'], ['Pockets', '6-Pocket Cargo'], ['Hem', 'Adjustable Toggle'], ['Style', 'Streetwear / Utility'], ['Available Sizes', '28, 30, 32, 34 (placeholder)']],
  },
  {
    id: 'olive-utility-cargo', name: 'Olive Utility Cargo Pants', type: 'pants', img: 'assets/products/6.png', price: null,
    tagline: 'MADE TO MOVE. / MADE TO LAST.',
    about: 'Military-inspired olive cargos with a loose, parachute-style drape and oversized side pockets. Pair them with a black graphic tee and you are done.',
    specs: [['Colour', 'Olive Green'], ['Fit', 'Loose / Parachute Style'], ['Waist', 'Elastic with Drawcord'], ['Pockets', '6-Pocket Cargo'], ['Hem', 'Adjustable Toggle'], ['Style', 'Streetwear / Utility'], ['Available Sizes', '28, 30, 32, 34 (placeholder)']],
  },
  {
    id: 'desert-khaki-cargo', name: 'Desert Khaki Cargo Pants', type: 'pants', img: 'assets/products/7.png', price: null,
    tagline: 'NEUTRAL TONES. / LOUD ENERGY.',
    about: 'A desert-khaki cargo with a baggy straight leg and pleated knee panels. The neutral base works with everything in the rotation and still looks deliberate.',
    specs: [['Colour', 'Desert Khaki'], ['Fit', 'Baggy / Straight Leg'], ['Waist', 'Elastic with Drawcord'], ['Pockets', '6-Pocket Cargo'], ['Hem', 'Adjustable Toggle'], ['Style', 'Streetwear / Casual'], ['Available Sizes', '28, 30, 32, 34 (placeholder)']],
  },
  {
    id: 'midnight-baggy-jeans', name: 'Midnight Washed Baggy Jeans', type: 'pants', img: 'assets/products/8.png', price: null,
    tagline: 'WASHED DARK. / WORN LOUD.',
    about: 'Heavy washed-black denim in a baggy, low-slung cut with paneled seams down the leg. Built to stack over high-tops and fade the more you wear them.',
    specs: [['Colour', 'Midnight Washed Black'], ['Fit', 'Baggy / Wide Leg'], ['Fabric', 'Heavyweight Denim'], ['Rise', 'Mid Rise'], ['Closure', 'Zip Fly with Button'], ['Style', 'Streetwear / Denim'], ['Available Sizes', '28, 30, 32, 34 (placeholder)']],
  },
];

// Accessory names are NOT in the design (it says "T-SHIRT NAME"). These are placeholders; keep them easy to change.
const ACCESSORIES = [
  { id: 'skull-link-chain',  name: 'Skull Link Wallet Chain',   type: 'accessory', img: 'assets/accessories/1.png', price: null },
  { id: 'web-pendant-chain', name: 'Spider Web Pendant Chain',  type: 'accessory', img: 'assets/accessories/2.png', price: null },
  { id: 'box-link-chain',    name: 'Box Link Knuckle Chain',    type: 'accessory', img: 'assets/accessories/3.png', price: null },
  { id: 'cross-drop-chain',  name: 'Cross Drop Chain',          type: 'accessory', img: 'assets/accessories/4.png', price: null },
];

/* Fallback copy, used when an item has no tagline / about / specs of its own. */
const DEFAULT_COPY = {
  tee: {
    tagline: 'FAITH NEVER FADES. / STYLE NEVER FOLLOWS.',
    about: 'Not your everyday graphic tee. Featuring a bold gothic-inspired print, washed-black finish and relaxed silhouette, the Heaven Calls Tee brings an edge to your everyday rotation. Made to stand out. Styled your way.',
    specs: [['Colour', 'Washed Black'], ['Fit', 'Relaxed / Oversized Style'], ['Neckline', 'Crew Neck'], ['Sleeves', 'Short Sleeves'], ['Design', 'Gothic Front Graphic'], ['Style', 'Streetwear / Casual'], ['Available Sizes', 'S, M, L, XL (placeholder)']],
  },
  pants: {
    tagline: 'BUILT FOR THE STREET. / CUT FOR COMFORT.',
    about: 'A relaxed, wide-leg cargo with deep utility pockets and adjustable hems. Made to stand out. Styled your way.',
    specs: [['Fit', 'Relaxed / Wide Leg'], ['Waist', 'Elastic with Drawcord'], ['Pockets', '6-Pocket Cargo'], ['Style', 'Streetwear / Utility'], ['Available Sizes', '28, 30, 32, 34 (placeholder)']],
  },
  accessory: {
    tagline: 'THE DETAILS. / DONE LOUD.',
    about: 'Heavy metal hardware to finish the fit. Clip it to a belt loop, layer it over a tee or wear it solo. Small piece, big statement.',
    specs: [['Material', 'Stainless Steel (placeholder)'], ['Finish', 'Polished Silver'], ['Length', 'Placeholder'], ['Clasp', 'Lobster Clasp'], ['Style', 'Streetwear / Gothic']],
  },
};

/* Section labels per item type. */
const TYPE_LABELS = {
  tee:       { about: 'About the Tee',   specs: 'Tee Specs', similar: 'SIMILAR TEES' },
  pants:     { about: 'About the Fit',   specs: 'Fit Specs', similar: 'SIMILAR FITS' },
  accessory: { about: 'About the Piece', specs: 'Specs',     similar: 'SIMILAR PIECES' },
};
