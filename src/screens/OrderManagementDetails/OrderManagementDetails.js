import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Grid,
  TableHead,
  Typography,
  Tooltip,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import moment from "moment";
import Page from "../../components/Page";
import { Header, OrderInfo, OrderItems } from "./components";
import { withRouter } from "react-router-dom";
import { NetworkContext } from "../../context/NetworkContext";
import OrderDetails from "./components/OrderDetails/OrderDetails";
import { GRAPHQL_DEV_CLIENT } from "../../config";
import { GETORDERCOMMUNICATIONLOGS } from "../../graphql/query";
import { useApolloClient } from "react-apollo";
import SyncIcon from "@material-ui/icons/Sync";
import { AlertContext } from "../../context";

let CHMOD = {
  pg: "Payment Gateway",
  nb: "Netbanking ",
  ppc: "Prepaid Cards / Wallets",
  cash: "Cash ",
  onclick: "Onclick",
  emi: "Emi",
  wallet: "Merchant Wallet",
  pos: "Pos",
  rtgs: "RTGS",
  payltr: "Paylater",
  upi: "UPI",
  va: "Virtual Account",
  aloan: "Airloan ",
  btqr: "Bharat QR ",
};

let currency_code = {
  356: "₹",
};

let transaction_type = {
  200: "Success",
  211: "Transaction in Process",
  310: "Auth",
  320: "Sale",
  330: "Capture",
  340: "Refund",
  350: "Chargeback",
  360: "Reversal",
  370: "SaleComplete",
  380: "SaleAdjust",
  390: "TipAdjust",
  400: "Failed",
  401: "Dropped",
  402: "Cancel",
  403: "Incomplete",
  405: "Bounced",
  503: "No Records",
  410: "Cashback",
  420: "Void",
  430: "Release",
};

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

  var order_id = props.location.pathname.split("/")[2];

  const [order, setOrder] = useState(null);
  const [productDetails, setProductDetails] = useState([]);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [communicationLogs, setCommunicationLogs] = useState([]);

  const paymentHeaders = [
    "TRANSACTIONPAYMENTSTATUS",
    "mercid",
    "TRANSACTIONID",
    "APTRANSACTIONID",
    "CHMOD",
    "CURRENCYCODE",
    "AMOUNT",
    "TRANSACTIONSTATUS",
    "MESSAGE",
    "TRANSACTIONTIME",
  ];

  const { sendNetworkRequest } = React.useContext(NetworkContext);
  const snack = React.useContext(AlertContext);

  async function fetchorderdetails(order_id) {
    let response = await sendNetworkRequest(
      "/getorderdetails",
      {},
      { order_id }
    );
    setOrder(response.orders);
    setProductDetails(response.product_detail);
  }

  const client = useApolloClient();

  const loadPaymentAndCommunicationLogs = (order_id) => {
    client
      .query({
        query: GETORDERCOMMUNICATIONLOGS,
        variables: { id: order_id },
      })
      .then(({ data }) => {
        let { payment_details, communication_logs } = data.order;
        setPaymentHistory(
          payment_details.nodes.map((item) => {
            return {
              id: item.id,
              paymentResponse: JSON.parse(item.paymentResponse),
            };
          })
        );
        setCommunicationLogs(communication_logs.nodes);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    let mounted = true;
    fetchorderdetails(order_id);
    loadPaymentAndCommunicationLogs(order_id);
    return () => {
      mounted = false;
    };
  }, []);

  if (!order) {
    return null;
  }

  const getValue = ({ type, paymentResponse }) => {
    switch (type) {
      case "CHMOD":
        return CHMOD[paymentResponse[type]];
      case "CURRENCYCODE":
        return currency_code[paymentResponse[type]];
      case "TRANSACTIONSTATUS":
        return transaction_type[paymentResponse[type]];
      default:
        return paymentResponse[type];
    }
  };

  const syncPaymentDetails = () => {
    sendNetworkRequest("/verify_payment", {}, { order_id })
      .then((res) => {
        if (res?.message) {
          snack.setSnack({
            open: true,
            severity: "warning",
            msg: res?.message,
          });
        } else {
          snack.setSnack({
            open: true,
            msg: "Updated Successfully!",
          });
          loadPaymentAndCommunicationLogs();
        }
      })
      .catch((err) => {
        snack.setSnack({
          open: true,
          severity: "error",
          msg: err?.message || "Something went wrong, Please try later!",
        });
      });
  };

  return (
    <Page className={classes.root} title="Order Management Details">
      <Header order={order} />
      <Grid className={classes.container} container spacing={3}>
        <Grid item md={4} xl={3} xs={12}>
          <OrderInfo order={order} />
        </Grid>
        <Grid item md={8} xl={9} xs={12}>
          <OrderItems order={order} productDetails={productDetails} />
          <OrderDetails
            order={order}
            productDetails={productDetails}
            style={{ marginTop: 30 }}
          />
          <Grid container xs={12} style={{ marginTop: "10px" }}>
            <Grid item xs={12}>
              <Card>
                <CardHeader
                  title={"Payment History"}
                  action={
                    <IconButton
                      aria-label="sync-payment-history"
                      onClick={() => {
                        syncPaymentDetails();
                      }}
                    >
                      <Tooltip title="Sync's latest payment details">
                        <SyncIcon />
                      </Tooltip>
                    </IconButton>
                  }
                />
                <Divider />
                <CardContent className={classes.content}>
                  {paymentHistory.length > 0 && (
                    <Table>
                      <TableHead>
                        {paymentHeaders.map((item, index) => (
                          <TableCell key={index} align="center">
                            {item.toUpperCase()}
                          </TableCell>
                        ))}
                      </TableHead>
                      <TableBody>
                        {paymentHistory.map((item) => (
                          <Tooltip
                            title={
                              <pre>
                                {JSON.stringify(item.paymentResponse, null, 2)}
                              </pre>
                            }
                            arrow
                            placement="left"
                          >
                            <TableRow key={item.id}>
                              {paymentHeaders.map((i, index) => (
                                <TableCell key={index} align="center">
                                  {getValue({ type: i, ...item })}
                                </TableCell>
                              ))}
                            </TableRow>
                          </Tooltip>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                  {paymentHistory.length == 0 && (
                    <Typography variant="caption">
                      No Payment Details found
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Grid container xs={12} style={{ marginTop: "10px" }}>
            <Grid item md={6} xl={6} xs={12} style={{ padding: "14px" }}>
              <Card>
                <CardHeader title="Email Info" />
                <Divider />
                <CardContent className={classes.content}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Response Id</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Message Type</TableCell>
                        <TableCell>Create At</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {communicationLogs.map(
                        (val, index) =>
                          val.type === "email" && (
                            <TableRow key={index}>
                              <TableCell>{val.senderResponseId}</TableCell>
                              <TableCell>{val.type}</TableCell>
                              <TableCell>{val.messageType}</TableCell>{" "}
                              <TableCell>
                                {moment(val.createdAt).format(
                                  "DD/MM/YYYY HH:mm:ss"
                                )}
                              </TableCell>
                            </TableRow>
                          )
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </Grid>
            <Grid item md={6} xl={6} xs={12} style={{ padding: "14px" }}>
              <Card>
                <CardHeader title="Message Info" />
                <Divider />
                <CardContent className={classes.content}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Response Id</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Message Type</TableCell>
                        <TableCell>Create At</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {communicationLogs.map(
                        (val, index) =>
                          val.type === "sms" && (
                            <TableRow key={index}>
                              <TableCell>{val.senderResponseId}</TableCell>
                              <TableCell>{val.type}</TableCell>
                              <TableCell>{val.messageType}</TableCell>{" "}
                              <TableCell>
                                {moment(val.createdAt).format(
                                  "DD/MM/YYYY HH:mm:ss"
                                )}
                              </TableCell>
                            </TableRow>
                          )
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Page>
  );
});

export default OrderManagementDetails;
