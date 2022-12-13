import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { isAutheticated } from '../auth/helper';
import Base from "../core/Base"
import { categoriescCount, deleteCategory, getACategory, getAllCategories, updateCategory } from './Helper/adminapicall';
import Swal from 'sweetalert2'
import { API } from '../backend';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from '@material-ui/core/Button';
import { Container } from '@mui/system';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
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
    TableFooter
 } from '@material-ui/core';
 const useStyles = makeStyles((theme) => ({
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
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.getContrastText(theme.palette.primary.dark),
      fontSize:"18px"
  },
  avatar: {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.getContrastText(theme.palette.primary.light)
  },
  name: {
      fontWeight: 'bold',
      color: theme.palette.secondary.dark,
      fontSize:"18px"
  },
  status: {
      fontWeight: 'bold',
      fontSize: '0.75rem',
      color: 'white',
      backgroundColor: 'grey',
      borderRadius: 8,
      padding: '3px 10px',
      display: 'inline-block'
  },
  btnColor:{
    color:"red",
    borderColor:"red"
  },
  headFont:{

  }
}));



const Managecategories = () => {
  const classes = useStyles();
  const [categories, setCategories] = useState([]);
  const [categoriesCount,setCategoriesCount]=useState(0)
  const {user,token} = isAutheticated();
  const [categoryName,setCategoryName] = useState("null")
  const [loading,setLoading]=useState(false)
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(3);


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

let name;
  const preLoad= ()=>{
    getAllCategories().then(data =>{
      if (data.error)
      {
        console.log("error",data.error);
      }
      else{
        setCategories(data)
      }
      setLoading(true)
    })

    categoriescCount().then(data=>{
      if(data.error)
      {
        console.log("error",data.error);
      }
      else{
        setCategoriesCount(data)
      }
    })


  }



  useEffect(()=>{
 preLoad()
  },[])


  const deleteMyCategory =(categoryId,categoryName)=>{
    Swal.fire({
      title: `Do you want to delete ${categoryName} Category?`,
      showDenyButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Don't Delete`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
       
        deleteCategory(categoryId,user._id,token).then(data=>{
      if(data.error)
      {
        console.log("error",data.error);
      }
      else{
        preLoad();
      }
    })
        Swal.fire('Deleted!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire(`Not deleted`, '', 'info')
      }
    })
    
  }


const updateMyCategory = (categoryId)=>{
  console.log("id is",categoryId);

  (async () => {

 const get= getACategory(categoryId).then(data =>{
    if(data.error)
    {
      console.log("error is",data.error);
    }
    else{
      return data.name
    }
  })

 const {value: formValues } = await Swal.fire({
    title: 'Enter your New category',
    input: 'text',
    inputLabel: 'Category Name',
    inputValue: get,
    showCancelButton: true,
    inputValidator: (value) => {
      if (!value) {
        return 'You need to write something!'
      }
    }
  }) 
  if (formValues) {
    Swal.fire(`Updated Category is ${formValues}`)
    console.log("name are",formValues);
    updateCategory(categoryId,user._id,token,{formValues}).then(data=>{
      if(data.error)
      {
        console.log("error is",data.error);
      }
      else{
        console.log("updates is",data);
        preLoad()
      }
    })
  }

 })()



}
  return (
<>

  {loading ? (<>
    <Base title='Manage categories' description='Update/Delete categories here!!!'>
<Container>
    <Button color="primary" component={Link} to="/admin/dashboard/"  variant="outlined" startIcon={<ArrowBackIcon />}>
       Admin Home
   </Button>

   </Container>

          {/* <Link className="btn btn-info" to={`/admin/dashboard`}>
            <span className="">Admin Home</span>
          </Link> */}
               
              <h4 className="text-center text-dark my-3">Total categories created: {categoriesCount}  </h4>
    



<div className="center-table">
              <TableContainer component={Paper} className={classes.tableContainer}>
      <Table className={classes.table}   aria-label="simple table">
        <TableHead>
          <TableRow >
            
            <TableCell align='center' className={classes.tableHeaderCell}>Category Name</TableCell>
            <TableCell align='center' className={classes.tableHeaderCell}>Update</TableCell>
            <TableCell align='center' className={classes.tableHeaderCell}>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((category,index) => (
            <TableRow key={index}>
              <TableCell>
                  <Grid container>
                      <Grid item lg={2}>
                          <Avatar alt={category.name} src='.' className={classes.avatar}/>
                      </Grid>
                      <Grid item lg={10}>
                          <Typography className={classes.name}>{category.name}</Typography>
                          
                      </Grid>
                  </Grid>
                </TableCell>
              <TableCell align='center'>

              <Button color='primary' 
            variant='outlined' 
            onClick={() => {updateMyCategory(category._id)}}
            startIcon={<ModeEditIcon />}> Update</Button>


              


                  {/* <Typography color="primary" variant="subtitle2">{row.jobTitle}</Typography>
                  <Typography color="textSecondary" variant="body2">{row.company}</Typography> */}
                </TableCell>
              <TableCell align='center'>
              <Button onClick={() => {deleteMyCategory(category._id,category.name)}} className={classes.btnColor} variant="outlined" startIcon={<DeleteIcon />}>
        Delete
      </Button>
             
                
                </TableCell>
              
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
        <TablePagination
            rowsPerPageOptions={[3, 6, 9]}
            component="div"
            count={categories.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        </TableFooter>
      </Table>
    </TableContainer>

    </div>
















              
        {/*       {categories.map((category,index)=>{
                
                return(
                  <div key={index} className="row text-center mb-2 ">
                <div className="col-4 offset-1">
                  <h4 className="text-dark text-left">{index+1}. {category.name}</h4>
                </div>
                <div className="col-3 col-md-2">


<Button color='success' variant='outlined' onClick={() => {updateMyCategory(category._id)}} startIcon={<ModeEditIcon />}> Update</Button>
                <button onClick={() => {updateMyCategory(category._id)}} className="btn btn-success">
                    Update
                  </button> 
                </div>
                <div className="col-3">
                <Button onClick={() => {deleteMyCategory(category._id,category.name)}} color='error' variant="outlined" startIcon={<DeleteIcon />}>
        Delete
      </Button>



                   <button onClick={() => {deleteMyCategory(category._id,category.name)}} className="btn btn-danger">
                    Delete
                  </button> 
                </div>
              </div>
                )
              })} */}
                
               
    
           
       </Base>
    </>):(<>
     <div className="d-flex justify-content-center spinner-center " style={{backgroundColor:"#E9ECEF"}}>
  <div className="spinner-border text-center " role="status">
  <span className="sr-only">Loading...</span>
    </div>
    </div>
    </>)}
    </> 
  )
  
}

export default Managecategories