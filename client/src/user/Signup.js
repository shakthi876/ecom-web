import React from 'react'
import Base from '../core/Base'
import { useState } from 'react'
import {Link,Navigate} from "react-router-dom"
import {signup} from "../auth/helper"
const Signup = () => {
  const [values,setValues]=useState({
    name:"",
    email:"",
    password:"",
    confirmpassword:"",
    error:"",
    success:false
  })

const {name,email,password,confirmpassword,error,success} = values

//passing multiple values in name so [name]
//curried function
const handleChange = name=>event=>{
  setValues({...values,error:false,[name]:event.target.value})

}

const handleSubmit = event => {
  event.preventDefault();
  
console.log("values$$$",values)

  setValues({ ...values, error: false });


  signup({ name, email, password,confirmpassword })
    .then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          confirmpassword:"",
          error: "",
          success: true
        });
      }
    })
    .catch((err)=>console.log(err));
};

const successMessage = ()=>{
  return(
    <div className="row">
        <div className="col-md-6 offset-sm-3 text-center">
  <div className="alert alert-success" style={{display: success ? "" : "none"}}>
        New Account created successfully ! Please <Link to='/signin'>Login here</Link>
  </div>
  </div>
  </div>
  )
}
const errorMessage = ()=>{
  return(
    <div className="row">
        <div className="col-md-6 offset-sm-3 text-center">
  <div className="text-danger" style={{display: error ? "" : "none"}}>
{


  ( error  == "User already exists!! Sign In Instead...") ? (
      <>
       {error}
      <Link to="/signin" >Login in</Link> 
      </>
  ) :error
}   
  </div>
  </div></div>
  )
}


  const signupform =()=>{
    return(
      <>
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div>
            <div className="form-group">
              <label className='text-dark' >Name</label>
              <input className='form-control' value={name} onChange={handleChange("name")} placeholder='Enter Username' type="text" />
            </div>
            <div className="form-group">
              <label className='text-dark'>Email</label>
              <input placeholder='Enter Email-Id'  className='form-control' value={email} onChange={handleChange("email")}  />
            </div>
            <div className="form-group">
              <label className='text-dark'>Password</label>
              <input placeholder='Enter password'  className='form-control' value={password} onChange={handleChange("password")}type="password" />
            </div>
            <div className="form-group">
              <label className='text-dark'>Confirm-Password</label>
              <input placeholder='Enter confirm password'  className='form-control' value={confirmpassword} onChange={handleChange("confirmpassword")}type="password" />
            </div>
            <button onClick={handleSubmit} className="btn btn-primary btn-block">Submit</button>
          </div>
          <div className='text-center m-3'>
            Already have account <Link to='/signin'>Login</Link>
          </div>

        </div>
      </div>
      </>
    )

  }
  return (
    <Base title='Sign Up' description='Register your account here'>
      {successMessage()}
      {errorMessage()}
        {signupform()}
        {/* {JSON.stringify(values)} */}
    </Base>
  )
}

export default Signup