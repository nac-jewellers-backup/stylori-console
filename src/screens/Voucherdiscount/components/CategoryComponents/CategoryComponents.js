import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { VoucherContext } from '../../../../context';

import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  TextField,
  Popper,
  CardActionArea,
  CardActions,
  Radio,
  Button,
  Grid,
  Checkbox,
  FormControlLabel,
  Divider,
  colors
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {},
  option: {
    border: `1px solid ${theme.palette.divider}`,
    display: 'flex',
    alignItems: 'flex-center',
    padding: theme.spacing(1),
    maxWidth: '100%',
    minWidth: '100%',
    cursor: 'pointer',
    '& + &': {
      marginLeft: theme.spacing(2)
    }
  
  },
  cardcontent:{
    display: 'flex',
    alignItems: 'flex-center',

  },
  selectedOption: {
    backgroundColor: theme.palette.primary
  },
  optionRadio: {
    margin: -10
  },
  margin: {
    marginTop: theme.spacing(2),
  },
  optionDetails: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(2),
  }
}));

const CategoryComponents = props => {
  const { className, ...rest } = props;
  const { voucherCtx, setVoucherCtx } = React.useContext(VoucherContext);
  const [vouchercode, setVouchercode] = useState("");

  const classes = useStyles();

  const [selected, setSelected] = useState(1);

  const handleChange = (event, option) => {
    setSelected(option);

  };
  function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result.toUpperCase();
 }
 
  const handleClick = (event, option) => {
    setSelected(option);
  };
  const generateCoupon = (event) => {
   // alert(JSON.stringify(voucherCtx))
   setVouchercode("1234343")
  };
  
  return (
        <Grid container item xs={12} sm={12} spacing={1}>
        
        {props.materials.map(option => (
          
          <Grid justify="center" item xs={3} sm={3} spacing={1}>
          <CardActionArea>
            
          <div
            className={clsx(classes.option, {
              [classes.selectedOption]: selected === option
            })}
            onClick={event => handleClick(event, option)}
            key={option}
          >

           <div className={classes.optionDetails}>
           <Typography
                gutterBottom
                variant="h5"
              >
                {option}
              </Typography>  
              </div> 
          </div>
          </CardActionArea>
          </Grid>
        ))}  
        </Grid>
       
        
  );
};

CategoryComponents.propTypes = {
};

export default CategoryComponents;
