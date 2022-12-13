import React, { useEffect, useState } from 'react'
import Base from './Base'
import Card from './Card'

import { billProductsInCart, countCartProductFn, loadCartFnc,cartEmptyFn } from './helper/cartHelper'
import Masonry from 'react-masonry-css'
import PaymentB from './PaymentB'
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { Button } from '@material-ui/core'
import { isAutheticated } from '../auth/helper'
import PrivateRoute from "../auth/helper/PrivateRoute"
import CheckoutSection from './CheckoutSection'


const Cart = ({cartCount,setCartCount = f=>f,cate,setCate=f=>f, products,setProducts=f=>f,reload,paymentSuccess,setReload = f=>f,setPaymentSuccess=f=>f}) => {

 //   console.log("cart's cartcount",cartCount)
 //   console.log("At carts section Products",products)
//console.log("At cartsection's successMsg",paymentSuccess)


const navigate = useNavigate()
const [removeCartAlret, setRemoveCartAlret] =useState(false)
const [addToCartAlret, setAddToCartAlret] =useState(false)
const [cartProd, setCartProd] = useState([])
const [unavProd,setUnavProd] = useState("")
const [unavProdst,setUnavProdSt] = useState("")
const [shippingDetails,setShippingDetails] =useState({
    address:"",
    contact:""
})

const userCheck=isAutheticated() && isAutheticated().user.role


/* const showRemoveAlret = ()=>{
    if(removeCartAlret)
    {
        Swal.fire(
            'Message',
            'Product removed from cart successfully :)',
            'success'
          )
    }
} */
/* 
const showAddAlret = ()=>{
    if(addToCartAlret)
    {
        Swal.fire(
            'Message',
            'Product added to cart successfully :)',
            'success'
          )
    }
} */



const breakpoints = {
    default:5,
    1115:3,
    700:1,
  }


//force reload, if reload state change seProducts function will be called
useEffect(()=>{
    setProducts(loadCartFnc())
    setCartCount(countCartProductFn())
   setCartProd(billProductsInCart())
  // setCate(cate)

},[reload])

const loadAllProducts =() =>{
    return(


//pass SetReload fn to make change

        <div className='text-dark'>
            <h4 className='text-center'>Selected products' count : {cartCount}</h4><br/>
            <button className='btn btn-outline-danger mt-2 mb-3'  onClick={()=>{cartEmptyFn(()=>setReload(!reload))}}>Clear all  in cart</button>
            <Masonry
      breakpointCols={breakpoints}
      className="my-masonry-grid text-center"
      columnClassName="my-masonry-grid_column"
      >

           
            {products && products.map((product,index)=>{
            
            return(
            
                <Card key={index} 
                addToCartAlret={addToCartAlret} 
                setAddToCartAlret={setAddToCartAlret}  
                removeCartAlret={removeCartAlret}   
                setRemoveCartAlret={setRemoveCartAlret} 
                rowToDelete={index} 
                product={product} 
                addToCart={false} 
                removeFromCart={true} 
                setReload={setReload} 
                reload={reload} />
              
                )
                
            }
                
                )
            }

               </Masonry>
        </div>
  
    )
}
const loadCheckOut =() =>{
    return(
        <div  className='text-dark text-center'>
            <h3> Checkout section</h3>
           
           <PaymentB products={products} setReload={setReload} reload= {reload} paymentSuccess={paymentSuccess} setPaymentSuccess={setPaymentSuccess}  />
           
        </div>
    )
}


// Three functions are for status of payment
const paymentSuccessMsg = ()=>{
   // setRemoveCartAlret(false)
   
    if(paymentSuccess){
      
        return(
            <>

            <h5 className='text-success text-center mt-3'>Payment paid successfully :)<br/> Thanks for purchasing in T-shirt Mills</h5>
            {
               paymentSuccess && refreshMsg()
            }
            </>
        )
    }
   
    
}

const refreshMsg = ()=>(
    clearMsg()
)

const clearMsg = ()=>{
    setTimeout(()=>{
       // console.log("hai buddy");
        paymentSuccessMsg (setPaymentSuccess(false))
     },5000)
}

const getAmount = ()=>{
    let amount =0

    products && products.map((product)=>{
        amount = amount + product.price
    })
    return amount
}

