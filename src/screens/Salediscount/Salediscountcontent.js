import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { VoucherContext } from '../../context';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import uuid from 'uuid/v1';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

import Page from '../../components/Page'
import { Header, Results,AboutVoucher ,VoucherComponent} from './components';
import { Button, Grid,Typography } from '@material-ui/core';
import { NetworkContext } from '../../context/NetworkContext';
import FullLoader from '../../components/Loader'

const useStyles = makeStyles(theme => ({
  root: {
  //  padding: theme.spacing(3)
  },
  aboutvoucher: {
    marginTop: theme.spacing(3)
  },
  results: {
    marginTop: theme.spacing(3)
  },
  productcontent: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing(0.5),
    marginTop: theme.spacing(1)
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Salediscountcontent() {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [skus, setSkus] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [productattr, setProductattr] = useState({});
  const [productattrtext, setProductattrtext] = useState("");

  const [attributeobj, setAttributeobj] = useState({});
  const {sendNetworkRequest} = React.useContext(NetworkContext)
  const [snackMessage,setSnackMessage] = React.useState({
    message:"Created Successfully",
    severity:"Success"
  });
  const { voucherCtx, setVoucherCtx ,materialMaster} = React.useContext(VoucherContext);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  async function creatediscount()
  {
    setIsloading(true)

    let bodydata = {
      discountvalue: parseFloat(attributeobj.discountvalue),
      discounttype : attributeobj.discounttype,
      componenets : attributeobj.componenets,
      product_attributes: productattr,
      product_attributes_text : productattrtext,
      skus : skus
    }
    console.log(JSON.stringify(productattr))
    let response = await sendNetworkRequest('/creatediscount', {}, bodydata, false)
    setIsloading(false)
    setOpen(true)
    window.location='/salediscountlist'
}
const handleDelete = chipToDelete => () => {
 // setChipData(chips => chips.filter(chip => chip.key !== chipToDelete.key));
};

async function filterapllied(value)
  {
    var  bodydata = {}
  
    let product_ids = []

    let response = await sendNetworkRequest('/getaliasproduct', {}, value, false)
   setProducts(response.products)
   setSkus(response.products)
   setIsloading(false)

    
  }
  function attributeadded( value)
  {
  let componentsstring = {}
  let attrs = []
    let keys = Object.keys(value);
    keys.forEach(key => {
      let values = []
      let alias_arr = []
      value[key].forEach(valueobj =>{
        values.push(valueobj.name)
        alias_arr.push(valueobj.alias)
        attrs.push(valueobj.name)
      })
      componentsstring[key] = {
        values : values,
        alias : alias_arr
      }
    })
    setProductattr(componentsstring)
    setProductattrtext(attrs.join(' , '))
   //alert(JSON.stringify(componentsstring))
    setIsloading(true)
    //setAttributeobj(value)
    filterapllied(value)
    

  }
  function valuechange(type, value)
  {
    setAttributeobj({
      ...attributeobj,
      [type]: value
    })
    

  }
  useEffect(() => {
    let mounted = true;
    const fetchOrders = () => {

      
    };
    fetchOrders();

    return () => {
      mounted = false;
    };
  }, []);

  return (

    <>
     <FullLoader title="" isopen={isloading}/>
     <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={snackMessage.severity}>
          {snackMessage.message}
        </Alert>
      </Snackbar>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>

    <Page
    className={classes.root}
    title="Orders Management List"
  >
    <VoucherComponent onAdded={attributeadded} className={classes.aboutvoucher} />
   {products.length > 0 ? <Paper className={classes.productcontent}>
    <Typography variant="h5" component="h2">
        {products.length} Products and {skus.length} skus
      </Typography>

      {products.map(data => {
        let icon;

        // if (data.label === 'React') {
        //   icon = <TagFacesIcon />;
        // }

        return (
          <Chip
            key={data}
            icon={icon}
            label={data}
            variant="outlined"
             onDelete={handleDelete(data)}
            className={classes.chip}
          />
        );
      })}
    </Paper> : null }
    <AboutVoucher className={classes.aboutvoucher} onAdded={valuechange} categories={['Fixed Amount','percentage']} />
    
    
    {/* <ProductsListing className={classes.aboutvoucher}  products={[]} /> */}

    <Grid container xs={12} spacing={2} style={{textAlign:"center"}} >
    <Grid item xs={12} style={{marginTop:16, textAlign:"center"}} >

      <Button onClick={() => creatediscount()} color="primary" variant="contained">Submit</Button>
    </Grid>
    </Grid>
  </Page>
  </MuiPickersUtilsProvider>
  </>
  );
}