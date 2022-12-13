import React, { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { isAutheticated } from '../auth/helper'
import Base from "../core/Base"
import { deleteproduct, getAllProducts, productsCount } from './Helper/adminapicall'
import Swal from 'sweetalert2'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Button from '@material-ui/core/Button';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import { 
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Avatar,
    Grid,
    Typography,
    TablePagination,
    TableFooter,
    IconButton
 } from '@material-ui/core';
import EditOutlined from '@material-ui/icons/EditOutlined'

import { Tooltip } from '@material-ui/core';
import { Container } from '@mui/system'



const useStylesMystyle = makeStyles((theme) => ({
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
  },
}));

function MyTooltip(props) {
  const classes = useStylesMystyle();

  return <Tooltip arrow classes={classes} {...props} />;
}


 const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table: {
    minWidth: 650,
    
   
  },
  tableContainer: {
    borderRadius: 15,
      margin: '10px 20px',
      maxWidth: 950,
      
  },
  tableHeaderCell: {
      fontWeight: 'bold',
      backgroundColor: '#242B2E',
      color: theme.palette.getContrastText(theme.palette.primary.dark),
      fontSize:"17px"
  },
  avatar: {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.getContrastText(theme.palette.primary.light),
      [theme.breakpoints.only("xs")]: {
        display: "none",
      },
      [theme.breakpoints.only("sm")]: {
        display: "none",
      },
  },
  name: {
      fontWeight: 'bold',
      //color: theme.palette.secondary.dark,
      fontSize:"18px"
  },
  btnColor:{
    color:"red",
    borderColor:"red"
  },pagntn:{
    marginLeft:"30px"
  }

}));






const ManageProducts = () => {

  const classes = useStyles();
  const [loading,setLoading]=useState(false)
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  
  const [products, setProducts] = useState([]);
  const [productCount,setProductCount]=useState(0)
  const {user,token} = isAutheticated();


  const preLoad= ()=>{
    getAllProducts().then(data =>{
      if (data.error)
      {
        console.log("error",data.error);
      }
      else{
        setProducts(data)
      }
      setLoading(true)
    })

    productsCount().then(data=>{
      if(data.error)
      {
        console.log("error",data.error);
      }
      else{
        setProductCount(data)
      }
    })


  }



  useEffect(()=>{
 preLoad()
  },[])

//delete the product

  const deleteMyProduct = (productId,productName)=>{
    Swal.fire({



      title: `Do you want to delete the ${productName} product?`,
      showDenyButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Don't Delete`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
    deleteproduct(productId,user._id,token).then(data=>{
      if(data.error)
      {
        console.log("erro",data.error);
      }
      else{
        preLoad();
      }
    })
        Swal.fire('Deleted!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire(`${productName} product not deleted`, '', 'info')
      }
    })



  }

  return (

    <>
    {loading ? ( <>
      <Base title='Welcome Admin' description='Manage products here!!'>

<div className="container">
<MyTooltip title="Go Back">
      <IconButton
      color='primary'
      component={Link} to="/admin/dashboard/" 
      >
    <ArrowBackIcon  fontSize="large"   />
    </IconButton>
      </MyTooltip>
      </div>
    

{/* <Button
 color="inherit" 
 component={Link} 
 to="/admin/dashboard/"  
 variant="outlined" 
 startIcon={<ArrowBackIcon />}>
       Admin Home
</Button> */}
      <div className="row">
        <div className="col-12">
          <h4 className=" text-dark my-3 text-center">Total available products is {productCount} </h4>
          <h5 className='text-dark container text-center'>Update/Delete Products</h5>
         
          </div>
          </div>
    {productCount > 0 ? (
      <>
      <div className="center-table">
      
<TableContainer className={classes.tableContainer}>
<Table className={classes.table}   aria-label="simple table">
<TableHead>
<TableRow >
  
  <TableCell align='center' className={classes.tableHeaderCell}>Product Name</TableCell>
  <TableCell align='center' className={classes.tableHeaderCell}>Update</TableCell>
  <TableCell align='center' className={classes.tableHeaderCell}>Delete</TableCell>
</TableRow>
</TableHead>
<TableBody>
{products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product,index) => (
  <TableRow key={index}>
    <TableCell>
        <Grid container>
            <Grid item lg={2}>
                <Avatar alt={product.name} src='.' className={classes.avatar}/>
            </Grid>
            <Grid item lg={10}>
                <Typography className={classes.name}>{product.name}</Typography>
                
            </Grid>
        </Grid>
      </TableCell>
    <TableCell align='center'>
    <MyTooltip title="Update Product">
<IconButton
color='primary'
component={Link} 
  to={`/admin/dashboard/product/update/${product._id}`} 
>
  <EditOutlined/>
</IconButton>
</MyTooltip>
{/* 
    <Button color='primary' 
  variant='outlined' 
  component={Link} 
  to={`/admin/dashboard/product/update/${product._id}`} 
  startIcon={<EditIcon />}> Update</Button> */}

        {/* <Typography color="primary" variant="subtitle2">{row.jobTitle}</Typography>
        <Typography color="textSecondary" variant="body2">{row.company}</Typography> */}
      </TableCell>
    <TableCell align='center'>
    <MyTooltip title="Delete a product">
      <IconButton  onClick={() => {deleteMyProduct(product._id,product.name)}}className={classes.btnColor} >
      <DeleteIcon />
      </IconButton>
</MyTooltip>



    {/* <Button 
    onClick={() => {deleteMyProduct(product._id,product.name)}} 
    className={classes.btnColor} variant="outlined" startIcon={<DeleteIcon />}>
Delete
</Button>
       */}
      
      </TableCell>
    
  </TableRow>
))}
</TableBody>

<TablePagination
  rowsPerPageOptions={[5, 10, 15]}
  component="div"
  count={products.length}
  rowsPerPage={rowsPerPage}
  page={page}
  onChangePage={handleChangePage}
  onChangeRowsPerPage={handleChangeRowsPerPage}
/>

</Table>
</TableContainer>

      </div>
      </>
    ):(<div className='text-center'>
    Add some products <Link to="/admin/create/product">Add Products</Link>
    </div>)}


   </Base>
    
    </>):(<>
      <div className="d-flex justify-content-center spinner-center" style={{backgroundColor:"#E9ECEF"}}>
  <div className="spinner-border text-center " role="status">
  <span className="sr-only">Loading...</span>
    </div>
    </div>
    
    </>)}
    
   
    
   </>
  )
}

export default ManageProducts