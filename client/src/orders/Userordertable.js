import React from 'react'

const Userordertable = ({index,order}) => {
   
  return (
    <>
    
         <tr>
         <td>{index+1}</td>
         <td className="text-left">
{
 order.createdDate 
},<br/><span className='pl-4'>
{order._id},<b>{order.amount}</b></span></td>
<td className=''><br/> {order.status}</td>
</tr>

    </>
  )
}

export default Userordertable