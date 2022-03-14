import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import PerfectScrollbar from "react-perfect-scrollbar";
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles(() => ({
  root: {},
  content: {
    padding: 0,
  },
  inner: {
    minWidth: 700,
  },
}));

const OrderItems = (props) => {
  const { order, className, productDetails, ...rest } = props;

  const classes = useStyles();

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader title="Order items" />
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Sku</TableCell>
                  <TableCell>Product Name</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {order?.shopping_cart?.shopping_cart_items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.product_sku}</TableCell>
                    <TableCell>
                      {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /> */}
                      {
                        productDetails.filter(
                          (i) => i.generated_sku === item.product_sku
                        )?.[0]?.product_list?.product_name
                      }
                    </TableCell>
                    <TableCell>{item.qty}</TableCell>
                    <TableCell>{item.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
    </Card>
  );
};

OrderItems.propTypes = {
  className: PropTypes.string,
  order: PropTypes.object.isRequired,
};

export default OrderItems;
