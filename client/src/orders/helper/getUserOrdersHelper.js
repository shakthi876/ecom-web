import {API} from "../../backend"

export const getUserOrder = (userId,token)=>{
    //console.log("userId",userId)
    return fetch(`${API}/orders/users/${userId}`,{
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

