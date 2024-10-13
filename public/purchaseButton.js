let checkoutButton = document.getElementById("checkout-btn");

const stripe = Stripe('pk_test_51Q5gWj2Kfq7u5iFagDAegD5EM9pXX19nRooAAZ8lPtmO9QqARK9gDm36gwrPtAQUtfrETOQrXCl0ZJFqLXyjUzVJ00Fq4PuVRI');

checkoutButton.addEventListener("click", function(){

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
