import React, { Children, useEffect, useState } from 'react'
import Base from '../core/Base'
import {isAutheticated} from "../auth/helper/index"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Swal from 'sweetalert2'
import dateFormat from 'dateformat';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import { getAllOrdersAdmin, updateOrderStatus } from './helper/getAllOrders'
import { Link, useNavigate } from 'react-router-dom';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

import { IconButton, makeStyles, Tooltip } from '@material-ui/core';
import AdiminOrderTable from './AdiminOrderTable';



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





const AdminManageOrders = () => {
  const navigate = useNavigate();
  let old5 =[]
  var res;

  let strStripped 
  let wordCounts={}
  let qw
  const [orders,setOrders]=useState([])
  const [loading,setLoading]=useState(false)
  const [searchTerms,setSearchTerms] = useState("")
  const [results, setResults] = useState([]);
  const [reload,setReload]=useState(false)
  const {user,token} = isAutheticated()
  //const [alert,setAlret] =useState(false)
  const [index,setIndex]=useState(0)
  const [ascFlag,setAscFlag]=useState(0)
  

  const preLoad=()=>{
  
    getAllOrdersAdmin(user._id,token).then(data=>{
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
    console.log("testing")
  },[reload])


  useEffect(()=>{
    
const filtered = old5.filter((val)=>{
  if(searchTerms === "")
  {
          return val
  }
  else if(
    val._id.toLowerCase().includes(searchTerms.toLowerCase()) ||
    val.transaction_id.toLowerCase().includes(searchTerms.toLowerCase()) ||
  //  val.name.toLowerCase().includes(searchTerms.toLowerCase())  ||
    val.usernameProd.toLowerCase().includes(searchTerms.toLowerCase())  ||
    val.status.toLowerCase().includes(searchTerms.toLowerCase())  ||
    val.amount.includes(searchTerms)  ||
    val.createdDate.includes(searchTerms) ) 
    {
        return val
    }

})
//console.log("filtered",filtered)
    setResults(filtered)
  },[searchTerms, orders,reload])




const testing = ()=>{
  // var old1= orders.map((e)=> e._id+e.orderedProducts.map(e=>e.map(e=>e.name)))
// var old2=orders.map((e)=> e._id+e.orderedProducts.map(e=>e.map(e=>e.name))+e.amount+e.status+e.createdDate)
//console.log("checking",orders.map(e=>e.user))

var old3 = orders && orders.map((e)=> '_id%'+e._id+'%name%'+e.user.name+'%usernameProd%'+e.orderedProducts.map(e=>e.map(e=>"~"+e.name))+'%amount%'+'$ '+e.amount+'%status%'+e.status+"%transaction_id%"+e.transaction_id+'%createdDate%'+dateFormat(e.createdDate,"dd/mm/yyyy"))
var old4= orders && old3.map(e =>{
  return(
      e.split('%')
  )
  })
console.log("seperated by dollar is",old4)
//console.log("old",old1)
//console.log("old2",old2)
console.log("old3",old3);
console.log("old4",old4);


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
    console.log("final old5",old5);

console.log("Final orders",orders)

}


const sortTableAsc = (col)=>{ 
  if(ascFlag===0)
  {
    console.log("check asc");
  const sorted = [...results].sort((a,b)=>
  a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
  );
  setResults(sorted);

    setAscFlag(1)
  }
else{
  return
}
  


}
const sortTableDsc = (col)=>{
  console.log("check desc");

  const sorted = [...results].sort((a,b)=>
  a[col].toLowerCase() > b[col].toLowerCase() ? -1 : 1
  );
  setResults(sorted)
  
}

  const loadAllOrders = () =>{
    return(
      <>
      { testing()}

{ 
  orders.length>0 ?
  (results.length > 0 ?
  (<>
  {console.log("Results are",results)}
   <div class="row justify-content-center">
    <div class="col-auto">
   
 <table class="table table-hover shadow-lg bg-white border border-dark table-responsive ordertable rounded-sm">
 <caption className='text-center'>List of orders</caption>
   <thead>
     <tr>
       <th>#No</th>
       
       <th>OrderID</th>
       <th>User Name
       <span style={{display:"inline-block"}}> 
         <ExpandLessIcon  onClick={()=>{
            setAscFlag(0)
           sortTableDsc("name")}}/>
         <ExpandMoreIcon  onClick={()=>{
          
           sortTableAsc("name")}}/>

         </span>
       </th>
       <th>Ordered products & Quantity</th>
       <th>Amount
       <span style={{display:"inline-block"}}> 
      
         <ExpandLessIcon  onClick={()=>{
           setAscFlag(0) 
           sortTableDsc("amount")}}/>
           
         <ExpandMoreIcon  onClick={()=>{
           sortTableAsc("amount")}}/>
         </span>
       </th>
       <th>Transaction Id</th>
       <th>Order Status</th> 
       
       <th>
        Ordered Date
       <span style={{display:"inline-block"}}> 
      
         <ExpandLessIcon onClick={()=>{
           setAscFlag(0) 
           sortTableDsc("createdDate") } }/>
          
         <ExpandMoreIcon onClick={()=>{
           sortTableAsc("createdDate")}}/>
         </span>

       </th>
       <th>Update Status</th>
     </tr>
   </thead>
   <tbody>
{
  results
  .map((order,index)=>{
    return(
      <AdiminOrderTable key={index} index={index} order={order} reload={reload} setReload={setReload} />
    )
  })
}
   </tbody>
   </table>
   </div>
   </div>

  
  </>): <p className='text-center'>No results found</p> )
  :(<p className='text-center'>No Orders placed by user</p>)
}
    </>
    )
  }



  
  return (
    <>
    {loading ? (<>
      <Base title='Manage Orders' description='Update the status of orders'>
      <MyTooltip title="Go Back">
        <IconButton>
    <ArrowBackIcon fontSize='large' color='primary' onClick={() => navigate(-1)} />
    </IconButton>
      </MyTooltip>
      
      {/* <Button color="inherit" onClick={() => navigate(-1)}  variant="outlined" startIcon={<ArrowBackIcon />}>
    Admin Home
  </Button> */}
  <h3 className="text-center mb-3">Orders placed by Users</h3>

      <div className="row mb-4">
        <div className="col-12 col-md-6">

        </div>
        <div className="col-md-6">
    <input type="text" placeholder='Type here to search items in table' 
    className='form-control'
    value={searchTerms}
    onChange={(e)=>{setSearchTerms(e.target.value)}}
     />
    {/* <small class="form-text text-muted">Note: We can't search ordered products with quantity Ex: T-Shirt= 1</small>
  */}
  </div>
</div>
{searchTerms.length>0 && (<>
  <div className='text-center'>
<p>Search Results: {results.length}</p>
</div>

</>)}

      {loadAllOrders()}
      {console.log("orders",orders)}
    </Base>
    </>):(<>
      <div className="d-flex justify-content-center spinner-center " style={{backgroundColor:"#E9ECEF"}}>
  <div className="spinner-border text-center " role="status">
  <span className="sr-only text-dark">Loading...</span>
    </div>
    </div>
    </>)}
    </>
    
  )
}

export default AdminManageOrders