import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { OrderContext } from '../../context';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import uuid from 'uuid/v1';
import Page from '../../components/Page'
import { Header, Results } from './components';
import Columns from './components/columnnames.json';

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
  const { orderCtx, setOrderCtx ,orderMaster} = React.useContext(OrderContext);
  const [columnnames, setColumnnames] = useState(Columns.columns);
  const [displaycolumnnames, setDisplaycolumnnames] = useState(Columns.defaultcolumns);
  const [displaycolumns, setDisplaycolumns] = useState(Columns.defaultcolumnnames);

  function columnchanged(columnnames){
    let displycolumns = [];
    columnnames.forEach(element => {
      displycolumns.push(element.name)
    })
    setDisplaycolumns(columnnames)
    setDisplaycolumnnames(displycolumns)
  }
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
    <Header getColumnnames={columnchanged} columns={columnnames}/>
    <Results
      className={classes.results}
     orders={orderCtx.orderMaster.orders}
     showcolumns={displaycolumnnames}
     columnobjs={displaycolumns}


    />
    
  </Page>
  );
}