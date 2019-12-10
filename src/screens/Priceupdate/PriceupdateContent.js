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
    
    getsizes();
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
    <AboutVoucher className={classes.aboutvoucher} sizes={sizes} masterData= {masters} categories={['Fixed Amount','percentage','Free Shipping']} />
    
  </Page>
  </MuiPickersUtilsProvider>
  );
}