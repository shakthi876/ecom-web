import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { billProductsInCart, cartEmptyFn, loadCartFnc } from './helper/cartHelper'
import {getmeToken,processPayment} from "./helper/paymentHelper"
import {createOrder} from "./helper/orderHelper"
import { isAutheticated } from '../auth/helper'
import DropIn from "braintree-web-drop-in-react";
import Button from '@material-ui/core/Button';
import emailjs from 'emailjs-com';

const PaymentB = ({state,products,setReload = f => f, reload=undefined,paymentSuccess=undefined,setPaymentSuccess = f=>f}) => {

 //   console.log("details of address from payment",state)
  //  console.log("details of address from payment $$$$$$",state.shippingDetails.contact)

    

    const navigate = useNavigate()
    const [info,setInfo] = useState({
        clientToken:null, //Must be null as per brainTree Doc
        instance:{}
    })

    const [error,setError]=useState(false)
    const [errorMsgs,setErrorMsgs] =useState("")
   
   const [orderId,setOrderId] = useState(0)
    //const [getARedirect,setGetARedirect] =useState(false)


    // const {userId,token}  = isAutheticated();
   
    // if isAutheticated grab userId and token
    const userId = isAutheticated() && isAutheticated().user._id
    const token = isAutheticated() && isAutheticated().token
    const email = isAutheticated() && isAutheticated().user.email
    const userName = isAutheticated() && isAutheticated().user.name
   // const [prdAdd,SetPrdAdd] =useState({})
   // var result= products.map(prd=>(result.push(prd.name)))
   //results have bill structure
   const getAmount = ()=>{
    let amount =0

    products && products.map((product)=>{
        amount = amount + product.price
    })
    return amount
}

   let results =billProductsInCart ()
    results = results.map(function (obj) {
    return obj.Name+ '-'+obj.occurrence+'-'+obj.amount;
  });
  
  let amt= getAmount();
  console.log("answer boys!!!",results)
  let today = new Date().toLocaleDateString()
    const templateParams = {
        name: userName,
        results:results,
        notes: 'Check this out!',
        shippingAddress:state.shippingDetails.address,
        amount: amt,
        email:email,
        date:today,
      //  user_email: email
    };
    console.log("templates",templateParams);
    const getToken = (userId,token)=>{
        getmeToken(userId,token).then(info =>{
            //console.log("Information",info);
            

            
            if(info.error)
            {
                //setInfo({...info,error:info.error})
                setError(true)
                errorMsgs(info.error)
            }
            else{
                const clientToken = info.clientToken
                setInfo({clientToken})
            }
           //setLoading(true)

            
        })
    }

  const errorMsg =()=>{
        if(error)
        {
            return (
                <>
            <h5 className='text-danger text-center mt-3'>Payment failed :( <br/> {errorMsgs} </h5>
            
            </>
            )
        }
    }

//client token should not be null and should have product in cart.
    const showBrainTreeDropIn = ()=>{
        return(
            <>
           
            {info.clientToken !== null && ( 
                <>
                <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={instance => (info.instance = instance)}
            />
            <button className="btn btn-block btn-success" onClick={onPurchaseProducts}>
              Buy
            </button>

     
                </>
            ) }
            </>
        )
    }
    useEffect(()=>{
        getToken(userId,token);
    },[])


    const sendEmail = ()=>{

        emailjs.send('service_pwn6j2u','template_bkx30x6',templateParams,'6SVAIWzAeUvNSdEvP', )
        .then(function(response) {
           console.log('SUCCESS!', response.status, response.text);
           console.log("Mail Sent");
        }, (err) => {
           console.log('FAILED...', err);
        });

    }

    const onPurchaseProducts =()=>{
      
        //setInfo({loading: true})
      setPaymentSuccess(false)
        let nonce;
        if(!info.instance)
        {
            setError(true)
            setErrorMsgs("Invaild credentials, Try Again...")
            return
        }
        let getNonce = info.instance.requestPaymentMethod().then(data=>{
            nonce = data.nonce
        const paymentData ={
            paymentMethodNonce : nonce,
            amount:getAmount()
        }
    
        processPayment(userId,token,paymentData)
        .then(
            response=>{
               // setInfo({...info,success:true,loading:false})
               setPaymentSuccess(true)
             
               
                //create order
                const orderData = {
                    products: products,
                    transaction_id: response.transaction.id,
                    amount: response.transaction.amount,
                    shippingAddress:state.shippingDetails.address,
                    contactNumber:state.shippingDetails.contact,

                }
                
                createOrder(userId,token,orderData).then(console.log("kill them"))
                //Empty the cart
                console.log("sending email from emailJs");
                sendEmail();
                cartEmptyFn(()=>{
                    console.log("working!!");
                })
               // setReload(!reload) 
                navigate('/cart',{replace:true})
               //navigate(-1)
                //Force Reload
                
            }) 
            .catch(
                err =>{
                    setError(true);
                    setErrorMsgs(err)
                console.log("PAYMENT FAILED");

                } )

                
            }
            )
    }

    
    
  return (
    <>
    
    <h4>Your Bill is <span className='text-danger'> ${getAmount()}</span> </h4>
    {errorMsg()}
    { showBrainTreeDropIn()  } 
    {!token &&  <>Please Login to pay bill <Link to="/signin">Login</Link> </> }


    </>
  )
}

export default PaymentB