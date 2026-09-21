/* ============================================================
   AL KHAYAM RESTAURANT — MAIN SCRIPT
   Digital Menu + Cart + WhatsApp Ordering
   ============================================================ */

"use strict";

/* ============================================================
   GLOBAL STATE
   ============================================================ */

let cart = [];
let activeCat = "all";
let searchTerm = "";
let selectedSizes = {};

const STORAGE_KEYS = {
  CART: "alkhayam_cart",
  DARK: "alkhayam_dark"
};


/* ============================================================
   SAFE LOCAL STORAGE
   ============================================================ */

function getStorage(key, fallback = null) {
  try {
    const value = localStorage.getItem(key);
    return value !== null ? value : fallback;
  } catch (error) {
    return fallback;
  }
}

function setStorage(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.warn("LocalStorage unavailable:", error);
  }
}


/* ============================================================
   INITIAL STATE
   ============================================================ */

function loadInitialState() {

  /* ---------- CART ---------- */

  try {
    const savedCart = getStorage(STORAGE_KEYS.CART);

    if (savedCart) {
      const parsed = JSON.parse(savedCart);

      if (Array.isArray(parsed)) {
        cart = parsed.filter(item =>
          item &&
          typeof item.name === "string" &&
          typeof item.qty === "number" &&
          item.qty > 0
        );
      }
    }
  } catch (error) {
    cart = [];
  }


  /* ---------- DARK MODE ---------- */

  const savedDark = getStorage(STORAGE_KEYS.DARK);

  if (savedDark === "true") {
    document.body.classList.add("dark-mode");
  }
}


/* ============================================================
   SECURITY / HTML HELPERS
   ============================================================ */

function escapeHtml(value) {

  return String(value ?? "").replace(/[&<>"']/g, function (char) {

    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };

    return entities[char];
  });
}


/* ============================================================
   NUMBER / PRICE HELPERS
   ============================================================ */

function formatPrice(price) {

  if (
    price === null ||
    price === undefined ||
    price === ""
  ) {
    return "";
  }

  if (typeof price === "number") {

    if (!Number.isFinite(price)) {
      return "";
    }

    return Number.isInteger(price)
      ? String(price)
      : price.toFixed(2).replace(/0$/, "");
  }

  return String(price);
}


/* ============================================================
   PRICE TYPE HELPERS
   ============================================================ */

function hasDoublePrice(item) {

  return (
    item &&
    typeof item.price === "object" &&
    item.price !== null &&
    item.price.small !== undefined &&
    item.price.large !== undefined
  );
}


function isMarketPrice(item) {

  if (!item) return false;

  if (typeof item.price === "string") {
    return item.price.toLowerCase().includes("market");
  }

  return false;
}


function getEffectivePrice(item, size = "Single") {

  if (!item) return null;

  if (hasDoublePrice(item)) {

    const value =
      size === "Large"
        ? item.price.large
        : item.price.small;

    return typeof value === "number"
      ? value
      : null;
  }

  if (typeof item.price === "number") {
    return item.price;
  }

  return null;
}


function getDisplayPrice(item) {

  if (!item) return "";

  /* ---------- TWO PRICES ---------- */

  if (hasDoublePrice(item)) {

    return (
      "AED " +
      formatPrice(item.price.small) +
      " / " +
      formatPrice(item.price.large)
    );
  }


  /* ---------- NORMAL PRICE ---------- */

  if (typeof item.price === "number") {
    return "AED " + formatPrice(item.price);
  }


  /* ---------- STRING PRICE ---------- */

  return String(item.price);
}


/* ============================================================
   CART PRICE SAFETY
   ============================================================ */

function getCartItemTotal(item) {

  if (!item) return 0;

  const price = Number(item.price);
  const qty = Number(item.qty);

  if (!Number.isFinite(price) || !Number.isFinite(qty)) {
    return 0;
  }

  return price * qty;
}


function getCartTotal() {

  return cart.reduce(function (total, item) {

    return total + getCartItemTotal(item);

  }, 0);
}


