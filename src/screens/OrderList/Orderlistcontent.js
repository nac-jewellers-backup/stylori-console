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
  },
  
}));
  
export default function Producttypecontent() {
  const classes = useStyles();
  const [orders, setOrders] = useState([]);
  const { orderCtx, setOrderCtx ,orderMaster} = React.useContext(OrderContext);
  const [columnnames, setColumnnames] = useState(Columns.columns);
  const [filteredorder, setFilteredorder] = useState([]);

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
  function searchorder(searchtext)
  {
    if(searchtext.length > 0)
    {
    var data_filter = orders.filter( element => 
      element.email.match(searchtext+'.*') || 
      element.mobile.match(searchtext+'.*') ||
      element.orderid.match(searchtext+'.*') || 
      element.username.match(searchtext+'.*')
      )
      setFilteredorder(data_filter)
    }else{
      setFilteredorder(orders)
    }
  }
  useEffect(() => {
    let mounted = true;
    const fetchOrders = () => {
        
     
    };
    var orders_arr = []
    orderCtx.orderMaster.orders.forEach(element => {
        let orderobj = {}
        orderobj['orderid'] = element.id
        orderobj['orderdate'] = element.createdAt
        orderobj['paymentmode'] = element.paymentMode
        orderobj['paymentstatus'] = element.paymentStatus
        if(element.paymentDetailsByOrderId)
        {
            let pgresponseobj = element.paymentDetailsByOrderId.nodes
            pgresponseobj.forEach(pgres => {
                    orderobj['pgresponse'] = pgres.paymentResponse
            } )
        }
        if(element.shoppingCartByCartId)
        {
            let cartcontent = element.shoppingCartByCartId
            if(cartcontent.shoppingCartItemsByShoppingCartId)
            {
                let cartitemscontent = cartcontent.shoppingCartItemsByShoppingCartId.nodes
                let skus = []
                cartitemscontent.forEach(element => {
                    if(element.transSkuListByProductSku)
                    {
                        skus.push(element.transSkuListByProductSku.generatedSku)
                    }

                    if(element.cartAddressesByCartId)
                    {
                        let addresscontent = element.cartAddressesByCartId.nodes;
                        addresscontent.forEach(addressobj => {
                            orderobj['address'] = addressobj.addressline1
                        })

                    }
                })
                orderobj['skus'] = skus.join(' , ')
            }
            if(cartcontent.userProfileByUserprofileId)
            {
             // alert(JSON.stringify(orderCtx.orderMaster.orders[0]))
              let usercontent = cartcontent.userProfileByUserprofileId
                orderobj['username'] = usercontent.firstName ? usercontent.firstName : ""
                orderobj['mobile'] = usercontent.mobile ? usercontent.mobile : ""
                orderobj['email'] = usercontent.email ? usercontent.email : ""
            }

            if(cartcontent.giftwrapsByCartId)
            {
                let giftobj = cartcontent.giftwrapsByCartId.nodes;
                giftobj.forEach(gift => {
                    orderobj['giftmessage'] = gift.message
                })
            }
        }
        orders_arr.push(orderobj)
    });
    setOrders(orders_arr)
    setFilteredorder(orders_arr)
    fetchOrders();

    return () => {
      mounted = false;
    };
  }, [orderCtx.orderMaster.orders]);

  return (
    <Page
    className={classes.root}
    title="Orders Management List"
  >
    <Header getColumnnames={columnchanged} onSearch={searchorder}  columns={columnnames}/>
    <Results
      className={classes.results}
     orders={filteredorder}
     showcolumns={displaycolumnnames}
     columnobjs={displaycolumns}


    />
    
  </Page>
  );
}