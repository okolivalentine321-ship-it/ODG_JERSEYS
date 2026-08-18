const CONFIG = {
  // WhatsApp number in international format WITHOUT +, spaces or dashes.
  whatsappNumber: "2349168815790",
  currency: "₦"
};

// ================================
// DOM ELEMENTS
// ================================

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

const sizeModal = document.getElementById("sizeModal");
const sizeProductName = document.getElementById("sizeProductName");
const sizeProductPrice = document.getElementById("sizeProductPrice");
const sizeOptions = [
  ...document.querySelectorAll("#sizeOptions button")
];

const sizeClose = document.getElementById("sizeClose");
const sizeBackdrop = document.getElementById("sizeBackdrop");
const sizeOrder = document.getElementById("sizeOrder");


// ================================
// STATE
// ================================

let activeFilter = "all";
let selectedProduct = null;
let selectedSize = null;

let cart = JSON.parse(
  localStorage.getItem("odg_cart") || "[]"
);


// ================================
// MONEY
// ================================

const money = number =>
  `${CONFIG.currency}${Number(number).toLocaleString("en-NG")}`;


// ================================
// SECURITY / TEXT HELPERS
// ================================

function escapeHtml(value) {
  return String(value).replace(
    /[&<>"']/g,
    character => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    })[character]
  );
}


// ================================
// CATEGORY NAMES
// ================================

function prettyCategory(category) {
  const names = {
    club: "Club Jerseys",
    national: "National Jerseys",
    retro: "Retro Jerseys"
  };

  return (
    names[category] ||
    category
      .split("-")
      .map(word => word[0].toUpperCase() + word.slice(1))
      .join(" ")
  );
}


// ================================
// FILTER PRODUCTS
// ================================

function filteredProducts() {
  const query = searchInput.value.trim().toLowerCase();

  return PRODUCTS.filter(product => {

    const categoryMatch =
      activeFilter === "all" ||
      product.category === activeFilter;

    const text = `
      ${product.name}
      ${product.category}
      ${product.description || ""}
    `.toLowerCase();

    return (
      categoryMatch &&
      (!query || text.includes(query))
    );
  });
}


// ================================
// RENDER PRODUCTS
// ================================

function renderProducts() {
  const products = filteredProducts();

  grid.innerHTML = "";

  emptyState.hidden = products.length !== 0;

  products.forEach((product, index) => {

    const card = document.createElement("article");

    card.className = "product";

    card.style.animationDelay =
      `${Math.min(index * 45, 280)}ms`;

    card.innerHTML = `
      <div class="product-image">

        <img
          src="${product.image}"
          alt="${escapeHtml(product.name)}"
          loading="lazy"
          onerror="this.style.display='none'; this.nextElementSibling.style.display='grid'"
        >

        <div
          class="product-fallback"
          style="display:none"
        >
          <span>ODG<br>JERSEYS</span>
        </div>

        <span class="badge">
          ${escapeHtml(product.label || "ODG SELECT")}
        </span>

      </div>

      <div class="product-info">

        <div class="product-category">
          ${prettyCategory(product.category)}
        </div>

        <h3>
          ${escapeHtml(product.name)}
        </h3>

        <div class="product-trust">
          ✅ Premium Quality<br>
          ✅ Fast Delivery<br>
          ✅ Free VIP Discount Card Included<br>
          <span>
            Get 10% OFF your next order when you scan
            the card inside your package.
          </span>
        </div>

        <div class="product-bottom">

          <span class="price">
            ${money(product.price)}
          </span>

          <button
            class="add"
            aria-label="Add ${escapeHtml(product.name)} to cart"
            data-size-product="${product.id}"
          >
            +
          </button>

        </div>

      </div>
    `;

    grid.appendChild(card);
  });
}


// ================================
// CART STORAGE
// ================================

function saveCart() {
  localStorage.setItem(
    "odg_cart",
    JSON.stringify(cart)
  );
}


// ================================
// ADD TO CART
// ================================

