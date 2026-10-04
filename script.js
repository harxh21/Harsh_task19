// 1. Data: available services
const services = [
  { id: 1, name: "Home Cleaning", price: 499 },
  { id: 2, name: "AC Repair", price: 699 },
  { id: 3, name: "Plumbing", price: 399 },
  { id: 4, name: "Electrician", price: 349 },
  { id: 5, name: "Salon at Home", price: 799 },
  { id: 6, name: "Pest Control", price: 599 }
];

// 2. Cart: selected services yahan store honge
let cart = [];

// 3. DOM elements
const serviceList = document.getElementById("serviceList");
const cartList = document.getElementById("cartList");
const emptyMsg = document.getElementById("emptyMsg");
const totalEl = document.getElementById("total");
const cartCount = document.getElementById("cartCount");
const bookBtn = document.getElementById("bookBtn");

// 4. Right side: services ke cards banana
function renderServices() {
  serviceList.innerHTML = "";

  services.forEach(function (service) {
    const card = document.createElement("div");
    card.className = "card";

    const title = document.createElement("h3");
    title.textContent = service.name;

    const price = document.createElement("p");
    price.textContent = "₹" + service.price;

    const btn = document.createElement("button");
    btn.className = "add-btn";
    btn.textContent = "Add";
    btn.addEventListener("click", function () {
      addToCart(service.id);
    });

    card.append(title, price, btn);
    serviceList.appendChild(card);
  });
}

// 5. Cart me service add karna
function addToCart(id) {
  const alreadyAdded = cart.some(function (item) {
    return item.id === id;
  });

  if (alreadyAdded) {
    alert("This service is already added!");
    return;
  }

  const service = services.find(function (s) {
    return s.id === id;
  });

  cart.push(service);
  renderCart();
}

// 6. Cart se service hatana
function removeFromCart(id) {
  cart = cart.filter(function (item) {
    return item.id !== id;
  });
  renderCart();
}

// 7. Left side: cart ko screen pe dikhana
function renderCart() {
  cartList.innerHTML = "";

  cart.forEach(function (item) {
    const li = document.createElement("li");

    const info = document.createElement("span");
    info.textContent = item.name + " - ₹" + item.price;

    const removeBtn = document.createElement("button");
    removeBtn.className = "remove-btn";
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", function () {
      removeFromCart(item.id);
    });

    li.append(info, removeBtn);
    cartList.appendChild(li);
  });

  const total = cart.reduce(function (sum, item) {
    return sum + item.price;
  }, 0);

  totalEl.textContent = "₹" + total;
  cartCount.textContent = cart.length;
  emptyMsg.style.display = cart.length === 0 ? "block" : "none";
  bookBtn.disabled = cart.length === 0;
}

// 8. Booking confirm karna
function bookServices() {
  const names = cart.map(function (item) {
    return item.name;
  }).join(", ");

  alert("Booking confirmed for: " + names + "\nTotal: " + totalEl.textContent);
  cart = [];
  renderCart();
}

// 9. Events + initial render
bookBtn.addEventListener("click", bookServices);
renderServices();
renderCart();
