import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { OrderContext } from '../../context';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { API_URL, GRAPHQL_DEV_CLIENT } from '../../config';
import { PAYMENTSTATUSMASTER, PRODUCTDIAMONDTYPES } from '../../graphql/query';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import uuid from 'uuid/v1';
import Page from '../../components/Page'
import { Header, Results } from './components';
import Columns from './components/columnnames.json';
import { NetworkContext } from '../../context/NetworkContext';

const useStyles = makeStyles(theme => ({
  root: {
  //  padding: theme.spacing(3)
  },
  results: {
    //marginTop: theme.spacing(3)
  },
  
}));
  
export default function Producttypecontent() {
  const classes = useStyles();
  const [orders, setOrders] = useState([]);
  const { orderCtx, setOrderCtx ,orderMaster} = React.useContext(OrderContext);
  const [columnnames, setColumnnames] = useState(Columns.columns);
  const [filteredorder, setFilteredorder] = useState([]);
  const [paymentstatus, setpaymentstatus] = useState([]);
  const [orderstatus, setorderstatus] = useState([]);
  const [iswrite, setIswrite] = useState(false);

  const { sendNetworkRequest } = React.useContext(NetworkContext);

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

  async function updateorder(ordercontent)
  {
  let response =  await sendNetworkRequest('/updateorderstatus', {}, ordercontent)
    window.location.reload();

   // getorders()
  }
  function searchorder(searchtext)
  {
    if(searchtext.length > 0)
    {
    var data_filter = orders.filter( element => 
      element.email &&  element.email.match(searchtext+'.*')  || 
      element.mobile && element.mobile.match(searchtext+'.*') ||
      element.orderid && element.orderid.match(searchtext+'.*') || 
      element.username && element.username.match(searchtext+'.*')
      )
      setFilteredorder(data_filter)
    }else{
      setFilteredorder(orders)
    }
  }
  async function getorders()
  {
    var orders_arr = []
    orderCtx.orderMaster.orders.forEach(element => {

        let orderobj = {}
        orderobj['orderid'] = element.id
        orderobj['orderdate'] = element.createdAt
        orderobj['paymentmode'] = element.paymentMode
        orderobj['cartid'] = element.cartId
       // orderobj['paymentstatusmaster'] = element.paymentStatus
       orderobj['awbNumber'] = element.awbNumber ? element.awbNumber : ""
       orderobj['comments'] = element.comments ? element.comments : ""
       orderobj['orderstatus'] = element.orderStatus
       if(element.paymentMode === 'COD')
       {
        orderobj['paymentstatus'] = element.paymentStatus

       }
        if(element.paymentDetailsByOrderId)
        {
            let pgresponseobj = element.paymentDetailsByOrderId.nodes
            pgresponseobj.forEach(pgres => {
           let response_pg =   JSON.parse(pgres.paymentResponse)
                    if(element.paymentMode === 'Prepaid')
                    {
                      orderobj['paymentstatus'] = response_pg.ipgTransactionId + ' \n'+response_pg.fail_reason+ ' \n'+response_pg.status

                    }

            } )
        }
        if(element.shoppingCartByCartId)
        {
            let cartcontent = element.shoppingCartByCartId

                if(cartcontent.cartAddressesByCartId)
                {
                    let addresscontent = cartcontent.cartAddressesByCartId.nodes;
                    addresscontent.forEach(addressobj => {
                        orderobj['address'] = addressobj.addressline1
                        if(!orderobj["mobile"])
                        {
                          orderobj['mobile'] = addressobj.contactNumber

                        }
                        if(!orderobj["username"])
                        {
                          orderobj['username'] = addressobj.firstname ? addressobj.firstname : ""

                        }

                    })

                }
            if(cartcontent.shoppingCartItemsByShoppingCartId)
            {
              

                let cartitemscontent = cartcontent.shoppingCartItemsByShoppingCartId.nodes
                let skus = []
                
                cartitemscontent.forEach(element => {
                    if(element.transSkuListByProductSku)
                    {
                        skus.push(element.transSkuListByProductSku.generatedSku)
                    }

                    
                })
                orderobj['skus'] = skus.join(' , ')
            }
            if(cartcontent.userProfileByUserprofileId)
            {
             // alert(JSON.stringify(orderCtx.orderMaster.orders[0]))
              let usercontent = cartcontent.userProfileByUserprofileId
              if(usercontent.firstName)
              {
                orderobj['username'] = usercontent.firstName ? usercontent.firstName : ""

              }
                orderobj['email'] = usercontent.email ? usercontent.email : ""
                if(!orderobj["username"])
                            {
                              orderobj['username'] = usercontent.firstname ? usercontent.firstname : ""


                            }

              let useraddressess = usercontent.userAddressesByUserProfileId
              if(useraddressess)
              {
                let address_arr = useraddressess.nodes
                address_arr.forEach(useraddressobj => {

                  if(!orderobj["mobile"])
                  {
                    orderobj['mobile'] = useraddressobj.contactNumber ? useraddressobj.contactNumber : ""
                  }
                  if(!orderobj["mobile"])
                  {
                    orderobj['mobile'] = useraddressobj.contactNumber ? useraddressobj.contactNumber : ""
                  }
                });
              }
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
  }
  async function getmaster(getmaster)
  {
    const url = GRAPHQL_DEV_CLIENT;
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: PAYMENTSTATUSMASTER  })
    };
    // console.log("helo",setProductCtx)
    fetch(url, opts)
      .then(res => res.json())
      .then(fatchvalue => {
        setpaymentstatus(fatchvalue.data.allOrderStatusMasters.nodes)
        setorderstatus(fatchvalue.data.allPaymentStatusMasters.nodes)

        
      })
      .catch(console.error)
  }
  useEffect(() => {
    let pagepermission = localStorage.getItem('pagepermissions')
    if(pagepermission.indexOf('/orderlist') > -1)
    {
      setIswrite(true)

    }else
    {
      setIswrite(false)
    }
    getmaster()
  }, [])
  useEffect(() => {
    let mounted = true;
    const fetchOrders = () => {
        
     
    };

    getmaster()
    getorders()
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
    {/* <Grid container spacing={2} item xs={12} sm={12} alignItems={"flex-end"}>
        <Grid fullwidth item xs={6} sm={6}>

            <Typography component="h6" variant="h6">
            Orders
          </Typography>
          </Grid>
          
    </Grid> */}
    <Header getColumnnames={columnchanged} onSearch={searchorder}  columns={columnnames}/>
    {filteredorder ? <Results
      className={classes.results}
      orderstatus={paymentstatus}
      paymentstatus={orderstatus}
      iswrite={iswrite}
     orders={filteredorder}
     onupdate={updateorder}
     showcolumns={displaycolumnnames}
     columnobjs={displaycolumns}


    /> : null }
    
  </Page>
  );
}