// set up for button toggle in admin/profile page
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
    sum = +JSON.parse(localStorage.getItem("sum")).toFixed(2);
}

if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"));
}

//update Cart in local storage at post.ejs

const addToCartButton = document.querySelectorAll(".cartButton")

addToCartButton.forEach(function (el) {
  el.addEventListener('click', addToCart)
})
function addToCart(event) {
  let price = Number(event.target.dataset.price);
  let productTitle = event.target.dataset.title;
  let id = event.target.dataset.id;
  let image = event.target.dataset.img

if (id in cart) {
  cart[id].qty++;
} else {
  let cartItem = {
      image : image,
      productTitle: productTitle,
      price: price,
      qty: 1
  };
  cart[id] = cartItem
}
  count++;
  sum += +price;

  localStorage.setItem("cart", JSON.stringify(cart));
  localStorage.setItem("sum", sum)
  localStorage.setItem("count", count)
  let shoppingCart = document.querySelector('.shopping-cart')
  shoppingCart.classList.add('active');
  shoppingCart.setAttribute('data-product-count', count)
  setTimeout(() => {
    shoppingCart.classList.remove('active');
}, 1000)
}

//Updates table in checkout
function updateCart() {
  document.getElementById("sum").textContent = Number.parseFloat(sum).toFixed(2)
  document.getElementById("count").textContent = count;
  let tbody = document.getElementById("tbody");

  if (Object.keys(cart).length === 0) {
    let tr = document.createElement('tr')
    let emptyCart= document.createElement('td')
    emptyCart.textContent =`Your Cart is Currently Empty`
    emptyCart.setAttribute('colspan', 4)
    tr.appendChild(emptyCart)

    tbody.appendChild(tr)
  } else {
    for (let id in cart) {
      let item = cart[id];
      let tr = document.createElement('tr')
  
      let img_td = document.createElement('td');
      img_td.innerHTML =`<a href='/post/${id}'><img src= '${item.image}' alt = 'bouquet' class='cartImage'></a>`
      tr.appendChild(img_td)
  
      let productTitle_td = document.createElement('td')
      productTitle_td.innerHTML = `<a href='/post/${id}' class='brown'>${item.productTitle}</a>`
      tr.appendChild(productTitle_td)
  
  
      let price_td = document.createElement("td");
      price_td.textContent = Number.parseFloat(item.price).toFixed(2);
      tr.appendChild(price_td);
  
      let editButton = document.createElement("td")
      editButton.innerHTML = `
        <select class="p-2" name = 'editQTY' data-id="${id}"
            onchange="editFromCart(this, +this.value)">
          <option>${item.qty}</option>
          <option value=1>1</option>
          <option value=2>2</option>
          <option value=3>3</option>
          <option value=4>4</option>
          <option value=5>5</option>
          <option value=6>6</option>
          <option value=7>7</option>
          <option value=8>8</option>
          <option value=9>9</option>
          <option value=10>10</option>
      </select>`
      tr.appendChild(editButton)
  
      let deleteButton = document.createElement("td")
      deleteButton.innerHTML = `<span data-id="${id}" class ="deleteCart"><i data-id="${id}" class="deleteCart fa fa-times px-2 " aria-hidden="true"></i>Delete</span>`
      tr.appendChild(deleteButton)
  
      tbody.appendChild(tr)
    }
    let taxesTR = document.createElement('tr')
    let shippingTR = document.createElement('tr')
    let discountTR = document.createElement('tr')

    let taxes = document.createElement('td');
    taxes.textContent =`taxes?`
    taxesTR.appendChild(taxes)

    let shipping = document.createElement('td');
    shipping.textContent =`shipping?`
    shippingTR.appendChild(shipping)

    let discount = document.createElement('td');
    discount.textContent =`discount?`
    discountTR.appendChild(discount)

    tbody.appendChild(taxesTR)
    tbody.appendChild(shippingTR)
    tbody.appendChild(discountTR)
  }
}
updateCart()


//Adds delete buttons in checkout page
const deleteFromCartButton = document.querySelectorAll(".deleteCart")

deleteFromCartButton.forEach(function (el) {
  el.addEventListener('click', deleteFromCart)
})
function deleteFromCart(event) {
  let cart = JSON.parse(localStorage.getItem("cart"))
  let productID = event.target.dataset.id
  for (let id in cart) {
    let item = cart[id]
    if (id == productID) {
      sum -= +item.qty * Number.parseFloat(item.price).toFixed(2)
      count -= +item.qty
      delete cart[id]
    }
  }
  localStorage.setItem("sum", sum)
  localStorage.setItem("count", count)
  localStorage.setItem("cart", JSON.stringify(cart))
  window.location.reload()
}

//edits quantity on cart checkout
function editFromCart(selectObj, value) {
   let cart = JSON.parse(localStorage.getItem("cart"))
   let productID = selectObj.dataset.id
   for (let id in cart) {
     let item = cart[id]
     if (id == productID) {
       sum -= item.qty * Number.parseFloat(item.price).toFixed(2)
       count -= item.qty
       item.qty = value
       sum += item.qty * Number.parseFloat(item.price).toFixed(2)
       count += item.qty
     }
   }
   localStorage.setItem("sum", sum)
   localStorage.setItem("count", count)
   localStorage.setItem("cart", JSON.stringify(cart))
   window.location.reload()
 }
