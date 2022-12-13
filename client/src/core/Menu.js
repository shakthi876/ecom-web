import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { isAutheticated, signout } from "../auth/helper";
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/material";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Base from "./Base";

const Menu = ({cartCount}) => {
 // console.log("Menu cartcount",cartCount)
  let navigate = useNavigate();


    const navlinkStyle =({isActive})=>{
        return{
            fontWeight: isActive ? "bold":"normal",
            TextDecoration : isActive ? 'none':"underline",
            color: isActive ? "darkblack":"black",
            backgroundColor:isActive ? " ":" "

        }

    }
  return (
    <>


<nav class="navbar fixed-top navbar-expand-sm navbar-light fixed-top" style={{backgroundColor:"#E9ECEF"}}>

 
<Link to="/" class="navbar-brand mb-0 h1 ">T-Shirt Mill</Link> 

<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
<span class="navbar-toggler-icon"></span>
</button>

<div class="collapse navbar-collapse" id="navbarNav">
<ul class="navbar-nav">
  <li class="nav-item">
  <NavLink to="/" style={navlinkStyle} className="nav-link">Home</NavLink>
  </li>
  <li class="nav-item">
  {/* <NavLink to="/cart" style={navlinkStyle}  className="nav-link"><span style={{fontWeight:"normal"}}><AddShoppingCartIcon/></span> <sup>{cartCount}</sup> </NavLink> */}
   <NavLink to="/cart" style={navlinkStyle}  className="nav-link">Cart <sup>{cartCount}</sup> </NavLink> 

 </li>


 



 {isAutheticated() && isAutheticated().user.role === 0 && (
      <>
      <li className="nav-item">
    <NavLink to="/user/dashboard" style={navlinkStyle} className="nav-link">User Dashboard</NavLink>
    </li>
      
      </>
    )}
    
    {isAutheticated() && isAutheticated().user.role ===1 && (
            <>
          <li className="nav-item">
          <NavLink to="/admin/dashboard" style={navlinkStyle} className="nav-link">Admin Dashboard</NavLink>
          </li>

            </>
          )}



    {!isAutheticated() && (
<>
  
   <li className="nav-item">
    <NavLink to="/signin" style={navlinkStyle} className="nav-link">Sign In</NavLink>
    </li>
   
    <li className="nav-item">
    <NavLink to="/signup" style={navlinkStyle} className="nav-link">Sign Up</NavLink>
    </li>

</>
)}


{isAutheticated() && (
      <li className="nav-item signout">
        <span className="nav-link text-danger" onClick={()=>{signout(()=>navigate("/"))}}> Sign Out</span>
      
      </li>
    ) }
 
</ul>
</div>

</nav>

</>

















  
  )
 
}

export default Menu