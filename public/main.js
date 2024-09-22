const changeDiscountButton = document.querySelector("#changeDiscountButton")
changeDiscountButton.addEventListener('click', toggleDisplay)

function toggleDisplay() {
    document.getElementById("onSaleForm").classList.toggle('hidden')  
}


