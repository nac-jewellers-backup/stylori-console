import React, { useEffect, useContext, useState } from "react";
import { withRouter } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import Product from "./components/Product";
import Diamonds from "./components/Diamonds";
import Gemstones from "./components/Gemstones";
import Makingcharge from "./components/Makingcharge";
import { API_URL, GRAPHQL_DEV_CLIENT } from "../../config";
import { VENDORLIST, PRODUCTDIAMONDTYPES } from "../../graphql/query";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Chip, TextField } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({}));
export const Vendorprice = withRouter((props) => {
  const [vendorcode, setVendorcode] = React.useState(0);
  const [vendorlist, setVendorlist] = React.useState(0);

  const classes = useStyle();

  const handlevendorchange = (type) => (event, value) => {
    setVendorcode(value.shortCode);
  };
  useEffect(() => {
    const url = GRAPHQL_DEV_CLIENT;
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: VENDORLIST, variables: {} }),
    };
    // console.log("helo",setProductCtx)
    fetch(url, opts)
      .then((res) => res.json())
      .then((fatchvalue) => {
        setVendorlist({
          ...vendorlist,
          vendors: fatchvalue.data.allMasterVendors.nodes,
        });
      })
      .catch(console.error);
  }, []);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={12}>
        <Typography component="h6" variant="h6">
          Vendor Based Price List
        </Typography>
      </Grid>

      <Grid item xs={4} sm={4}>
        <Autocomplete
          id="free-solo-2-demo"
          fullWidth
          disableClearable
          className={classes.fixedTag}
          getOptionLabel={(option) => option.name + "   (" + option.shortCode + ") "}
          options={vendorlist.vendors}
          onChange={handlevendorchange("vendor")}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => <Chip variant="outlined" size="small" label={option.name} {...getTagProps({ index })} />)
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Choose Vendor"
              margin="dense"
              variant="outlined"
              fullWidth
              InputProps={{ ...params.InputProps, readOnly: true, type: "search" }}
            />
          )}
        />
      </Grid>

      {vendorcode ? (
        <>
          {/* <Grid item xs={12} sm={12}>

            <Typography component="h6" variant="h6">
           Gold Price Setup
          </Typography>
          </Grid> */}
          <Grid item xs={12} sm={12}>
            <Product vendor={vendorcode} />
          </Grid>
          {/* <Grid item xs={12} sm={12}>
    <Typography component="h6" variant="h6">
           Diamond Price Setup
          </Typography>
          </Grid> */}
          <Grid item xs={12} sm={12}>
            <Diamonds vendor={vendorcode} />
          </Grid>

          {/* <Grid item xs={12} sm={12}>
    <Typography component="h6" variant="h6">
           Gemstone Price Setup By weight
          </Typography>
          </Grid> */}
          <Grid item xs={12} sm={12}>
            <Gemstones title={"Gemstone Price Setup By Weight"} vendor={vendorcode} viewtype={1} />
          </Grid>

          {/* <Grid item xs={12} sm={12}>
    <Typography component="h6" variant="h6">
           
          </Typography>
          </Grid> */}
          <Grid item xs={12} sm={12}>
            <Gemstones title={"Gemstone Price Setup By No of Stones"} vendor={vendorcode} viewtype={2} />
          </Grid>

          {/* <Grid item xs={12} sm={12}>
    <Typography component="h6" variant="h6">
           Makingcharge Cost Price Setup
          </Typography>
          </Grid> */}
          <Grid item xs={12} sm={12}>
            <Makingcharge title={"Makingcharge Cost Price Setup"} ratetype={1} vendor={vendorcode} />
          </Grid>

          {/* <Grid item xs={12} sm={12}>
    <Typography component="h6" variant="h6">
           Makingcharge Selling Price Setup
          </Typography>
          </Grid> */}
          <Grid item xs={12} sm={12}>
            <Makingcharge title={"Makingcharge Selling Price Setup"} ratetype={2} vendor={vendorcode} />
          </Grid>
        </>
      ) : null}
    </Grid>
  );
});

export default withRouter(Vendorprice);
