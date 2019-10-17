import React from "react";
import { TextField, Grid } from "@material-ui/core";
import propTypes from "prop-types";

// NOTABLE POINTS
//  Min and Max
// Email ID
// Confirm Email ID
// Mobile Number
// Number
// Password
// Repeat Password
// On Button Submit
// On Moving Out
// Live

export const Input = props => {
  let {
    isNumber = false,
    pattern,
    maxLength,
    minLength,
    helperText,
    ...rest
  } = props;
  const defaultStyle = {
    margin: "dense",
    variant: "outlined",
    'input-label': {
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      width: '100%',
      color: 'red'
    },
  
    'input': {
      '&::placeholder': {
        textOverflow: 'ellipsis !important',
        color: 'red'
      }
    }
  };

  // INTEGRATE THEME HERE

  const handleKeyPress = e => {
    if (isNumber) {
      if (!(e.which >= 48 && e.which <= 57)) e.preventDefault();
    }
  };

  return (
    <Grid item xs={12}>
      <TextField
                inputProps={{ pattern, maxLength, minLength  }}

        style={{ width: "100%" }}
        helperText={<b>{helperText}</b>}
        onKeyPress={handleKeyPress}
        {...defaultStyle}
        {...rest}
      />
    </Grid>
  );
};

Input.propTypes = {
  isNumber: propTypes.bool
};
