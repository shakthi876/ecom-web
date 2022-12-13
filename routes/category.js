const express = require('express')
const router = express.Router()
const User = require("../models/User")
const {isAdmin,isAuthenticated,isSignedIn}= require("../controllers/auth")
const {getUserById}=require("../controllers/user")
const {getCategoryById,getAllCategory, createCategory, getCategory, updateCategory, deleteCategory, getCateCount} = require("../controllers/category")

//params
router.param("userId",getUserById)
router.param("categoryId",getCategoryById)


//routes
//create
router.post("/category/create/:userId",isSignedIn,isAuthenticated,isAdmin,createCategory) //follow the middleware orders

//read
router.get("/category/:categoryId",getCategory)
router.get("/categories",getAllCategory)
router.get("/count/category",getCateCount)
//update
router.put("/category/:categoryId/:userId",isSignedIn,isAuthenticated,isAdmin,updateCategory)

//delete
router.delete("/category/:categoryId/:userId",isSignedIn,isAuthenticated,isAdmin,deleteCategory)


module.exports = router;