const CONFIG = {
  // Replace this with the client's WhatsApp number.
  // Use international format WITHOUT +, spaces or dashes.
  whatsappNumber: "2348000000000",
  currency: "₦"
};

const grid = document.getElementById("productGrid");
const emptyState = document.getElementById("emptyState");
const searchInput = document.getElementById("searchInput");
const filters = [...document.querySelectorAll(".filter")];
const cartDrawer = document.getElementById("cartDrawer");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartCountLarge = document.getElementById("cartCountLarge");
const cartTotal = document.getElementById("cartTotal");
const toast = document.getElementById("toast");

let activeFilter = "all";
let cart = JSON.parse(localStorage.getItem("odg_cart") || "[]");

const money = n => `${CONFIG.currency}${Number(n).toLocaleString("en-NG")}`;

function filteredProducts() {
  const query = searchInput.value.trim().toLowerCase();
  return PRODUCTS.filter(p => {
    const categoryMatch = activeFilter === "all" || p.category === activeFilter || (activeFilter === "jerseys" && p.category !== "training");
    const text = `${p.name} ${p.category} ${p.description}`.toLowerCase();
    return categoryMatch && (!query || text.includes(query));
  });
}

function renderProducts() {
  const list = filteredProducts();
  grid.innerHTML = "";
  emptyState.hidden = list.length !== 0;

  list.forEach((p, index) => {
    const card = document.createElement("article");
    card.className = "product";
    card.style.animationDelay = `${Math.min(index * 45, 280)}ms`;
    card.innerHTML = `
      <div class="product-image">
        <img src="${p.image}" alt="${escapeHtml(p.name)}" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='grid'">
        <div class="product-fallback" style="display:none"><span>ODG<br>JERSEYS</span></div>
        <span class="badge">${escapeHtml(p.label || "ODG SELECT")}</span>
      </div>
      <div class="product-info">
        <div class="product-category">${prettyCategory(p.category)}</div>
        <h3>${escapeHtml(p.name)}</h3>
        <div class="product-bottom">
          <span class="price">${money(p.price)}</span>
          <button class="add" aria-label="Add ${escapeHtml(p.name)} to cart" data-add="${p.id}">+</button>
        </div>
      </div>`;
    grid.appendChild(card);
  });
}

function prettyCategory(c) {
  return c.split("-").map(x => x[0].toUpperCase() + x.slice(1)).join(" ");
}
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
}
function saveCart(){ localStorage.setItem("odg_cart", JSON.stringify(cart)); }
function addToCart(id){
  const p = PRODUCTS.find(x => x.id === Number(id));
  if (!p) return;
  const existing = cart.find(x => x.id === p.id);
  if (existing) existing.qty += 1;
  else cart.push({id:p.id, qty:1});
  saveCart(); renderCart(); showToast(`${p.name} added to cart`);
}
function removeFromCart(id){
  cart = cart.filter(x => x.id !== Number(id));
  saveCart(); renderCart();
}
function renderCart(){
  cartItems.innerHTML = "";
  let total = 0, count = 0;
  cart.forEach(item => {
    const p = PRODUCTS.find(x => x.id === item.id);
    if (!p) return;
    count += item.qty; total += p.price * item.qty;
    const row = document.createElement("div");
    row.className = "cart-row";
    row.innerHTML = `
      <div class="cart-thumb"><img src="${p.image}" alt="" onerror="this.style.opacity='.15'"></div>
      <div><h4>${escapeHtml(p.name)} × ${item.qty}</h4><p>${money(p.price * item.qty)}</p></div>
      <button class="remove" data-remove="${p.id}" aria-label="Remove item">×</button>`;
    cartItems.appendChild(row);
  });
  if (!cart.length) cartItems.innerHTML = `<div style="text-align:center;color:#667169;padding:70px 0;font-size:12px">Your cart is empty.<br><br>Add a jersey to get started.</div>`;
  cartCount.textContent = count;
  cartCountLarge.textContent = count;
  cartTotal.textContent = money(total);
}
function openCart(){cartDrawer.classList.add("open");cartDrawer.setAttribute("aria-hidden","false");}
function closeCart(){cartDrawer.classList.remove("open");cartDrawer.setAttribute("aria-hidden","true");}
function showToast(text){toast.textContent=text;toast.classList.add("show");setTimeout(()=>toast.classList.remove("show"),1800)}

grid.addEventListener("click", e => {
  const btn = e.target.closest("[data-add]");
  if (btn) addToCart(btn.dataset.add);
});
cartItems.addEventListener("click", e => {
  const btn = e.target.closest("[data-remove]");
  if (btn) removeFromCart(btn.dataset.remove);
});
filters.forEach(btn => btn.addEventListener("click", () => {
  filters.forEach(x => x.classList.remove("active"));
  btn.classList.add("active");
  activeFilter = btn.dataset.filter;
  renderProducts();
}));
searchInput.addEventListener("input", renderProducts);
document.getElementById("openCart").addEventListener("click", openCart);
document.getElementById("closeCart").addEventListener("click", closeCart);
document.getElementById("closeCartBtn").addEventListener("click", closeCart);
document.addEventListener("keydown", e => {
  if (e.key === "/" && document.activeElement !== searchInput) { e.preventDefault(); searchInput.focus(); }
  if (e.key === "Escape") closeCart();
});
document.getElementById("whatsappOrder").addEventListener("click", () => {
  if (!cart.length) return showToast("Your cart is empty");
  let total = 0;
  const lines = cart.map(item => {
    const p = PRODUCTS.find(x => x.id === item.id);
    total += p.price * item.qty;
    return `• ${p.name} × ${item.qty} — ${money(p.price * item.qty)}`;
  });
  const message = `Hello ODG_JERSEYS 👋%0A%0AI'd like to order:%0A${encodeURIComponent(lines.join("\n"))}%0A%0ATotal: ${encodeURIComponent(money(total))}%0A%0APlease confirm availability and delivery details.`;
  window.open(`https://wa.me/${CONFIG.whatsappNumber}?text=${message}`, "_blank", "noopener,noreferrer");
});

document.addEventListener("mousemove", e => {
  const glow = document.querySelector(".cursor-glow");
  if (glow) { glow.style.left = `${e.clientX}px`; glow.style.top = `${e.clientY}px`; }
});

renderProducts();
renderCart();
