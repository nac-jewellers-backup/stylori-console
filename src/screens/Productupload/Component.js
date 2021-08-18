import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import { Grid } from "@material-ui/core";
import Collapse from "@material-ui/core/Collapse";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import StarBorder from "@material-ui/icons/StarBorder";
import ListSubheader from "@material-ui/core/ListSubheader";
import { Alert, AlertTitle } from "@material-ui/lab";
import { useHistory } from "react-router-dom";
import Step4 from "./Step4";
import Step5 from "./Step5";
import Step6 from "./Step6";
import Step7 from "./Step7";
import Step8 from "./Step8";
import Snackbar from "@material-ui/core/Snackbar";

import { ProductContext } from "../../context";
import { NetworkContext } from "../../context/NetworkContext";
import { element } from "prop-types";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
    background: "#fff",
  },
  stepper: {
    padding: theme.spacing(1, 0, 1),
    background: "#fff",
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

function getStepContent(step) {
  switch (step) {
    case "Step1":
      return <AddressForm />;
    case "Step2":
      return <PaymentForm />;
    case "Step3":
      return <Review />;
    case "Step4":
      return <Step5 />;
    case "Step5":
      return <Step4 />;
    case "Step6":
      return <Step6 />;

    case "Step7":
      return <Step7 />;
    default:
      throw new Error("Unknown step");
  }
}

export default function Productupload() {
  let history = useHistory();
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const { productCtx, setProductCtx } = React.useContext(ProductContext);
  const { sendNetworkRequest } = React.useContext(NetworkContext);
  const [failure, setfailure] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleClick = () => {
    setSuccess(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccess(false);
  };
  const handleNext = async () => {
    var isvalid = true;
    var error_content = {};
    // if(productCtx.error_message)
    // {
    //   error_content = productCtx.error_message

    // }

    if (activeStep === 0) {
      if (!productCtx.product_type) {
        isvalid = false;
        error_content["product_type"] = "Error messsage";
      }
      if (!productCtx.productname) {
        isvalid = false;
        error_content["productname"] = "Error messsage";
      }
      if (!productCtx.product_categoy) {
        isvalid = false;
        error_content["product_categoy"] = "Error messsage";
      }

      if (!productCtx.metalcolour) {
        isvalid = false;
        error_content["metalcolour"] = "Error messsage";
      }
      if (!productCtx.material_names) {
        isvalid = false;
        error_content["material_names"] = "Error messsage";
      }
      if (!productCtx.metalpurity || productCtx.metalpurity.length === 0) {
        isvalid = false;

        error_content["metalpurity"] = "Error messsage";
      }
      if (!productCtx.metalcolour || productCtx.metalcolour.length === 0) {
        isvalid = false;

        error_content["metalcolour"] = "Error messsage";
      }

      if (!productCtx.vendorcode) {
        isvalid = false;
        error_content["vendorcode"] = "Error messsage";
      }
      if (!productCtx.vendorleadtime) {
        isvalid = false;
        error_content["vendorleadtime"] = "Error messsage";
      }

      if (!productCtx.default_metal_colour) {
        isvalid = false;
        error_content["default_metal_colour"] = "Error messsage";
      }
      if (!productCtx.default_metal_purity) {
        isvalid = false;
        error_content["default_metal_purity"] = "Error messsage";
      }
      if (!productCtx.productvendorcode) {
        isvalid = false;
        error_content["productvendorcode"] = "Error messsage";
      }
      if (!productCtx.earringbacking && productCtx.product_type.alias === "Earrings") {
        isvalid = false;
        error_content["earringbacking"] = "Error messsage";
      }
      if (!productCtx.selectedgender) {
        isvalid = false;
        error_content["selectedgender"] = "Error messsage";
      }
      if ((!productCtx.selected_sizes || productCtx.selected_sizes.length === 0) && productCtx.product_type === "Rings") {
        isvalid = false;
        error_content["selected_sizes"] = "Error messsage";
      }

      if ((!productCtx.default_size || productCtx.default_size.length === 0) && productCtx.product_type === "Rings") {
        isvalid = false;
        error_content["default_size"] = "Error messsage";
      }
      // isvalid = true;
    }

    if (activeStep === 1) {
      productCtx.metalpurity.forEach((element) => {
        const keyvalue = element.name + "_metal_weight";

        if (!productCtx[keyvalue] || productCtx[keyvalue].length === 0) {
          isvalid = false;

          error_content[keyvalue] = "Error messsage";
        }
      });
      if (!productCtx.themes || productCtx.themes.length === 0) {
        isvalid = false;
        error_content["themes"] = "Error messsage";
      }
      if (productCtx.product_type_shortcode === "R") {
        if (!productCtx.metal_height) {
          isvalid = false;
          error_content["metal_height"] = "Error messsage";
        }
        if (!productCtx.metal_width) {
          isvalid = false;
          error_content["metal_width"] = "Error messsage";
        }
      }

      if (!productCtx.themes || productCtx.themes.length === 0) {
        isvalid = false;
        error_content["themes"] = "Error messsage";
      }
      if (!productCtx.prod_styles || productCtx.prod_styles.length === 0) {
        isvalid = false;
        error_content["prod_styles"] = "Error messsage";
      }
      if (!productCtx.occassions || productCtx.occassions.length === 0) {
        isvalid = false;
        error_content["occassions"] = "Error messsage";
      }
      // if((!productCtx.collections || productCtx.collections.length === 0 ))
      // {
      //   isvalid = false
      //   error_content['collections'] = "Error messsage"
      // }

      //  isvalid = true;
    }

    setProductCtx({ ...productCtx, error_message: error_content });
    if (activeStep === productCtx.steps.length - 1) {
      console.info("HANDLE", sendNetworkRequest);
      const productseries = productCtx.masterData.productseries[0].productSeries;

      delete productCtx["masterData"];

      var formdata = productCtx;
      formdata["productseries"] = productseries;
      console.log(JSON.stringify(formdata));
      setLoading(true);
      const productuploadresponse = await sendNetworkRequest("/productupload", {}, formdata);

      setLoading(false);
      setSuccess(true);
      await ProductEditPage(productuploadresponse);
      // window.location.replace("/productlist");
    } else {
      if (isvalid) {
        setActiveStep(activeStep + 1);
      }
    }

    //else
    //  {
    //  }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  async function ProductEditPage(productuploadresponse) {
    setTimeout(function () {
      history.push(`product_attributes/${productuploadresponse[0].product_id}`);
    }, 4000);
  }

  return (
    <Grid item xs={12} sm={12}>
      <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose}>Product Created Successfully.. Redirecting to Product Edit Page</Alert>
      </Snackbar>

      <Snackbar open={loading} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="info">
          Please Wait ...
        </Alert>
      </Snackbar>

      <Snackbar open={failure} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Please try again
        </Alert>
      </Snackbar>
      <Paper className={classes.paper}>
        <Stepper activeStep={activeStep} className={classes.stepper}>
          {productCtx.steps.map((label, index) => (
            <Step key={label}>
              <StepLabel></StepLabel>
            </Step>
          ))}
        </Stepper>
      </Paper>

      <React.Fragment>
        {activeStep === productCtx.steps.length ? (
          <React.Fragment>
            <Typography variant="h5" gutterBottom>
              Product Added Successfully
            </Typography>
            <Typography variant="subtitle1"></Typography>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {getStepContent(productCtx.steps[activeStep])}
            <div className={classes.buttons}>
              {activeStep !== 0 && (
                <Button onClick={handleBack} className={classes.button}>
                  Back
                </Button>
              )}
              <Button variant="contained" color="primary" onClick={handleNext} className={classes.button}>
                {activeStep === productCtx.steps.length - 1 ? "Product Upload" : "Next"}
              </Button>
            </div>
          </React.Fragment>
        )}
      </React.Fragment>
    </Grid>
  );
}