function addToCart(id, size) {

  const product = PRODUCTS.find(
    item => item.id === Number(id)
  );

  if (!product) return;

  /*
    Same product + same size = increase quantity.

    Same product + different size = separate cart item.
  */

  const existing = cart.find(
    item =>
      item.id === product.id &&
      item.size === size
  );

  if (existing) {

    existing.qty += 1;

  } else {

    cart.push({
      id: product.id,
      size: size,
      qty: 1
    });

  }

  saveCart();
  renderCart();

  showToast(
    `${product.name} (${size}) added to cart`
  );
}


// ================================
// REMOVE CART ITEM
// ================================

function removeFromCart(index) {

  cart.splice(index, 1);

  saveCart();
  renderCart();
}


// ================================
// RENDER CART
// ================================

function renderCart() {

  cartItems.innerHTML = "";

  let total = 0;
  let count = 0;

  cart.forEach((item, index) => {

    const product = PRODUCTS.find(
      product => product.id === item.id
    );

    if (!product) return;

    const itemTotal =
      product.price * item.qty;

    total += itemTotal;
    count += item.qty;

    const row =
      document.createElement("div");

    row.className = "cart-row";

    row.innerHTML = `
      <div class="cart-thumb">

        <img
          src="${product.image}"
          alt=""
          onerror="this.style.opacity='.15'"
        >

      </div>

      <div>

        <h4>
          ${escapeHtml(product.name)}
          × ${item.qty}
        </h4>

        <p>
          Size: ${escapeHtml(item.size || "Not selected")}
        </p>

        <p>
          ${money(itemTotal)}
        </p>

      </div>

      <button
        class="remove"
        data-remove-index="${index}"
        aria-label="Remove item"
      >
        ×
      </button>
    `;

    cartItems.appendChild(row);
  });


  // Empty cart

  if (!cart.length) {

    cartItems.innerHTML = `
      <div
        style="
          text-align:center;
          color:#667169;
          padding:70px 0;
          font-size:12px;
        "
      >
        Your cart is empty.
        <br><br>
        Add a jersey to get started.
      </div>
    `;

  }


  cartCount.textContent = count;

  if (cartCountLarge) {
    cartCountLarge.textContent = count;
  }

  cartTotal.textContent = money(total);
}


// ================================
// OPEN CART
// ================================

function openCart() {

  cartDrawer.classList.add("open");

  cartDrawer.setAttribute(
    "aria-hidden",
    "false"
  );
}


// ================================
// CLOSE CART
// ================================

function closeCart() {

  cartDrawer.classList.remove("open");

  cartDrawer.setAttribute(
    "aria-hidden",
    "true"
  );
}


// ================================
// TOAST
// ================================

function showToast(text) {

  toast.textContent = text;

  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 1800);
}


// ================================
// SIZE MODAL
// ================================

function openSizeModal(id) {

  selectedProduct = PRODUCTS.find(
    product => product.id === Number(id)
  );

  if (!selectedProduct) return;

  selectedSize = null;

  sizeProductName.textContent =
    selectedProduct.name;

  sizeProductPrice.textContent =
    money(selectedProduct.price);

  sizeOptions.forEach(button => {
    button.classList.remove("active");
  });

  sizeModal.classList.add("open");
}


function closeSizeModal() {

  sizeModal.classList.remove("open");

  selectedProduct = null;
  selectedSize = null;
}


// ================================
// SIZE SELECTION
// ================================

sizeOptions.forEach(button => {

  button.addEventListener("click", () => {

    sizeOptions.forEach(option => {
      option.classList.remove("active");
    });

    button.classList.add("active");

    selectedSize =
      button.dataset.size;
  });

});


// ================================
// PRODUCT ADD BUTTON
// ================================

grid.addEventListener("click", event => {

  const button =
    event.target.closest("[data-size-product]");

  if (!button) return;

  openSizeModal(
    button.dataset.sizeProduct
  );

});


// ================================
// CART REMOVE BUTTON
// ================================

cartItems.addEventListener("click", event => {

  const button =
    event.target.closest("[data-remove-index]");

  if (!button) return;

  removeFromCart(
    Number(button.dataset.removeIndex)
  );

});


