import React, { useEffect, useState } from 'react'
import Base from './Base'
import Card from './Card'
import { getProducts } from './helper/Coreapicall'
import Masonry from 'react-masonry-css'
import { countCartProductFn } from './helper/cartHelper'
import {getAllCategories} from "../admin/Helper/adminapicall"
const Home = ({cartCount,setCartCount = f=>f}) => {

const [products,setProducts]=useState([])
const [error,setError]=useState(false)
const [loading,setLoading]=useState(false)
const [categories,setCategories] = useState([])
let [cate,setCate] = useState("select a category")
let cr=[];
const loadAllProducts = () => {
  
  getProducts().then(data => {

    if (data.error) {
      setError(data.error);
    } else {
      setProducts(data);
      
    }
    setLoading(true)



    loadAllCategories()
  });
};

const loadAllCategories = ()=>{
  getAllCategories().then(data=>{
    if(data.error)
    {
      console.log("error is",data.error)
    }
    else{
      setCategories(data)
    }
  })
}

useEffect(()=>{
  loadAllProducts()
  setCartCount(countCartProductFn())
},[])

const breakpoints = {
  default:3,
  1100:2,
  700:1
}
let handleCateChange = (e) => {
  setCate(e.target.value)
}
const selectCategories = ()=>{
  return(
    <div className='text-dark mb-5 '>
      <div className="row">
        <div className="col-12 col-md-8">

        </div>
        <div className="col-md-4">
        <select onChange={handleCateChange} className='form-control'>
    <option value="select a category" >All Categories</option>
    {
      categories.map((cate,i )=> <option key={i} value={cate.name}>{cate.name}</option>)
    }
  </select>
        </div>
      </div>
    
  
    </div>
  )
  

}

  return (
    <>
    
      
       
{loading ? ( <>
  <Base title="Home Page" description="Welcome to the T-shirt Store">
  {categories && selectCategories()}
{/* 
For card alignment -Masonry */}

         {
           cate === "select a category" ?(<>
           <Masonry
      breakpointCols={breakpoints}
      className="my-masonry-grid text-center"
      columnClassName="my-masonry-grid_column"
      >

           {
products.map((product,index)=>{
  return(
    <Card key={index} product={product} />
  )
})
           }

</Masonry>
           </>):(<>
            
                {/* {console.log("ce",  products.filter(prod => prod.category.name ===cate).map((prod)=>prod))}


{console.log("33333",products.filter(prod => prod.category.name ===cate))} */}




{ products &&
products.filter(prod => prod.category.name ===cate).length <= 0 ? (<div className='text-center text-danger h5'>
No products available in this category<br/> Coming Soon...
</div>):(
  <Masonry
  breakpointCols={breakpoints}
  className="my-masonry-grid text-center"
  columnClassName="my-masonry-grid_column"
  >
  {
                  products.filter(prod=>prod.category.name===cate).map((product,index)=>{
                    return(

                           <Card key={index} product={product} />
                  
                    )
                  })
                }
   </Masonry>
)

}



                
               
              
              
           </>)
         
         
         
         
         }
         
          



          </Base>

</>): ( <>
  <div className="d-flex justify-content-center spinner-center " style={{backgroundColor:"#E9ECEF"}}>
  <div className="spinner-border text-center " role="status">
  <span className="sr-only">Loading...</span>
    </div>
    </div>
</>)}


   


       
  
    </>
  )
}

export default Home