const getBill= ()=>{
    return(
        <>
         <div className="h4 text-center m-4">Invoice Bill  </div>
         
 

        <div className="row">
       <div className="col-md-6 col-sm-12 text-center">
       <table class="table table-hover shadow-lg">
            <thead>
                <tr>
                    <th>#No</th>
                    <th>Products</th>
                    <th>Per Price</th>
                    <th>Quantity</th>
                    <th>Amount</th>
                </tr>
            </thead>
            <tbody>
                
                { cartProd && cartProd.map((el,i)=>{
            return(
                <tr key={i}>
                <td>{i+1}</td>
                <td>{el.Name}</td>
                <td>{el.amount}</td>
                <td>{el.occurrence}</td>
                <td>${el.amount *el.occurrence  }</td>
                </tr>
            )
        })}
                <tr>
                <td>&nbsp;</td>
                <td>&nbsp;</td>

                <td>&nbsp;</td>
                <td>Overall amount</td>
               <td><strong>${getAmount()} </strong></td>
                    </tr>
            </tbody>
        </table>

       
       </div>
       <div className="col-12 col-md-6 ">
           <form onSubmit={checkAvailability}>
           <div className="form-group">
           <label htmlFor="shipping" className='text-left'>Shipping Address</label>
             <textarea  className='form-control' 
             rows="6" cols="50"
             value={shippingDetails.address}
             onChange={(e)=>setShippingDetails({...shippingDetails,address:e.target.value})}
              placeholder='Enter your shipping address' id="shipping" required/>
           </div>
           <div className="form-group">
               <label htmlFor="contact" className='text-left'>Contact Number</label>
               <input type="number" placeholder='Enter your contact number'
               className='form-control'
                value={shippingDetails.contact}
             onChange={(e)=>setShippingDetails({...shippingDetails,contact:e.target.value})}
            

                id="contact" pattern='[0-9]{10}' required />
           </div>
           <button type='submit'  className="btn btn-block btn-success" >
            Pay Payment
             </button>

           </form>
           
       </div>
         
     
      </div>

       
        
        
     
        </>
    )
  
   
}

const checkAvailability = (e)=>{
    e.preventDefault();
var flag=0;
    for(var i=0; i < cartProd.length ;i++ )
    {
        if(cartProd[i].stock >= cartProd[i].occurrence && cartProd[i].stock !== 0)
        {
          //  console.log("correct GO");
        }
        else
        {
           // console.log("sorry :(");
            setUnavProd(cartProd[i].Name)
            setUnavProdSt(cartProd[i].stock)
            flag=1;
            break;
        }
    }
    if(flag !==1)
    {
     //  console.log("shipping details",shippingDetails);
        navigate("/products/paymentsection",{state:{shippingDetails}},{replace:true})
    }
    else{
        console.log(unavProd+ 'is out of stock, available stock is'+unavProdst);
    }
   // navigate("/products/paymentsection",{replace:true})
    /* cartProd.map((el,i)=>{
        if(el.stock >= el.occurrence)
        {
            console.log("el s1",el.stock)
            console.log("el o1",el.occurrence);
            console.log("Correct Go");
        }
        else{
            console.log("el s2",el.stock)
            console.log("el o2",el.occurrence);
            console.log("sorry :(");
          //  break;
        }
    }) */

}

const timeOut = ()=> {
    setTimeout(()=>{
        setUnavProd("")
    },7000)
}

const unavailableMsg=()=>{
    return(
        <>
        {unavProd.length > 0 && (<>
            <div className="text-danger text-center">
                <h5>  {unavProd} is out of stock, available stock is {unavProdst} </h5>
                <h5>Please remove accordingly!</h5>
           
            {timeOut()}
        </div>
        </>)}
        </>
    )
   
}


  return (
    <>
    <Base title="Cart Page" description="Scroll down to Checkout your T-Shirts">
       
    {
        cartCount ===0 ? (<div className='text-center'>
        {paymentSuccessMsg()} 
        <h5 className='text-danger text-center'>
            Cart is Empty </h5>
            <div>
                Please add some products! &nbsp;
            <Link to="/">Click here</Link>

            </div>
       
          </div>): ( 
            <>
       <div className="row">
           <div className="col-12 ">
           {loadAllProducts()}
           {/* {showRemoveAlret()} */}
           </div>
           <div className="col-12">
               {userCheck === 0 ? (<>
               
                {unavailableMsg()}
                   {  getBill()}
                  
                   
               
               </>) :(<>
               {!userCheck? (<>
               
                <div className='text-center'>
                    <div className='h4 text-danger'>
               Payment option only for registered users
               </div>
               Please login into your account <Link to="/signin">Login here!</Link>
</div>
               </>):(<>
                <div className='text-center text-danger h5'>Note: Admin cannot use Payment Section</div>
               </>)}
                
                  
                
               
               </>
                   
              ) }
               
          {/*   For user+admin paymert section
               <Link to="/products/paymentsection">
                   <Button>CheckOut Section</Button>
               </Link> */}



          {/*  {loadCheckOut()} */}
           </div>
       </div>
            
            
    
{/* 
            <div className="row text-center">
       <div className="col-md-4 col-sm-12 offset-md-1">
       
       </div>
       <div className="col-6 ">
             
       </div>
         
     
      </div> */}

            </>
        )
    }

      
    </Base>
    </>
  )
}

export default Cart