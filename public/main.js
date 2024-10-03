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
    sum = parseInt(localStorage.getItem("sum"));
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
  sum += price;

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
  document.getElementById("sum").textContent += sum;
  document.getElementById("count").textContent += count; 
  let tbody = document.getElementById("tbody");
  
  for (let id in cart) {
    let item = cart[id];

    let tr = document.createElement('tr')
    let img_td = document.createElement('td');
    img_td.innerHTML =`<img src= '${item.image}' alt = 'bouquet' class='cartImage'>`
    tr.appendChild(img_td)
    
    let productTitle_td = document.createElement('td')
    productTitle_td.textContent = item.productTitle
    tr.appendChild(productTitle_td)
    
    
    let price_td = document.createElement("td");
    price_td.textContent = item.price;
    tr.appendChild(price_td);
    
    let qty_td = document.createElement("td");
    qty_td.textContent = item.qty;
    tr.appendChild(qty_td);
    
    let editButton = document.createElement("td")
    editButton.innerHTML = `<span data-id="${id}" class ="editCart"><i data-id="${id}" class = "editCart fas fa-pencil-alt px-2"></i>Edit</span>`
    tr.appendChild(editButton)
    
    let deleteButton = document.createElement("td")
    deleteButton.innerHTML = `<span data-id="${id}" class ="deleteCart"><i data-id="${id}" class="deleteCart fa fa-times px-2 "></i>Delete</span>`
    tr.appendChild(deleteButton)
    
    
    tbody.appendChild(tr)
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
      sum -= item.qty * item.price
      count -= item.qty
      delete cart[id]
    }
  }
  localStorage.setItem("sum", sum)
  localStorage.setItem("count", count)
  localStorage.setItem("cart", JSON.stringify(cart))
  window.location.reload()
}

//Adds edit buttons in checkout page
const editFromCartButton = document.querySelectorAll(".editCart")

editFromCartButton.forEach(function (el) {
  el.addEventListener('click', editFromCart)
})
function editFromCart(event) {
  console.log('clicked edit button', event.target.dataset.title)
}


//Image links from index to category pages
const sympathy_image_link = document.querySelector(".sympathy_image_class")
const Best_Seller_Link = document.querySelector(".Best_Seller_image_class")
const anniversary_image_link = document.querySelector(".anniversary_image_class")
const birthday_image_link = document.querySelector(".birthday_image_class")
const congratulations_link = document.querySelector(".congratulations_images_class")



sympathy_image_link.addEventListener('click', () =>{
  window.location.href = '/flowersFor/sympathy'
})

Best_Seller_Link.addEventListener('click',() =>{
  window.location.href = '/flowersFor/best%20Sellers'
})

anniversary_image_link.addEventListener('click',() =>{
  window.location.href = '/flowersFor/anniversary'
})

birthday_image_link.addEventListener('click',() =>{
  window.location.href = '/flowersFor/birthday'
})

congratulations_link.addEventListener('click',() =>{
  window.location.href ='/flowersFor/congratulations'
})

