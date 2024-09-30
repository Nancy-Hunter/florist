// set up for button toggle in admin
const openFormButton = document.querySelectorAll(".changeDiscountButton")

openFormButton.forEach(function(el){
    el.addEventListener('click', toggleDisplay)
})

function toggleDisplay(event) {
    const clicked = event.target
    if (clicked.matches('button')) {
    clicked.nextElementSibling.classList.toggle('hidden');
  }
}

//set up for add to cart at post and cart
let count = 0;
let sum = 0;
let cart = {};

if (localStorage.getItem("count")) {
    count = parseInt(localStorage.getItem("count"));
}

if (localStorage.getItem("sum")) {
    sum = parseInt(localStorage.getItem("sum"));
}

if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"));
}

//updateCart at post

const addToCartButton = document.querySelectorAll(".cartButton")

addToCartButton.forEach(function (el) {
  el.addEventListener('click', addToCart)
})
function addToCart(event) {
  console.log('clicked')

  let price = Number(event.target.dataset.price);
  let productTitle = event.target.dataset.title;
  let id = event.target.dataset.id;

if (id in cart) {
  cart[id].qty++;
} else {
  let cartItem = {
      productTitle: productTitle,
      price: price,
      qty: 1
  };
  cart[id] = cartItem
}

  count++;
  sum += price;

  console.log(cart, sum, count);

  localStorage.setItem("cart", JSON.stringify(cart));
  localStorage.setItem("sum", sum)
  localStorage.setItem("count", count)
}

function updateCart() {
  document.getElementById("sum").textContent += sum;
  document.getElementById("count").textContent += count;
  console.log(sum, count)
  let tbody = document.getElementById("tbody");

  for (let id in cart) {
    let item = cart[id];

    let tr = document.createElement('tr')

    let productTitle_td = document.createElement('td')
    productTitle_td.textContent = item.productTitle
    tr.appendChild(productTitle_td)


    let price_td = document.createElement("td");
    price_td.textContent = item.price;
    tr.appendChild(price_td);

    let qty_td = document.createElement("td");
    qty_td.textContent = item.qty;
    tr.appendChild(qty_td);

    tbody.appendChild(tr)
  }
}
updateCart()
