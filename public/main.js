const changeDiscountButton = document.getElementById("changeDiscount")
changeDiscountButton.addEventListener('click', toggleDisplay)

function toggleDisplay() {
    document.getElementById("onSaleForm").classList.toggle('hidden')  
}
