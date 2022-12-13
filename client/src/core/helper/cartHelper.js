export const addItemToCart =(item,next)=>{
    let cart = []
    if(typeof window !== undefined)
    {
        if(localStorage.getItem("cart"))
        {
            cart = JSON.parse(localStorage.getItem("cart"))
        }
        cart.push({
            ...item,count:1
        })
        localStorage.setItem("cart",JSON.stringify(cart))
        next();
    }
    
}



export const loadCartFnc = () =>{
    //check for window object (not undefined)
    if(typeof window !== undefined)
    {
        //if cart then return
        if(localStorage.getItem("cart"))
        {
            return JSON.parse(localStorage.getItem("cart"))
        }
    }
}


export const removeItemfromCart = (productId,rowToDelete) =>{
    let cart = []
    if(typeof window !== undefined)
    {
        //if cart then return
        if(localStorage.getItem("cart"))
        {
            cart= JSON.parse(localStorage.getItem("cart"))
        }
        if(rowToDelete>-1)
        {
            cart.splice(rowToDelete,1)
        }

        localStorage.setItem("cart",JSON.stringify(cart))
    }

return cart;
}


//Empty the cart by removing "cart" item in local storage
export const cartEmptyFn = (next)=>{
    if(typeof window !== undefined)
    {
     localStorage.removeItem("cart")
     let cart =[]
     localStorage.setItem("cart",JSON.stringify(cart))

     next()  
    }

}


export const countCartProductFn = () =>{
    let cart = []

    if(typeof window !== undefined)
    {
        if(localStorage.getItem("cart"))
        {
            cart= JSON.parse(localStorage.getItem("cart"))
            return cart.length
        }
        
    }

}


export const billProductsInCart = ()=>{
    let cart = []
    let key;
    let arr2 = [];
    if(typeof window !== undefined)
    {
        if(localStorage.getItem("cart"))
        {
            cart= JSON.parse(localStorage.getItem("cart"))
            console.log("cart",cart);
            key = "_id";
//Getting occurance of _id in cart
cart.forEach((x)=>{
       
    // Checking if there is any object in arr2
    // which contains the key value
     if(arr2.some((val)=>{ return val[key] == x[key] })){
         
       // If yes! then increase the occurrence by 1
       arr2.forEach((k)=>{
         if(k[key] === x[key]){ 
           k["occurrence"]++
         }
      })
         
     }else{
       // If not! Then create a new object initialize 
       // it with the present iteration key's value and 
       // set the occurrence to 1
       let a = {}
       a[key] = x[key]
       a["amount"] = x.price
       a["stock"] = x.stock
       a["Name"] = x.name
       a["occurrence"] = 1
       arr2.push(a);
     }
  })
  console.log("arr2",arr2)
      return arr2    
        }
        
    }

}
