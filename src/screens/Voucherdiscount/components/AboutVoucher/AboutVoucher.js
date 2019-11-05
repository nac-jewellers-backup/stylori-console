import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { VoucherContext } from '../../../../context';
import { DateTimePicker } from "@material-ui/pickers";

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
    backgroundColor: theme.palette.primary.main,
   // border: `3px solid ${theme.palette.divider}`,

  },
  selectedOptiondefault: {
    backgroundColor: theme.palette.common.white,
   // border: `3px solid ${theme.palette.divider}`,

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
  },
  selectedtext: {
    color: theme.palette.common.white
  }
}));

const AboutVoucher = props => {
  const { className, ...rest } = props;
  const { voucherCtx, setVoucherCtx } = React.useContext(VoucherContext);
  const [vouchercode, setVouchercode] = useState("");
  const [discounttype, setDiscounttype] = useState("");
  const [minreq, setMinreq] = useState("None");
  const [usagelimit, setUsagelimit] = useState("once");

  const [isonce, setIsonce] = useState(false);

  const classes = useStyles();

  const [selected, setSelected] = useState(1);
  const [selectedDate, handleDateChange] = useState(new Date());

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
    setDiscounttype(option);
  };
  const handleusagelimit = (event, option) => {
    setUsagelimit(option);

  };
  const handleminreq = (event, option) => {
    setMinreq(option);
  };
  const handleonceperorder = (event, option) => {
    setIsonce(!isonce);
  };
  const generateCoupon = (event) => {
   // alert(JSON.stringify(voucherCtx))
   setVouchercode(makeid(6))
  };
  
  
  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader title="General Information" />
      <Divider />
      <CardContent className={classes.cardcontent}>
      <Grid container  spacing={2}>  
      <Grid container item xs={12} sm={12} spacing={1} >

      <Grid   item xs={10} sm={10} >
        <TextField
            variant="outlined"
            margin="dense"
            fullWidth
            id="vouchercode"
            name="vouchercode"
            value={vouchercode}
            label="Voucher Code"
            />
      </Grid>

      <Grid   item xs={2} sm={2} >
        <Button size="small" variant="contained" 
        onClick={event => generateCoupon(event)}
        className={classes.margin}>
            Generate Voucher
          </Button>
      </Grid>

          

        </Grid>
        
        <Grid container item xs={12} sm={12} spacing={1}>
        <Grid  item xs={12} sm={12} spacing={1}>

      <Typography
        gutterBottom
        variant="h5"
      >
      Discount Type
      </Typography>
      </Grid>
        {props.categories.map(option => (
          
          <Grid justify="center" item xs={3} sm={3} spacing={1}>
          <CardActionArea>
            
          <div
            className={clsx(classes.option, {
              [classes.selectedOption]: discounttype === option
            })}
            onClick={event => handleClick(event, option)}
            key={option}
          >

           <div className={classes.optionDetails}>
           <Typography className={discounttype === option ? classes.selectedtext : null}
                gutterBottom
                variant="h6"
              >
                {option}
              </Typography>  
              </div> 
                         
            
          </div>
          </CardActionArea>
          </Grid>
        ))}
        </Grid>
       
        <Grid item xs={12} sm={12} spacing={1}>

        <TextField
          variant="outlined"
          margin="dense"
          fullWidth
          id="discountvalue"
          name="discountvalue"
          label="Discount Value"
          />
        </Grid>
        <Grid  item xs={12} sm={12} spacing={1}>
        <CardActionArea>

        <div
            className={clsx(classes.option, {
              [classes.selectedOptiondefault]: isonce
            })}
            onClick={event => handleonceperorder(event, isonce)}

            key={""}
          >
                <CardActions>

            <Radio
              checked={isonce}
              className={classes.optionRadio}
              color="primary"
              label
              onClick={event => handleonceperorder(event, isonce)}
              />
            </CardActions>
            <div className={classes.optionDetails}>
              <Typography
                gutterBottom
                variant="h5"
              >
               Only once per order
              </Typography>
              <Typography
                gutterBottom
                variant="title"
              >
               If this option is disabled, discount will be counted for every eligible product
              </Typography>
              </div>
            
          </div>
          </CardActionArea>
          </Grid>
          <Grid container item xs={12} sm={12} spacing={1}>
        <Grid  item xs={12} sm={12} spacing={1}>

      <Typography
        gutterBottom
        variant="h5"
      >
        Minimum Requirements
        </Typography>
      </Grid>
        {['None','Minimum Order Value','Minimum Quantity of Items'].map(option => (
          
          <Grid  item xs={3} sm={3} spacing={1}>
          
          <div
            className={clsx(classes.option, {
              [classes.selectedOption]: minreq === option
            })}
            onClick={event => handleminreq(event, option)}

            key={option}
          >
            {/* <Radio
              checked={selected === option}
              className={classes.optionRadio}
              color="primary"
              onClick={event => handleChange(event, option)}
            /> */}
            <div className={classes.optionDetails}>
              <Typography
                gutterBottom
                className={minreq === option ? classes.selectedtext : null}
                variant="h6"
              >
                {option}
              </Typography>
              </div>
            
          </div>
          </Grid>
        ))}
        </Grid>
        <Grid item xs={12} sm={12} spacing={1}>
        {minreq === 'None' ? null :
        <TextField
          variant="outlined"
          margin="dense"
          
          fullWidth
          id="discountvalue"
          name="discountvalue"
          label={minreq === 'Minimum Order Value' ? 'Minimun Order' : 'Minimum Quantity'}
          />
        }
        </Grid>
       
        <Grid container item xs={12} sm={12} spacing={1}>
        <Grid  item xs={12} sm={12} spacing={1}>

          <Typography
            gutterBottom
            variant="h5"
          >
            Usage Limits
            </Typography>
          </Grid>

          <Grid  item xs={6} sm={6} spacing={1}>

          <div
            className={clsx(classes.option, {
              [classes.selectedOptiondefault]: usagelimit === "once"
            })}
            key={""}
            onClick={event => handleusagelimit(event, "once")}

          >
            <Radio
              checked={usagelimit === "once"}
              className={classes.optionRadio}
              color="primary"
              onClick={event => handleusagelimit(event, "once")}
            />
            <div className={classes.optionDetails}>
              <Typography
                className={selected === "" ? classes.selectedtext : null}
                gutterBottom
                variant="h6"
              >
               Only once per order
              </Typography>
              <Typography
                gutterBottom
                variant="title"
              >
               Limit to one use per customer
              </Typography>
              </div>
            
          </div>
          
            </Grid>
            <Grid  item xs={6} sm={6} spacing={1}>

