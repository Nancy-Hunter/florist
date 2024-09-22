const changeDiscountButton = document.getElementById("changeDiscountButton")
changeDiscountButton.addEventListener('click', toggleDisplay)

function toggleDisplay() {
    document.getElementById("onSaleForm").classList.toggle('hidden')  
}


