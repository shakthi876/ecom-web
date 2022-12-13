const User = require("../models/User");
const Order = require("../models/Order")


//1. Get a user
//2. Get all user
//3. Update user
//4. Get the user's order
//5. Middleware to push purchases array


//Getting user based on Id
exports.getUserById=(req,res,next,id)=>{
  User.findById(id).exec((err,user)=>{
    if(err || !user)
    {
        return res.status(400).json({error: "UserId not found in database"})
    }
    req.profile=user //refer isAuthenticated
  
    next(); //must be there
})
}


//1
exports.getUser = (req,res)=>{
    //undefined will removed the encryPass nd salt in response
    req.profile.encry_password=undefined;
    req.profile.salt=undefined;
    return res.status(200).json(req.profile)
}

//2
/* 
exports.getAllUsers=(req,res)=>{
    User.find((err,user)=>{
        if(err ||!user){
            return res.status(400).json({error: "User not found in database"})
        }
        return res.json(user)
    })
} */

//3
exports.updateUser = (req,res)=>{
 
    User.findByIdAndUpdate(
        //req.profile has user (from router.param)
        { _id:req.profile._id },
        {$set: req.body},
        {new:true, useFindAndModify:false}
        //can add callback here or write exec()
        ).exec((err,user)=>{
            if(err ||!user){
                return res.status(400).json({error: "Not Authorized to update this"})
            }
            user.encry_password=undefined;
            user.salt=undefined;
            return res.json(user)

        })
      
      }



//4.
 //order purchased by user, pulling the information from order model(joins)
exports.userPurchaseList = (req,res)=>{
    Order.find({user:req.profile_id})
    .populate("user","_id name")//populate the user in order model,
    .exec((err,order)=>{
        if(err){
            return res.status(400).json({error: "No order found in this account"})
        }
    
        return res.json(order)})
}

//5.
//middleware to create the purchase of Array
exports.pushOrderInPurchaseList = (req, res, next) => {
    let purchases = [];
    const defaultQuantity =1;
    //order.products,order.amount,order.transaction_id is coming from front end

    req.body.order.products.forEach(product => {
      purchases.push({
        _id: product._id,
        name: product.name,
        description: product.description,
        category: product.category,
        quantity: defaultQuantity,
        productPrice:product.price,
        overallAmount: req.body.order.amount,
        transaction_id: req.body.order.transaction_id
      });
    });
    //store it in DB
    User.findOneAndUpdate(
      { _id: req.profile._id },
      { $push: { purchases: purchases } },
      { new: true },
      (err, purchases) => {
        if (err) {
          return res.status(400).json({
            error: "Unable to save purchase list"
          });
        }
        next(); // must have for middleware
      }
    );
  };
  