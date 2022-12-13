import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import Base from '../core/Base'
import { Link, Navigate } from 'react-router-dom'
import { categoriescCount, createProduct, getAllCategories } from './Helper/adminapicall';
import {isAutheticated} from "../auth/helper/index"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from '@mui/material/Button';







const Addproduct = () => {

const [categoriesccCount,setCategoriesccCount]=useState(0)
const [loading,setLoading]=useState(false)

  const navigate = useNavigate();
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

    const preLoad = ()=>{
        getAllCategories().then(data=>{
            console.log("data",data);
            if(data.error)
            {
                setValues({...values,error:data.error})
            }
            else{
                setValues({...values,categories:data,formData:new FormData()})
               
            }
            setLoading(true)
        })

       categoriescCount().then(data=>{
          if(data.error)
          {
            console.log("error",data.error);
          }
          else{
            setCategoriesccCount(data)
          }
        }) 
    

    }


    useEffect(()=>{
        preLoad()
    },[])

    const submitForm =event =>{
        event.preventDefault();
        
        setValues({...values,error:""})//,loading:true
        setLoading(true)
        createProduct(user._id,token,formData).then(data=>{
            if(data.error)
            {
                setValues({...values,error:data.error})
            }
            else{
                setValues({...values,name:"",description:"",price:"",photo:"",stock:"",createdProduct:data.name,getARedirect:true}) //,loading:false
                setLoading(true)
              }
        })

    }

    const successMsg=()=>{
        return(
            <div className="alert alert-success mt-3" style={{display: createdProduct ?"":"none"}}>

            <h4 className='text-center'>{createdProduct} product created successfully!!! :) </h4> {redirectToHome()}
            </div>
        )

    }
    
    const errorMsg=()=>{
        if(error)
        {
            return (
            <h5 className='alert alert-danger mt-3'> {error} <br/>Failed to create product :( </h5>
            )
        }

    }

    const redirectToHome =()=>{
      if(getARedirect)
      {
        setTimeout(()=>{
          navigate("/admin/dashboard/",{replace:true}) //replace the url and navigate to "/admin/manage/products"
        },2000)
      }
        
    }

    const handleChange =name=>event=>{
       
        const value = name === "photo" ? event.target.files[0] : event.target.value
        formData.set(name,value);
        setValues({...values,[name]:value})
        

    }
    const createProductForm = () => 
     {
return(
<>
{categoriesccCount===0 ?(
<h4 className='text-danger text-center'>Please create Category. Category is Empty!!! 
<Link to="/admin/create/category" replace>Create Category </Link> 
</h4> ):(
<form onSubmit={submitForm}>
          <span>Post photo</span>
          <div className="form-group">
            <label className="btn btn-block btn-primary">
              <input
                onChange={handleChange("photo")}
                type="file"
                name="photo"
                accept="image"
                placeholder="choose a file"
                required
              />
            </label>
          </div>
         
          <div className="form-group">
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
            <input
              onChange={handleChange("price")}
              name='price'
              min="1"
              type="number"
              className="form-control"
              placeholder="Product Price"
              value={price}
              required
            />
          </div>
         
          <div className="form-group">
            <select
              onChange={handleChange("category")}
              name='category'
              className="form-control"
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
            <input
              onChange={handleChange("stock")}
              required
              type="number"
              name='stock'
              min="1"
              className="form-control"
              placeholder="Quantity"
              value={stock}
            />
          </div>
         
          <button type="submit" className="btn btn-block btn-outline-info mb-3">
            Create Product
          </button>
        </form>)
        }
        </>
        
      )
              }


  return (
    <>
    {loading ? ( <>
      <Base title='Create your product here!!!' description='Welcome to T-shirts creation' className='container p-4'>

<div>
<Button color="primary" component={Link} to="/admin/dashboard/"  variant="outlined" startIcon={<ArrowBackIcon />}>
Admin Home
</Button>
    {/* <Link className="btn btn-sm btn-dark mb-3" to="/admin/dashboard">Admin Home</Link> */}
</div>
<div className="row rounded">
    <div className="col-md-8 offset-md-2">
        {successMsg()}
        {errorMsg()}
        {!getARedirect &&  createProductForm()}
       
    </div>
</div>
</Base>
    </>):( <>
      <div className="d-flex justify-content-center spinner-center " style={{backgroundColor:"#E9ECEF"}}>
  <div className="spinner-border text-center " role="status">
  <span className="sr-only">Loading...</span>
    </div>
    </div>
    
    </> ) }
    
    
    </>
  )
}

export default Addproduct