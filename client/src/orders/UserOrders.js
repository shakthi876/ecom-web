
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {isAutheticated} from "../auth/helper/index"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Container } from '@mui/system';
import Button from '@material-ui/core/Button';
import dateFormat from 'dateformat';
import Base from '../core/Base'
import { getUserOrder } from './helper/getUserOrdersHelper'
import {countCartProductFn} from "../core/helper/cartHelper"
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Userordertable from './Userordertable';
import { IconButton, makeStyles, Tooltip } from '@material-ui/core';



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
const UserOrders = ({setCartCount}) => {
  const navigate = useNavigate();
  //old5 is created array from orders (for ease the searching items)
let old5 =[]
  const [orders,setOrders] = useState([])
  const {user,token} = isAutheticated()
  const [loading,setLoading]=useState(false)
  const [results, setResults] = useState([]);
 const [searchTerms,setSearchTerms] = useState("")
 const [index,setIndex]=useState(0)
  const preLoad = ()=>{
     getUserOrder(user._id,token).then(data=>{
       if(data.error)
       {
         console.log("Error is",data.error);
       }
       else{
         setOrders(data)
       }
       setLoading(true)
     })
  }

  useEffect(()=>{
    preLoad()
    setCartCount(countCartProductFn())

  },[])

  useEffect(() => {
    const filtered = old5.filter((val)=>{
      if(searchTerms === "")
      {
              return val
      }
      if( searchTerms.toLowerCase().includes('$') && val.amount.includes(searchTerms.trim())  )
      {
          return val
      }
      else if(
       val._id.toLowerCase().includes(searchTerms.trim().toLowerCase()) ||
       //val.name.toLowerCase().includes(searchTerms.toLowerCase())  ||
       val.status.toLowerCase().includes(searchTerms.trim().toLowerCase())  ||
       val.amount.includes(searchTerms.trim())  ||
       val.createdDate.includes(searchTerms.trim()) ) 
       {
           return val
       }
 
 })
    setResults(filtered)
    //setLoading(true)
  }, [searchTerms, orders])
 

   

  const loadOrderDetails = ()=>{

var old1= orders.map((e)=> e._id+e.orderedProducts.map(e=>e.map(e=>e.name)))
var old2=orders.map((e)=> e._id+e.orderedProducts.map(e=>e.map(e=>e.name))+e.amount+e.status+e.createdDate)
var old3 = orders.map((e)=> '_id%'+"Placed an order ("+e._id+"-OrderId) of "+e.orderedProducts.map(e=>e.map(e=>e.name))+" for the amount of "+'%amount%'+'$ '+e.amount+'%status%'+e.status+'%createdDate%'+"On "+dateFormat(e.createdDate,"dd/mm/yyyy"))
var old4= old3.map(e =>{
  return(
      e.split('%')
  )
  })



 var o={}
 var temp
    for(var k1 = 0; k1 < old4.length;k1++)
    {
    for (var i1 = 0; i1 < old4[k1].length; i1 += 2) {
    
      o[old4[k1][i1]] = old4[k1][i1 + 1];
    
    }
    temp = clone(o)
    old5.push(temp)
    
    }
    console.log("old5",old5);

return(<>

{ 

 /* orders.length > 0 ? (<>
 
 </>):(<p className='text-center'>No Order found <Link to="/">Place order</Link></p>) */

 orders.length > 0 ?
 
 (results.length > 0 ? (<>
<div class="row  justify-content-center">
    <div class="col-auto">
 <table class="table table-hover shadow-lg bg-white border border-dark table-responsive ordertable rounded-sm">
 <caption className='text-center'>List of orders</caption>
   <thead>
     <tr>
       <th>#Id</th>
       
       <th>Order Description</th>
       <th>Order Status</th>
      </tr>
     </thead> 
     <tbody>
{
results.map((order,i) => (
  <Userordertable key={i} index={i} order={order} />
))}


</tbody>
</table>
</div>
</div>


</>)
 : <p className='text-center'>No results found</p> 
 )
 
 :(<p className='text-center'>No Order found <Link to="/">Place order</Link></p>)

}
  </>
)
  
  }



  return (
   <>
   {loading ? (<>
    <Base title='Order Status' description='Know about your orders'>
    



      
    <MyTooltip title="Go Back">
      <IconButton>
    <ArrowBackIcon color='primary' fontSize="large" onClick={() => navigate(-1)} />
    </IconButton>
      </MyTooltip>
 {/*  <Button color="inherit" onClick={() => navigate(-1)}  variant="outlined" startIcon={<ArrowBackIcon />}>
    User Home
  </Button> */}
  
  <br/>
       <h4 className='text-center'>Details of Orders</h4> 


       <div className="row mb-4">
        <div className="col-12 col-md-8">

        </div>
        <div className="col-md-4">
    <input type="text" placeholder='Type here to search items in table' 
    value={searchTerms}
    className='form-control'
    onChange={(e)=>{setSearchTerms(e.target.value)}}
     />
  </div>
</div>
{searchTerms.length>0 && (<>
  <div className='text-center'>
<p>Results: {results.length}</p>
</div>

</>)}



{/* TO extract the ordered Products used arr then check(arr) fn */}


       {loadOrderDetails()}

   </Base>
   </>):(<>
    <div className="d-flex justify-content-center spinner-center " style={{backgroundColor:"#E9ECEF"}}>
  <div className="spinner-border text-center " role="status">
  <span className="sr-only">Loading...</span>
    </div>
    </div>
   </>)}
   
   </>
  )
}

export default UserOrders