import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import Base from '../core/Base'
import { Link, Navigate,useParams} from 'react-router-dom'
import { getAProduct, getAllCategories,updateProduct } from './Helper/adminapicall';
import {isAutheticated} from "../auth/helper/index"
import { Container } from '@mui/system';
import Button from '@material-ui/core/Button';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const Updateproduct = () => {

const [name2,setName2]=useState("")
const [description2,setDescription2]=useState("")
const [price2,setPrice2]=useState("")
const [category2,setCategory2]=useState("")
const [stock2,setStock2]=useState("")
const [loading,setLoading]=useState(false)




    const navigate = useNavigate();
    const {productId} = useParams();
    const {user,token}=isAutheticated()



    const [values,setValues]=useState({
        name:"",
        description:"",
        price:"",
        stock:"",
        photo:"",
        categories:[],
        category:"",
        error:"",
        createdProduct:"",
        getARedirect:false,
        formData:"" 
    });

    const {name,description,price,stock,categories,category,error,createdProduct,getARedirect,formData} = values


   /*  //Two promise
    const preLoad = (productId) => {
        Promise.all([getAProduct(productId), getAllCategories()]).then(
          ([product, categories]) => {
            let error = product.error || categories.error;
    
            if (error) {
              setValues({ ...values, error: error });
            } else {
              setValues({
                ...values,
                name: product.name,
                description: product.description,
                price: product.price,
                stock: product.stock,
                categories: categories,
                formData: new FormData()
              });
            }
          }
        );
      }; */

      const preLoad = productId => {
       getAProduct(productId).then(data => {
          //console.log(data);
          if (data.error) {
            setValues({ ...values, error: data.error });
          } else {
            preloadCategories();
            setValues({
              ...values,
              name: data.name,
              description: data.description,
              price: data.price,
              category: data.category._id,
              stock: data.stock,
              formData: new FormData()
            });
            setName2(data.name)
            setDescription2(data.description)
            setPrice2(data.price)
            setCategory2(data.category._id)
            setStock2(data.stock)

          }
          setLoading(true)
          
        });
      };
    
      const preloadCategories = () => {
        getAllCategories().then(data => {
          if (data.error) {
            setValues({ ...values, error: data.error });
          } else {
            setValues({
              categories: data,
              formData: new FormData()
            });
          }
        });
      };



    useEffect(()=>{
     preLoad(productId)
    
    },[])

    const testing=()=>{
      formData.set("name","shakthi")
    }
    const onSubmit = (event)=>{
   
        event.preventDefault();
        setValues({...values,error:"",loading:true})
       

        if(!formData.get("name"))
        {
          formData.set("name",name2)
        }
        if(!formData.get("description"))
        {
          formData.set("description",description2)
        }
        if(!formData.get("price"))
        {
          formData.set("price",price2)
        }
        if(!formData.get("stock"))
        {
          formData.set("stock",stock2)
        }
        if(!formData.get("category"))
        {
          formData.set("category",category2)
        }
  
        updateProduct(productId,user._id,token,formData).then(data=>{
    console.log("tell",data.error)
            if(data.error)
            {
                setValues({...values,error:data.error})
            }
            else{
                setValues({...values,name:"",description:"",price:"",photo:"",stock:"",loading:false,getARedirect:true,createdProduct:data.name})
                setCategory2("")
              }
        })

    }

    const successMsg=()=>{
        return(
            <div className="alert alert-success mt-3" style={{display: createdProduct ?"":"none"}}>

            <h4 className='text-center'>{createdProduct} product updated successfully!!! :) </h4>
            {redirectToHome()}
            </div>
        )

    }
    
    const errorMsg=()=>{
        if(error)
        {
            return <h4 className='alert alert-danger mt-3'>Failed to update product :( </h4>
        }

    }

    const redirectToHome =()=>{
      if(getARedirect)
      {
        setTimeout(()=>{
          navigate("/admin/dashboard/manage/products",{replace:true}) //replace the url and navigate to "/admin/manage/products"
        },2000)
      }
        
    }

    const handleChange =name=>event=>{
       
        const value = name === "photo" ? event.target.files[0] : event.target.value
        formData.set(name,value);
        setValues({...values,[name]:value})
        

    }
    const createProductForm = () => (
        <form >
          <span>Post photo</span>
          
          <div className="form-group">
            <label className="btn btn-block btn-primary">
              <input
                onChange={handleChange("photo")}
                type="file"
                name="photo"
                accept="image"
                placeholder="choose a file"
              />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="">Product Name</label>
            <input
              onChange={handleChange("name")}
              name="name"
              className="form-control"
              placeholder="Enter Product name"
              value={name}
              required
            />
          </div>
          <div className="form-group">
          <label htmlFor="">Product Description</label>

            <textarea
              onChange={handleChange("description")}
              name="description"
              className="form-control"
              placeholder="Product Description"
              value={description}
              required
            />
          </div>
          <div className="form-group">
          <label htmlFor="">Product Price</label>

            <input
              onChange={handleChange("price")}
              type="number"
              name='price'
              className="form-control"
              placeholder="Product Price"
              value={price}
              required
            />
          </div>
{/* <div className="form-group">

  <label htmlFor="">Product's Category</label>
  {categories.find((cate,index)=>{
    return(
    <input type="text" value={cate._id==category2} readOnly />
    )
  })}
  
</div> */}



<div>
  {categories.map((cate,ind) => (
    cate._id === category2
      ? (
        <div className="form-group">
          <label htmlFor="">{name2} product's Category ( Old )</label>
      <input className="form-control" value={cate.name} readOnly />
      </div>
      )
      : null
  ))}
</div>




          <div className="form-group">

            <label htmlFor="">Choose Category ( To Update )</label>
            <select
              onChange={handleChange("category")}
              name='category'
              className="form-control"
            
              placeholder="Product's Category"
            >
              <option>Select Product's Category</option>

                {categories && categories.map((cate,index)=>{
                    return(
                        <option key={index} value={cate._id}>{cate.name}</option>
                    )
                })}

              
            </select>
          </div>
          <div className="form-group">
          <label htmlFor="">Available Quantity</label>

            <input
              onChange={handleChange("stock")}
              type="number"
              name='stock'
              className="form-control"
              placeholder="Quantity"
              required
              value={stock}
            />
          </div>
          
          <button type="submit" onClick={onSubmit} className="btn btn-outline-info btn-block mb-3">
            Update Product
          </button>
        </form>
      );


  return (
    <>
    {loading ?(<>
      <Base title='Create your product here!!!' description='Welcome to T-shirts creation' className='container p-4'>

<div>

  <Container>
  <Button color="primary" onClick={() => navigate(-1)}  variant="outlined" startIcon={<ArrowBackIcon />}>
  Go Back
</Button>


   
  </Container>
{/* <button className="btn btn-sm btn-dark mb-3" onClick={() => navigate(-1)}>Go back</button> */}
  
</div>
<div className="row rounded">
    <div className="col-md-8 offset-md-2">
        {successMsg()}
        {errorMsg()}
        {!getARedirect && createProductForm() }
      
    </div>
</div>
</Base></>):(<>
      <div className="d-flex justify-content-center spinner-center " style={{backgroundColor:"#E9ECEF"}}>
  <div className="spinner-border text-center " role="status">
  <span className="sr-only">Loading...</span>
    </div>
    </div>
    
    </>)}
    
    </>
  )
}

export default Updateproduct