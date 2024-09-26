
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

const image = document.querySelectorAll(img)

image.addEventListener('click', () =>{
  window.location.href
})

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
