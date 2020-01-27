import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { MaterialContext } from '../../context';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import uuid from 'uuid/v1';
import Page from '../../components/Page'
import { Header, Results } from './components';

const useStyles = makeStyles(theme => ({
  root: {
  //  padding: theme.spacing(3)
  },
  results: {
    marginTop: theme.spacing(3)
  }
}));
  
export default function Producttypecontent() {
  const classes = useStyles();
  const [orders, setOrders] = useState([]);
  const { materialCtx, setMaterialCtx ,materialMaster} = React.useContext(MaterialContext);

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
    <Page
    className={classes.root}
    title="Orders Management List"
  >
    <Header />
    <Results
      className={classes.results}
      orders={materialCtx.materialMaster.materials}
    />
    
  </Page>
  );
}