import React from 'react';
import { withRouter } from "react-router-dom";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link'

import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import Typography from '@material-ui/core/Typography';
import "./Configuration.css"


export const Configuration = withRouter(props => {

   
  const [raised, setRaised] = React.useState(false);
  const [cardindex, setCardindex] = React.useState(-1);

  const onMouseOver = () => 
  {
      setRaised(true);
  }
  const onMouseOut = () => 
  { 
      setRaised(false);
     // setCardindex(-1)

  }

   
  return (
    <Grid container  spacing={3}>  
    {/* <AddContact contactlist={[]}/> */}
    <Grid container item xs={12} sm={12} spacing={2}>
            <Typography component="h5" variant="h5">
            Configure
          </Typography>
    </Grid>
    
   
    <Grid  item xs={6} sm={6} >
    <Link underline='none' component={RouterLink} to={'/material'}>
     <Card fullwidth
     className="card2">
        <CardContent >
          <Typography component="h6" variant="h6">
            Manage Material
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Lorem Ipsum
          </Typography>
        </CardContent>
        
     
    </Card>
    </Link>
    </Grid>

    <Grid  item xs={6} sm={6} >
    <Link underline='none' component={RouterLink} to={'/dashboard'}>
     <Card fullwidth
     className="card2">
        <CardContent >
          <Typography component="h6" variant="h6">
            Material Purity
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
          Lorem Ipsum
          </Typography>
        </CardContent>
        
     
    </Card>
    </Link>
    </Grid>
    <Grid  item xs={6} sm={6} >
    <Link underline='none' component={RouterLink} to={'/dashboard'}>
     <Card fullwidth
     className="card2">
        <CardContent >
          <Typography component="h6" variant="h6">
            Gemstone Types
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
          Lorem Ipsum
          </Typography>
        </CardContent>
        
     
    </Card>
    </Link>
    </Grid>
    <Grid  item xs={6} sm={6} >
    <Link underline='none' component={RouterLink} to={'/dashboard'}>
     <Card fullwidth
     className="card2">
        <CardContent >
          <Typography component="h6" variant="h6">
            Diamond Colours
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
          Lorem Ipsum
          </Typography>
        </CardContent>
        
     
    </Card>
    </Link>
    </Grid>
    <Grid  item xs={6} sm={6} >
    <Link underline='none' component={RouterLink} to={'/dashboard'}>
     <Card fullwidth
     className="card2">
        <CardContent >
          <Typography component="h6" variant="h6">
            Diamond Clarity
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
          Lorem Ipsum
          </Typography>
        </CardContent>
        
     
    </Card>
    </Link>
    </Grid>
    <Grid  item xs={6} sm={6} >
    <Link underline='none' component={RouterLink} to={'/dashboard'}>
     <Card fullwidth
     className="card2">
        <CardContent >
          <Typography component="h6" variant="h6">
            Making Charge Types
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
          Lorem Ipsum
          </Typography>
        </CardContent>
        
     
    </Card>
    </Link>
    </Grid>
    </Grid>
  )
});

export default Configuration;