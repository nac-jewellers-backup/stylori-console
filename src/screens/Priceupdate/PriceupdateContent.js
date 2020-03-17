import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { VoucherContext } from '../../context';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import Fullloader from '../../components/Loader';


import { makeStyles, useTheme } from '@material-ui/core/styles';
import uuid from 'uuid/v1';
import Page from '../../components/Page'
import { Header, Results,AboutVoucher } from './components';
import { productCategory } from '../../services/mapper';
import { NetworkContext } from '../../context/NetworkContext';
import FullLoader from '../../components/Loader';
const rows = [
  { id: 'Diamond', label: 'Diamond' },
  { id: 'Gemstone', label: 'Gemstone' },
  { id: 'Metal & Making Charge', label: 'Gold' },
  { id: 'Price Update', label: 'updateskuprice' }
];
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
  
}));
  
export default function PriceupdateContent(props) {
  const classes = useStyles();
  const [orders, setOrders] = useState([]);

  const [masters, setMasters] = useState([]);
  const {sendNetworkRequest} = React.useContext(NetworkContext)
  const [sizes, setSizes] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [startrun, setStartrun] = useState(false);
  const [open, setOpen] = useState(false);

  async function updateprices(component)
{
  setOpen(true)
  var  bodydata = {}
  bodydata = {
    pricingcomponent: component.label,
    req_product_id : products
  }
  setStartrun(true)
  let response = await sendNetworkRequest('/productpriceupdate', {}, bodydata, false)
  setOpen(false)
}
 async function filterapllied(filterdata, categories, producttypes)
  {
    var  bodydata = {}
  
      bodydata = {
        vendorid : filterdata && filterdata.length > 0 ? filterdata : '',
        product_category : categories && categories.length > 0 ? categories : '',
        product_type : producttypes && producttypes.length > 0 ? producttypes : ''
      }

    let response = await sendNetworkRequest('/getdistinctproduct', {}, bodydata, false)
    setProducts(response.products)
    setCategories(response.category)
    setVendors(response.vendorlist)
    // if(response.status < 400){
    //   alert(JSON.stringify(products))
    // }
  }
  async function downloadlog()
  {

    window.location.href = 'https://api-staging.stylori.com/getlogfile';
    // let response = await sendNetworkRequest('/getlogfile', {}, "", false)
  
  }
 async function getsizes()
  {
    let response = await sendNetworkRequest('/getsizes', {}, {}, false)
    if(response.status < 400){
      setSizes(response.sizes)
    }else{
      alert("succes21s")
    }
      
  }
  useEffect(() => {
    let mounted = true;
    //filterapllied()
    //getsizes();
    setMasters(productCategory.mapper(props.data));
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>

    <Page
    className={classes.root}
    title="Orders Management List"
  >
    <FullLoader title={"Run Diamond Price"} isopen={open} ></FullLoader>
     <AboutVoucher isdisabled={startrun} className={classes.aboutvoucher} apply={filterapllied} productids= {products.length > 0 ? products : []} categorylist={masters.category} producttypelist={masters.product_type} vendorlist={ masters.vendorcode} masterData= {masters} categories={['Fixed Amount','percentage','Free Shipping']} />
    <Results pricingrows={rows} downloadlog={downloadlog} update={updateprices}/>
  </Page>
  </MuiPickersUtilsProvider>
  );
}