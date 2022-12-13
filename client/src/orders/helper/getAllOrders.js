import {API} from "../../backend"

export const getAllOrdersAdmin = (userId,token)=>{
    //console.log("userId",userId)
    return fetch(`${API}/order/all/${userId}`,{
        method:"GET",
        headers:{
            Accept:"application/json",
            Authorization: `Bearer ${token}`
        }
    }).then(
        response =>{
            return response.json()
        }
    ).catch(err=>console.log("Error is",err))

}


export const updateOrderStatus = (userId,token,orderId,status)=>{
    console.log("data ",userId,token,orderId)
    console.log("status",status)
    return fetch(`${API}/order/${orderId}/${userId}`,{
        
        method:"PUT",
        headers:{
            Accept:"application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body:JSON.stringify(status)
    }).then(
        response =>{
          return response.json()
        //  console.log("response",response)
        }
    ).catch(err=>console.log("Error is",err))
    
}


