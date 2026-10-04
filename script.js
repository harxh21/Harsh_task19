// 1. Data
const services = [
  { id: 1, name: "Dry Cleaning", price: 200, image: "images/dry-cleaning.svg" },
  { id: 2, name: "Home Cleaning", price: 499, image: "images/home-cleaning.svg" },
  { id: 3, name: "AC Repair", price: 699, image: "images/ac-repair.svg" },
  { id: 4, name: "Plumbing", price: 399, image: "images/plumbing.svg" },
  { id: 5, name: "Electrician", price: 349, image: "images/electrician.svg" },
  { id: 6, name: "Pest Control", price: 599, image: "images/pest-control.svg" }
];

let cart = [];     // chuni hui services
let current = 0;   // abhi right side me kaunsi service dikh rahi hai

// 2. DOM elements
const cartBody = document.getElementById("cartBody");
const emptyState = document.getElementById("emptyState");
const totalEl = document.getElementById("total");
const serviceImage = document.getElementById("serviceImage");
const serviceName = document.getElementById("serviceName");
const servicePrice = document.getElementById("servicePrice");
const skipBtn = document.getElementById("skipBtn");
const addBtn = document.getElementById("addBtn");
const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const formMsg = document.getElementById("formMsg");
const bookBtn = document.getElementById("bookBtn");

// 3. Right side: current service dikhana
function showService() {
  const s = services[current];
  serviceImage.src = s.image;
  serviceImage.alt = s.name;
  serviceName.textContent = s.name;
  servicePrice.textContent = "₹" + s.price.toFixed(2);

  const inCart = cart.some(function (item) {
    return item.id === s.id;
  });
  addBtn.disabled = inCart;
  addBtn.textContent = inCart ? "Added ✓" : "Add Item ⊕";
}

// 4. Agli service par jaana (last ke baad wapas pehli)
function nextService() {
  current = (current + 1) % services.length;
  showService();
}

// 5. Current service ko cart me daalna
function addCurrent() {
  cart.push(services[current]);
  setMessage("", true);
  renderCart();
  nextService();
}

// 6. Cart se hatana
function removeFromCart(id) {
  cart = cart.filter(function (item) {
    return item.id !== id;
  });
  renderCart();
}

// 7. Table ki ek cell banane ka helper
function makeCell(text) {
  const td = document.createElement("td");
  td.textContent = text;
  return td;
}

// 8. Left side: cart table dobara banana
function renderCart() {
  cartBody.innerHTML = "";

  cart.forEach(function (item, index) {
    const tr = document.createElement("tr");
    tr.append(makeCell(index + 1), makeCell(item.name), makeCell("₹ " + item.price));

    const td = document.createElement("td");
    const removeBtn = document.createElement("button");
    removeBtn.className = "remove-btn";
    removeBtn.textContent = "✕";
    removeBtn.addEventListener("click", function () {
      removeFromCart(item.id);
    });
    td.appendChild(removeBtn);
    tr.appendChild(td);

    cartBody.appendChild(tr);
  });

  const total = cart.reduce(function (sum, item) {
    return sum + item.price;
  }, 0);

  totalEl.textContent = "₹ " + total;
  emptyState.style.display = cart.length === 0 ? "block" : "none";
  bookBtn.disabled = cart.length === 0;
  showService();
}

// 9. Form ke neeche message dikhana
function setMessage(text, ok) {
  formMsg.textContent = text;
  formMsg.className = "form-msg " + (ok ? "success" : "error");
}

// 10. Booking: validation + confirm
function bookServices() {
  const nameVal = fullName.value.trim();
  const emailVal = email.value.trim();
  const phoneVal = phone.value.trim();

  if (nameVal === "") {
    setMessage("Please enter your full name.", false);
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
    setMessage("Please enter a valid email ID.", false);
    return;
  }
  if (!/^\d{10}$/.test(phoneVal)) {
    setMessage("Phone number must be 10 digits.", false);
    return;
  }

  const total = totalEl.textContent;
  const count = cart.length;

  cart = [];
  fullName.value = "";
  email.value = "";
  phone.value = "";
  renderCart();
  setMessage("Thank you " + nameVal + "! " + count + " service(s) booked. Total: " + total, true);
}

// 11. Events + start
skipBtn.addEventListener("click", nextService);
addBtn.addEventListener("click", addCurrent);
bookBtn.addEventListener("click", bookServices);
renderCart();
