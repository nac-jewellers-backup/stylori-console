import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { VoucherContext } from '../../../../context';
import { DateTimePicker } from "@material-ui/pickers";
import { makeid } from '../../../../utils/commonmethod';
import { Autocomplete } from '@material-ui/lab';
import  {NetworkContext}  from '../../../../context/NetworkContext';

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
  const { sendNetworkRequest } = React.useContext(NetworkContext);
  const [updatestatus, setUpdatestatus] = useState("");

  const [vouchercode, setVouchercode] = useState("");
  const [discounttype, setDiscounttype] = useState("");
  const [minreq, setMinreq] = useState("None");
  const [usagelimit, setUsagelimit] = useState("once");
  const [formData, setFormData] = useState({});

  const [isonce, setIsonce] = useState(false);

  const classes = useStyles();

  const [selected, setSelected] = useState(1);
  const [selectedDate, handleDateChange] = useState(new Date());

  const handleChange = (event, option) => {
    setSelected(option);

  };
  const hangeoptionchange = type => (event, option) => {
      setFormData({...formData,[type]: option})
  };
 
  const handleClick = async (event, option) => {
    let response = await sendNetworkRequest('/updatepricelist', {}, formData, false)
    if(response.status < 400){
    }else{
      alert("error")
    }
  };
  const handleuploadstatus = async (event, option) => {
    let response = await sendNetworkRequest('/getpriceupdatestatus', {}, formData, false)
    if(response.status < 400){
      setUpdatestatus(response.message)
    }else{
    }
  };
  const handleusagelimit = (event, option) => {
    setUsagelimit(option);

  };
  const handleInputChange = type => e => {
    setVouchercode(e.target.value.toUpperCase())
  }
  const handleminreq = (event, option) => {
    setMinreq(option);
  };
  const handleonceperorder =  (event, option) => {
    setIsonce(!isonce);
  };
  const generateCoupon = (event) => {
   // alert(JSON.stringify(voucherCtx))
   setVouchercode(makeid(10))
  };
  
  
  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader title="General Information" />
      <Divider />
      <CardContent className={classes.cardcontent}>
      <Grid container spacing={2}>  
        <Grid item xs={6} sm={3}>
           <Autocomplete
              multiple
              id="combo-box-demo"
              options={props.masterData.vendorcode}
              getOptionLabel={option => option.name}
              fullWidth
              onChange={hangeoptionchange('vendorcode')}
              renderInput={params => (
                <TextField {...params} label="Selct Vendor" variant="outlined" fullWidth />
              )}
            />
        </Grid>
        <Grid item xs={6} sm={3} >
        <Autocomplete
              multiple
              id="combo-box-demo"
              options={props.masterData.category}
              getOptionLabel={option => option.name}
              onChange={hangeoptionchange('category')}
              fullWidth
              renderInput={params => (
                <TextField {...params} label="Select Product Category" variant="outlined" fullWidth />
              )}
            />
        </Grid>
        <Grid item xs={6} sm={3}>
        <Autocomplete
              multiple
              id="combo-box-demo"
              options={props.masterData.product_type}
              getOptionLabel={option => option.name}
              onChange={hangeoptionchange('product_type')}
              fullWidth
              renderInput={params => (
                <TextField {...params} label="Select Product type" variant="outlined" fullWidth />
              )}
            />
        </Grid>
        <Grid item xs={3} >
        <Autocomplete
              multiple
              id="combo-box-demo"
              options={props.masterData.metalpurity}
              getOptionLabel={option => option.name}
              onChange={hangeoptionchange('metalpurity')}
              fullWidth
              renderInput={params => (
                <TextField {...params} label="Select Purity" variant="outlined" fullWidth />
              )}
            />
        </Grid>

       
        <Grid item xs={6} sm={3} >
        <Autocomplete
              multiple
              id="combo-box-demo"
              options={props.masterData.diamondtypes}
              getOptionLabel={option => option.label}
              onChange={hangeoptionchange('diamondtypes')}
              fullWidth
              renderInput={params => (
                <TextField {...params} label="Diamond Colour" variant="outlined" fullWidth />
              )}
            />
        </Grid>
       
        <Grid item xs={6} sm={3} >
        <Autocomplete
              multiple
              id="combo-box-demo"
              options={props.sizes}
              getOptionLabel={option => option.sku_size}
              onChange={hangeoptionchange('sizes')}
              fullWidth
              renderInput={params => (
                <TextField {...params} label="Sizes" variant="outlined" fullWidth />
              )}
            />
        </Grid>
        <Grid item xs={6} sm={3} >
        <Autocomplete
              multiple
              id="combo-box-demo"
              options={props.masterData.gemstontypes}
              getOptionLabel={option => option.name}
              onChange={hangeoptionchange('gemstontypes')}
              fullWidth
              renderInput={params => (
                <TextField {...params} label="Gemstone Type" variant="outlined" fullWidth />
              )}
            />
        </Grid>
        <Grid item xs={6} sm={3} >
        <Autocomplete
              multiple
              id="combo-box-demo"
              options={['Diamond','Gemstone','Gold','Making Charge']}
              onChange={hangeoptionchange('pricingcomponent')}

              fullWidth
              renderInput={params => (
                <TextField {...params} label="Price Component" variant="outlined" fullWidth />
              )}
            />
        </Grid>
        <Grid item xs={6} sm={3} >

        <Button variant="contained" 
          onClick={handleClick}
        color="primary">
        Update Price
      </Button>
      </Grid>
      
      <Grid item xs={6} sm={3} >

        <Button variant="contained" 
          onClick={handleuploadstatus}
        color="primary">
        Update Status
      </Button>

      </Grid>
      <Grid item xs={6} sm={3} >

        <Typography variant="subtitle1">
                {updatestatus}
      </Typography>
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
