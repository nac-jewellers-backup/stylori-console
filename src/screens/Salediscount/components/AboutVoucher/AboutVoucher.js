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
  
  CardActionArea,
  CardActions,
  Radio,
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
  const [selectedDate, handleDateChange] = useState(new Date());

  const handleChange = (event, option) => {
    setSelected(option);

  };
  
 
  const handleClick = (event, option) => {
    setDiscounttype(option);
  };
  const handleusagelimit = (event, option) => {
    setUsagelimit(option);

  };
  const handleInputChange = type => e => {
    setVouchercode(e.target.value.toUpperCase())
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
    setIsonce(!isonce);
  };
  const generateCoupon = (event) => {
   // alert(JSON.stringify(voucherCtx))
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
      <Grid   item xs={6} sm={6} >
              
                       
      
        <Autocomplete
                       id="free-solo-2-demo"
                       multiple
                       freeSolo
                       defaultValue={vouchercode}
                       value={vouchercode}
                       className={classes.fixedTag}
                       fullWidth
                       options={[]}
                      //  onChange={handleInputChange('vouchercode')}
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

        <Grid container item xs={12} sm={12} spacing={1}>
        
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
