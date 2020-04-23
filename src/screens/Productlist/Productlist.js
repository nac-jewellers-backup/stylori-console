import React from 'react';
import { withRouter } from "react-router-dom";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link'
import Product from '../../components/Products'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FullLoader from '../../components/Loader'




export const Productlist = withRouter(props => {

   
  
  //alert(JSON.stringify(props.nameevent))
   
  return (
    <Grid container  spacing={2}>  
        <Grid container item xs={12} sm={12} alignItems={"flex-end"}>
        <Grid fullwidth item xs={6} sm={6}>

            <Typography component="h6" variant="h6">
            Products
          </Typography>
          </Grid>
          <Grid fullwidth item xs={6} sm={6} style={{"text-align":"right"}} >
          <Link underline='none' component={RouterLink} to={'/productupload'}>
          <Button variant="contained" color="primary" >
            Add New Product
        </Button>
        
        </Link>
        </Grid>
    </Grid>
    <Product />
   
    </Grid>
  )
});

export default Productlist;