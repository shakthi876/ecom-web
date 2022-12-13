const express = require('express')
const router = express.Router()
const {isAuthenticated,isSignedIn, isAdmin}= require("../controllers/auth")
const {getUserById,pushOrderInPurchaseList}=require("../controllers/user")
const {updateStockSold}=require("../controllers/product")
const { getOrderById, createOrder, getAllOrders, updateStatus, getOrderStatus, updateOrderedProducts, usersOrders } = require('../controllers/order')



//param
router.param("orderId",getOrderById)
router.param("userId",getUserById)

//routes
//create order
router.post("/order/create/:userId",isSignedIn,isAuthenticated,pushOrderInPurchaseList,updateStockSold,createOrder,updateOrderedProducts)

//get all orders
router.get("/order/all/:userId",isSignedIn,isAuthenticated,isAdmin,getAllOrders)
//getting orderStatus
router.get("/order/status/:userId",isSignedIn,isAuthenticated,isAdmin,getOrderStatus)
//updating status
router.put("/order/:orderIdc/:userId",isSignedIn,isAuthenticated,isAdmin,updateStatus)


//get users' orders
router.get("/orders/users/:userId",isSignedIn,isAuthenticated,usersOrders)

module.exports=router;