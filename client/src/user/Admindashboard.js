import React from 'react'
import Base from "../core/Base"
import {isAutheticated} from "../auth/helper/index"
import { Link } from 'react-router-dom'


const Admindashboard = () => {


  const {user:{name,email,role}}=isAutheticated()

const adminLeftSide=()=>{
return(
  <>
  <div className="card">
    <h4 className="card-header text-dark text-center">Admin Navigation</h4>
    <ul className="list-group">
      <li className="list-group-item">
      <Link className='nav-link text-info' to='create/category'>Create Category</Link>
      </li>
      <li className="list-group-item">
      <Link className='nav-link text-info' to='manage/category'>Manage Categories</Link>
      </li>
      <li className="list-group-item">
      <Link className='nav-link text-info' to='create/product'>Create Product</Link>
      </li>
      <li className="list-group-item">
      <Link className='nav-link text-info' to='manage/products'>Manage Products</Link>
      </li>
      <li className="list-group-item">
      <Link className='nav-link text-info' to='manage/orders'>Manage Orders</Link>
      </li>
    </ul>
  </div>
  </>
)
}
const adminRightSide=()=>{
  const {user:{name,email,role}}=isAutheticated()
  return(
    <>
    <div className="card mb-4">
      <h4 className="card-header text-center">Admin Information</h4>
      <ul className="list-group">
        <li className="list-group-item">
          <span className="badge badge-success mr-2">
            Name: 
          </span>{name}
        </li>
        <li className="list-group-item">
          <span className="badge badge-success mr-2">
            Email: 
          </span>{email}
        </li>
        <li className="list-group-item">
          <span className="badge badge-danger">Admin Area</span>
        </li>
      </ul>
    </div>
    
    </>
  )
  
}
  return (
    <>
    <Base title='Welcome to Admin Area' description='Manage all of your products here!!' className='container p-4' >
<div className="row">
  <div className="order-3 order-sm-1 col-12 col-sm-6 col-md-5 col-xl-3">
  {adminLeftSide()}
  </div>
  <div className=" order-2 col-sm-6 col-md-7">
  {adminRightSide()}
  </div>
</div>
  
    
    </Base>
    </>
  )
}

export default Admindashboard