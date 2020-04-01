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
    let categories = voucherobj.product_attributes.category;
    let selectedcategories = []
    if(categories)
    {
    voucherCtx.voucherMaster.product_categories.forEach(catobj => {
      if(categories.indexOf(catobj.alias) > -1)
      {
        selectedcategories.push(catobj)
      }
    })
  }
    let materials = voucherobj.product_attributes.materials;
    let selectedmaterials = []
    if(materials)
    {
    voucherCtx.voucherMaster.materials.forEach(matobj => {
      if(materials.indexOf(matobj.alias) > -1 )
      {
        selectedmaterials.push(matobj)
      }
    })
  }
    
    let producttypes = voucherobj.product_attributes.product_types;
    let selectedproduct_types = []
    if(producttypes)
    {
    voucherCtx.voucherMaster.product_types.forEach(protypeobj => {
      if( producttypes.indexOf(protypeobj.alias) > -1)
      {
        selectedproduct_types.push(protypeobj)
      }
    })
  }

  let collections = voucherobj.product_attributes.collections;
    let selectedcollections = []
    if(collections)
    {
    voucherCtx.voucherMaster.collections.forEach(collectionobj => {
      if( collections.indexOf(collectionobj.alias) > -1)
      {
        selectedcollections.push(collectionobj)
      }
    })
  }

  let occassions = voucherobj.product_attributes.occations;
    let selectedoccassions = []
    if(occassions)
    {
    voucherCtx.voucherMaster.occations.forEach(occassionobj => {
      if( occassions.indexOf(occassionobj.alias) > -1)
      {
        selectedoccassions.push(occassionobj)
      }
    })
  }

  let themes = voucherobj.product_attributes.themes;
  let selectedthemes = []
  if(themes)
  {
  voucherCtx.voucherMaster.themes.forEach(themeobj => {
    if( themes.indexOf(themeobj.alias) > -1)
    {
      selectedthemes.push(themeobj)
    }
  })
}

  let styles = voucherobj.product_attributes.styles;
    let selectedstyles = []
    if(styles)
    {
    voucherCtx.voucherMaster.styles.forEach(styleobj => {
      if( styles.indexOf(styleobj.alias) > -1)
      {
        selectedstyles.push(styleobj)
      }
    })
  }
    setVoucherCtx({
      ...voucherCtx,
      vouchername: voucherobj.name,
      vouchercode: voucherobj.voucher_codes,
      voucherdescription : voucherobj.description,
      isloggedin: voucherobj.isloginneeded,
      discounttype: discounttypeval,
      minimumqty:0,
      maxvoucherdiscount:voucherobj.max_discount,
      isonce: voucherobj.max_uses_user,
      limittouse:voucherobj.max_uses,
      voucherdiscount:voucherobj.discount_amount,
      minorder: voucherobj.min_cart_value,
      startdate: voucherobj.starts_at,
      enddate: voucherobj.expires_at,
      category: selectedcategories,
      materials: selectedmaterials,
      product_types : selectedproduct_types,
      collections : selectedcollections,
      styles: selectedstyles,
      themes: selectedthemes
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
    <AboutVoucher isedit={discountid ? true : false} className={classes.aboutvoucher} categories={['Fixed Amount','percentage','Free Shipping']} />
    {!discountid ? <VoucherComponent isedit={discountid ? true : false} className={classes.aboutvoucher} onAdded={attributesadded}/> : <VoucherComponent isedit={discountid ? true : false} className={classes.aboutvoucher} onAdded={attributesadded}/> }
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