function getCartCount() {

  return cart.reduce(function (count, item) {

    const qty = Number(item.qty);

    return count + (
      Number.isFinite(qty)
        ? qty
        : 0
    );

  }, 0);
}


/* ============================================================
   FIND MENU ITEM
   ============================================================ */

function findMenuItem(name) {

  if (!Array.isArray(MENU)) {
    return null;
  }

  return MENU.find(function (item) {
    return item.name === name;
  }) || null;
}


/* ============================================================
   FIND CART ITEM
   ============================================================ */

function findCartItem(name, size) {

  return cart.find(function (item) {

    return (
      item.name === name &&
      item.size === size
    );

  }) || null;
}


/* ============================================================
   SAVE CART
   ============================================================ */

function saveCart() {

  setStorage(
    STORAGE_KEYS.CART,
    JSON.stringify(cart)
  );
}


/* ============================================================
   CATEGORY RENDERING
   ============================================================ */

function renderCategories() {

  const container = document.getElementById("catScroll");

  if (!container) return;

  if (
    typeof CATEGORIES === "undefined" ||
    !CATEGORIES
  ) {
    console.warn("CATEGORIES not found.");
    return;
  }


  const categories = Object.keys(CATEGORIES)
    .sort(function (a, b) {

      return (
        (CATEGORIES[a].order || 999) -
        (CATEGORIES[b].order || 999)
      );

    });


  let html = `
    <button
      class="cat-pill active"
      data-cat="all"
      type="button"
      aria-pressed="true"
    >
      All
    </button>
  `;


  categories.forEach(function (key) {

    const category = CATEGORIES[key];

    if (!category) return;

    const icon = category.icon
      ? category.icon + " "
      : "";

    const active =
      activeCat === key;

    html += `
      <button
        class="cat-pill ${active ? "active" : ""}"
        data-cat="${escapeHtml(key)}"
        type="button"
        aria-pressed="${active}"
      >
        ${icon}${escapeHtml(category.name)}
      </button>
    `;
  });


  container.innerHTML = html;

  updateCategoryState();
}


/* ============================================================
   CATEGORY STATE
   ============================================================ */

function updateCategoryState() {

  const container = document.getElementById("catScroll");

  if (!container) return;

  const pills =
    container.querySelectorAll(".cat-pill");

  pills.forEach(function (pill) {

    const isActive =
      pill.dataset.cat === activeCat;

    pill.classList.toggle(
      "active",
      isActive
    );

    pill.setAttribute(
      "aria-pressed",
      String(isActive)
    );
  });
}


/* ============================================================
   CATEGORY CLICK
   ============================================================ */

function handleCategoryClick(category) {

  activeCat = category || "all";

  updateCategoryState();
  renderMenu();

  /* Smoothly bring menu into view */

  const menu = document.getElementById("menuContainer");

  if (menu) {

    const headerOffset = 120;

    const top =
      menu.getBoundingClientRect().top +
      window.scrollY -
      headerOffset;

    window.scrollTo({
      top: Math.max(0, top),
      behavior: "smooth"
    });
  }
}


/* ============================================================
   SEARCH / FILTER
   ============================================================ */

