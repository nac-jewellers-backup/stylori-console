import React, { useEffect,useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {CategoryComponents} from './../../components'
import { DateTimePicker } from "@material-ui/pickers";

import {
  Card,
  CardHeader,
  CardContent,
  Tabs, Tab, 
  Divider,
  colors
} from '@material-ui/core';
import { VoucherContext } from '../../../../context';
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
  content: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(1)

  },
  optionDetails: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(2)
  }
}));

const VoucherComponent = props => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const { voucherCtx, setVoucherCtx ,voucherMaster} = React.useContext(VoucherContext);

  const [selected, setSelected] = useState(1);
  const [selectedtab, setSelectedtab] = useState("");
  const [selectedDate, handleDateChange] = useState(new Date());
  const handleChange = (event, option) => {
    setSelected(option);

  };
  const handleTabsChange = (event, value) => {
    setSelectedtab(value);
  };
  useEffect(() => {
  }, []);
  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
  
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
      <div className={classes.content}>
    
     <CategoryComponents  tabname={selectedtab}  materials={['Gold', 'Diamond']} />
        
        </div>
    </Card>
  );
};

VoucherComponent.propTypes = {
  className: PropTypes.string,
  match: PropTypes.object.isRequired

};
export default VoucherComponent;
