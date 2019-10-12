import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import { Grid } from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import StarBorder from '@material-ui/icons/StarBorder';
import ListSubheader from '@material-ui/core/ListSubheader';

import Step4 from './Step4';
import Step5 from './Step5';
import Step6 from './Step6';
import Step7 from './Step7';
import Step8 from './Step8';

import { ProductContext } from '../../context';
import { NetworkContext } from '../../context/NetworkContext';


const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
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
    background: "#fff"
  },
  stepper: {
    padding: theme.spacing(4, 0, 5),
    background: "#fff"

  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
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
    case "Step1":
      return <Step8 />; 
    case "Step7":
      return <Step7 />;    
    default:
      throw new Error('Unknown step');
  }
}

export default function Productupload() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const { productCtx} = React.useContext(ProductContext);
  const { sendNetworkRequest } = React.useContext(NetworkContext);

  const handleNext = () => {
     if(activeStep === productCtx.steps.length - 1){
      console.info('HANDLE',sendNetworkRequest);
      var formdata = {
        productname: productCtx.productname,
        product_categoy:productCtx.product_categoy,
        product_type:productCtx.product_type,
        materials:productCtx.material,
        metals:productCtx.metals,
        gender: productCtx.selectedgender,
        size: productCtx.selected_sizes,
        vendor: productCtx.vendorcode,
        product_code:productCtx.product_code,
        purity:productCtx.metalpurity,
        metal_color:productCtx.metalcolour,
        default_metal_color:productCtx.default_metal_colour,
        default_metal_purity:productCtx.default_metal_purity,
        diamond:productCtx.diamondlist,
        gemstone:productCtx.gemstonelist,
        metal_height: productCtx.metal_height,
        metal_weight: productCtx.metal_weight,
        metal_length: productCtx.metal_length,
        metal_width: productCtx.metal_width,
        themes: productCtx.themes,
        style: productCtx.prod_styles,
        product_vendor_code: productCtx.productvendorcode,
        earringbacking: productCtx.earringbacking,
        occassions: productCtx.occassions,
        collections: productCtx.collections,
        stonecount: productCtx.stonecount,
        stonecolours: productCtx.stonecolour,
        isreorder : productCtx.isreorder,
        defaultsize: productCtx.default_size,
        defaultmetalsize: productCtx.default_metal_size

     }
     sendNetworkRequest('/productupload', {}, formdata)
     }
    
     
      setActiveStep(activeStep + 1);

  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    
    <Grid item xs={12} sm={12}  >

        <Paper className={classes.paper}>
          <Typography component="h6" variant="h6" align="center">
            Product Upload
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {productCtx.steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
                      </Stepper>

    
          <React.Fragment>
            {activeStep === productCtx.steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order confirmation, and will
                  send you an update when your order has shipped.
                </Typography>
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
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === productCtx.steps.length - 1 ? 'Place order' : 'Next'}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        </Grid>
  );
}