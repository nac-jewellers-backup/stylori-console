import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';

import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  TextField,
  Popper,
  CardActionArea,
  CardActions,
  Radio,
  Button,
  Grid,
  Checkbox,
  FormControlLabel,
  Divider,
  colors
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {},
  option: {
    border: `1px solid ${theme.palette.divider}`,
    display: 'flex',
    alignItems: 'flex-center',
    padding: theme.spacing(1),
    maxWidth: '100%',
    minWidth: '100%',
    cursor: 'pointer',
    '& + &': {
      marginLeft: theme.spacing(2)
    }
  
  },
  cardcontent:{
    display: 'flex',
    alignItems: 'flex-center',

  },
  selectedOption: {
    backgroundColor: colors.grey[200]
  },
  optionRadio: {
    margin: -10
  },
  optionDetails: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(2),
  }
}));

const AboutVoucher = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [selected, setSelected] = useState(1);

  const handleChange = (event, option) => {
    setSelected(option);

  };
  const handleClick = (event, option) => {
    setSelected(option);
  };
  
  
  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader title="General Information" />
      <Divider />
      <CardContent className={classes.cardcontent}>
      <Grid container  spacing={2}>  
      <Grid container item xs={12} sm={12} spacing={1} >

      <Grid   item xs={10} sm={10} >
        <TextField
            variant="outlined"
            margin="dense"
            fullWidth
            id="vouchercode"
            name="vouchercode"
            label="Voucher Code"
            />
      </Grid>

      <Grid   item xs={2} sm={2} >
        <Button size="small" variant="contained" className={classes.margin}>
            Small
          </Button>
      </Grid>

          

        </Grid>
        
        <Grid container item xs={12} sm={12} spacing={1}>
        <Grid  item xs={12} sm={12} spacing={1}>

      <Typography
        gutterBottom
        variant="title"
      >
      Discount Type
      </Typography>
      </Grid>
        {props.categories.map(option => (
          
          <Grid justify="center" item xs={3} sm={3} spacing={1}>
          <CardActionArea>
            
          <div
            className={clsx(classes.option, {
              [classes.selectedOption]: selected === option
            })}
            onClick={event => handleClick(event, option)}
            key={option}
          >

           <div className={classes.optionDetails}>
           <Typography
                gutterBottom
                variant="h5"
              >
                {option}
              </Typography>  
              </div> 
                         {/* <FormControlLabel
                               checked={selected === option}
                               className={classes.Checkbox}
                               fullWidth
                               name='isHighlyImportant'
                               onChange={event => handleChange(event, option)}
                               label={<Typography color={"textSecondary"} >
                                   {option}
                         </Typography>}
                           /> */}
            {/* <Radio
              checked={selected === option}
              className={classes.optionRadio}
              color="primary"
              onClick={event => handleChange(event, option)}
            /> */}
            {/* <div className={classes.optionDetails}>
              <Typography
                gutterBottom
                variant="h5"
              >
                {option}
              </Typography>
              </div> */}
            
          </div>
          </CardActionArea>
          </Grid>
        ))}
        </Grid>
       
        <Grid item xs={12} sm={12} spacing={1}>

        <TextField
          variant="outlined"
          margin="dense"
          fullWidth
          id="discountvalue"
          name="discountvalue"
          label="Discount Value"
          />
        </Grid>
        <Grid  item xs={12} sm={12} spacing={1}>
        <CardActionArea>

        <div
            className={clsx(classes.option, {
              [classes.selectedOption]: selected === ""
            })}
            key={""}
          >
                <CardActions>

            <Radio
              checked={selected === "checked"}
              className={classes.optionRadio}
              color="primary"
              label
              onClick={event => handleChange(event, "checked")}
            />
            </CardActions>
            <div className={classes.optionDetails}>
              <Typography
                gutterBottom
                variant="h5"
              >
               Only once per order
              </Typography>
              <Typography
                gutterBottom
                variant="title"
              >
               If this option is disabled, discount will be counted for every eligible product
              </Typography>
              </div>
            
          </div>
          </CardActionArea>
          </Grid>
          <Grid container item xs={12} sm={12} spacing={1}>
        <Grid  item xs={12} sm={12} spacing={1}>

      <Typography
        gutterBottom
        variant="title"
      >
        Minimum Requirements
        </Typography>
      </Grid>
        {['None','Minimum Order Value','Minimum Quantity of Items'].map(option => (
          
          <Grid  item xs={3} sm={3} spacing={1}>
          
          <div
            className={clsx(classes.option, {
              [classes.selectedOption]: selected === option
            })}
            key={option}
          >
            <Radio
              checked={selected === option}
              className={classes.optionRadio}
              color="primary"
              onClick={event => handleChange(event, option)}
            />
            <div className={classes.optionDetails}>
              <Typography
                gutterBottom
                variant="h5"
              >
                {option}
              </Typography>
              </div>
            
          </div>
          </Grid>
        ))}
        </Grid>
        <Grid container item xs={12} sm={12} spacing={1}>
        <Grid  item xs={12} sm={12} spacing={1}>

          <Typography
            gutterBottom
            variant="title"
          >
            Usage Limits
            </Typography>
          </Grid>

          <Grid  item xs={6} sm={6} spacing={1}>

          <div
            className={clsx(classes.option, {
              [classes.selectedOption]: selected === ""
            })}
            key={""}
          >
            <Radio
              checked={selected === "checked"}
              className={classes.optionRadio}
              color="primary"
              onClick={event => handleChange(event, "checked")}
            />
            <div className={classes.optionDetails}>
              <Typography
                gutterBottom
                variant="h5"
              >
               Only once per order
              </Typography>
              <Typography
                gutterBottom
                variant="title"
              >
               If this option is disabled, discount will be counted for every eligible product
              </Typography>
              </div>
            
          </div>
            </Grid>
            <Grid  item xs={6} sm={6} spacing={1}>

<div
  className={clsx(classes.option, {
    [classes.selectedOption]: selected === ""
  })}
  key={""}
>
  <Radio
    checked={selected === "checked"}
    className={classes.optionRadio}
    color="primary"
    onClick={event => handleChange(event, "checked")}
  />
  <div className={classes.optionDetails}>
    <Typography
      gutterBottom
      variant="h5"
    >
     Only once per order
    </Typography>
    <Typography
      gutterBottom
      variant="title"
    >
     If this option is disabled, discount will be counted for every eligible product
    </Typography>
    </div>
  
</div>
  </Grid>
          </Grid>
          <Grid container item xs={12} sm={12} spacing={1}>
        <Grid  item xs={12} sm={12} spacing={1}>

          <Typography
            gutterBottom
            variant="title"
          >
            Active Dates
            </Typography>
          </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

AboutVoucher.propTypes = {
  className: PropTypes.string
};

export default AboutVoucher;
