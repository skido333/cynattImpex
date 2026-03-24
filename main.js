// ============================================================
//  CYNATT IMPEX SUPERMARKET — Main JavaScript
//  ICT233 Web Technologies and Design, 2025/2026
// ============================================================


// ============================================================
//  NAV & FOOTER INJECTOR
// ============================================================
(function () {
  const navHTML = `
<nav>
  <div class="nav-inner">
    <a href="index.html" class="nav-logo">
      <div class="logo-icon">🛒</div>
      <div class="logo-text">
        <strong>Cynaf Impex</strong>
        <span>Supermarket</span>
      </div>
    </a>
    <ul class="nav-links">
      <li><a href="index.html">Home</a></li>
      <li><a href="products.html">Products</a></li>
      <li><a href="about.html">About</a></li>
      <li><a href="contact.html">Contact</a></li>
    </ul>
    <div class="nav-actions">
      <a href="login.html" class="btn btn-outline" style="padding:8px 18px;font-size:.88rem;">Login</a>
      <a href="cart.html" class="cart-btn" aria-label="View cart">
        🛒
        <span class="cart-count" style="display:none;">0</span>
      </a>
      <button class="hamburger" aria-label="Open menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
  <div class="mobile-menu">
    <a href="index.html">Home</a>
    <a href="products.html">Products</a>
    <a href="about.html">About</a>
    <a href="contact.html">Contact</a>
    <a href="login.html">Login / Register</a>
    <a href="cart.html">Cart 🛒</a>
  </div>
</nav>`;

  const footerHTML = `
<footer>
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:4px;">
          <span style="font-size:1.8rem;">🛒</span>
          <span style="font-family:'Playfair Display',serif;font-size:1.3rem;color:#fff;font-weight:700;">Cynatt Impex</span>
        </div>
        <p>Your trusted supermarket in Kumasi, Ghana. Quality products, fair prices, and excellent service — every day.</p>
      </div>
      <div class="footer-col">
        <h4>Quick Links</h4>
        <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="products.html">Products</a></li>
          <li><a href="about.html">About Us</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Account</h4>
        <ul>
          <li><a href="login.html">Login</a></li>
          <li><a href="login.html#register">Register</a></li>
          <li><a href="cart.html">My Cart</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Contact</h4>
        <ul>
          <li><a href="#">📍 Kumasi, Ghana</a></li>
          <li><a href="tel:+233544735234">📞 +233 544 735 234</a></li>
          <li><a href="mailto:info@cynattimpex.com">✉️ info@cynafimpex.com</a></li>
        </ul>
      </div>
    </div>
  </div>
  <div class="footer-bottom">
    <div class="container">
      © 2026 Cynatt Impex Supermarket · All rights reserved · ICT233 Project
    </div>
  </div>
</footer>
<div id="toast"></div>`;

  document.body.insertAdjacentHTML('afterbegin', navHTML);
  document.body.insertAdjacentHTML('beforeend', footerHTML);
})();


// ── CART & SHARED UTILITIES ──────────────────────────────────
// ===== CYNATT IMPEX — SHARED JAVASCRIPT =====

// ---- Cart State ----
function getCart() {
  return JSON.parse(localStorage.getItem('cynatt_cart') || '[]');
}
function saveCart(cart) {
  localStorage.setItem('cynatt_cart', JSON.stringify(cart));
  updateCartBadge();
}
function addToCart(id, name, price, emoji) {
  const cart = getCart();
  const idx = cart.findIndex(i => i.id === id);
  if (idx > -1) cart[idx].qty++;
  else cart.push({ id, name, price, emoji, qty: 1 });
  saveCart(cart);
  showToast(`${emoji} ${name} added to cart!`);
}
function updateCartBadge() {
  const cart = getCart();
  const total = cart.reduce((s, i) => s + i.qty, 0);
  document.querySelectorAll('.cart-count').forEach(el => {
    el.textContent = total;
    el.style.display = total > 0 ? 'flex' : 'none';
  });
}

// ---- Toast ----
function showToast(msg) {
  let toast = document.getElementById('toast');
  if (!toast) { toast = document.createElement('div'); toast.id = 'toast'; document.body.appendChild(toast); }
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => toast.classList.remove('show'), 2800);
}

