const User = require("../models/User");
const Category = require("../models/Category")
const Product = require('../models/Product')


exports.getCategoryById=(req,res,next,id)=>{
    Category.findById(id).exec((err,category)=>{
        if(err)
        {
            return res.status(400).json({error:"Cannot find the category in DB!!!"})
        }
        req.category=category
        next();
    })
   
}

exports.createCategory =(req,res)=>{
    console.log("req is",req.body);
    const category = new Category(req.body); //create object
    category.save((err,category)=>{
        if(err)
        {
            return res.status(400).json({error:"Not able to save in Db"})
        }
        res.json(category)

    });

}
exports.getCategory=(req,res)=>{
    const category = req.category
    return res.json(category); //getCategoryById will return req.category

}

exports.getAllCategory=(req,res)=>{
    Category.find().exec((err,categories)=>{
        if(err)
        {
            return res.status(400).json({error:"Not able fetch categories in Db"})
        }
        res.json(categories)

    })

}
exports.updateCategory=(req,res)=>{
   /*  const category = req.category; //getCategoryById will send req.category
    category.name = req.body.name; //req.body.name from front end */
    const id = req.category._id;
    const updateCate = req.body.formValues;



/* 
    console.log("id is", req.category._id);
    console.log("name is",req.body.formValues); */



    Category.findByIdAndUpdate(id,{name:updateCate},function(err,updateCateg){
        if(err)
        {
            return res.status(400).json({error:"Cannot update the Category"})
        }
        res.json(updateCateg)
    })

 /*    category.save((err,updatedCategory)=>{
        if(err)
        {
            return res.status(400).json({error:"unable to update the category!!!"})
        }
        res.json(updatedCategory)

    }) */

}

/* Alternative fot delete
exports.deleteCategory=(req,res)=>{
   console.log("cat id",req.category._id);
    Category.findByIdAndDelete({_id: req.category._id},
        (err,deleteCategory)=>{
            if(err){
                return res.status(400).json({
                    error:"fail to obtain category"
                })
            }

            res.json({
                message: "deleted successfully!!"
            });

        }
        )

} */


 exports.deleteCategory=(req,res)=>{
   const category = req.category;
   const prodCatId = req.category.id
   console.log("id",req.category.id);
   category.remove((err,category)=>{
       if(err)
       {
           return res.status(400).json({error:"Unable to delete the category!!!"})
       }
       res.json({message:`${category.name} is deleted successfully!!!`})
   })

   Product.deleteMany({category: prodCatId }).then(function(){
    console.log("Data deleted"); // Success
}).catch(function(error){
    console.log(error); // Failure
});


}


exports.getCateCount=(req,res)=>{
    Category.countDocuments((err,count)=>{
        if(err)
        {
            return res.status(400).json({error:"Unable to get the count of products"})
        }
        res.json(count)
    })
}