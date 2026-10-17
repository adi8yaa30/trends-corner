/* =========================================================
   Trend Corner — nav, card rendering, product page,
   cart, buy-now, filters and section reveal.
   Depends on js/data.js being loaded first.
   ========================================================= */
(function () {
  'use strict';

  const ALL_ITEMS = PRODUCTS.concat(ACCESSORIES);
  const CART_KEY = 'tc_cart';

  /* ---------- helpers ---------- */

  function escapeHTML(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function findItem(id) {
    return ALL_ITEMS.find(function (item) { return item.id === id; });
  }

  // Cards use "₹ XXXX"; the product page uses "₹ X,XXX".
  function formatPrice(price, long) {
    if (price == null) return long ? '₹ X,XXX' : '₹ XXXX';
    return '₹ ' + Number(price).toLocaleString('en-IN');
  }

  function whatsappLink(text) {
    const base = 'https://wa.me/' + CONTACT.whatsappNumber;
    return text ? base + '?text=' + encodeURIComponent(text) : base;
  }

  /* ---------- contact links (footer) ---------- */

  function syncContactLinks() {
    const hrefs = {
      instagram: CONTACT.instagram,
      whatsapp: whatsappLink(),
      email: 'mailto:' + CONTACT.email,
    };
    document.querySelectorAll('[data-contact]').forEach(function (a) {
      const href = hrefs[a.dataset.contact];
      if (href) a.href = href;
    });
  }

  /* ---------- mobile nav ---------- */

  function initNav() {
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.getElementById('nav-menu');
    if (!toggle || !menu) return;

    function setOpen(open) {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.textContent = open ? 'CLOSE' : 'MENU';
      menu.classList.toggle('is-open', open);
    }

    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) {
        setOpen(false);
        toggle.focus();
      }
    });
    // Close when a link inside is used (e.g. same-page anchors).
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });
  }

  /* ---------- cards ---------- */

  function cardHTML(item) {
    const href = 'product.html?id=' + encodeURIComponent(item.id);
    const name = escapeHTML(item.name);
    return (
      '<article class="card">' +
        '<a class="card-link" href="' + href + '">' +
          '<h3 class="card-name">' + name + '</h3>' +
          '<div class="card-media">' +
            '<img src="' + item.img + '" alt="' + name + '" width="600" height="600" loading="lazy" decoding="async">' +
          '</div>' +
        '</a>' +
        '<div class="card-foot">' +
          '<div class="card-actions">' +
            '<button type="button" class="btn btn-sm" data-action="buy" data-id="' + item.id + '">BUY NOW</button>' +
            '<button type="button" class="btn btn-sm" data-action="cart" data-id="' + item.id + '">ADD TO CART</button>' +
          '</div>' +
          '<span class="card-price">' + formatPrice(item.price) + '</span>' +
        '</div>' +
      '</article>'
    );
  }

  function renderGrid(el, items) {
    el.innerHTML = items.map(cardHTML).join('');
  }

  // <div data-grid="products|accessories|tee|pants"> is filled from data.
  function renderGrids() {
    document.querySelectorAll('[data-grid]').forEach(function (el) {
      const key = el.dataset.grid;
      let items;
      if (key === 'products') items = PRODUCTS;
      else if (key === 'accessories') items = ACCESSORIES;
      else items = PRODUCTS.filter(function (p) { return p.type === key; });
      renderGrid(el, items);
    });
  }

  /* ---------- products page filter ---------- */

  function initFilter() {
    const bar = document.querySelector('[data-filter-bar]');
    const grid = document.querySelector('[data-filter-grid]');
    if (!bar || !grid) return;

    bar.addEventListener('click', function (e) {
      const btn = e.target.closest('[data-filter]');
      if (!btn) return;
      const type = btn.dataset.filter;
      bar.querySelectorAll('[data-filter]').forEach(function (b) {
        b.setAttribute('aria-pressed', String(b === btn));
      });
      const items = type === 'all' ? PRODUCTS : PRODUCTS.filter(function (p) { return p.type === type; });
      renderGrid(grid, items);
    });
  }

  /* ---------- cart + toast ---------- */

  function readCart() {
    try {
      const raw = localStorage.getItem(CART_KEY);
      const cart = raw ? JSON.parse(raw) : [];
      return Array.isArray(cart) ? cart : [];
    } catch (err) {
      return [];
    }
  }

  function writeCart(cart) {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch (err) {
      /* storage unavailable (private mode etc.) — count still updates for this page */
    }
  }

  let memoryCart = null; // fallback when localStorage is blocked

  function addToCart(id) {
    const cart = memoryCart || readCart();
    const line = cart.find(function (l) { return l.id === id; });
    if (line) line.qty += 1;
    else cart.push({ id: id, qty: 1 });
    writeCart(cart);
    memoryCart = cart;
    updateCartCount(cart);
    showToast('ADDED TO CART');
    // TODO: cart page / checkout flow. For now the cart only lives in localStorage.
  }

  function updateCartCount(cart) {
    const count = (cart || readCart()).reduce(function (n, l) { return n + (Number(l.qty) || 0); }, 0);
    document.querySelectorAll('[data-cart-count]').forEach(function (el) {
      el.textContent = count;
    });
  }

  let toastTimer;
  function showToast(msg) {
    let toast = document.querySelector('.toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast';
      toast.setAttribute('role', 'status');
      toast.setAttribute('aria-live', 'polite');
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('is-visible'); }, 2000);
  }

  function buyNow(id) {
    const item = findItem(id);
    if (!item) return;
    window.open(whatsappLink('Hi Trend Corner, I want to buy: ' + item.name), '_blank', 'noopener');
  }

  function initActions() {
    document.addEventListener('click', function (e) {
      const btn = e.target.closest('[data-action]');
      if (!btn) return;
      const id = btn.dataset.id;
      if (btn.dataset.action === 'cart') addToCart(id);
      else if (btn.dataset.action === 'buy') buyNow(id);
    });
  }

  /* ---------- product page ---------- */

  function initProductPage() {
    const root = document.querySelector('[data-product-page]');
    if (!root) return;

    const id = new URLSearchParams(window.location.search).get('id');
    const item = findItem(id) || PRODUCTS[0];
    const type = item.type || 'tee';
    const copy = DEFAULT_COPY[type] || DEFAULT_COPY.tee;
    const labels = TYPE_LABELS[type] || TYPE_LABELS.tee;
    const tagline = (item.tagline || copy.tagline).split(' / ');
    const specs = item.specs || copy.specs;

    document.title = item.name + ' — Trend Corner';
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', item.name + ' from Trend Corner, streetwear from Silapathar, Assam.');

    function set(sel, text) {
      const el = root.querySelector(sel);
      if (el) el.textContent = text;
    }

    set('[data-p="title"]', item.name);
    set('[data-p="about-label"]', labels.about);
    set('[data-p="about"]', item.about || copy.about);
    set('[data-p="price"]', formatPrice(item.price, true));
    set('[data-p="specs-label"]', labels.specs);

    root.querySelector('[data-p="tagline"]').innerHTML = tagline.map(escapeHTML).join('<br>');
    root.querySelector('[data-p="specs"]').innerHTML = specs.map(function (s) {
      return '<li>' + escapeHTML(s[0]) + ': ' + escapeHTML(s[1]) + '</li>';
    }).join('');

    const img = root.querySelector('[data-p="img"]');
    img.src = item.img;
    img.alt = item.name;

    root.querySelectorAll('[data-action]').forEach(function (b) { b.dataset.id = item.id; });

    // Similar: same type first, then top up from everything else.
    const similarTitle = document.querySelector('[data-p="similar-title"]');
    const similarGrid = document.querySelector('[data-p="similar"]');
    if (similarTitle) similarTitle.textContent = labels.similar;
    if (similarGrid) {
      const others = ALL_ITEMS.filter(function (i) { return i.id !== item.id; });
      const same = others.filter(function (i) { return (i.type || 'tee') === type; });
      const rest = others.filter(function (i) { return (i.type || 'tee') !== type; });
      renderGrid(similarGrid, same.concat(rest).slice(0, 4));
    }
  }

  /* ---------- section reveal ---------- */

  function initReveal() {
    // Hidden reveal state only applies once JS has got this far,
    // so a script error earlier never leaves content invisible.
    document.documentElement.classList.add('js');
    const els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------- boot ---------- */

  syncContactLinks();
  initNav();
  renderGrids();
  initFilter();
  initProductPage();
  initActions();
  updateCartCount();
  initReveal();
})();
