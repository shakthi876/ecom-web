import { API } from "../../backend";

//category api calls
export const createCategory = (userId,token,category)=>{
    console.log("cat",category)
    return fetch(`${API}/category/create/${userId}`,{
        method:"POST",
        //Header information
        headers:{
            Accept:"application/json",
           "Content-Type": "application/json",
           Authorization: `Bearer ${token}`
        },
        //body information
        body:JSON.stringify(category)
    }
    
    ).then(response=>response.json()).catch(err=>console.log("error is",err))
}


//CRUD

//Get all categories
export const getAllCategories =()=>{
    console.log("kk")
    return fetch(`${API}/categories`,{
        method:"GET"
    }).then(
        response =>{
            return response.json()
        }
    ).catch(err=>console.log("Error is",err))
}
//products calls -CRUD

//create a product
export const createProduct = (userId,token,product)=>{
    return fetch(`${API}/product/create/${userId}`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            Authorization: `Bearer ${token}`
        },
        body:product
    }).then(
        response =>{
            return response.json()
        }
    ).catch(err=>console.log("Error is",err))
}


//get all products
export const getAllProducts =()=>{
    return fetch(`${API}/products`,{
        method:"GET"
    }).then(
        response =>{
            return response.json()
        }
    ).catch(err=>console.log("Error is",err))
}

//get single product
export const getAProduct =(productId)=>{
    return fetch(`${API}/product/${productId}`,{method:"GET"})
    .then(
        response =>{
            return response.json()
        }
    ).catch(err=>console.log("Error is",err))
}
//update a product
export const updateProduct = (productId,userId,token,product)=>{
    return fetch(`${API}/product/update/${productId}/${userId}`,{
        method:"PUT",
        headers:{
            Accept:"application/json",
            Authorization: `Bearer ${token}`
        },
        body: product
    }).then(
        response =>{
            return response.json()
        }
    ).catch(err=>console.log("Error is",err))
}


//delete a product
export const deleteproduct =(productId,userId,token)=>{
    return fetch(`${API}/product/delete/${productId}/${userId}`,{
        method:"DELETE",
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

export const productsCount = ()=>{
    return fetch(`${API}/count/product`,{method:"GET"})
    .then(
        response => {return response.json()}
    )
    .catch(err=>console.log("Error is",err))
}
export const categoriescCount = ()=>{
    return fetch(`${API}/count/category`,{method:"GET"})
    .then(
        response => {return response.json()}
    )
    .catch(err=>console.log("Error is",err))
}

export const deleteCategory =(categoryId,userId,token)=>{
    return fetch(`${API}/category/${categoryId}/${userId}`,{
        method:"DELETE",
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

export const getACategory =(categoryId)=>{
    return fetch(`${API}/category/${categoryId}`,{method:"GET"})
    .then(
        response =>{
            return response.json()
        }
    ).catch(err=>console.log("Error is",err))
}

export const updateCategory = (categoryId,userId,token,category)=>{
    console.log("cat",category);
    return fetch(`${API}/category/${categoryId}/${userId}`,{
        method:"PUT",
        headers:{
            Accept:"application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body:JSON.stringify(category)
    }).then(
        response =>{
            return response.json()
        }
    ).catch(err=>console.log("Error is",err))
}