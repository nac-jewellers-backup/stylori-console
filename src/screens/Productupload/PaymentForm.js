import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Checkbox, Card, CardHeader, TextField, Divider, Chip, CardContent } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Select from "react-select";
import { Input } from "../../components/Input.js";
import FormGroup from "@material-ui/core/FormGroup";
import { ProductContext } from "../../context";
import Box from "@material-ui/core/Box";
import SelectPlaceholder from "../../components/SelectPlaceholder.js";

import "./Productupload.css";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
  },
}));

export default function PaymentForm(props) {
  const classes = useStyles();
  const { className, ...rest } = props;

  const { productCtx, setProductCtx } = React.useContext(ProductContext);
  const handleInputChange = (type) => (e) => {
    setProductCtx({ ...productCtx, [type]: e.target.value });
  };
  const materialChange = (type) => (e) => {
    let selected_metal_colour = { ...productCtx.selected_metal_colour, [type]: e.target.checked };
    setProductCtx({ ...productCtx, selected_metal_colour });
  };
  const purityChange = (type) => (selectedOption) => {
    setProductCtx({ ...productCtx, [type]: selectedOption });
  };
  const handleoptionChange = (type) => (event, value) => {
    setProductCtx({ ...productCtx, [type]: value });
  };

  console.log(productCtx);
  return (
    <React.Fragment>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
          <Card {...rest} className={clsx(classes.root, className)}>
            <CardHeader title="Type of Fit" />
            <Divider />
            <CardContent className={classes.cardcontent}>
              <Grid container spacing={1}>
                <Grid item container xs={12} sm={12}>
                  <Grid item xs={6} sm={3}>
                    {/* <FormLabel component="legend" >Product Code</FormLabel> */}
                    <Input
                      variant="outlined"
                      margin="dense"
                      disabled
                      id="size"
                      onChange={handleInputChange("product_code")}
                      name="size"
                      value={"S" + productCtx.product_type.shortCode + (productCtx.masterData.productseries[0].value + 1)}
                    />
                  </Grid>
                </Grid>
                {["R", "B"].includes(productCtx.product_type.shortCode) ? null : (
                  <>
                    <Grid item xs={4}>
                      <Input
                        variant="outlined"
                        margin="dense"
                        fullWidth
                        id="size"
                        label="Height"
                        name="size"
                        autoComplete="size"
                        onChange={handleInputChange("metal_height")}
                        value={productCtx.metal_height === 0 ? "" : productCtx.metal_height}
                      />
                    </Grid>

                    <Grid item xs={4}>
                      <Input
                        variant="outlined"
                        margin="dense"
                        fullWidth
                        id="size"
                        label="Width"
                        name="size"
                        onChange={handleInputChange("metal_width")}
                        value={productCtx.metal_width === 0 ? "" : productCtx.metal_width}
                        autoComplete="size"
                      />
                    </Grid>
                  </>
                )}

                {productCtx.product_type === "Bracelets" ? (
                  <Grid item xs={6}>
                    <Input
                      variant="outlined"
                      margin="dense"
                      fullWidth
                      id="size"
                      label="Length"
                      name="size"
                      autoComplete="size"
                      onChange={handleInputChange("metal_length")}
                      value={productCtx.metal_length === 0 ? "" : productCtx.metal_length}
                    />
                  </Grid>
                ) : null}
              </Grid>
            </CardContent>
          </Card>
          <Card {...rest} className={clsx(classes.root, className)}>
            <CardHeader
              title="Enter weights for different Purity
"
            />
            <Divider />
            <CardContent className={classes.cardcontent}>
              <Grid container spacing={1}>
                <Grid item xs={12}></Grid>
                {productCtx.metalpurity.map((row) => (
                  <Grid item container xs={12} spacing={2}>
                    <Grid item xs={6}>
                      <Input
                        variant="outlined"
                        disabled
                        margin="dense"
                        fullWidth
                        id="size"
                        label="Purity"
                        name="size"
                        autoComplete="size"
                        value={row.name}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Input
                        variant="outlined"
                        margin="dense"
                        fullWidth
                        id="size"
                        label="Weight"
                        name="size"
                        error={productCtx.error_message[`${row.name}_metal_weight`]}
                        autoComplete="size"
                        onChange={handleInputChange(`${row.name}_metal_weight`)}
                        value={productCtx[`${row.name}_metal_weight`] === 0 ? "" : productCtx[`${row.name}_metal_weight`]}
                      />
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card {...rest} className={clsx(classes.root, className)}>
            <CardHeader title="Type of Fit" />
            <Divider />
            <CardContent className={classes.cardcontent}>
              <Grid container xs={12} sm={12} spacing={2}>
                <Grid item xs={6} sm={6}>
                  <Autocomplete
                    id="product_category"
                    multiple
                    className={classes.fixedTag}
                    defaultValue={productCtx.themes}
                    onChange={handleoptionChange("themes")}
                    options={productCtx.masterData.themes.map((option) => option.label)}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip variant="outlined" size="small" label={option} {...getTagProps({ index })} />
                      ))
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select Themes"
                        margin="dense"
                        variant="outlined"
                        fullWidth
                        error={productCtx.error_message.themes}
                        InputProps={{ ...params.InputProps, type: "search" }}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Autocomplete
                    id="product_category"
                    multiple
                    className={classes.fixedTag}
                    defaultValue={productCtx.prod_styles}
                    onChange={handleoptionChange("prod_styles")}
                    options={productCtx.masterData.styles.map((option) => option.label)}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip variant="outlined" size="small" label={option} {...getTagProps({ index })} />
                      ))
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Style"
                        margin="dense"
                        variant="outlined"
                        fullWidth
                        error={productCtx.error_message.prod_styles}
                        InputProps={{ ...params.InputProps, type: "search" }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Autocomplete
                    id="product_category"
                    multiple
                    className={classes.fixedTag}
                    defaultValue={productCtx.occassions}
                    onChange={handleoptionChange("occassions")}
                    options={productCtx.masterData.occasions.map((option) => option.label)}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip variant="outlined" size="small" label={option} {...getTagProps({ index })} />
                      ))
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Occasions"
                        margin="dense"
                        variant="outlined"
                        fullWidth
                        error={productCtx.error_message.occassions}
                        InputProps={{ ...params.InputProps, type: "search" }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Autocomplete
                    id="product_category"
                    multiple
                    className={classes.fixedTag}
                    defaultValue={productCtx.collections}
                    onChange={handleoptionChange("collections")}
                    options={productCtx.masterData.collections.map((option) => option.label)}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip variant="outlined" size="small" label={option} {...getTagProps({ index })} />
                      ))
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Collections"
                        margin="dense"
                        variant="outlined"
                        fullWidth
                        error={productCtx.error_message.collections}
                        InputProps={{ ...params.InputProps, type: "search" }}
                      />
                    )}
                  />
                </Grid>
                {productCtx.material_names.indexOf("Gemstone") > -1 ? (
                  <>
                    <Grid item xs={12} sm={6}>
                      <Autocomplete
                        id="product_category"
                        multiple
                        className={classes.fixedTag}
                        defaultValue={productCtx.stonecount}
                        onChange={handleoptionChange("stonecount")}
                        options={productCtx.masterData.stones.map((option) => option.label)}
                        renderTags={(value, getTagProps) =>
                          value.map((option, index) => (
                            <Chip variant="outlined" size="small" label={option} {...getTagProps({ index })} />
                          ))
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="No of Stones"
                            margin="dense"
                            variant="outlined"
                            fullWidth
                            InputProps={{ ...params.InputProps, type: "search" }}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Autocomplete
                        id="product_category"
                        multiple
                        className={classes.fixedTag}
                        defaultValue={productCtx.stonecolour}
                        onChange={handleoptionChange("stonecolour")}
                        options={productCtx.masterData.gemstonecolor.map((option) => option.label)}
                        renderTags={(value, getTagProps) =>
                          value.map((option, index) => (
                            <Chip variant="outlined" size="small" label={option} {...getTagProps({ index })} />
                          ))
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Stone Colour"
                            margin="dense"
                            variant="outlined"
                            fullWidth
                            InputProps={{ ...params.InputProps, type: "search" }}
                          />
                        )}
                      />
                    </Grid>
                  </>
                ) : null}
              </Grid>

              <Grid item xs={6}></Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
