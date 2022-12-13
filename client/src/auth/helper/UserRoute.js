
import { Navigate, Outlet } from 'react-router-dom'
import { isAutheticated } from './index'
import React from 'react'

const UserRoute = ({children}) => {
    const auth = isAutheticated();
    console.log("auth is",auth.user.role!==0 )
     return auth.user.role !==0 ?   <Navigate to="/signin" /> :children
  
 }

export default UserRoute