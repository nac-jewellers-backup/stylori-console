import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { VoucherContext } from '../../context';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import uuid from 'uuid/v1';
import Page from '../../components/Page'
import { Header, Results,AboutVoucher ,VoucherComponent} from './components';

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
  
export default function Salediscountcontent() {
  const classes = useStyles();
  const [orders, setOrders] = useState([]);
  const { voucherCtx, setVoucherCtx ,materialMaster} = React.useContext(VoucherContext);

  useEffect(() => {
    let mounted = true;
    const fetchOrders = () => {

      setOrders( [
        {
          id: uuid(),
          created_at: "test",
          customer: {
            name: 'Ekaterina Tankova'
          },
          payment: {
            ref: 'FAD103',
            method: 'CreditCard',
            total: '500.00',
            currency: '$',
            status: 'pending'
          },
          status: 'inactive'
        }])
    };
    fetchOrders();

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
    <AboutVoucher className={classes.aboutvoucher} categories={['Fixed Amount','percentage']} />
    <VoucherComponent className={classes.aboutvoucher} />
    
  </Page>
  </MuiPickersUtilsProvider>
  );
}