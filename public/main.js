
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