// ---- Mobile Menu ----
function initNav() {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
  }
  // Mark active link
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });
  updateCartBadge();
}

document.addEventListener('DOMContentLoaded', initNav);


// ── HOME PAGE ────────────────────────────────────────────────
// home.js — featured products
const featuredProducts = [
  { id: 1, image: 'milk.jpg', name: 'Fresh Milk (1L)', cat: 'Dairy', price: 'GH₵ 8.00', tag: 'Fresh', rawPrice: 8 },
  { id: 2, image: 'bread.jpg', name: 'Sliced Bread', cat: 'Bakery', price: 'GH₵ 6.50', tag: 'Popular', rawPrice: 6.5 },
  { id: 3, image: 'apple.jpg', name: 'Red Apples (bag)', cat: 'Produce', price: 'GH₵ 12.00', tag: 'Fresh', rawPrice: 12 },
  { id: 4, image: 'kalypo.jpg', name: 'Fruit Juice (250ml)', cat: 'Beverages', price: 'GH₵ 5.00', tag: 'Deal', rawPrice: 5 },
  { id: 5, image: 'egg.jpg', name: 'Eggs (tray of 30)', cat: 'Dairy', price: 'GH₵ 30.00', tag: 'Best Value', rawPrice: 30 },
  { id: 6, image: 'broom.jpg', name: 'Broom & Dustpan', cat: 'Household', price: 'GH₵ 18.00', tag: null, rawPrice: 18 },
  { id: 7, image: 'handlotion.jpg', name: 'Hand Lotion (200ml)', cat: 'Personal Care', price: 'GH₵ 14.00', tag: null, rawPrice: 14 },
  { id: 8, image: 'chocolate.jpg', name: 'Chocolate Bar', cat: 'Snacks', price: 'GH₵ 4.50', tag: 'Deal', rawPrice: 4.5 },
];

const container = document.getElementById('featured-products');
if (container) {
  container.innerHTML = featuredProducts.map(p => `
    <div class="prod-card">
      ${p.tag ? `<span class="prod-tag">${p.tag}</span>` : ''}
      <div class="prod-img">
      <img src="${p.image}" alt="${p.name}">
      </div>
      <div class="prod-name">${p.name}</div>
      <div class="prod-cat">${p.cat}</div>
      <div class="prod-footer">
        <span class="prod-price">${p.price}</span>
       <button class="add-btn" onclick="addToCart(${p.id}, '${p.name}', ${p.rawPrice}, '🛒')">+ Add</button>
      </div>
    </div>
  `).join('');
}