function getFilteredMenu() {

  if (!Array.isArray(MENU)) {
    return [];
  }

  let filtered = MENU.slice();


  /* ---------- CATEGORY ---------- */

  if (activeCat !== "all") {

    filtered = filtered.filter(function (item) {

      return item.cat === activeCat;

    });
  }


  /* ---------- SEARCH ---------- */

  const term =
    searchTerm.trim().toLowerCase();

  if (!term) {
    return filtered;
  }


  filtered = filtered.filter(function (item) {

    const categoryName =
      CATEGORIES &&
      CATEGORIES[item.cat]
        ? CATEGORIES[item.cat].name
        : "";


    const searchableText = [
      item.name,
      item.desc,
      item.category,
      categoryName
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();


    return searchableText.includes(term);
  });


  return filtered;
}


/* ============================================================
   MENU RENDERING
   ============================================================ */

function renderMenu() {

  const container =
    document.getElementById("menuContainer");

  if (!container) return;

  const filtered =
    getFilteredMenu();


  /* ---------- EMPTY ---------- */

  if (filtered.length === 0) {

    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🔎</div>
        <div class="empty-state-text">
          No menu items found
        </div>
      </div>
    `;

    return;
  }


  /* ---------- GROUP BY CATEGORY ---------- */

  const grouped = {};

  filtered.forEach(function (item) {

    const category =
      item.cat || "other";

    if (!grouped[category]) {
      grouped[category] = [];
    }

    grouped[category].push(item);
  });


  /* ---------- SORT CATEGORIES ---------- */

  const categoryKeys =
    Object.keys(grouped).sort(function (a, b) {

      const orderA =
        CATEGORIES[a]
          ? CATEGORIES[a].order || 999
          : 999;

      const orderB =
        CATEGORIES[b]
          ? CATEGORIES[b].order || 999
          : 999;

      return orderA - orderB;
    });


  let html = "";


  /* ==========================================================
     BUILD SECTIONS
     ========================================================== */

  categoryKeys.forEach(function (cat) {

    const categoryInfo =
      CATEGORIES[cat] || {
        name: cat,
        order: 999
      };

    const items =
      grouped[cat];


    html += `
      <section
        class="menu-section"
        data-category="${escapeHtml(cat)}"
      >

        <div class="section-title">

          <div class="section-title-text">
            ${escapeHtml(categoryInfo.name)}
          </div>

          <span class="section-count">
            ${items.length}
            ${items.length === 1 ? "item" : "items"}
          </span>

        </div>

        <div class="product-grid">
    `;


    /* ========================================================
       BUILD PRODUCTS
       ======================================================== */

    items.forEach(function (item) {

      const isDouble =
        hasDoublePrice(item);

      const selectedSize =
        selectedSizes[item.name] ||
        (isDouble ? "Small" : "Single");


      const cartItem =
        findCartItem(
          item.name,
          selectedSize
        );


      const qty =
        cartItem
          ? cartItem.qty
          : 0;


      const effectivePrice =
        getEffectivePrice(
          item,
          selectedSize
        );


      const displayPrice =
        getDisplayPrice(item);


      const safeName =
        escapeHtml(item.name);


      const description =
        escapeHtml(item.desc || "");


      const marketPrice =
        isMarketPrice(item);


      const cardClass =
        isDouble
          ? "product-card"
          : "product-card single-price";


      /* ---------- IMAGE ---------- */

      let imageHtml = "";

      if (item.image) {

        imageHtml = `
          <div class="product-image-wrap">

            <img
              class="product-image"
              src="${escapeHtml(item.image)}"
              alt="${safeName}"
              loading="lazy"
              decoding="async"
              onerror="this.parentElement.style.display='none';"
            >

          </div>
        `;
      }


      /* ---------- BADGES ---------- */

      let badgesHtml = "";

      if (item.veg === true) {

        badgesHtml += `
          <span class="product-badge veg">
            Veg
          </span>
        `;
      }

      if (item.veg === false) {

        badgesHtml += `
          <span class="product-badge nonveg">
            Non-Veg
          </span>
        `;
      }

      if (item.bestseller === true) {

        badgesHtml += `
          <span class="product-badge bestseller">
            Bestseller
          </span>
        `;
      }


      /* ---------- SIZE ---------- */

      let sizeHtml = "";

      if (isDouble) {

        sizeHtml = `
          <div class="size-label">
            Size
          </div>

          <div class="size-pills">

            <button
              class="size-pill ${
                selectedSize === "Small"
                  ? "active"
                  : ""
              }"
              data-action="size"
              data-item="${safeName}"
              data-size="Small"
              type="button"
            >
              Small
            </button>

            <button
              class="size-pill ${
                selectedSize === "Large"
                  ? "active"
                  : ""
              }"
              data-action="size"
              data-item="${safeName}"
              data-size="Large"
              type="button"
            >
              Large
            </button>

          </div>
        `;
      }


      /* ---------- ACTION ---------- */

      let actionHtml = "";


      if (marketPrice) {

        actionHtml = `
          <button
            class="add-btn market-price-btn"
            type="button"
            disabled
          >
            Market Price
          </button>
        `;

      } else if (qty > 0) {

        actionHtml = `
          <div class="qty-mini">

            <button
              type="button"
              data-action="decrease"
              data-item="${safeName}"
              data-size="${escapeHtml(selectedSize)}"
              aria-label="Decrease ${safeName}"
            >
              −
            </button>

            <span>${qty}</span>

            <button
              type="button"
              data-action="increase"
              data-item="${safeName}"
              data-size="${escapeHtml(selectedSize)}"
              aria-label="Increase ${safeName}"
            >
              +
            </button>

          </div>
        `;

      } else {

        actionHtml = `
          <button
            class="add-btn"
            type="button"
            data-action="add"
            data-item="${safeName}"
            data-size="${escapeHtml(selectedSize)}"
          >
            Add
          </button>
        `;
      }


      /* ---------- CARD ---------- */

      html += `
        <article
          class="${cardClass}"
          data-item-name="${safeName}"
        >

          ${imageHtml}

          <div class="product-body">

            ${
              badgesHtml
                ? `<div class="product-badges">${badgesHtml}</div>`
                : ""
            }

            <div class="product-header">

              <div class="product-name">
                ${safeName}
              </div>

              <div class="product-price">
                ${escapeHtml(displayPrice)}
              </div>

            </div>

            ${
              description
                ? `
                  <div class="product-desc">
                    ${description}
                  </div>
                `
                : ""
            }

            ${sizeHtml}

            <div class="card-actions">
              ${actionHtml}
            </div>

          </div>

        </article>
      `;
    });


    html += `
        </div>
      </section>
    `;
  });


  container.innerHTML = html;
}


/* ============================================================
   ADD TO CART
   ============================================================ */

function addToCart(name, price, size = "Single") {

  const menuItem =
    findMenuItem(name);


  /* ---------- MARKET PRICE ---------- */

  if (
    menuItem &&
    isMarketPrice(menuItem)
  ) {
    showToast(
      "Price will be confirmed by restaurant"
    );

    return;
  }


  /* ---------- PRICE VALIDATION ---------- */

  const numericPrice =
    Number(price);

  if (
    !Number.isFinite(numericPrice) ||
    numericPrice < 0
  ) {
    showToast("Unable to add this item");
    return;
  }


  /* ---------- EXISTING ITEM ---------- */

  const existing =
    findCartItem(name, size);


  if (existing) {

    existing.qty += 1;

  } else {

    cart.push({
      name: name,
      price: numericPrice,
      qty: 1,
      size: size
    });
  }


  saveCart();
  updateCartBar();
  renderMenu();


  const label =
    size !== "Single"
      ? `${name} (${size})`
      : name;


  showToast(
    `${label} added`
  );
}


/* ============================================================
   DECREASE ITEM
   ============================================================ */

function decreaseItem(name, size = "Single") {

  const item =
    findCartItem(name, size);

  if (!item) return;


  item.qty -= 1;


  if (item.qty <= 0) {

    cart = cart.filter(function (cartItem) {

      return !(
        cartItem.name === name &&
        cartItem.size === size
      );

    });
  }


  saveCart();
  updateCartBar();
  renderMenu();
}


/* ============================================================
   CHANGE CART QUANTITY
   ============================================================ */

function changeQty(index, delta) {

  if (!cart[index]) return;


  cart[index].qty += delta;


  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }


  saveCart();
  updateCartBar();
  renderCartDrawer();
  renderMenu();
}


/* ============================================================
   UPDATE CART BAR
   ============================================================ */

function updateCartBar() {

  const total =
    getCartTotal();

  const count =
    getCartCount();


  const countEl =
    document.getElementById("cartCount");

  const itemsEl =
    document.getElementById("cartItemsText");

  const totalEl =
    document.getElementById("cartTotal");


  if (countEl) {

    countEl.textContent =
      count;

    countEl.classList.remove("bump");

    void countEl.offsetWidth;

    countEl.classList.add("bump");
  }


  if (itemsEl) {

    itemsEl.textContent =
      count === 0
        ? "No items"
        : `${count} ${
            count === 1
              ? "item"
              : "items"
          }`;
  }


  if (totalEl) {

    totalEl.textContent =
      `AED ${formatPrice(total)}`;
  }


  /* ---------- BAR VISIBILITY ---------- */

  const cartBar =
    document.getElementById("cartBar");

  if (cartBar) {

    cartBar.classList.toggle(
      "has-items",
      count > 0
    );
  }
}


/* ============================================================
   OPEN CART
   ============================================================ */

function openCart() {

  renderCartDrawer();


  const overlay =
    document.getElementById("overlay");

  const drawer =
    document.getElementById("cartDrawer");


  if (overlay) {
    overlay.classList.add("show");
  }

  if (drawer) {
    drawer.classList.add("show");
  }


  document.body.classList.add(
    "cart-open"
  );

  document.body.style.overflow =
    "hidden";
}


/* ============================================================
   CLOSE CART
   ============================================================ */

function closeCart() {

  const overlay =
    document.getElementById("overlay");

  const drawer =
    document.getElementById("cartDrawer");


  if (overlay) {
    overlay.classList.remove("show");
  }

  if (drawer) {
    drawer.classList.remove("show");
  }


  document.body.classList.remove(
    "cart-open"
  );

  document.body.style.overflow =
    "";
}


/* ============================================================
   CART DRAWER
   ============================================================ */

function renderCartDrawer() {

  const itemsEl =
    document.getElementById("drawerItems");

  const footerEl =
    document.getElementById("drawerFooter");


  if (!itemsEl || !footerEl) {
    return;
  }


  /* ---------- EMPTY CART ---------- */

  if (cart.length === 0) {

    itemsEl.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">
          🛒
        </div>

        <div class="empty-state-text">
          Your cart is empty
        </div>
      </div>
    `;

    footerEl.innerHTML = "";

    return;
  }


  let html = "";
  let total = 0;


  /* ---------- ITEMS ---------- */

  cart.forEach(function (item, index) {

    const itemTotal =
      getCartItemTotal(item);

    total += itemTotal;


    const sizeLabel =
      item.size &&
      item.size !== "Single"
        ? ` (${item.size})`
        : "";


    html += `
      <div class="drawer-item">

        <div class="drawer-item-info">

          <div class="drawer-item-name">
            ${escapeHtml(item.name)}
            ${escapeHtml(sizeLabel)}
          </div>

          <div class="drawer-item-price">
            AED ${formatPrice(item.price)}
            × ${item.qty}
            = AED ${formatPrice(itemTotal)}
          </div>

        </div>

        <div class="drawer-qty">

          <button
            type="button"
            data-cart-action="decrease"
            data-index="${index}"
            aria-label="Decrease quantity"
          >
            −
          </button>

          <span>
            ${item.qty}
          </span>

          <button
            type="button"
            data-cart-action="increase"
            data-index="${index}"
            aria-label="Increase quantity"
          >
            +
          </button>

        </div>

      </div>
    `;
  });


  itemsEl.innerHTML =
    html;


  /* ---------- FOOTER ---------- */

  footerEl.innerHTML = `

    <div class="summary-row">
      <span>Subtotal</span>
      <span>
        AED ${formatPrice(total)}
      </span>
    </div>

    <div class="summary-row total">
      <span>Total</span>
      <span>
        AED ${formatPrice(total)}
      </span>
    </div>

    <button
      class="order-btn"
      type="button"
      data-action="checkout"
    >

      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>

      Order via WhatsApp

    </button>
  `;
}


