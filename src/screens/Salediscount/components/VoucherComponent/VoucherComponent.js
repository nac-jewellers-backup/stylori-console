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
  { value: 'Producttype', label: 'Product type' },
  { value: 'Material', label: 'Material' },
  { value: 'Collections', label: 'Collections' },
  { value: 'Occations', label: 'Occations' },
  { value: 'Styles', label: 'Styles' },
  { value: 'Themes', label: 'Themes' }


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
  const [tablist, setTablist] = useState(tabs);
  const [tabnames, setTabnames] = useState([
    "Category",
    "Producttype",
    "Material",
    "Collections",
    "Occations",
    "Styles",
    "Themes"

  ]);

  const [selected, setSelected] = useState(1);
  const [selectedtab, setSelectedtab] = useState("Category");
  const [selectedDate, handleDateChange] = useState(new Date());
  const handleChange = (event, option) => {
    setSelected(option);

  };
  const handleTabsChange = (event, value) => {
    if(value == 'Material')
    {
      // tabs.push(  { value: 'Diamond Types', label: 'Diamond Types' },
      // )
      if(tabnames.indexOf("Purity") === -1)
      {
        tabnames.splice(3, 0, "Purity");

      }

    }
    setTablist(tabs)
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
        {tabnames.map(tab => (
          <Tab
            key={tab}
            label={tab}
            selected
            value={tab}
          />
        ))}
      </Tabs>
      <Divider />
      <div className={classes.content}>
    
      {selectedtab === 'Category' ? <CategoryComponents  tabname={selectedtab}  materials={voucherCtx.voucherMaster.product_categories} /> : null }
      {selectedtab === 'Material' ? <CategoryComponents  tabname={selectedtab}  materials={voucherCtx.voucherMaster.materials} /> : null }
      {selectedtab === 'Producttype' ? <CategoryComponents  tabname={selectedtab}  materials={voucherCtx.voucherMaster.product_types} /> : null }
      {selectedtab === 'Collections' ? <CategoryComponents  tabname={selectedtab}  materials={voucherCtx.voucherMaster.collections} /> : null }
      {selectedtab === 'Purity' ? <CategoryComponents  tabname={selectedtab}  materials={voucherCtx.voucherMaster.purities} /> : null }
      {selectedtab === 'Styles' ? <CategoryComponents  tabname={selectedtab}  materials={voucherCtx.voucherMaster.styles} /> : null }
      {selectedtab === 'Occations' ? <CategoryComponents  tabname={selectedtab}  materials={voucherCtx.voucherMaster.occations} /> : null }
      {selectedtab === 'Themes' ? <CategoryComponents  tabname={selectedtab}  materials={voucherCtx.voucherMaster.themes} /> : null }

      
        </div>
    </Card>
  );
};

VoucherComponent.propTypes = {
  className: PropTypes.string,
  match: PropTypes.object.isRequired

};
export default VoucherComponent;
