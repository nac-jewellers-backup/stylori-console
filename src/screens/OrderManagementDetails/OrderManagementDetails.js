import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";
import { v4 as uuid } from 'uuid';
import moment from "moment";
import Page from "../../components/Page";
import { Header, OrderInfo, OrderItems } from "./components";
import { withRouter } from "react-router-dom";
import { NetworkContext } from "../../context/NetworkContext";
import OrderDetails from "./components/OrderDetails/OrderDetails";
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  container: {
    marginTop: theme.spacing(3),
  },
}));

export const OrderManagementDetails = withRouter((props) => {
  const classes = useStyles();
  const [order, setOrder] = useState(null);
  const { sendNetworkRequest } = React.useContext(NetworkContext);
  async function fetchorderdetails(order_id) {
    let response = await sendNetworkRequest(
      "/getorderdetails",
      {},
      { order_id }
    );
    // debugger
    console.log(response);
    setOrder(response.orders);
  }
  useEffect(() => {
    let mounted = true;
    var com_id = props.location.pathname.split("/")[2];
    const fetchOrder = () => {
      setOrder({
        id: uuid(),
        ref: "FAD107",
        promoCode: null,
        value: "55.25",
        currency: "$",
        status: "canceled",
        customer: {
          name: "Ekaterina Tankova",
          address: "Street King William, 42456",
          city: "Montgomery",
          country: "United States",
        },
        items: [
          {
            id: uuid(),
            name: "Project Points",
            cuantity: 25,
            billing: "monthly",
            status: "completed",
            value: "50.25",
            currency: "$",
          },
          {
            id: uuid(),
            name: "Freelancer Subscription",
            cuantity: 1,
            billing: "monthly",
            status: "completed",
            value: "5.00",
            currency: "$",
          },
        ],
        created_at: moment(),
      });
    };

    // fetchOrder();
    fetchorderdetails(com_id);
    return () => {
      mounted = false;
    };
  }, []);

  if (!order) {
    return null;
  }

  return (
    <Page className={classes.root} title="Order Management Details">
      <Header order={order} />
      <Grid className={classes.container} container spacing={3}>
        <Grid item md={4} xl={3} xs={12}>
          <OrderInfo order={order} />
        </Grid>
        <Grid item md={8} xl={9} xs={12}>
          <OrderItems order={order} />
          <OrderDetails order={order} style={{ marginTop: 30 }} />
        </Grid>
      </Grid>
    </Page>
  );
});

export default OrderManagementDetails;
