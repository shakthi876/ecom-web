
const braintree = require("braintree");



const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "9n8qgjkwsnjz5jkq",
  publicKey: "4vmxycgkyfs5y5st",
  privateKey: "dd4609ba9f2cd3fe85488187b32da811"
});



exports.welcome = (req,res)=>{
    res.json({welcome:"Testng"})
}



exports.getToken = (req,res)=>{
   
    //generate the toekn and send
    gateway.clientToken.generate({},function(err, response) {

        if(err)
        {
            res.status(500).send(err)
        }
        else{
            //send token to client
            res.send(response)
        }
    
      });

}

exports.processPayment = (req,res)=>{
    console.log("haiii helo");
    let nonceFromTheClient = req.body.paymentMethodNonce 
    let amountFromClient = req.body.amount 

    gateway.transaction.sale({
        amount: amountFromClient,
        paymentMethodNonce: nonceFromTheClient,
        options: {
          submitForSettlement: true
        }
      }, function(err, result) {
          if(err)
          {
              console.log("error in payment boss");
              res.status(500).json(error)
          }
          else{
              res.json(result)
          }
      });
    
}
