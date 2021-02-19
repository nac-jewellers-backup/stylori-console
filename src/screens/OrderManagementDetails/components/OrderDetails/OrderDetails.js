import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Card, CardHeader, Divider, CardContent, Grid } from "@material-ui/core";
import { API_URL, GRAPHQL_DEV_CLIENT } from "../../../../config";
import { ORDERLISTIMAGE } from "../../../../graphql/query";
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
  const { order, className, ...rest } = props;
  const [imageUrl, setImageUrl] = useState([]);

  let product_id = [];
  order.shopping_cart.shopping_cart_items.map((item) => {
    console.log(item);
    product_id.push(item.trans_sku_list.product_id);
  });
  useEffect(() => {
    const url = GRAPHQL_DEV_CLIENT;
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: ORDERLISTIMAGE,
        variables: { productId: product_id },
      }),
    };

    fetch(url, opts)
      .then((res) => res.json())
      .then((fetchvalue) => {
        console.log(fetchvalue);
        let nodeValue = fetchvalue.data.allProductImages.nodes;
        // console.log(nodeValue);
      // 
        // setImageUrl([...nodeValue]);
       
        // console.log(imageUrl);
      });
  }, []);

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
                <Grid container xs={12} md={3} className={classes.image_container}>
                  <img
                    src={`https://assets.stylori.com/product/${item.trans_sku_list.product_id}/1000X1000/${
                      item.trans_sku_list.product_id
                    }-1${item.trans_sku_list.metal_color.charAt(0)}.jpg`}
                    alt="Product Image"
                    className={classes.product_image}
                  />
                  {/* {imageUrl.forEach((e) => {
                    e.productId === item.trans_sku_list.product_id ? (
                      // <img src="" alt="Product Image" className={classes.product_image} />
                      <p>{e.productId}</p>
                    ) : (
                      ""
                    );
                  })} */}
                </Grid>
                <Grid container xs={12} md={9}>
                  <Grid container xs={12} md={6}>
                    <Grid item xs={6} md={6}>
                      <p className={classes.text_heading}>Product Code</p>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <p className={classes.text_content}> {item.product_sku}</p>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <p className={classes.text_heading}> Metal</p>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <p className={classes.text_content}>{`${item.trans_sku_list.purity} ${item.trans_sku_list.metal_color}`}</p>
                    </Grid>{" "}
                    <Grid item xs={6} md={6}>
                      <p className={classes.text_heading}>Weight (Gm)</p>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <p className={classes.text_content}> {item.trans_sku_list.sku_weight}</p>
                    </Grid>{" "}
                    <Grid item xs={6} md={6}>
                      <p className={classes.text_heading}> Diamond Quality</p>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <p className={classes.text_content}> {item.trans_sku_list.diamond_type ?? "No"} </p>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <p className={classes.text_heading}>Coupon Code Off</p>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <p className={classes.text_content}> {item.trans_sku_list.discount ?? "None"} </p>
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
                      <p className={classes.text_content}>{`₹${Math.round(item.trans_sku_list.discount_price)}`} </p>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <p className={classes.text_heading}>Saved</p>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <p className={classes.text_content}>
                        {`₹${Math.round(item.trans_sku_list.discount_price - item.trans_sku_list.markup_price)} 

                        
                       
                        `}
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
                      <p className={classes.text_content}>{`₹${Math.round(item.trans_sku_list.markup_price)}`}</p>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          ))}
          <Grid>
            <p className={classes.final_total_text}>{`Final Total - ₹${Math.round(order.shopping_cart.gross_amount)}`}&nbsp;</p>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};
export default OrderDetails;
