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
  const master_options = ['Tax','Categories','ProductTypes', 'Materials','Metal Colours','Metal Purities','Master Collections','Master Designs','Master Diamond Types',
'Master Diamond Settings','Master Diamond Shapes','Master Earring Backings','Master Gemstone Settings','Master Gemstone Shapes','Master Gemstone Types',
'Master Gender','Master Materials']
  const master_options_url = ['Taxsetup','material','producttypes', 'materialmaster','mastercolors','masterpurities','collections','designs','diamonds','diamondsettings','diamondshapes','earringbacking']

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
    
    {master_options.map((text, index) => (
    <Grid  item xs={6} sm={4} lg={3}  >
    <Link underline='none' component={RouterLink} to={master_options_url[index]}>
     <Card fullwidth
     className="card2">
        <CardContent >
          <Typography style={{textAlign: "center"}} component="h6" variant="h5">
            {text}
          </Typography>
          
          <Typography variant="body2" style={{textAlign: "center",marginTop:8}} color="textSecondary">
            Lorem Ipsum
          </Typography>
        </CardContent>
        
     
    </Card>
    </Link>
    </Grid>
    ))}

    
    </Grid>
  )
});

export default Configuration;