import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { Autocomplete } from "@material-ui/lab";

import {
  Card,
  CardHeader,
  CardContent,
  TextField,
  Chip,
  Grid,
  Divider,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {},
  option: {
    border: `1px solid ${theme.palette.divider}`,
    display: "flex",
    alignItems: "flex-center",
    padding: theme.spacing(1),

    cursor: "pointer",
    "& + &": {
      marginLeft: theme.spacing(2),
    },
  },
  metaloption: {
    border: `1px solid ${theme.palette.divider}`,
    display: "flex",
    alignItems: "flex-center",
    padding: theme.spacing(1),
    cursor: "pointer",
    "& + &": {
      marginLeft: theme.spacing(2),
    },
  },
  cardcontent: {
    display: "flex",
    alignItems: "flex-center",
  },
  selectedOption: {
    backgroundColor: theme.palette.primary.main,
  },
  selectedOptiondefault: {
    backgroundColor: theme.palette.common.white,
  },
  optionRadio: {
    margin: -10,
  },
  margin: {
    marginTop: theme.spacing(2),
  },
  optionDetails: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(2),
  },
  optionmaterialDetails: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  selectedtext: {
    color: theme.palette.common.white,
  },
}));

const AboutVoucher = (props) => {
  const { className, ...rest } = props;

  const [productids] = useState(props.productids);

  const [formData, setFormData] = useState({});

  const classes = useStyles();

  const handleproducttypechange = (type) => (event, option) => {
    let vendorsarray = [];
    option.forEach((element) => {
      vendorsarray.push(element.name);
    });
    setFormData({ ...formData, producttypes: vendorsarray });
    props.apply(
      formData.vendorid,
      formData.categories,
      vendorsarray,
      formData.material,
      formData.purity
    );
  };
  const handlecategorychange = (type) => (event, option) => {
    let vendorsarray = [];
    option.forEach((element) => {
      vendorsarray.push(element.name);
    });
    setFormData({ ...formData, categories: vendorsarray });

    props.apply(
      formData.vendorid,
      vendorsarray,
      formData.producttypes,
      formData.material,
      formData.purity
    );
  };
  const hangeoptionchange = (type) => (event, option) => {
    let vendorsarray = [];
    option.forEach((element) => {
      vendorsarray.push(element.shortCode);
    });
    setFormData({ ...formData, vendorid: vendorsarray });

    props.apply(
      vendorsarray,
      formData.categories,
      formData.producttypes,
      formData.material,
      formData.purity
    );
  };

  const handlematerialtypechange = (type) => (event, option) => {
    let vendorsarray = [];
    option.forEach((element) => {
      vendorsarray.push(element.name);
    });
    setFormData({ ...formData, material: vendorsarray });

    props.apply(
      formData.vendorid,
      formData.categories,
      formData.producttypes,
      vendorsarray,
      formData.purity
    );
  };
  const handlepuritytypechange = (type) => (event, option) => {
    let vendorsarray = [];
    option.forEach((element) => {
      vendorsarray.push(element);
    });
    setFormData({ ...formData, purity: vendorsarray });

    props.apply(
      formData.vendorid,
      formData.categories,
      formData.producttypes,
      formData.material,
      vendorsarray
    );
  };
  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader title="General Information" />
      <Divider />
      <CardContent className={classes.cardcontent}>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={6}>
            <Autocomplete
              multiple
              id="combo-box-demo"
              disabled={props.isdisabled}
              options={props.vendorlist ?? []}
              getOptionLabel={(option) => option.display}
              fullWidth
              onChange={hangeoptionchange("vendorcode")}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Vendor"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={6} sm={6}>
            <Autocomplete
              multiple
              id="combo-box-demo"
              disabled={props.isdisabled}
              options={props.categorylist ?? []}
              getOptionLabel={(option) => option.name}
              onChange={handlecategorychange("category")}
              fullWidth
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Product Category"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={6} sm={6}>
            <Autocomplete
              multiple
              id="combo-box-demo"
              disabled={props.isdisabled}
              options={props.producttypelist ?? []}
              getOptionLabel={(option) => option.name}
              onChange={handleproducttypechange("product_type")}
              fullWidth
              margin="dense"
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Product Type"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={6} sm={6}>
            <Autocomplete
              multiple
              id="combo-box-demo"
              disabled={props.isdisabled}
              options={props.material ?? []}
              getOptionLabel={(option) => option.name}
              onChange={handlematerialtypechange("material")}
              fullWidth
              margin="dense"
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Material Type"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={6} sm={6}>
            <Autocomplete
              multiple
              id="combo-box-demo"
              disabled={props.isdisabled}
              options={props.puritylist ?? []}
              getOptionLabel={(option) => option.name}
              onChange={handlepuritytypechange("puritylist")}
              fullWidth
              margin="dense"
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Purity Type"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              id="free-solo-2-demo"
              multiple
              fullWidth
              disabled={props.isdisabled}
              className={classes.fixedTag}
              value={props.productids}
              options={productids ?? []}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    variant="outlined"
                    size="small"
                    label={option}
                    {...getTagProps({ index })}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={
                    props.productids.length > 0
                      ? "Products (" + props.productids.length + ") "
                      : "Products"
                  }
                  margin="dense"
                  variant="outlined"
                  fullWidth
                  InputProps={{ ...params.InputProps, type: "search" }}
                />
              )}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

AboutVoucher.propTypes = {
  className: PropTypes.string,
};

export default AboutVoucher;
