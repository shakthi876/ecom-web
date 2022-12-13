const express = require('express')
const router = express.Router()
const User = require("../models/User")
const {isAdmin,isAuthenticated,isSignedIn}= require("../controllers/auth")
const {getUser, getAllUsers, updateUser, userPurchaseList,getUserById} = require("../controllers/user");

//getting the userID(parameter) parameter extractor
router.param('userId',getUserById)
 

//req.profile needed for isSignedIn,isAuthenticated...it comes from router.param
router.get("/user/:userId",isSignedIn,isAuthenticated,getUser) //follow this order of controller
//router.get("/users/getAll",getAllUsers)

router.put("/user/:userId",isSignedIn,isAuthenticated,updateUser)
router.put("/order/user/:userId",isSignedIn,isAuthenticated,userPurchaseList)



module.exports=router