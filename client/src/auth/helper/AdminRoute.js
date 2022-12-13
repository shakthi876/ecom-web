import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { isAutheticated } from './index'
const PrivateRoute = ({children}) => {
   const auth = isAutheticated();
   if(auth && isAutheticated().user.role !== 1 ) {
       return <Navigate to="/user/dashboard" />
   }
    return (auth && isAutheticated().user.role === 1 ?  children : <Navigate to="/signin" /> )

}

export default PrivateRoute