import React from 'react';
import { withRouter } from "react-router-dom";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link'
import Vendor from '../../components/Vendor'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Mastercontent from '../../components/Mastercontent';
import data from "./data.json"


export const Taxsetup = withRouter(props => {
  const [isadd, setIsadd] = React.useState(false)
   
  function canceltaxcreation()
  {
    setIsadd(false)
  }
  function addnewvendor()
  {
    setIsadd(true)
  }
   
  return (
    <>
    <Grid container  spacing={2}>  
    <Grid container item xs={12} sm={12} alignItems={"flex-end"}>
        <Grid fullwidth item xs={6} sm={6}>

            <Typography component="h6" variant="h6">
            Tax Setup
          </Typography>
          </Grid>
          <Grid fullwidth item xs={6} sm={6} style={{"text-align":"right"}} >
          <Button variant="outlined"  onClick={()=>addnewvendor() } color="primary" >
            Add New Tax
        </Button>
        
        </Grid>
    </Grid>
    <Mastercontent onCancel={canceltaxcreation} isadd={isadd} columns={data.columns}/> 
   
    </Grid>
    </>
  )
});

export default Taxsetup;