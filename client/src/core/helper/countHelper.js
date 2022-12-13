import { API } from "../../backend";

export const getStockCount = (productId)=>{
    return fetch(`${API}/stock/product/${productId}`,{method:"GET"})
    .then(response=>
        {
            return response.json()
        }).catch(err=>console.log("Err is",err))
}