/* ============================================================
   ORDER TYPE
   ============================================================ */

function getOrderType() {

  const activeTab =
    document.querySelector(
      ".order-tab.active"
    );


  if (!activeTab) {
    return "dinein";
  }


  return (
    activeTab.dataset.type ||
    "dinein"
  );
}


/* ============================================================
   CHECKOUT — WHATSAPP
   ============================================================ */

function checkoutWhatsApp() {

  if (cart.length === 0) {

    showToast(
      "Your cart is empty"
    );

    return;
  }


  /* ---------- RESTAURANT CHECK ---------- */

  if (
    typeof RESTAURANT === "undefined" ||
    !RESTAURANT
  ) {

    showToast(
      "Restaurant information unavailable"
    );

    return;
  }


  const orderType =
    getOrderType();


  let typeLabel =
    "Dine in";


  if (orderType === "delivery") {
    typeLabel = "Delivery";
  }

  if (orderType === "takeaway") {
    typeLabel = "Takeaway";
  }


  /* ---------- MESSAGE ---------- */

  let message =
    `*New Order — ${RESTAURANT.name}*\n\n`;


  message +=
    `*Order Type:* ${typeLabel}\n\n`;


  message +=
    "*Items:*\n";


  let total = 0;


  cart.forEach(function (item, index) {

    const itemTotal =
      getCartItemTotal(item);


    total += itemTotal;


    const sizeLabel =
      item.size &&
      item.size !== "Single"
        ? ` (${item.size})`
        : "";


    message +=
      `${index + 1}. ` +
      `${item.name}` +
      `${sizeLabel} × ${item.qty}` +
      ` = AED ${formatPrice(itemTotal)}\n`;
  });


  message +=
    `\n*Total: AED ${formatPrice(total)}*\n`;


  message +=
    "\n--------------------\n";


  message +=
    "*Customer Details*\n";


  message +=
    "Name: \n";


  message +=
    "Phone: \n";


  if (orderType === "delivery") {

    message +=
      "Address: \n";
  }


  message +=
    "Notes: \n";


  /* ---------- WHATSAPP NUMBER ---------- */

  const whatsapp =
    String(RESTAURANT.whatsapp || "")
      .replace(/\D/g, "");


  if (!whatsapp) {

    showToast(
      "WhatsApp number unavailable"
    );

    return;
  }


  const url =
    "https://wa.me/" +
    whatsapp +
    "?text=" +
    encodeURIComponent(message);


  window.open(
    url,
    "_blank",
    "noopener,noreferrer"
  );
}


