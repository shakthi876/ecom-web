const Product = require('../models/Product')
const formidable = require("formidable")
const _=require("lodash")
const fs = require("fs") //to access the path of file it default module in node js


exports.getProductId =(req,res,next,id)=>{
    Product.findById(id)
    .populate("category")
    .exec((err,product)=>{
        if(err)
        {
            return res.status(400).json({error:"Product Id not found in dB"})
        }
       req.product=product;
       next();
    })
}

exports.createProduct=(req,res)=>{
    let form = new formidable.IncomingForm(); //declare
    form.keepExtensions = true;
    //parse the form
    form.parse(req,(err,fields,file)=>{

        //err handling error
        if(err)
        {
            return res.status(400).json({error:"Error in file(image)"})
        }

        //handling field
        //validating fields
        //destructing the fields
        //category - restrict from front end, sold field take default value
        const {name,description,price,category,stock} = fields;//fields come from frontend
        
        if(!name || !description || !price || !category || !stock)
        {
            console.log(name,description,price,category,stock);
            return res.status(400).json({error:"Please include all the fields!!!"})
        }
        let product = new Product(fields) //create the objects

        //handling file
        if(file.photo){
            if(file.photo.size >3000000) //2MB -size restriction (2*1024*1024) = 3000000(app.)
            {
                return res.status(400).json({error:"Error in file size... 2MB is required"})
            }
        
            product.photo.data=fs.readFileSync(file.photo.filepath); //read and save the data
            product.photo.contentType = file.photo.mimetype; //saving type 
        }

        //save in dB
        product.save((err,product)=>{
            if(err){
                return res.status(400).json({error:"Saving T-shirt in dB is failed"+err})
            }
            res.json(product)
        })


    })

}

exports.getProduct=(req,res)=>{
    req.product.photo=undefined
    return res.json(req.product)
}

//middleware
exports.photo = (req,res,next)=>{
    if(req.product.photo.data)
    {
        //set at response header
        //key:Content-Type,value:req.product.photo.contentType
        res.set("Content-Type",req.product.photo.contentType)
        return res.send(req.product.photo.data)
    }
    next()
}

exports.deleteProduct =(req,res)=>{
//can do findidDelete from req.product._id check category 

    const product=req.product
    product.remove((err,product)=>{
        if(err)
        {
            return res.status(400).json({err:"Cannot delete"+err})
        }
        res.json(product.name+"Product deleted successfully!!!")
    })

}
exports.updateProduct =(req,res)=>{
    let form = new formidable.IncomingForm(); //declare
    form.keepExtensions = true;
    //parse the form
    form.parse(req,(err,fields,file)=>{

        //err handling error
        if(err)
        {
            return res.status(400).json({error:"Error in file(image)"})
        }

        //handling field
        //validating fields
        //destructing the fields
        //category - restrict from front end, Not use sold
        const {name,description,price,category,stock} = fields;//fields come from frontend
        console.log("fields are",fields)
        if(!name || !description || !price || !category || !stock)
        {
            console.log(name,description,price,category,stock);
            return res.status(400).json({error:"Please include all the fields!!!"})
        }

        //updation in code
        let product = req.product; //req.product comes from getProductId function
        product = _.extend(product,fields) //fields are moved to product

        //handling file
        if(file.photo){
            if(file.photo.size >3000000) //2MB -size restriction (2*1024*1024) = 3000000(app.)
            {
                return res.status(400).json({error:"Error in file size... 2MB is required"})
            }
        
            product.photo.data=fs.readFileSync(file.photo.filepath); //read and save the data
            product.photo.contentType = file.photo.mimetype; //saving type 
        }

        //save in dB
        product.save((err,product)=>{
            if(err){
                return res.status(400).json({error:"Updating of T-shirt product in dB is failed"+err})
            }
            res.json(product)
        })


    })
    
}

exports.getAllProducts=(req,res)=>{

    const limit = req.query.limit ? parseInt(req.query.limit): 8 ;
    const sortBy =  req.query.sortBy ? req.query.sortBy: "_id" ;
    //req.query comes from front end have & and =
    //req.query is always string need to convert into int use parseInt (in limit variable)

    Product.find()
    .select("-photo") //remove photo field
    .populate("category")
    .sort([[sortBy,"asc"]])
    .limit(limit)
    .exec((err,products)=>{
        if(err)
        {
            return res.status(400).json({error:"Failed to get all products"})
        }
        res.json(products)
    })

}

//middleware stock nd sold update both in bulkwrite
exports.updateStockSold = (req,res,next)=>{

    //dec the stock nd 
    //inc then sold in order's products

    let myOperations = req.body.order.products.map((prod)=>{
        return {
            updateOne:{ 
                filter:{_id: prod._id},
                //check
                update:{ $inc: {stock:-prod.count,sold:+prod.count} } //stock dec , sold inc
            }
        }
    })
    //bulkwrite(function,objects,callbacks)
    Product.bulkWrite(myOperations,{},(err,products)=>{
        if(err)
        {
            return res.status(400).json({error:"BulkOperations failed!!!"})
        }
    })
    next();
}

exports.getAllUniqueCategories=(req,res)=>{
    Product.distinct("category",{},(err,category)=>{
        if(err)
        {
            return res.status(400).json({error:"Category not found!!!"})
        }
        res.json(category)
    })
}


exports.getCount=(req,res)=>{
    Product.countDocuments((err,count)=>{
        if(err)
        {
            return res.status(400).json({error:"Unable to get the count of products"})
        }
        res.json(count)
    })
}

exports.productStockCount = (req,res)=>{
    var query = Product.find({_id:req.product}).select('stock -_id')
    query.exec(function(err,stockCount){
        if(err)
        {
            return res.status(400).json({error:"Unable to get the stock of"+ req.product+"'sproduct"})
        }
        res.json(stockCount)
    })
}