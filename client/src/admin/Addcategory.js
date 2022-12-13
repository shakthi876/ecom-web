import React from 'react'
import Base from '../core/Base'
import { useState } from 'react'
import { isAutheticated } from '../auth/helper'
import { Link } from 'react-router-dom'
import { createCategory } from './Helper/adminapicall'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from '@mui/material/Button';
import { Container } from '@mui/system'

const Addcategory = () => {
    const [name, setName] = useState()
    const [error,setError]=useState(false)
    const [success,setSuccess]=useState(false)

    const {user,token}=isAutheticated();
    const goBack =()=>{
        return(
        <div className="mt-5">

<Button color="primary" component={Link} to="/admin/dashboard/"  variant="outlined" startIcon={<ArrowBackIcon />}>
       Admin Home
</Button>
            



            {/* <Link className="btn btn-sm btn-dark mb-3" to="/admin/dashboard"> <ArrowBackIcon /> Admin Home</Link> */}
        </div>
        )
    }

    const handleChange=(e)=>{
        setError("")
        setName(e.target.value)
    }
    const handleClick =(e)=>{
        e.preventDefault();
        setError("")
        setSuccess(false)
//destructured user and token from isAuthenticated()
//{name} is object
//{name} because we used JSON.stingy in api call

        createCategory(user._id,token,{name})
        .then(data=>{
                if(data.error)
                {
                    setError(true)
                }
                else{
                    setError("")
                    setSuccess(true)
                    setName("")
                }
            }
        )
    }
    const successMsg =()=>{
        if(success)
        {
            return <h5 className='text-success text-center mt-3'>Category is created successfully :) </h5>
        }
    }
    const errorMsg =()=>{
        if(error)
        {
            return <h5 className='text-danger text-center mt-3'>Failed to create category :( </h5>
        }
    }
    const myCategoryform = ()=>{

        return(
        <form>
            <div className="form-group mt-3">
                <h3 className="h5">Enter the category</h3>
                <input type="text" className='form-control my-3' 
                onChange={handleChange}
                value={name} 
                autoFocus required placeholder='Enter your category'/>
                <center>

                <Button color='info' onClick={handleClick} variant='outlined'> Create Category</Button>

                {/* <button onClick={handleClick} className="btn btn-outline-primary">Create Category</button> */}
                </center>
               
            </div>
        </form>
        )
    }

  return (
   <>
   <Base title='Create Category here!' description='Add a new category for your T-Shirts'
   className='container p-1'>
       <Container>
       {goBack()}
       <div className="row bg-white rounded">
           <div className="col-md-8 offset-md-1">
               
           
               {successMsg()}
               {errorMsg()}
               {myCategoryform()} 
           </div>
       </div></Container>
   </Base>
   </>
  )
}

export default Addcategory