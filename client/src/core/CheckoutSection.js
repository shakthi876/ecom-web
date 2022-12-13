import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Base from './Base'
import PaymentB from './PaymentB'

const CheckoutSection = ({refreshAlert,setRefreshAlert,products,setProducts=f=>f,reload,paymentSuccess,setReload = f=>f,setPaymentSuccess=f=>f}) => {
  const { state } = useLocation();
  //console.log("I am from Navigate state",state)
  const navigate = useNavigate()
  const loadCheckOut =() =>{
    return(
        <div  className='text-dark text-center'>
            <h3> Checkout section </h3>
           
           <PaymentB state={state} products={products} setReload={setReload} reload= {reload} paymentSuccess={paymentSuccess} setPaymentSuccess={setPaymentSuccess}  />
           
        </div>
    )
}

/* //Prevent from  browser refresh
window.addEventListener('beforeunload', (event) => {
  // Cancel the event as stated by the standard.
  event.preventDefault();
  // Chrome requires returnValue to be set.
  event.returnValue = '';
}); */

const goBack = ()=>{
  if(products.length===0)
  {
    navigate('/cart',{replace:true})
  }
}


useEffect(() => {
  window.addEventListener("beforeunload", alertUser);
  return () => {
    window.removeEventListener("beforeunload", alertUser);
  };
}, []);
const alertUser = (e) => {
  e.preventDefault();
  e.returnValue = "";
};


useEffect(()=>{
  setTimeout(()=>{
    goBack()
  },5000)
  
},[])

  return (
    <>
    <Base title='Payment Section' description='Pay the bill through BrainTree'>
      
    {loadCheckOut()}
    </Base>
    </>
  )
}

export default CheckoutSection