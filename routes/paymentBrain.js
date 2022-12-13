const express = require('express')
const { welcome, getToken, processPayment } = require('../controllers/paymentBrain')
const router = express.Router()


const {isAuthenticated,isSignedIn}= require("../controllers/auth")


const { getUserById } = require('../controllers/user')

router.param("userId",getUserById)

router.get("/payment/gettoken/:userId",isSignedIn,isAuthenticated,getToken)
router.post("/payment/braintree/:userId",isSignedIn,isAuthenticated,processPayment)


router.get("/testing",welcome)
module.exports=router;