import React from 'react';
import clsx from 'clsx';
import { makeStyles,useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

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
import SelectPlaceholder from '../../components/SelectPlaceholder.js';
import Autocomplete from '@material-ui/lab/Autocomplete';

import {
  Card,
  CardHeader,
  Divider,
CardContent} from '@material-ui/core';
  const useStyles = makeStyles(theme => ({
    root: {
      marginTop: theme.spacing(2)
    },
    fixedTag: {
      padding: 0,
      '& .MuiOutlinedInput-root':{
        padding: 0,
      }
    },
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
export default function Review(props) {
  const classes = useStyles();
  const { className, ...rest } = props;

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
<Card
  {...rest}
  className={clsx(classes.root, className)}
>
  <CardHeader title="Default SKU For Display
" />
  <Divider />
  <CardContent className={classes.cardcontent}>
    <Grid container xs={12} alignItems="center" spacing={2}>
    
    
    
    
    <Grid item xs={4} >

                  
                

                  <Autocomplete
                      id="product_category"
                      className={classes.fixedTag}
                      defaultValue={productCtx.default_metal_colour}
                      onChange={handleChange('default_metal_colour')}
                      options={productCtx.metalcolour}
                      renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip variant="outlined" size="small" label={option} {...getTagProps({ index })} />
                      ))
                    }
                    renderInput={params => (
                      <TextField
                        {...params}
                        label="Metal Colour"
                        margin="dense"
                        variant="outlined"
                        fullWidth

                        InputProps={{ ...params.InputProps, type: 'search' }}
                      />
                    )}
                  />
    </Grid>
    <Grid item xs={4} >
           

                <Autocomplete
                      id="product_category"
                      multiple
                      className={classes.fixedTag}
                      defaultValue={productCtx.default_metal_purity}
                      onChange={handleChange('default_metal_purity')}
                      options={productCtx.metalpurity}
                      renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip variant="outlined" size="small" label={option} {...getTagProps({ index })} />
                      ))
                    }
                    renderInput={params => (
                      <TextField
                        {...params}
                        label="Metal Purity"
                        margin="dense"
                        variant="outlined"
                        fullWidth

                        InputProps={{ ...params.InputProps, type: 'search' }}
                      />
                    )}
                  />
   
    </Grid>
    {['BA','R','BR'].includes(productCtx.product_type_shortcode) ? 
    <Grid item xs={4} >
           

                  <Autocomplete
                      id="product_category"
                      multiple
                      isDisabled 
                      className={classes.fixedTag}
                      defaultValue={productCtx.default_metal_size}
                      onChange={handleChange('default_metal_size')}
                      options={productCtx.selected_sizes}
                      renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip variant="outlined" size="small" label={option} {...getTagProps({ index })} />
                      ))
                    }
                    renderInput={params => (
                      <TextField
                        {...params}
                        label="Default Size"
                        margin="dense"
                        variant="outlined"
                        fullWidth

                        InputProps={{ ...params.InputProps, type: 'search' }}
                      />
                    )}
                  />
   
    </Grid> : null}
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
        </CardContent>
        </Card>
 </React.Fragment>
  );
}