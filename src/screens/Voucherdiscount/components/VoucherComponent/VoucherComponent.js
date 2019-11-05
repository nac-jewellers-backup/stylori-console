import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';

import {
  Card,
  CardHeader,
  CardContent,
  Tabs, Tab, 
  Divider,
  colors
} from '@material-ui/core';
const tabs = [
  { value: 'Category', label: 'Category' },
  { value: 'Material', label: 'Material' },
  { value: 'Producttype', label: 'Product type' },
  { value: 'Collections', label: 'Collections' },
  { value: 'Purity', label: 'Purity' },
  { value: 'Availability', label: 'Availability' },
  { value: 'Styles', label: 'Styles' }


];
const useStyles = makeStyles(theme => ({
  root: {},
  option: {
    border: `1px solid ${theme.palette.divider}`,
    display: 'flex',
    alignItems: 'flex-center',
    padding: theme.spacing(1),
    maxWidth: '100%',
    minWidth: '100%',
    '& + &': {
      marginLeft: theme.spacing(2)
    }
  
  },
  divider: {
    backgroundColor: colors.grey[300]
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
    marginLeft: theme.spacing(2)
  }
}));

const VoucherComponent = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [selected, setSelected] = useState(1);
  const [selectedtab, setSelectedtab] = useState("overview");

  const handleChange = (event, option) => {
    setSelected(option);

  };
  const handleTabsChange = (event, value) => {
    setSelectedtab(value);
  };
  
  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
  
      <CardContent className={classes.cardcontent}>
      <Tabs
        className={classes.tabs}
        scrollButtons="auto"
        value={selectedtab}
        onChange={handleTabsChange}
        variant="scrollable"
      >
        {tabs.map(tab => (
          <Tab
            key={tab.value}
            label={tab.label}
            selected
            value={tab.value}
          />
        ))}
      </Tabs>
      <Divider />
     </CardContent>
    </Card>
  );
};

VoucherComponent.propTypes = {
  className: PropTypes.string,
  match: PropTypes.object.isRequired

};
export default VoucherComponent;
