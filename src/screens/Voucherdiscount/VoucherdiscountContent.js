import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { VoucherContext } from '../../context';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { NetworkContext } from '../../context/NetworkContext';
import FullLoader from '../../components/Loader'
import Paper from '@material-ui/core/Paper';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import uuid from 'uuid/v1';
import Page from '../../components/Page'
import { Header, Results,AboutVoucher ,VoucherComponent} from './components';
import { Button, Grid,Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
  //  padding: theme.spacing(3)
  },
  aboutvoucher: {
    marginTop: theme.spacing(3)
  },
  results: {
    marginTop: theme.spacing(3)
  }
}));
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

  
export default function Voucherdiscountcontent(props) {
  const classes = useStyles();
  const [orders, setOrders] = useState([]);
  const [attributes, setAttributes] = useState({});
  const [products, setProducts] = useState([]);
  const [skus, setSkus] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const {sendNetworkRequest} = React.useContext(NetworkContext)
  const [open, setOpen] = React.useState(false);
  const [discountid, setDiscountid] = React.useState("");
  const [isloaded, setIsloaded] = useState(false);

  const [snackMessage,setSnackMessage] = React.useState({
    message:"Created Successfully",
    severity:"Success"
  });
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const { voucherCtx, setVoucherCtx ,materialMaster} = React.useContext(VoucherContext);
  function attributesadded(attributedata)
  {
    setAttributes(attributedata)
    setIsloading(true)
    //setAttributeobj(value)
    filterapllied(attributedata)

  }
  async function creatediscount()
  {
    setIsloading(true)
    var discounttype = 2;
    if(voucherCtx.discounttype === 'Free Shipping')
    {
      discounttype = 3
    }
  else if(voucherCtx.discounttype === 'percentage')
    {
      discounttype =2
    }
else    {
      discounttype = 1
    }
    let bodydata = {}
    bodydata['vouchername'] = voucherCtx.vouchername;
    bodydata['vouchercodes'] = voucherCtx.vouchercodes;
    bodydata['description'] = voucherCtx.voucherdescription;
    bodydata['isloggedin'] = voucherCtx.isloggedin;
    bodydata['discounttype'] = discounttype;
    bodydata['discount'] = voucherCtx.voucherdiscount;
    bodydata['maxdiscount'] = voucherCtx.maxvoucherdiscount ;
    bodydata['minorderqty'] = voucherCtx.minimumqty;
    bodydata['isonce'] = voucherCtx.isonce;
    bodydata['limittouse'] = voucherCtx.limittouse;
    bodydata['minorder'] = voucherCtx.minorder;
    bodydata['attributes'] = attributes;
    bodydata['startdate'] = voucherCtx.startdate;
    bodydata['enddate'] = voucherCtx.enddate;

    console.log(JSON.stringify(bodydata))
    let response = await sendNetworkRequest('/createvoucher', {}, bodydata, false)
    setIsloading(false)
    setOpen(true)

    window.location='/voucherdiscountlist'

  }

  async function filterapllied(value)
  {
    var  bodydata = {}
  
    let product_ids = []

    let response = await sendNetworkRequest('/getaliasproduct', {}, value, false)
   setProducts(response.products)
   setSkus(response.skus)
   setIsloading(false)

    
  }
  async function getdiscountvalue(discount_id)
  {
    let bodydata = {
      id : discount_id
      }
    let response = await sendNetworkRequest('/getvoucher', {}, bodydata, false)
    let voucherobj = response.response
    let discounttype = voucherobj.discounttype
    var discounttypeval = "percentage"
    if(discounttype === 1)
    {
      discounttypeval = 'Fixed'
    }else if(discounttype === 3)
    {
      discounttypeval = 'Free Shipping'

    }
    setVoucherCtx({
      ...voucherCtx,
      vouchername: voucherobj.name,
      voucherdescription : voucherobj.description,
      isloggedin: voucherobj.isloginneeded,
      discounttype: discounttypeval,
      minimumqty:0,
      maxvoucherdiscount:voucherobj.max_discount,
      isonce: voucherobj.max_uses_user,
      limittouse:voucherobj.max_uses,
      voucherdiscount:voucherobj.discount_amount,
      minorder: voucherobj.min_cart_value
    })
    setIsloaded(true)
    }
  useEffect(() => {
    let mounted = true;
    const fetchOrders = () => {

      
    };
    fetchOrders();
    if(props.location.pathname && props.location.pathname.split('/').length > 2 )
    {
       setDiscountid( props.location.pathname.split('/')[2]);
      getdiscountvalue(props.location.pathname.split('/')[2])
  
    }else{
      setIsloaded(true)
    }
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
   {isloaded ? <>
    <AboutVoucher className={classes.aboutvoucher} categories={['Fixed Amount','percentage','Free Shipping']} />
    {!discountid ? <VoucherComponent className={classes.aboutvoucher} onAdded={attributesadded}/> : null }
    {products.length > 0 ? <> <Grid item xs={12} style={{marginTop:32, textAlign:"center"}} >

    <Typography variant="h5" component="h2">
    {products.length} Products and {skus.length} skus
  </Typography>
          </Grid>
          
          {!discountid ?  <Grid item xs={12} style={{marginTop:16, textAlign:"center"}} >

          <Button onClick={()=> creatediscount()} color="primary" variant="contained">Create Voucher</Button>
          </Grid>:null} </>
          : null }
          </>:null}
    
   
  </Page>
  </MuiPickersUtilsProvider>
  </>
  );
}