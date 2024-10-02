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
    editButton.innerHTML = `<span data-id="${id}" class ="editCart"><svg xmlns="http://www.w3.org/2000/svg"     width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
    </svg> Edit</span>`
    tr.appendChild(editButton)
    
    let deleteButton = document.createElement("td")
    deleteButton.innerHTML = `<span data-id="${id}" class ="deleteCart"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
    </svg> Delete</span>`
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

