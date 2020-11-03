import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Button,
  Chip,
  Collapse,
  Divider,
  Drawer,
  FormControlLabel,
  Radio,
  RadioGroup,
  Slider,
  TextField,
  Typography,
  Grid
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {

  KeyboardDatePicker,
} from '@material-ui/pickers';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  drawer: {
    width: 420,
    maxWidth: '100%'
  },
  header: {
    padding: theme.spacing(2, 1),
    display: 'flex',
    justifyContent: 'space-between'
  },
  buttonIcon: {
    marginRight: theme.spacing(1)
  },
  content: {
    padding: theme.spacing(0, 3),
    flexGrow: 1
  },
  contentSection: {
    padding: theme.spacing(2, 0)
  },
  contentSectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    cursor: 'pointer'
  },
  contentSectionContent: {},
  formGroup: {
   
    padding: theme.spacing(2, 0)
  },
  fieldGroup: {
    display: 'flex',
    alignItems: 'center'
  },
  field: {
    marginTop: 0,
    marginBottom: 0
  },
  flexGrow: {
    flexGrow: 1
  },
  addButton: {
    marginLeft: theme.spacing(1)
  },
  tags: {
    marginTop: theme.spacing(1)
  },
  minAmount: {
    marginRight: theme.spacing(3)
  },
  maxAmount: {
    marginLeft: theme.spacing(3)
  },
  radioGroup: {},
  actions: {
    padding: theme.spacing(3),
    '& > * + *': {
      marginTop: theme.spacing(2)
    }
  }
}));

const Filter = props => {
  const { open, onClose,masters, onFilter, className, ...rest } = props;

  const classes = useStyles();

  const initialValues = {
      name: '',
      company: '',
      mobile: '',
      city: '',
      version: null,
      commodity: []
  };

  const [expandProject, setExpandProject] = useState(true);
  const [expandCustomer, setExpandCustomer] = useState(false);
  const [values, setValues] = useState({ ...initialValues });

  const handleClear = () => {
    setValues({ 
      ...initialValues });
  };

  const handleFieldChange = (event, field, value) => {
    event.persist && event.persist();
    setValues(values => ({
      ...values,
      [field]: value
    }));
  };
  const handleoptionchange = type => (event, value) => {
    setValues(values => ({
      ...values,
      [type]: value
    }));
  }
  const handleinputchange = type => (e) => {
    setValues({
      ...values,
      [type]: e.target.value
    })
  }

  const handleTagAdd = () => {
    setValues(values => {
      const newValues = { ...values };

      if (newValues.tag && !newValues.tags.includes(newValues.tag)) {
        newValues.tags = [...newValues.tags];
        newValues.tags.push(newValues.tag);
      }

      newValues.tag = '';

      return newValues;
    });
  };

  const handleTagDelete = tag => {
    setValues(values => {
      const newValues = { ...values };

      newValues.tags = newValues.tags.filter(t => t !== tag);

      return newValues;
    });
  };
  const handleDateChange = type => (date) => {
    setValues({
      ...values,
      [type]: date
    })
  };
  const handleToggleProject = () => {
    setExpandProject(expandProject => !expandProject);
  };

  const handleToggleCustomer = () => {
    setExpandCustomer(expandCustomer => !expandCustomer);
  };

  const handleSubmit = event => {
    event.preventDefault();
    
    onFilter && onFilter(values);
    onClose && onClose()
  };

  const paymentStatusOptions = ['Pending', 'Canceled', 'Completed', 'Rejected'];
  const customerAgeOption = ['18 - 30', '30 - 45', '50 - 60', '60+'];

  return (
    <Drawer
      anchor="right"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant="temporary"
    >
      <form
        {...rest}
        className={clsx(classes.root, className)}
        onSubmit={handleSubmit}
      >
        <div className={classes.header}>
          <Button
            onClick={onClose}
            size="small"
          >
            <CloseIcon className={classes.buttonIcon} />
            Close
          </Button>
        </div>
        <div className={classes.content}>
          <Grid container xs={12} spacing={1}>
            {/* <Grid item xs={12}>
                      <TextField
                            variant="outlined"
                            margin="dense"
                            fullWidth
                            autoComplete="off"
                            id="vendordeliverydays"
                            name="vendordeliverydays"
                            value={values.name}
                            onChange={handleinputchange('name')}
                           label="Name"
                          />
            </Grid> */}
             <Grid xs={12}>
            <Autocomplete
                  id="combo-box-demo"
                  options={masters.product_categories}
                  margin="dense"
                  fullWidth
                  value={values.product_category}
                  getOptionLabel={(option) => option.name}
                  onChange={handleoptionchange('product_category')}
                  renderInput={(params) => <TextField {...params} label={"Product Category"} fullWidth margin="dense" variant="outlined" />}
                /> 
            </Grid> 
                      
           
            <Grid item xs={12}>
            <Autocomplete
                  
                  id="combo-box-demo"
                  options={masters.product_types}
                  margin="dense"
                  fullWidth
                  value={values.product_type}
                  onChange={handleoptionchange('product_type')}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => <TextField {...params} label={"Product Type"} fullWidth margin="dense" variant="outlined" />}
                /> 
            </Grid> 
           </Grid>
        </div>
        <div className={classes.actions}>
          <Button
            fullWidth
            onClick={handleClear}
            variant="contained"
          >
            <DeleteIcon className={classes.buttonIcon} />
            Clear
          </Button>
          <Button
            color="primary"
            fullWidth
            type="submit"
            variant="contained"
          >
            Apply filters
          </Button>
        </div>
      </form>
    </Drawer>
  );
};

Filter.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  onFilter: PropTypes.func,
  masters : PropTypes.object,
  open: PropTypes.bool.isRequired
};

export default Filter;
