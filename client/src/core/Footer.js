import React from 'react'

const Footer = () => {
  return (
   <>
   <footer className="footer mt-auto py-3" style={{backgroundColor:"#E9ECEF"}}>
      <div className="container-fluid text-dark text-center py-3">
        <h4>If you got any questions, feel free to reach out!</h4>

        
        <a style={{color:"Black",textDecoration:"none"}} className="btn btn-warning btn-lg" role="button"  href="mailto:contactshakthir@gmail.com?subject=Query on T-Shirt Mill App&body=Hi,%0D%0AI am the user of T-shirt Mill App.%0D%0AI would like to inform the following messages to Admin team of T-Shirt Mill App%0D%0A %0D%0A" > Contact Us </a>
          
      </div>
      <div className="container">
        <span className="text-muted">
          An Amazing <span className="text-danger">MERN</span> Project
        </span>
      </div>
    </footer>
   </>
  )
}

export default Footer