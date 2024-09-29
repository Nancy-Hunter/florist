module.exports ={
getTransactionSuccessful: (req,res) =>{
    res.render("success.ejs");
},



getTransactionCancelled:(req,res) =>{
    res.render("cancelled.ejs");
}
}