<div
  className={clsx(classes.option, {
    [classes.selectedOptiondefault]: usagelimit === "usagecount"
  })}
  key={""}
  onClick={event => handleusagelimit(event, "usagecount")}

>
  <Radio
    checked={usagelimit === "usagecount"}
    className={classes.optionRadio}
    color="primary"
    onClick={event => handleusagelimit(event, "usagecount")}
  />
  <div className={classes.optionDetails}>
    <Typography
      gutterBottom
      variant="h5"
    >
     Usage Limit
    </Typography>
    <Typography
      gutterBottom
      variant="title"
    >
     Limit number of times this discount can be used in total
    </Typography>
    </div>
  
</div>
<Grid item xs={12} sm={12} spacing={1}>
        {usagelimit === 'once' ? null :
        <TextField
          variant="outlined"
          margin="dense"
          
          fullWidth
          id="discountvalue"
          name="discountvalue"
          label="Limit of uses"
          />
        }
        </Grid>
  </Grid>
          </Grid>
          <Grid container item xs={12} sm={12} spacing={1}>
        <Grid  item xs={12} sm={12} spacing={1}>

          <Typography
            gutterBottom
            variant="h5"
          >
            Active Date
            </Typography>
          </Grid>
          <Grid  item xs={6} sm={6} spacing={1}>

          <DateTimePicker
        label="Start Date"
        fullWidth
        inputVariant="outlined"
        value={selectedDate}
      
        onChange={handleDateChange}
      />
      </Grid>
              <Grid  item xs={6} sm={6} spacing={1}>
              <DateTimePicker
        label="End Date"
        fullWidth
        inputVariant="outlined"
        value={selectedDate}
        onChange={handleDateChange}
      />
      </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

AboutVoucher.propTypes = {
  className: PropTypes.string
};

export default AboutVoucher;