/* ============================================================
   TOAST
   ============================================================ */

function showToast(message) {

  let container =
    document.getElementById(
      "toastContainer"
    );


  if (!container) {

    container =
      document.createElement("div");

    container.id =
      "toastContainer";

    container.className =
      "toast-container";

    document.body.appendChild(
      container
    );
  }


  const toast =
    document.createElement("div");


  toast.className =
    "toast";


  toast.textContent =
    message;


  container.appendChild(
    toast
  );


  window.setTimeout(function () {

    toast.classList.add(
      "out"
    );


    window.setTimeout(
      function () {
        toast.remove();
      },
      400
    );

  }, 1800);
}


/* ============================================================
   DARK MODE
   ============================================================ */

function toggleDarkMode() {

  const isDark =
    document.body.classList.toggle(
      "dark-mode"
    );


  setStorage(
    STORAGE_KEYS.DARK,
    isDark
      ? "true"
      : "false"
  );


  updateDarkModeButton(
    isDark
  );
}


/* ============================================================
   DARK MODE BUTTON
   ============================================================ */

function updateDarkModeButton(
  isDark = document.body.classList.contains("dark-mode")
) {

  const button =
    document.getElementById(
      "darkModeBtn"
    );


  if (!button) return;


  button.setAttribute(
    "aria-label",
    isDark
      ? "Switch to light mode"
      : "Switch to dark mode"
  );


  button.setAttribute(
    "title",
    isDark
      ? "Light mode"
      : "Dark mode"
  );


  const icon =
    button.querySelector(
      "[data-theme-icon]"
    );


  if (icon) {

    icon.textContent =
      isDark
        ? "☀"
        : "☾";
  }
}


