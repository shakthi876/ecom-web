
const { request } = require("express");
const {Order,ProductCart} = require("../models/Order") //as two models are exported use { } in LHS

exports.getOrderById = (req,res,next,id)=>{
    Order.findById(id)
    .populate("products.product","name price") //products.product from front end,taking one product
    .exec((err,order)=>{
        if(err)
        {
            return res.status(400).json({error:"Can't find Order in dB"+err})
        }
        req.order=order;
        next();
    })
  
}

exports.createOrder =(req,res,next) =>{
    req.body.order.user=req.profile; //Get the user details from req.profile(getUserById) store it in .user of req.body.order
    //console.log("Testing for failed payments req.body",req.body);
    //console.log("Testing for failed payments req.body.order.products",req.body.order.products);
    

    const order = new Order(req.body.order) //create order with req.body.order object
    order.save((err,order)=>{
        if(err)
        {
            return res.status(400).json({error :"Failed to save order in dB"+err})
        }
        
      //res.json(order)
      req.updateOrderId = order.id
        next();
    });

    
}

exports.updateOrderedProducts = (req,res)=>{

    let purchases = [];
    const defaultQuantity =1;
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
      console.log("purchases are ",purchases);
      console.log("user details",req.updateOrderId);
    Order.findOneAndUpdate(
        { _id: req.updateOrderId },
        { $push: { orderedProducts: purchases } },
        { new: true },
        (err, updatedOrder) => {
          if (err) {
            return res.status(400).json({
              error: "Unable to save purchase list in order dB"
            });
          }
         // res.json(updatedOrder)
        }
      );

}



exports.getAllOrders =(req,res)=>{
    Order.find()
    .populate("user","_id name")
    .exec((err,order)=>{
        if(err)
        {
            return res.status(400).json({error :"Error in getting all orders"+err})
        }
        //console.log("orders are ",order);
        res.json(order)
    })

}

//Admin - get status / update status
exports.getOrderStatus =(req,res)=>{
    res.json(Order.schema.path("status").enumValues) //getting enum-values 

}

//check this
exports.updateStatus=(req,res)=>{
    //const id = req.body.orderId;
   // const id = req.order;
     //const id= req.param.orderIdc;
     const id= req.params.orderIdc
     console.log("Id recieved is....",id);
     console.log("status revid is....",req.body.status);

    const updatedStatus=req.body.status;
    Order.findByIdAndUpdate(id,{status:updatedStatus},function(err,order){
        if(err)
        {
            return res.status(400).json({error:"Cannot update the order status"})
        }
        res.json(order)
    })


    /* Order.update(
        {_id:req.body.orderId},
        {$set:{status:req.body.status}}
    ).exec((err,order)=>{
        if(err)
        {
            return res.status(400).json({error:"Cannot update the order status"})
        }
        req.json(order)
    }) */
}


exports.usersOrders = (req,res)=>{
    //console.log("userId",req.profile);
    Order.find({user:req.profile}, 'transaction_id amount status orderedProducts createdDate', function(err,result){
            if(err)
            {
                return res.status(400).json({error:"Cannot fetch the order status"})
            }
            res.json(result)
    })
}