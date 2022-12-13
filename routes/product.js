const express = require('express')
const router = express.Router()
const {isSignedIn,isAdmin,isAuthenticated}=require("../controllers/auth")
const {getUserById}= require("../controllers/user")
const { getProductId, createProduct, getProduct, photo, deleteProduct, updateProduct, getAllProducts, getAllUniqueCategories, getCount, productStockCount } = require('../controllers/product')
const { check} = require("express-validator");

//param
router.param('productId',getProductId)
router.param('userId',getUserById)

//routes
//create product
router.post("/product/create/:userId",isSignedIn,isAuthenticated,isAdmin,createProduct)

//read product
router.get("/product/:productId",getProduct)
router.get("/product/photo/:productId",photo)
router.get("/count/product",getCount)
router.get("/stock/product/:productId",productStockCount)


//delete and update
router.delete("/product/delete/:productId/:userId",isSignedIn,isAuthenticated,isAdmin,deleteProduct)
router.put("/product/update/:productId/:userId",isSignedIn,isAuthenticated,isAdmin,updateProduct)

//listing route
router.get("/products",getAllProducts)

router.get("/products/categories",getAllUniqueCategories)
module.exports=router