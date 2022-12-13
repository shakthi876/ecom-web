import React, { useState } from 'react'
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
  } from "react-router-dom";
import Home from './core/Home';
import Signup from './user/Signup';
import Menu from './core/Menu';
import Signin from './user/Signin';
import AdminRoute from "./auth/helper/AdminRoute"
import PrivateRoute from "./auth/helper/PrivateRoute"
import Userdashboard from "./user/Userdashboard"
import Admindashboard from "./user/Admindashboard"
import Addcategory from "./admin/Addcategory"
import Managecategories from './admin/Managecategories';
import Addproduct from './admin/Addproduct';
import ManageProducts from './admin/ManageProducts';
import Updateproduct from './admin/Updateproduct';
import Cart from './core/Cart';

import Manageorders from './admin/Manageorders';
import UserOrders from './orders/UserOrders';
import AdminManageOrders from './orders/AdminManageOrders';
import CheckoutSection from './core/CheckoutSection';
import { Container } from '@material-ui/core';



const MyRouters = () => {
  const [cartCount,setCartCount] =useState(0)
  const [products, setProducts] = useState([])
const [reload, setReload] = useState(false)
const [paymentSuccess,setPaymentSuccess] = useState(false)

  
  return (
    <>
    <Container>
 <Menu cartCount={cartCount} setCartCount={setCartCount} />
 </Container>
    <Routes>
        <Route path="/" element={<Home cartCount={cartCount} 
        setCartCount={setCartCount} />} />
        <Route path="/signup" element={<Signup/>} />
        <Route path='/signin' element={<Signin/>} />
       


        <Route path="/cart" element={<Cart 
        cartCount={cartCount} 
        setCartCount={setCartCount} 
        products={products} setProducts={setProducts} reload={reload} paymentSuccess={paymentSuccess} setReload={setReload} setPaymentSuccess={setPaymentSuccess}
        />}/>
        {/* Protected Routes in React-Router-DOM Version 6 */}




   <Route path='/user/dashboard/' element ={
          <PrivateRoute>
           <Userdashboard cartCount={cartCount} 
        setCartCount={setCartCount} />
        </PrivateRoute>} >

        </Route>




        <Route path='/admin/dashboard/' element ={
          <AdminRoute>
           <Admindashboard />
        </AdminRoute>
        
        } /> 
        <Route path='/admin/dashboard/create/category' element ={
          <AdminRoute>
           <Addcategory />
        </AdminRoute>
        
        } /> 
         <Route path='/admin/dashboard/manage/category' element ={
          <AdminRoute>
           <Managecategories />
        </AdminRoute>
        
        } />
        <Route path='/admin/dashboard/create/product' element ={
          <AdminRoute>
           <Addproduct/>
        </AdminRoute>
        
        } />
        <Route path='/admin/dashboard/manage/products' element ={
          <AdminRoute>
           <ManageProducts/>
        </AdminRoute>
        
        } />
        <Route path='/admin/dashboard/product/update/:productId' element ={
          <AdminRoute>
           <Updateproduct />
        </AdminRoute>
        
        } />
         
         <Route path='/admin/dashboard/manage/orders' element ={
          <AdminRoute>
           <AdminManageOrders/>
        </AdminRoute>
  } />
  

<Route path='user/dashboard/user/orders' element ={
          <PrivateRoute>
           <UserOrders  setCartCount={setCartCount} />
        </PrivateRoute>} >

        </Route>

       
                 
                    <Route path='products/paymentsection/'
                 element={
          <PrivateRoute>
            <CheckoutSection products={products} reload={reload} paymentSuccess={paymentSuccess} setReload={setReload} setPaymentSuccess={setPaymentSuccess} />
          </PrivateRoute>

                 }     
       />
<Route path='*' element={<Navigate to="/"/>}/>
     
    </Routes>
    

    </>
  )
}

export default MyRouters