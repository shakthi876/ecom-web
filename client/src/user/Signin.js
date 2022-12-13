import React from 'react'
import Base from '../core/Base'
import { useState } from 'react'
import {signin,authenticate,isAutheticated} from "../auth/helper"
import { Link,Navigate } from 'react-router-dom'
const Signin = () => {

  const [values,setValues]=useState({
    email:"",
    password:"",
    error:"",
    //loading:false,
    didRedirect:false
  })

 // const {email,password,error,loading,didRedirect}= values
  const {email,password,error,didRedirect}= values

//destructing 
  const {user}=isAutheticated() 

  const handleChange = name=>event=>{
    setValues({...values,error:false,[name]:event.target.value})
  
  }

  const handleSubmit = e=>{
    e.preventDefault();
  
      setValues({...values,error:false,loading:true})
    
    
    signin({email,password})
    .then(
      data => {
        if(data.error)
        {
          setValues({...values,error:data.error,loading:false})
        }
        else{
          authenticate(data,()=>{
            setValues({...values,didRedirect:true})
          })
        }
      }
    )
    .catch(console.log("Signin request failed!!!"))
  }

  const performNavigate = () =>{
    if(didRedirect)
    {
      
      if(user && user.role ===1)
      {
        return (<><Navigate replace to="/admin/dashboard" /></>)
      }
      else{
        return (<><Navigate replace to="/user/dashboard" /></>)
      }
    }
    if(isAutheticated())
    {
      return <Navigate replace to="/" /> //redirect to home if admin have adminDashboard access, if user it have userDashboard access
    }
  }
/* 
const loadingMessage = ()=>{
  return(
    loading && (
      <div className="alert alert-info">
        <h2>Loading...</h2>
      </div>
    )
  )
} */
const errorMessage = ()=>{
  return(
    <div className="row">
        <div className="col-md-6 offset-sm-3 text-center">
  <div className="alert alert-danger" style={{display: error ? "" : "none"}}>
        {error}
  </div>
  </div></div>
  )
}
  const signinform =()=>{
    return(
      <>
      <div className="row">
        <div className="col-md-6 offset-md-3 text-left">
          <form>
            <div className="form-group">
              <label className='text-dark'>Email</label>
              <input value={email} placeholder="Enter your mail-id" onChange={handleChange("email")} className='form-control'type="email" />
            </div>
            <div className="form-group">
              <label className='text-dark'>Password</label>
              <input value={password} placeholder="Enter your password" onChange={handleChange("password")}  className='form-control' type="password" />
            </div>
            <button onClick={handleSubmit} className="btn btn-primary btn-block">Submit</button>
            <div className='text-center m-3'>
            Register your account <Link to='/signup'>Signup</Link>
          </div>
          </form>

        </div>
      </div>
      </>
    )

  }

  return (
    <Base title='Sign In' description='Login to your account'>
      {errorMessage()}
      {/* {loadingMessage()} */}
        {signinform()}
        {performNavigate()}
        {/* <p className='text-white text-center'>{JSON.stringify(values)}</p> */}
    </Base>
  )
}

export default Signin