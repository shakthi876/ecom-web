const express = require('express')
const router = express.Router()
const {signup,signin, signout, isSignedIn, isAuthenticated} = require("../controllers/auth")
const { check} = require("express-validator");

//check the fields(name,email,password) and send it to function signup
router.post('/signup',

[
    check("name").not().isEmpty().withMessage("Username is required!!!"),
    check("name").trim().not().isEmpty().isLength({min:3}).withMessage("Name should be at least 3 character")/*error msg*/, 
    check("email").not().isEmpty().withMessage("Email-Id is required!!!"),
    check("email").isEmail().withMessage("Enter valid email address"),
    check("password").not().isEmpty().withMessage("Password is required!!!"),
    check("password").not().isEmpty().isLength({min:3}).withMessage("Password should be at least 3 character"),
    check("confirmpassword").not().isEmpty().withMessage("Confirm password is required!!!"),
    check("confirmpassword").custom((value,{req})=>{
        if(value !== req.body.password)
        {
            throw new Error("Password not matched. Try Again!!!")
        }
        return true
    })
]
,signup)

router.post('/signin',
[
    check("email").not().isEmpty().withMessage("Email is required!!!"),
    check("email").isEmail().withMessage("Enter Valid Email Address!!!"),
    check("password").not().isEmpty().withMessage("Password is required!!!"),
    check("password").isLength({min:3}).withMessage("Email and password not matched")
]
,signin)

router.get("/signout",signout)

/* router.get("/testroute",isSignedIn,isAuthenticated,(req,res)=>{
    console.log(req.auth);
    res.json(req.auth)
}) */


module.exports=router