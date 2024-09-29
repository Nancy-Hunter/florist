let purchaseButton = document.querySelector(".purchaseButton")
const stripe = Stripe("")

purchaseButton.forEach(button => {

button.addEventListener("click", function(){

    fetch("/api/stripe",{
        method: "POST",
    })
      .then(function(response){
        return response.json()
      })
      .then(function (session){
        return stripe.redirectToCheckout({sessionId: session.id});
      })
      .then(function(result){

        if(result.error){
            alert(result.error.message);
        }
    })
    .catch(function(error){
        console.error("Error:",error);
    });


    });
});
