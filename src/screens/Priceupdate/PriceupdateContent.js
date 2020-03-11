import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { VoucherContext } from '../../context';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import uuid from 'uuid/v1';
import Page from '../../components/Page'
import { Header, Results,AboutVoucher } from './components';
import { productCategory } from '../../services/mapper';
import { NetworkContext } from '../../context/NetworkContext';
const rows = [
  { id: 'Gold', label: 'Gold' },
  { id: 'Diamond', label: 'Diamond' },
  { id: 'Gemstone', label: 'Gemstone' },
  { id: 'Making Charge', label: 'Making Charge' },
  { id: 'Price Update', label: 'Price Update' }
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
  }
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
  async function updateprices(component)
{

  var  bodydata = {}
  
  bodydata = {
    pricingcomponent: component.label,
    req_product_id : products
  }
 // alert(JSON.stringify(bodydata))
  let response = await sendNetworkRequest('/productpriceupdate', {}, bodydata, false)
 alert(JSON.stringify(response))

}
 async function filterapllied(filterdata, categories, producttypes)
  {
    var  bodydata = {}
  
      bodydata = {
        vendorid : filterdata ? filterdata : '',
        product_category : categories ? categories : '',
        product_type : producttypes ? producttypes : ''
      }
    alert(JSON.stringify(bodydata))

    let response = await sendNetworkRequest('/getdistinctproduct', {}, bodydata, false)
    setProducts(response.products)
    setCategories(response.category)
    setVendors(response.vendorlist)
    // if(response.status < 400){
    //   alert(JSON.stringify(products))
    // }
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
    <AboutVoucher className={classes.aboutvoucher} apply={filterapllied} productids= {products.length > 0 ? products : []} categorylist={masters.category} producttypelist={masters.product_type} vendorlist={ masters.vendorcode} masterData= {masters} categories={['Fixed Amount','percentage','Free Shipping']} />
    <Results pricingrows={rows} update={updateprices}/>
  </Page>
  </MuiPickersUtilsProvider>
  );
}