// ── PRODUCTS PAGE ────────────────────────────────────────────
// products.js
const ALL_PRODUCTS = [
  { id:1,  image:'milk.jpg', name:'Fresh Milk (1L)',         cat:'Dairy',        price:8.00,  tag:'Fresh' },
  { id:3, image:'apple.jpg', name:'Red Apples (bag)',         cat:'Produce',      price:12.00, tag:'Fresh' },
  { id:4, image:'kalypoe.jpg', name:'Fruit Juice (250ml)',      cat:'Beverages',    price:5.00,  tag:'Deal' },
  { id:5, image :'egge.jpg', name:'Eggs (tray of 30)',        cat:'Dairy',        price:30.00, tag:'Best Value' },
  { id:6,  image:'broom.jpg', name:'Broom & Dustpan',         cat:'Household',    price:18.00, tag:null },
  { id:7,  image:'handlotion.jpg', name:'Hand Lotion (200ml)',      cat:'Personal Care',price:14.00, tag:null },
  { id:8,  image:'chocolate.jpg', name:'Chocolate Bar',            cat:'Snacks',       price:4.50,  tag:'Deal' },
  { id:9,  image:'carrot.jpg', name:'Carrots (500g)',           cat:'Produce',      price:5.00,  tag:'Fresh' },
  { id:10, image:'tomato.jpg', name:'Tomatoes (bag)',           cat:'Produce',      price:8.00,  tag:'Fresh' },
  { id:11, image:'cheese.jpg', name:'Cheese Slices (200g)',     cat:'Dairy',        price:22.00, tag:null },
  { id:12, image:'coke.jpg', name:'Coca-Cola (600ml)',        cat:'Beverages',    price:6.00,  tag:null },
  { id:13, image:'Tasty-tome.jpg', name:'Canned Tomatoes',          cat:'Canned',       price:7.00,  tag:null },
  { id:14, image:'awake.jpg', name:'Bottled Water (1.5L)',     cat:'Beverages',    price:3.00,  tag:null },
  { id:15, image:'biscuit.jpg', name:'Biscuits (pack)',          cat:'Snacks',       price:6.00,  tag:null },
  { id:16, image:'liquidsoap.jpg', name:'Washing Up Liquid (1L)',   cat:'Household',    price:11.00, tag:null },
  { id:17, image:'barsoap.jpg', name:'Bar Soap (3-pack)',        cat:'Personal Care',price:9.00,  tag:'Deal' },
  { id:18, image:'bananabunch.jpg', name:'Bananas (bunch)',          cat:'Produce',      price:7.00,  tag:'Fresh' },
  { id:19, image:'groundnut.jpg', name:'Groundnuts (250g)',        cat:'Snacks',       price:5.50,  tag:null },
  { id:20, image:'sardine.jpg', name:'Sardines (can)',           cat:'Canned',       price:8.50,  tag:null },
  { id:21, image:'milo.jpg', name:'Milo (400g)',              cat:'Beverages',    price:28.00, tag:'Popular' },
  { id:22, image:'Troll.jpg', name:'Toilet Roll (6-pack)',     cat:'Household',    price:16.00, tag:null },
  { id:23, image:'tomatopaste.jpg', name:'Tomato Paste (tin)',       cat:'Canned',       price:4.50,  tag:null },
  { id:24, image:'gel.jpg', name:'Shower Gel (250ml)',       cat:'Personal Care',price:16.00, tag:null },
];

let currentCat = 'all';
let currentSearch = '';
let currentSort = 'default';

function renderProducts() {
  let list = [...ALL_PRODUCTS];
  if (currentCat !== 'all') list = list.filter(p => p.cat === currentCat);
  if (currentSearch) list = list.filter(p => p.name.toLowerCase().includes(currentSearch.toLowerCase()));
  if (currentSort === 'price-asc') list.sort((a,b) => a.price - b.price);
  else if (currentSort === 'price-desc') list.sort((a,b) => b.price - a.price);
  else if (currentSort === 'name') list.sort((a,b) => a.name.localeCompare(b.name));

  const grid = document.getElementById('products-grid');
  const count = document.getElementById('results-count');
  count.textContent = `Showing ${list.length} product${list.length!==1?'s':''}`;

  if (!list.length) {
    grid.innerHTML = '<div class="no-results">😕 No products found. Try a different search.</div>';
    return;
  }
  grid.innerHTML = list.map(p => `
    <div class="prod-card">
      ${p.tag ? `<span class="prod-tag">${p.tag}</span>` : ''}
      <div class="prod-image">
      <img src="${p.image}" alt="${p.name}">
      </div>
      <div class="prod-name">${p.name}</div>
      <div class="prod-cat">${p.cat}</div>
      <div class="prod-footer">
        <span class="prod-price">GH₵ ${p.price.toFixed(2)}</span>
        <button class="add-btn" onclick="addToCart(${p.id},'${p.name.replace(/'/g,"\\'")}',${p.price},'${p.emoji}')">+ Add</button>
      </div>
    </div>
  `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  // Category filter
  document.getElementById('filter-cats').addEventListener('click', e => {
    const btn = e.target.closest('.fcat');
    if (!btn) return;
    document.querySelectorAll('.fcat').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentCat = btn.dataset.cat;
    renderProducts();
  });
  // Search
  document.getElementById('search-input').addEventListener('input', e => {
    currentSearch = e.target.value;
    renderProducts();
  });
  // Sort
  document.getElementById('sort-sel').addEventListener('change', e => {
    currentSort = e.target.value;
    renderProducts();
  });
  // URL param for category
  const params = new URLSearchParams(window.location.search);
  const catParam = params.get('cat');
  if (catParam) {
    const match = document.querySelector(`.fcat[data-cat="${catParam}"]`);
    if (match) { match.click(); return; }
  }
  renderProducts();
});



