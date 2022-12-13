import { Button, IconButton, makeStyles, Tooltip } from '@material-ui/core';
import React from 'react'
import { updateOrderStatus } from './helper/getAllOrders';
import Swal from 'sweetalert2'
import { isAutheticated } from '../auth/helper';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';



const useStylesMystyle = makeStyles((theme) => ({
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
  },
}));

function MyTooltip(props) {
  const classes = useStylesMystyle();

  return <Tooltip arrow classes={classes} {...props} />;
}

var clone = require('clone')


const AdiminOrderTable = ({index,order,reload=undefined,setReload=f=>f}) => {
   // console.log("check order table admin",order)
    const {user,token} = isAutheticated()

// checking the occurance of repeated products - for quantity 
    const  testingRep = (sentence)=>{
        let str = sentence;
      
        // strip all punctuation from string
        let strStripped = str.replace(/[,.!]/g, '');
        
        
        // separate string into array of lowercase words
        let words = strStripped.toLowerCase().split('~');
      
        
        // form object of word counts
        let wordCounts = {};
       
        words.slice(1).forEach(word => {
          wordCounts[word] = (wordCounts[word] || 0) + 1;
        });
      
      //convert object to string
       let output= Object.entries(wordCounts).reduce((str, [p, val]) => {
            return `${str}${p} is ${val}; \n`;
        }, '');
      
      return output
      
      }

      const updateAlret = (userId,token,orderId)=>{


        (async () => {
      
         
         
          const {value: status } = await Swal.fire({
             title: 'Update the order status',
             input: 'select',
             inputOptions: {
              "status": {
              Cancelled: 'Cancelled',
              Delivered: 'Delivered',
              Shipped: 'Shipped',
              Processing: 'Processing',
              Received:"Received"
               }
              
            },
            inputPlaceholder: 'Select a status',
             showCancelButton: true,
             confirmButtonColor: '#00B74A',
        cancelButtonColor: '#ff4444',
             inputValidator: (value) => {
              if (!value) {
                return 'You need to select status!'
              }
            }
             
           }) 
           if (status) {
             Swal.fire('Updated',`${status} status has been updated for this order `,'success')
             
      
             updateOrderStatus(userId,token,orderId,{status}).then(data=>{
              if(data.error)
              {
                console.log("Err is",data.error);
              }
              else
              {
                console.log("success"); 
               // preLoad()
               setReload(!reload)
              }
            })
          
          }
      
      
         
          })()
      
        //cosole.log("credenteial",userId,token,orderId);
        /* const status="received";
        updateOrderStatus(userId,token,orderId,{status}).then(data=>{
          if(data.error)
          {
            console.log("Err is",data.error);
          }
          else
          {
            console.log("success");
          }
        }) */
      
      }

      
  return (
    <>
    <tr key={index}>
        <td>{index+1}</td>
        <td>{order._id}</td>
        {/* <td className="text-left" >{order.usernameProd} - <b>{order.amount}</b> </td> */}
      <td>
     {order.name } </td>
     <td> { testingRep(order.usernameProd) }</td>
     <td> {order.amount}
        
        </td> 





        <td>{order.transaction_id}</td>
        <td>{order.status}</td>
       
        <td>{order.createdDate}</td>
        <td>
        <MyTooltip title="Update Status">
<IconButton>
<EditOutlinedIcon color='secondary' fontSize='large' onClick={()=>{updateAlret(user._id,token,order._id)}}/>
</IconButton>
</MyTooltip>
   {/*      <Button color='secondary' 
            variant='outlined' 
            onClick={()=>{updateAlret(user._id,token,order._id)}}
            > Update</Button> */}
            
            </td>
      </tr>
    
    </>
  )
}

export default AdiminOrderTable