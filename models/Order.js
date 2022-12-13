const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema


const orderSchema = new mongoose.Schema({
    orderedProducts:{
        type:Array,
        default:[]
    },
    transaction_id:{},
    amount:{type:Number},
    status:{
        type:String,
        default:"Received",
        //enum:["Cancelled","Delivered","Shipped","Processing","Received"]
    },
    shippingAddress:{type:String},
    contactNumber:{type:Number},
    updated:Date,
    user:{
        type:ObjectId,
        ref:"User"
    },
    createdDate: {type: Date, default: Date.now}
},{timestamps:true})

const Order = mongoose.model("Order",orderSchema)

module.exports={
    Order
}