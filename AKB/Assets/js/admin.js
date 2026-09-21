// ============================================================
// AL KHAYAM ADMIN PANEL — LOGIC
// ============================================================
// Default password: alkhayam123
// ============================================================

var ADMIN_PASSWORD = "alkhayam123";
var adminMenu = [];

// ============ LOGIN ============
function login() {
  var pass = document.getElementById("passwordInput").value;
  if (pass === ADMIN_PASSWORD) {
    document.getElementById("loginScreen").classList.add("hidden");
    document.getElementById("dashboard").classList.remove("hidden");
    loadMenu();
  } else {
    alert("Wrong password!");
  }
}

// ============ LOGOUT ============
function logout() {
  document.getElementById("loginScreen").classList.remove("hidden");
  document.getElementById("dashboard").classList.add("hidden");
  document.getElementById("passwordInput").value = "";
}

// ============ TOGGLE PRICE INPUTS ============
function togglePriceInputs() {
  var checkbox = document.getElementById("hasDoublePrice");
  var doubleInputs = document.getElementById("doublePriceInputs");
  var singleInput = document.getElementById("itemPrice");

  if (checkbox.checked) {
    doubleInputs.style.display = "block";
    singleInput.parentElement.style.display = "none";
  } else {
    doubleInputs.style.display = "none";
    singleInput.parentElement.style.display = "block";
  }
}

// ============ LOAD MENU ============
function loadMenu() {
  var saved = localStorage.getItem("alkhayam_admin_menu");
  if (saved) {
    adminMenu = JSON.parse(saved);
  } else {
    adminMenu = JSON.parse(JSON.stringify(MENU));
  }
  updateStats();
  renderAdminList();
}

// ============ UPDATE STATS ============
function updateStats() {
  document.getElementById("totalItems").textContent = adminMenu.length;
  var cats = {};
  adminMenu.forEach(function(i) { cats[i.cat] = true; });
  document.getElementById("totalCategories").textContent = Object.keys(cats).length;
}

// ============ SAVE MENU ============
function saveMenu() {
  try {
    localStorage.setItem("alkhayam_admin_menu", JSON.stringify(adminMenu));
  } catch (e) {}
}

// ============ RENDER LIST ============
function renderAdminList() {
  var list = document.getElementById("adminList");
  var search = document.getElementById("searchAdmin").value.toLowerCase();

  var filtered = adminMenu;
  if (search) {
    filtered = adminMenu.filter(function(item) {
      return item.name.toLowerCase().indexOf(search) !== -1;
    });
  }

  if (filtered.length === 0) {
    list.innerHTML = '<p style="text-align:center; color:#999; padding:20px;">No items found.</p>';
    return;
  }

  var html = "";
  filtered.forEach(function(item) {
    var originalIndex = adminMenu.indexOf(item);
    var priceDisplay;
    if (typeof item.price === "object" && item.price.small) {
      priceDisplay = "AED " + item.price.small + " / " + item.price.large;
    } else {
      priceDisplay = "AED " + item.price;
    }
    var catName = CATEGORIES[item.cat] ? CATEGORIES[item.cat].name : item.cat;

    html += '<div class="admin-item">';
    html += '<div class="admin-item-info">';
    html += '<h4>' + escapeHtml(item.name) + '</h4>';
    html += '<span>' + escapeHtml(catName) + ' | ' + priceDisplay + '</span>';
    html += '</div>';
    html += '<div class="admin-item-actions">';
    html += '<button class="btn-edit" onclick="editItem(' + originalIndex + ')">Edit</button>';
    html += '<button class="btn-delete" onclick="deleteItem(' + originalIndex + ')">Delete</button>';
    html += '</div>';
    html += '</div>';
  });
  list.innerHTML = html;
}

