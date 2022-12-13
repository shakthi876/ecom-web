import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { isAutheticated } from '../auth/helper'
import {countCartProductFn} from "../core/helper/cartHelper"
import Base from "../core/Base"
const Userdashboard = ({cartCount,setCartCount,cate,setCate}) => {
  const {user:{name,email,role}}=isAutheticated()
 
  useEffect(()=>{
    console.log("I am from userdashboard")
    console.log("I am from userdashboard cartCount",cartCount)

    setCartCount(countCartProductFn())
  },[])



  const userDetails = ()=>{
    return(
      <>
      <div className="card mb-4">
      <h4 className="card-header text-center" style={{color:"black"}}>USER INFORMATION</h4>
      <ul className="list-group">
        <li className="list-group-item">
          <span className="badge badge-success mr-2">
            Name: 
          </span> <span style={{color:"black"}}>{name} </span>   
        </li>
        <li className="list-group-item">
          <span className="badge badge-success mr-2">
            Email: 
          </span> <span style={{color:"black"}}> {email} </span>
        </li>
        
        <li className="list-group-item">
          <span className="badge badge-danger">User Area</span>
        </li>
      </ul>
    </div>
    <li className="list-group-item">
          <span className="">Check your order status : </span>
          <span style={{color:"black"}}> <Link to="user/orders">Click-here</Link> </span>
        </li>
      
      </>
    )
  }


  return (
    <>
    <Base title='User Dashboard' description='User details' >
   
   <div className="row user-center">
     <div className=" col-10 col-md-5">
     {userDetails()}
     </div>
   </div>
   


    </Base>
    
    </>
  )
}

export default Userdashboard