const changeDiscountButton = document.getElementById("changeDiscountButton")
changeDiscountButton.addEventListener('click', toggleDisplay)

function toggleDisplay() {
    console.log('hii')
    document.getElementById("onSaleForm").classList.toggle('hidden')  
}