// ============ ADD ITEM ============
function addItem() {
  var name = document.getElementById("itemName").value.trim();
  var cat = document.getElementById("itemCategory").value;
  var hasDouble = document.getElementById("hasDoublePrice").checked;
  var desc = document.getElementById("itemDesc").value.trim();

  if (!name) {
    alert("Please enter item name.");
    return;
  }

  var price;

  if (hasDouble) {
    var small = parseFloat(document.getElementById("itemPriceSmall").value);
    var large = parseFloat(document.getElementById("itemPriceLarge").value);
    if (isNaN(small) || isNaN(large)) {
      alert("Please enter both Small and Large prices.");
      return;
    }
    price = { small: small, large: large };
  } else {
    var single = parseFloat(document.getElementById("itemPrice").value);
    if (isNaN(single)) {
      alert("Please enter a valid price.");
      return;
    }
    price = single;
  }

  adminMenu.push({
    cat: cat,
    name: name,
    price: price,
    desc: desc
  });

  saveMenu();
  updateStats();
  renderAdminList();

  // Reset form
  document.getElementById("itemName").value = "";
  document.getElementById("itemPrice").value = "";
  document.getElementById("itemPriceSmall").value = "";
  document.getElementById("itemPriceLarge").value = "";
  document.getElementById("itemDesc").value = "";
  document.getElementById("hasDoublePrice").checked = false;
  togglePriceInputs();

  alert("Item added! Click 'Export' to save permanently.");
}

// ============ EDIT ITEM ============
function editItem(index) {
  var item = adminMenu[index];
  var newName = prompt("Edit Name:", item.name);
  if (newName === null || newName.trim() === "") return;

  var isDouble = typeof item.price === "object" && item.price.small;
  var newPrice;

  if (isDouble) {
    var newSmall = prompt("Edit Small Price:", item.price.small);
    if (newSmall === null) return;
    var newLarge = prompt("Edit Large Price:", item.price.large);
    if (newLarge === null) return;
    newPrice = {
      small: parseFloat(newSmall),
      large: parseFloat(newLarge)
    };
    if (isNaN(newPrice.small) || isNaN(newPrice.large)) {
      alert("Invalid price.");
      return;
    }
  } else {
    var newPriceStr = prompt("Edit Price:", item.price);
    if (newPriceStr === null) return;
    newPrice = parseFloat(newPriceStr);
    if (isNaN(newPrice)) {
      alert("Invalid price.");
      return;
    }
  }

  adminMenu[index].name = newName.trim();
  adminMenu[index].price = newPrice;
  saveMenu();
  renderAdminList();
  alert("Item updated! Click 'Export' to save permanently.");
}

// ============ DELETE ITEM ============
function deleteItem(index) {
  if (confirm("Delete this item?")) {
    adminMenu.splice(index, 1);
    saveMenu();
    updateStats();
    renderAdminList();
    alert("Item deleted! Click 'Export' to save permanently.");
  }
}

// ============ EXPORT MENU ============
function exportMenu() {
  var content = "// ============================================\n";
  content += "// AL KHAYAM RESTAURANT - MENU DATA (UPDATED)\n";
  content += "// ============================================\n\n";

  content += "const RESTAURANT = " + JSON.stringify(RESTAURANT, null, 2) + ";\n\n";
  content += "const CATEGORIES = " + JSON.stringify(CATEGORIES, null, 2) + ";\n\n";

  content += "const MENU = [\n";
  adminMenu.forEach(function(item) {
    content += "  { cat: " + JSON.stringify(item.cat);
    content += ", name: " + JSON.stringify(item.name);
    if (typeof item.price === "object") {
      content += ", price: { small: " + item.price.small + ", large: " + item.price.large + " }";
    } else {
      content += ", price: " + item.price;
    }
    if (item.desc) {
      content += ", desc: " + JSON.stringify(item.desc);
    }
    content += " },\n";
  });
  content += "];\n";

  var blob = new Blob([content], { type: "text/javascript" });
  var url = URL.createObjectURL(blob);
  var a = document.createElement("a");
  a.href = url;
  a.download = "menu.js";
  a.click();
  URL.revokeObjectURL(url);
  alert("menu.js downloaded! Replace the old file in Assets/data/.");
}

// ============ RESET MENU ============
function resetMenu() {
  if (confirm("Reset menu to original? All changes will be lost.")) {
    localStorage.removeItem("alkhayam_admin_menu");
    loadMenu();
    alert("Menu reset to original.");
  }
}

// ============ HELPERS ============
function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, function(m) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m];
  });
}