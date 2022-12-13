import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { isAutheticated } from './index'
const PrivateRoute = ({children,products}) => {
    console.log("products pv",products)
   const auth = isAutheticated();
    return auth ?  children : <Navigate to="/signin" />
 
}

export default PrivateRoute