/* ============================================================
   BACK TO TOP
   ============================================================ */

function scrollToTop() {

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


/* ============================================================
   SCROLL HANDLER
   ============================================================ */

function handleScroll() {

  const button =
    document.getElementById(
      "backToTop"
    );


  if (!button) return;


  button.classList.toggle(
    "show",
    window.scrollY > 400
  );
}


/* ============================================================
   EVENT DELEGATION — CATEGORIES
   ============================================================ */

function setupCategoryEvents() {

  const container =
    document.getElementById(
      "catScroll"
    );


  if (!container) return;


  container.addEventListener(
    "click",
    function (event) {

      const pill =
        event.target.closest(
          ".cat-pill"
        );


      if (!pill) return;


      handleCategoryClick(
        pill.dataset.cat
      );
    }
  );
}


/* ============================================================
   EVENT DELEGATION — MENU
   ============================================================ */

function setupMenuEvents() {

  const container =
    document.getElementById(
      "menuContainer"
    );


  if (!container) return;


  container.addEventListener(
    "click",
    function (event) {

      const target =
        event.target.closest(
          "[data-action]"
        );


      if (!target) return;


      const action =
        target.dataset.action;


      const itemName =
        target.dataset.item;


      const size =
        target.dataset.size ||
        "Single";


      /* ---------- SIZE ---------- */

      if (action === "size") {

        if (!itemName) return;


        selectedSizes[itemName] =
          size;


        renderMenu();

        return;
      }


      /* ---------- ADD ---------- */

      if (action === "add") {

        if (!itemName) return;


        const item =
          findMenuItem(itemName);


        if (!item) return;


        const price =
          getEffectivePrice(
            item,
            size
          );


        addToCart(
          itemName,
          price,
          size
        );


        return;
      }


      /* ---------- INCREASE ---------- */

      if (action === "increase") {

        if (!itemName) return;


        const item =
          findMenuItem(itemName);


        if (!item) return;


        const price =
          getEffectivePrice(
            item,
            size
          );


        addToCart(
          itemName,
          price,
          size
        );


        return;
      }


      /* ---------- DECREASE ---------- */

      if (action === "decrease") {

        if (!itemName) return;


        decreaseItem(
          itemName,
          size
        );
      }
    }
  );
}


/* ============================================================
   EVENT DELEGATION — CART
   ============================================================ */

function setupCartEvents() {

  const items =
    document.getElementById(
      "drawerItems"
    );


  if (items) {

    items.addEventListener(
      "click",
      function (event) {

        const button =
          event.target.closest(
            "[data-cart-action]"
          );


        if (!button) return;


        const index =
          Number(button.dataset.index);


        if (
          !Number.isInteger(index) ||
          !cart[index]
        ) {
          return;
        }


        const action =
          button.dataset.cartAction;


        if (action === "increase") {

          changeQty(
            index,
            1
          );

        } else if (
          action === "decrease"
        ) {

          changeQty(
            index,
            -1
          );
        }
      }
    );
  }


  const footer =
    document.getElementById(
      "drawerFooter"
    );


  if (footer) {

    footer.addEventListener(
      "click",
      function (event) {

        const button =
          event.target.closest(
            '[data-action="checkout"]'
          );


        if (!button) return;


        checkoutWhatsApp();
      }
    );
  }
}


/* ============================================================
   ORDER TAB EVENTS
   ============================================================ */

function setupOrderTabs() {

  const orderTabs =
    document.getElementById(
      "orderTabs"
    );


  if (!orderTabs) return;


  orderTabs.addEventListener(
    "click",
    function (event) {

      const tab =
        event.target.closest(
          ".order-tab"
        );


      if (!tab) return;


      const tabs =
        orderTabs.querySelectorAll(
          ".order-tab"
        );


      tabs.forEach(
        function (item) {

          item.classList.remove(
            "active"
          );

          item.setAttribute(
            "aria-selected",
            "false"
          );
        }
      );


      tab.classList.add(
        "active"
      );


      tab.setAttribute(
        "aria-selected",
        "true"
      );
    }
  );
}


/* ============================================================
   SEARCH EVENTS
   ============================================================ */

function setupSearch() {

  const input =
    document.getElementById(
      "searchInput"
    );


  if (!input) return;


  let timer = null;


  input.addEventListener(
    "input",
    function (event) {

      window.clearTimeout(
        timer
      );


      timer =
        window.setTimeout(
          function () {

            searchTerm =
              event.target.value
                .trim();


            renderMenu();

          },
          120
        );
    }
  );


  /* ---------- ESC CLEAR ---------- */

  input.addEventListener(
    "keydown",
    function (event) {

      if (
        event.key === "Escape" &&
        input.value
      ) {

        input.value = "";

        searchTerm = "";

        renderMenu();

        input.blur();
      }
    }
  );
}


/* ============================================================
   KEYBOARD ACCESSIBILITY
   ============================================================ */

function setupKeyboardEvents() {

  document.addEventListener(
    "keydown",
    function (event) {

      /* ESC closes cart */

      if (
        event.key === "Escape"
      ) {

        const drawer =
          document.getElementById(
            "cartDrawer"
          );


        if (
          drawer &&
          drawer.classList.contains(
            "show"
          )
        ) {

          closeCart();
        }
      }
    }
  );
}


/* ============================================================
   GLOBAL BUTTON EVENTS
   ============================================================ */

function setupGlobalEvents() {

  /* ---------- DARK MODE ---------- */

  const darkButton =
    document.getElementById(
      "darkModeBtn"
    );


  if (darkButton) {

    darkButton.addEventListener(
      "click",
      toggleDarkMode
    );
  }


  /* ---------- CART BAR ---------- */

  const cartBar =
    document.getElementById(
      "cartBar"
    );


  if (cartBar) {

    cartBar.addEventListener(
      "click",
      openCart
    );
  }


  /* ---------- CLOSE BUTTON ---------- */

  const closeButton =
    document.getElementById(
      "closeCartBtn"
    );


  if (closeButton) {

    closeButton.addEventListener(
      "click",
      closeCart
    );
  }


  /* ---------- OVERLAY ---------- */

  const overlay =
    document.getElementById(
      "overlay"
    );


  if (overlay) {

    overlay.addEventListener(
      "click",
      closeCart
    );
  }


  /* ---------- BACK TO TOP ---------- */

  const backTop =
    document.getElementById(
      "backToTop"
    );


  if (backTop) {

    backTop.addEventListener(
      "click",
      scrollToTop
    );
  }
}


/* ============================================================
   REPAIR / CLEAN OLD CART DATA
   ============================================================ */

function cleanCart() {

  if (!Array.isArray(cart)) {
    cart = [];
    return;
  }


  cart = cart.filter(
    function (item) {

      if (
        !item ||
        typeof item.name !== "string"
      ) {
        return false;
      }


      const qty =
        Number(item.qty);


      const price =
        Number(item.price);


      return (
        Number.isFinite(qty) &&
        qty > 0 &&
        Number.isFinite(price) &&
        price >= 0
      );
    }
  );
}


/* ============================================================
   INITIALIZE APPLICATION
   ============================================================ */

function init() {

  /* ---------- LOAD STATE ---------- */

  loadInitialState();

  cleanCart();


  /* ---------- SAVE CLEAN CART ---------- */

  saveCart();


  /* ---------- RENDER ---------- */

  renderCategories();
  renderMenu();
  updateCartBar();


  /* ---------- UI ---------- */

  updateDarkModeButton();


  /* ---------- EVENTS ---------- */

  setupCategoryEvents();
  setupMenuEvents();
  setupCartEvents();
  setupOrderTabs();
  setupSearch();
  setupKeyboardEvents();
  setupGlobalEvents();


  /* ---------- SCROLL ---------- */

  window.addEventListener(
    "scroll",
    handleScroll,
    {
      passive: true
    }
  );


  /* ---------- INITIAL SCROLL STATE ---------- */

  handleScroll();


  console.log(
    "Al Khayam Digital Menu initialized."
  );
}


/* ============================================================
   START
   ============================================================ */

if (
  document.readyState === "loading"
) {

  document.addEventListener(
    "DOMContentLoaded",
    init,
    {
      once: true
    }
  );

} else {

  init();
}