// ================================
// SIZE MODAL CLOSE
// ================================

if (sizeClose) {

  sizeClose.addEventListener(
    "click",
    closeSizeModal
  );

}

if (sizeBackdrop) {

  sizeBackdrop.addEventListener(
    "click",
    closeSizeModal
  );

}


// ================================
// ADD TO CART FROM SIZE MODAL
// ================================

if (sizeOrder) {

  sizeOrder.addEventListener(
    "click",
    () => {

      if (!selectedProduct) return;

      if (!selectedSize) {

        showToast(
          "Please select your size"
        );

        return;
      }

      addToCart(
        selectedProduct.id,
        selectedSize
      );

      closeSizeModal();

    }
  );

}


// ================================
// FILTER BUTTONS
// ================================

filters.forEach(button => {

  button.addEventListener(
    "click",
    () => {

      filters.forEach(filter => {
        filter.classList.remove("active");
      });

      button.classList.add("active");

      activeFilter =
        button.dataset.filter;

      renderProducts();

    }
  );

});


// ================================
// SEARCH
// ================================

searchInput.addEventListener(
  "input",
  renderProducts
);


// ================================
// CART OPEN / CLOSE BUTTONS
// ================================

const openCartButton =
  document.getElementById("openCart");

const closeCartButton =
  document.getElementById("closeCart");

const closeCartButton2 =
  document.getElementById("closeCartBtn");


if (openCartButton) {

  openCartButton.addEventListener(
    "click",
    openCart
  );

}

if (closeCartButton) {

  closeCartButton.addEventListener(
    "click",
    closeCart
  );

}

if (closeCartButton2) {

  closeCartButton2.addEventListener(
    "click",
    closeCart
  );

}


// ================================
// WHATSAPP CART CHECKOUT
// ================================

function checkoutCart() {

  if (!cart.length) {

    showToast(
      "Your cart is empty"
    );

    return;
  }

  let total = 0;

  let message =
    `Hello ODG_JERSEYS 👋\n\n` +
    `I'd like to order the following:\n\n`;


  cart.forEach((item, index) => {

    const product = PRODUCTS.find(
      product => product.id === item.id
    );

    if (!product) return;

    const itemTotal =
      product.price * item.qty;

    total += itemTotal;

    const imageUrl = new URL(
      product.image,
      window.location.href
    ).href;

    message +=
      `${index + 1}. ${product.name}\n` +
      `• Size: ${item.size || "Not selected"}\n` +
      `• Quantity: ${item.qty}\n` +
      `• Price: ${money(itemTotal)}\n` +
      `• Picture: ${imageUrl}\n\n`;

  });


  message +=
    `Total: ${money(total)}\n\n` +
    `Please confirm availability and delivery details.`;


  window.open(
    `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`,
    "_blank"
  );

}


// ================================
// FIND CART CHECKOUT BUTTON
// ================================

const checkoutButton =
  document.querySelector(
    "#checkoutWhatsApp, #whatsappCheckout, #checkoutBtn, .whatsapp-btn"
  );

if (checkoutButton) {

  checkoutButton.addEventListener(
    "click",
    checkoutCart
  );

}


// ================================
// KEYBOARD SHORTCUTS
// ================================

document.addEventListener(
  "keydown",
  event => {

    // "/" focuses search

    if (
      event.key === "/" &&
      document.activeElement !== searchInput
    ) {

      event.preventDefault();

      searchInput.focus();
    }


    // Escape closes cart and size modal

    if (event.key === "Escape") {

      closeCart();
      closeSizeModal();

    }

  }
);


// ================================
// CURSOR GLOW
// ================================

document.addEventListener(
  "mousemove",
  event => {

    const glow =
      document.querySelector(
        ".cursor-glow"
      );

    if (!glow) return;

    glow.style.left =
      `${event.clientX}px`;

    glow.style.top =
      `${event.clientY}px`;

  }
);


// ================================
// START WEBSITE
// ================================

renderProducts();
renderCart();
