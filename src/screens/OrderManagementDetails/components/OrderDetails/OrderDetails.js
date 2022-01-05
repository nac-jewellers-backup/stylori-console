import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { BASE_IMAGE_URL } from "../../../../config";

const useStyles = makeStyles(() => ({
  inner_card: {
    padding: "10px",
    marginBottom: "16px",
  },
  image_container: {
    padding: "16px",
  },
  product_image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  text_heading: {
    // fontWeight: "400",
    margin: "8px 0px",
  },
  text_content: {
    margin: "8px 0px",
  },
  final_total_text: {
    textAlign: "right",
    fontSize: "16px",
    fontWeight: "bold",
  },
}));
const OrderDetails = (props) => {
  const { order, className, productDetails, ...rest } = props;

  console.log(order, "samir");
  const classes = useStyles();
  return (
    <div style={{ marginTop: 30 }}>
      <Card>
        <CardHeader title="Order Details" />
        <Divider />

        <CardContent>
          {order.shopping_cart.shopping_cart_items.map((item) => (
            <Card key={item.id} className={classes.inner_card}>
              <Grid container xs={12}>
                {/*-------------------------------- Image part-------------------------------- */}
                <Grid
                  container
                  xs={12}
                  md={3}
                  className={classes.image_container}
                >
                  <img
                    src={`${BASE_IMAGE_URL}${
                      productDetails.filter(
                        (i) => i.generated_sku === item.product_sku
                      )?.[0]?.product_list?.product_images?.[0]?.image_url
                    }`.replace(
                      `product/${item.trans_sku_list.product_id}`,
                      `product/${item.trans_sku_list.product_id}/500X500`
                    )}
                    alt="Product Image"
                    className={classes.product_image}
                  />
                </Grid>
                <Grid container xs={12} md={9}>
                  <Grid container xs={12} md={6}>
                    <Grid item xs={6} md={6}>
                      <p className={classes.text_heading}>Product Code</p>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <p className={classes.text_content}>
                        {" "}
                        {item.product_sku}
                      </p>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <p className={classes.text_heading}> Metal</p>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <p
                        className={classes.text_content}
                      >{`${item.trans_sku_list.purity} ${item.trans_sku_list.metal_color}`}</p>
                    </Grid>{" "}
                    <Grid item xs={6} md={6}>
                      <p className={classes.text_heading}> Gold Weight (Gm)</p>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <p className={classes.text_content}>
                        {" "}
                        {item.trans_sku_list.sku_weight}
                      </p>
                    </Grid>{" "}
                    <Grid item xs={6} md={6}>
                      <p className={classes.text_heading}> Diamond Quality</p>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <p className={classes.text_content}>
                        {" "}
                        {item.trans_sku_list.diamond_type}{" "}
                      </p>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <p className={classes.text_heading}>
                        Diamond Weight (Ct)
                      </p>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <p className={classes.text_content}> ? </p>
                    </Grid>
                  </Grid>
                  {/* ----------------------------------------------------------------- */}
                  <Grid container xs={12} md={6}>
                    <Grid item xs={6} md={6}>
                      <p className={classes.text_heading}>Quantity</p>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <p className={classes.text_content}> {item.qty} </p>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <p className={classes.text_heading}> Total</p>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <p className={classes.text_content}>
                        {`₹${Math.round(item.trans_sku_list.discount_price)}`}{" "}
                      </p>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <p className={classes.text_heading}>Saved</p>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <p className={classes.text_content}>
                        {`₹${Math.round(
                          item.trans_sku_list.discount_price -
                            item.trans_sku_list.markup_price
                        )} (${
                          item.trans_sku_list.discount === null
                            ? "0"
                            : item.trans_sku_list.discount
                        }%off)`}
                      </p>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <p className={classes.text_heading}>Shipping</p>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <p className={classes.text_content}> Free </p>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <p className={classes.text_heading}>Grand Total</p>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <p className={classes.text_content}>{`₹${Math.round(
                        item.trans_sku_list.markup_price
                      )}`}</p>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          ))}
          <Grid>
            <p className={classes.final_total_text}>
              Gross Total - {Math.round(order.shopping_cart.gross_amount)}&nbsp;
            </p>
            {order.shopping_cart.discount && (
              <p className={classes.final_total_text}>
                Voucher Discount - {Math.round(order.shopping_cart.discount)}
                &nbsp;
              </p>
            )}

            <p className={classes.final_total_text}>
              Final Total - {Math.round(order.shopping_cart.discounted_price)}
              &nbsp;
            </p>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};
export default OrderDetails;
