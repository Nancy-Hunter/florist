
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
//make a object


// // Bind click event to document
// document.addEventListener('click', handleClick);
// // Event handler passes Event Object by default
// function handleClick(event) {
//   // Reference the tag the user clicked
//   const clicked = event.target;
//   // If the user clicked a <button>
//   if (clicked.matches('button')) {
//     /*
//     Find the element that proceeds the clicked <button> and toggle
//     .show class on it.
//     */
//     clicked.nextElementSibling.classList.toggle('show');
//   }
// }
