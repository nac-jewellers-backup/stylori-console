import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { VoucherContext } from '../../../../context';
import { DateTimePicker } from "@material-ui/pickers";
import { makeid } from '../../../../utils/commonmethod';
import Autocomplete from '@material-ui/lab/Autocomplete';

import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  TextField,
  Popper,
  ButtonGroup,
  CardActionArea,
  CardActions,
  Radio,
  Switch,
  Button,
  Grid,
  Chip,
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
   
    cursor: 'pointer',
    '& + &': {
      marginLeft: theme.spacing(2)
    }
  
  },
  metaloption: {
    border: `1px solid ${theme.palette.divider}`,
    display: 'flex',
    alignItems: 'flex-center',
    padding: theme.spacing(1),
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
  optionmaterialDetails: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),

  },
  selectedtext: {
    color: theme.palette.common.white
  }
}));

const AboutVoucher = props => {
  const { className, ...rest } = props;
  const { voucherCtx, setVoucherCtx } = React.useContext(VoucherContext);
  const [vouchercode, setVouchercode] = useState([]);
  const [vouchername, setVouchername] = useState("");
  const [vouchercount, setVouchercount] = useState("");
  const [voucherprefix, setVoucherprefix] = useState("");

  const [discounttype, setDiscounttype] = useState("");
  const [minreq, setMinreq] = useState("None");
  const [usagelimit, setUsagelimit] = useState("once");

  const [isonce, setIsonce] = useState(false);

  const classes = useStyles();

  const [selected, setSelected] = useState(1);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedendDate, setSelectedendDate] = useState(selectedDate);

  const handleChange = (event, option) => {
    setSelected(option);

  };
  const handleendDateChange = val => {
      setSelectedendDate(val)
      setVoucherCtx({
        ...voucherCtx,
        "enddate": val
      })
    };
  const handleDateChange = val => {
    setSelectedDate(val)

    setVoucherCtx({
      ...voucherCtx,
      "startdate": val
    })
};
  const handleClick = (event, option) => {
   // setDiscounttype(option);
   setVoucherCtx({
     ...voucherCtx,
     "discounttype": option
   })
  };
  const handleMinimumreq = (event, option) => {
   // setDiscounttype(option);
    setVoucherCtx({
      ...voucherCtx,
      "minimumreq": option
    })
  };
  const handleusagelimit = (event, option) => {
    setUsagelimit(option);
    
  };
  const handleInputChange = type => (event, value) => {
    setVoucherCtx({
      ...voucherCtx,
      "vouchercodes":value
    })
    setVouchercode(value)
  }
  // const handleInputChange = (event, option) => {
  //   alert(JSON.stringify(option))
  // }
  // const handleInputChange = type => e => {
  //   setVouchercode(e.target.value.toUpperCase())
  // }
  const handlevouchername = type => e => {
    setVoucherCtx({
      ...voucherCtx,
      [type]: e.target.value.toUpperCase()
    })
  }
  const handlevaluechange = type => e => {
    setVoucherCtx({
      ...voucherCtx,
      [type]: e.target.value
    })
  }
  const handleCountChange = type => e => {
    setVouchercount(e.target.value.toUpperCase())
  }
  const handlePrefixChange = type => e => {
    setVoucherprefix(e.target.value.toUpperCase())
  }
  const handleminreq = (event, option) => {
    setMinreq(option);
  };
  const handleonceperorder = (event, option) => {
  //  setIsonce(!isonce);
    setVoucherCtx({
      ...voucherCtx,
      "isonce": !voucherCtx.isonce
    })
  };
  const generateCoupon = (event) => {
   // alert(JSON.stringify(voucherCtx))
   setVoucherCtx({
     ...voucherCtx,
     "vouchercodes":makeid(10,voucherprefix,vouchercount)
   })
   setVouchercode(makeid(10,voucherprefix,vouchercount))
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
      <Grid   item xs={6} sm={6} >
      <Grid container  item xs={12} sm={12} spacing={1}>
        <TextField
            variant="outlined"
            margin="dense"
            fullWidth
            onChange={handlevouchername('vouchername')}
            id="vouchername"
            name="vouchername"
            value={voucherCtx.vouchername}
            label="Voucher Name"
            />
      <Grid   item xs={6} sm={6} >
      <TextField
            variant="outlined"
            margin="dense"
            fullWidth
            onChange={handlePrefixChange('voucherprefix')}
            id="vouchercode"
            name="vouchercode"
             value={voucherprefix}
            label="Voucher Prefix"
            />
      </Grid>
      <Grid   item xs={6} sm={6} >

        <TextField
            variant="outlined"
            margin="dense"
            fullWidth
            onChange={handleCountChange('vouchercount')}
            id="vouchercode"
            name="vouchercode"
            // value={vouchercode}
            label="No of vouchers"
            />
      </Grid>
      <Grid   item xs={12} sm={12} >

         {/* <TextField
            variant="outlined"
            margin="dense"
            fullWidth
            
            onChange={handleInputChange('vouchercode')}
            id="vouchercode"
            name="vouchercode"
            value={vouchercode}
            label="Voucher Code"
            />  */}

                  <Autocomplete
                       id="free-solo-2-demo"
                       multiple
                       freeSolo
                       defaultValue={vouchercode}
                       value={vouchercode}
                       className={classes.fixedTag}
                       fullWidth
                       options={[]}
                        onChange={handleInputChange('vouchercode')}
                       renderTags={(value, getTagProps) =>
                       value.map((option, index) => (
                       <Chip variant="outlined" size="small" label={option} {...getTagProps({ index })} />
                       ))
                       }
                       renderInput={params => (
                       <TextField
                       {...params}
                       label="Voucher Codes"
                       margin="dense"
                       variant="outlined"
                       fullWidth
                      //  error = {productCtx.error_message.selected_sizes}

                      //  InputProps={{ ...params.InputProps, type: 'search' }}
                       />
                       )}
                       />
                       </Grid>
      </Grid>
      </Grid> 
      <Grid   item xs={6} sm={6} >
      <TextField
            variant="outlined"
            margin="dense"
            fullWidth
            multiline
            rows="7"
            onChange={handlevaluechange('voucherdescription')}
            id="vouchercode"
            name="vouchercode"
           value={voucherCtx.voucherdescription}
            label="Voucher Description"
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
        <FormControlLabel
        control={
          <Switch
            // checked={state.checkedB}
            // onChange={handleChange}
            name="checkedB"
            color="primary"
          />
        }
        labelPlacement="start"

        label="Applicable for loggedin user"
      />  
      </Grid>
        <Grid  item xs={12} sm={12} spacing={1}>
                      
      <Typography
        gutterBottom
        variant="h5"
      >
      Discount Type
      </Typography>
      </Grid>
        

            <ButtonGroup color="primary" aria-label="outlined primary button group">

            {props.categories.map(option => (
              
            <Button onClick={(event)=> handleClick(event,option)} variant={voucherCtx.discounttype == option ? "contained" : "outlined" }>{option}</Button>
              
            ))}
            </ButtonGroup>
        </Grid>
         {voucherCtx.discounttype === 'Free Shipping' || voucherCtx.discounttype === "" ?  <Grid container item xs={12} sm={12} spacing={1}>
        <Grid item xs={6} sm={6} spacing={1}>
            <TextField
          variant="outlined"
          margin="dense"
          fullWidth
          id="orderqty"
          name="orderqty"
          label="Minimum order Quantity"
          onChange={handlevaluechange('minimumqty')}
          value={voucherCtx.voucherdiscount}
          />
        </Grid> </Grid> :  
        <Grid container item xs={12} sm={12} spacing={1}>
        <Grid item xs={6} sm={6} spacing={1}>

        <TextField
          variant="outlined"
          margin="dense"
          fullWidth
          id="discountvalue"
          name="discountvalue"
          label="Discount Value"
          onChange={handlevaluechange('voucherdiscount')}
          value={voucherCtx.voucherdiscount}
          />
          </Grid>
          {voucherCtx.discounttype === 'percentage' ?  <Grid  item xs={6} sm={6} spacing={1}>
          <TextField
          variant="outlined"
          margin="dense"
          fullWidth
          id="discountvalue"
          name="discountvalue"
          label="Maximun Discount Value"
          onChange={handlevaluechange('maxvoucherdiscount')}
          value={voucherCtx.voucherdiscount}
          />
          </Grid> : null}

        </Grid>
}
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
            minDate={new Date()}    
            onChange={handleDateChange}
          />
      </Grid>
              <Grid  item xs={6} sm={6} spacing={1}>
              <DateTimePicker
        label="End Date"
        fullWidth
        inputVariant="outlined"
        value={selectedendDate}
        minDate={selectedDate}
        strictCompareDates={true}
        onChange={handleendDateChange}
      />
      </Grid>
          </Grid>
        <Grid  item xs={6} sm={6} spacing={1}>
        <TextField
          variant="outlined"
          margin="dense"
          fullWidth
          id="discountvalue"
          name="discountvalue"
          label="Discount Value"
          defaultValue="1"
          helperText="One User can use how many times"
          onChange={handlevaluechange('isonce')}
          value={voucherCtx.voucherdiscount}
          />
        {/* <CardActionArea>

        <div
            className={clsx(classes.option, {
              [classes.selectedOptiondefault]: voucherCtx.isonce
            })}
            onClick={event => handleonceperorder(event, voucherCtx.isonce)}

            key={""}
          >
                <CardActions>

            <Radio
              checked={voucherCtx.isonce}
              className={classes.optionRadio}
              color="primary"
              label
              onClick={event => handleonceperorder(event, voucherCtx.isonce)}
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
          </CardActionArea> */}
          </Grid>
         
          <Grid item xs={6} sm={6} spacing={1}>
        <TextField
          variant="outlined"
          margin="dense"
          onChange={handlevaluechange('limittouse')}
          fullWidth
          value={voucherCtx.limittouse}
          id="discountvalue"
          name="discountvalue"
          label="Limit of uses"
          helperText="How may times we can  use this"

          />
        
        </Grid>
          {/* <Grid container item xs={12} sm={12} spacing={1}>
        <Grid  item xs={12} sm={12} spacing={1}>

      <Typography
        gutterBottom
        variant="h5"
      >
        Minimum Requirements
        </Typography>
      </Grid>
      <ButtonGroup color="primary" aria-label="outlined primary button group">

            {['None','Minimum Order Value','Minimum Quantity of Items'].map(option => (
              
            <Button onClick={(event)=> handleMinimumreq(event,option)} variant={voucherCtx.minimumreq == option ? "contained" : "outlined" }>{option}</Button>
              
            ))}
            </ButtonGroup>
        
        </Grid> */}



        



        <Grid item xs={12} sm={12} spacing={1}>
        {/* {voucherCtx.minimumreq === 'None' || !voucherCtx.minimumreq  ? null : */}
        <TextField
          variant="outlined"
          margin="dense"
          onChange={handlevaluechange('minorder')}
          fullWidth
          id="discountvalue"
          name="discountvalue"
          value={voucherCtx.minorder}
          label={'Minimum Order Value'}
          />
        {/* } */}
        </Grid>
        <Grid container item xs={12} sm={12} spacing={1}>
        {/* <Grid  item xs={12} sm={12} spacing={1}>

          <Typography
            gutterBottom
            variant="h5"
          >
            Usage Limits
            </Typography>
          </Grid> */}
{/* 
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
  </Grid> */}
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
