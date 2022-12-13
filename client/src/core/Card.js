import React, { useEffect, useState } from 'react'
import Imagehelper from './helper/Imagehelper';
import {Navigate } from "react-router-dom"
import { addItemToCart, removeItemfromCart } from './helper/cartHelper';
import { getStockCount } from './helper/countHelper';



  const Card = ({
    addToCartAlret=undefined,
    setAddToCartAlret=f=>f,
    removeCartAlret=undefined,
    setRemoveCartAlret=f=>f,
    rowToDelete,
    product, 
    addToCart=true,
    removeFromCart=false,
    setReload= f=> f, // give it means throw it same
    reload=undefined}) => {


const [redirect, setRedirect] = useState(false)
const [count, setCount] = useState(product.count)

const cartTitle = product ? product.name : "Product Name"
const cartDescription = product ? product.description : "Product Description"
const cartPrice = product ? product.price : "Product Price"
const cartStock = product ? product.stock : "Product Stock"





const addToCartFn =() =>{
 
 
    addItemToCart(product,()=>setRedirect(true))
  
  
}


const getAredirect =(redirect) =>{
  setAddToCartAlret(true)
  if(redirect)
  {
    return <Navigate to="/cart" replace  />
  }

}

   

const showAddToCart = (addToCart)=>{
        return(
            addToCart && (
                <div className="col-12">
                  {product.stock > 0 ? (<>
                    <button
                onClick={addToCartFn}
                className="btn btn-block btn-outline-success mt-2 mb-2"
              >
                Add to Cart
              </button>
                  </>):(<>
                  
                    <button
                className="btn btn-block btn-outline-danger mt-2 mb-2"
              >
                Out Of Stock
              </button></>)}
              
            </div>
            )
        )

      }
      const showRemoveFromCart =(removeFromCart)=>{
          return(
removeFromCart && (
    <div className="col-12">
              <button
                onClick={() => {
                  setRemoveCartAlret(true)
                  removeItemfromCart(product._id,rowToDelete)
                  //force reload
                  setReload(!reload)
                }}
                className="btn btn-block btn-outline-danger mt-2 mb-2"
              >
                Remove from cart
              </button>
            </div>

)
          )

      }
      
      
    return (
      <>
      <div className="card text-dark  ">
        <div className="card-header lead"><strong>{cartTitle} </strong> </div>
        <div className="card-body">
          
{getAredirect(redirect)}
          <Imagehelper product={product}/>
          { addToCart && (<>
            <p className="lead mt-2  font-weight-normal text-wrap">
         <strong></strong> {cartDescription}
          </p>
          </>)}
          
          
          <p className="btn btn-success rounded  btn-sm px-4">$ {cartPrice}</p> <br/>
          {!removeFromCart && (
            <>
          <button className="btn btn btn-outline-dark rounded  btn-sm px-6">Stock : {cartStock}</button>
            
            </>
          )}


          
          <div className="row">
            {showAddToCart(addToCart)}
            {showRemoveFromCart(removeFromCart)}
          </div>
        </div>
      </div> 
      </>
    );
  };


export default Card