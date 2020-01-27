import React from 'react';
import { withRouter } from "react-router-dom";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link'
import Vendors from '../../components/Vendors'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';



export const Vendorlist = withRouter(props => {

   
  

   
  return (
    <Grid container  spacing={2}>  
    <Grid container item xs={12} sm={12} alignItems={"flex-end"}>
        <Grid fullwidth item xs={6} sm={6}>

            <Typography component="h6" variant="h6">
            Prodcuts
          </Typography>
          </Grid>
          <Grid fullwidth item xs={6} sm={6} >

          <Link underline='none' component={RouterLink} to={'/productupload'}>
          <Button variant="outlined" color="primary" >
            Add New Vendor
        </Button>
        
        </Link>
        </Grid>
    </Grid>
    <Vendors contactlist={[
        {
            "name":"NAC1"
        }
    ]} />
   
    </Grid>
  )
});

export default Vendorlist;