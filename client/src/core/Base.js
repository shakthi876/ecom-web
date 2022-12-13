import React from "react";
import Footer from "./Footer";
import Menu from "./Menu";
import Container from '@mui/material/Container'




const Base = ({
  title = "My Title",
  description = "My desription",
  className = "p-4",
  children
}) => (
  <div>

    <div className="mt-4">
     
      <div className="jumbotron mt-4 mt-sm-0 text-center">
        <h2 className="display-4">{title}</h2>
        <p className="lead">{description}</p>
        
      </div>
      <div className={className}>
        <Container>
        {children}
        </Container>

       
       
        
        </div>
        <Footer/>
      
    </div>
    
  </div>
);

export default Base;
