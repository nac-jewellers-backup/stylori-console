import React from 'react';
import clsx from 'clsx';
import { makeStyles,useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import {Input} from '../../components/Input.js'
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from 'react-select';
import Chip from '@material-ui/core/Chip';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { ProductContext } from '../../context';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import InputLabel from '@material-ui/core/InputLabel';
import Multiselect from '../../components/Select';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

  const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1),
    },
    leftIcon: {
      marginRight: theme.spacing(1),
    },
    rightIcon: {
      marginLeft: theme.spacing(1),
    },
    iconSmall: {
      fontSize: 20,
    },
  }));
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];
export default function Review() {
  const classes = useStyles();
  const theme = useTheme();
  const inputLabel = React.useRef(null);


  const { productCtx, setProductCtx, masterData } = React.useContext(ProductContext);
  const handleInputChange = type => e => {
    setProductCtx({ ...productCtx, [type]: e.target.value  })
  }
  const handleChange = type => selectedOption => {
    setProductCtx({ ...productCtx, [type]: selectedOption  })
  };
  const handlemetalcolorChange = selectedOption => {
    setProductCtx({ ...productCtx, metal_color: selectedOption  })
  };
  const handlediamndcolorChange = selectedOption => {
    setProductCtx({ ...productCtx, diamond_colour: selectedOption  })
  };
  const handlediamndclarityChange = selectedOption => {
    setProductCtx({ ...productCtx, diamond_clarity: selectedOption  })
  };

  const handlemetalpurityChange = selectedOption => {
    setProductCtx({ ...productCtx, metal_purity: selectedOption  })
  };
  function handleClick(e) {
    var metalsarr  = productCtx.metals;
    metalsarr.push("test") 
    setProductCtx({ ...productCtx, metals: metalsarr })
  }
  return (
    <React.Fragment>
    <Grid container xs={12} spacing={2}>
    
    <Grid item xs={12} sm={4} >
    <TextField fullWidth
        label="Vendor Code"
        id="simple-start-adornment"
        variant="outlined"
        margin="dense"
        value={productCtx.vendorcode.shortCode}
        className={clsx(classes.margin, classes.textField)}
        
      />
    </Grid>
    
    <Grid item xs={12} sm={4}>
    <TextField fullWidth
        label="Vendor Lead Time"
        id="simple-start-adornment"
        variant="outlined"
        margin="dense"
        value={productCtx.vendorcode.vendorDelivaryDays}
        className={clsx(classes.margin, classes.textField)}
        InputProps={{
          endAdornment: <InputAdornment position="start">In Days</InputAdornment>,
        }}
      />
    </Grid>
    <Grid item xs={12} sm={4} >
                  <Select
                    value={productCtx.isreorder}
                    placeholder="Re Orderable"
                    onChange={handleChange('isreorder')}
                    options={[{value:'Yes',label:'Yes'},{value:'No',label:'No'}]}
                  />
    </Grid>
    <Grid item xs={12} >
    <Typography component="h6" variant="h6" align="left">
            Default SKU For Display
          </Typography> 
    </Grid>
    <Grid item xs={4} >

                  
                  <Select
                    value={productCtx.default_metal_colour}
                    placeholder="Metal Colour"
                    onChange={handleChange('default_metal_colour')}
                    options={productCtx.metalcolour}
                  />
    </Grid>
    <Grid item xs={4} >
              <Select
                    value={productCtx.default_metal_purity}
                    placeholder="Metal Purity"
                    onChange={handleChange('default_metal_purity')}
                    options={productCtx.metalpurity}
                  />
   
    </Grid>
    <Grid item xs={4} >
              <Select
                    value={productCtx.default_metal_size}
                    placeholder="Size"
                    onChange={handleChange('default_metal_size')}
                    options={productCtx.selected_sizes}
                  />
   
    </Grid>
    {/* <Grid item xs={3} >
                <Select
                    value={productCtx.diamond_colour}
                    placeholder="Diamond Colour"
                    onChange={handlediamndcolorChange}
                    options={productCtx.masterData.diamondcolors}
                  />
   
    </Grid>
    <Grid item xs={3} >
    <Select
                    value={productCtx.diamond_clarity}
                    placeholder="Diamond Clarity"
                    onChange={handlediamndclarityChange}
                    options={productCtx.masterData.diamondclarities}
                  />

    </Grid>                 */}
    
    
    
    </Grid>
    
        <Grid item xs={6} >
        </Grid>
 </React.Fragment>
  );
}