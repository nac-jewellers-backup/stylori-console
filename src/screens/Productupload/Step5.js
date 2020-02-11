import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import SelectPlaceholder from '../../components/SelectPlaceholder.js'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';

import {
  Card,
  CardHeader,
  Divider,
  Chip,
  TextField,
CardContent} from '@material-ui/core';
import { ProductContext } from '../../context';
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
}));

export default function Review(props) {
  const classes = useStyles();

  const { productCtx, setProductCtx } = React.useContext(ProductContext);
  const { className, ...rest } = props;
  console.log(productCtx,'step5 value')
  const handleChange = type => (event, value) => {
    setProductCtx({ ...productCtx, [type]: value  })

  };
 
  
  return (
    <React.Fragment>
         <Card
  {...rest}
  className={clsx(classes.root, className)}
>
  <CardHeader title="Type of Fit" />
  <Divider />
  <CardContent className={classes.cardcontent}>
    <Grid container xs={12} sm={12} spacing={2}>
    <Grid item xs={6} sm={4} >
                   
                      
           <Autocomplete
                      id="product_category"
                      multiple
                      className={classes.fixedTag}
                      defaultValue={productCtx.themes}
                      onChange={handleChange('themes')}
                      options={productCtx.masterData.themes.map(option => option.label)}
                      renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip variant="outlined" size="small" label={option} {...getTagProps({ index })} />
                      ))
                    }
                    renderInput={params => (
                      <TextField
                        {...params}
                        label="Select Themes"
                        margin="dense"
                        variant="outlined"
                        fullWidth

                        InputProps={{ ...params.InputProps, type: 'search' }}
                      />
                    )}
                  />
           
           
            </Grid>
   
    <Grid item xs={12} sm={4}>
                     
    

              <Autocomplete
                      id="product_category"
                      multiple
                      className={classes.fixedTag}
                      defaultValue={productCtx.prod_styles}
                      onChange={handleChange('prod_styles')}
                      options={productCtx.masterData.styles.map(option => option.label)}
                      renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip variant="outlined" size="small" label={option} {...getTagProps({ index })} />
                      ))
                    }
                    renderInput={params => (
                      <TextField
                        {...params}
                        label="Style"
                        margin="dense"
                        variant="outlined"
                        fullWidth

                        InputProps={{ ...params.InputProps, type: 'search' }}
                      />
                    )}
                  />
    </Grid>
    <Grid item xs={12} sm={4}>
      
    
          <Autocomplete
                      id="product_category"
                      multiple
                      className={classes.fixedTag}
                      defaultValue={productCtx.occassions}
                      onChange={handleChange('occassions')}
                      options={productCtx.masterData.occasions.map(option => option.label)}
                      renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip variant="outlined" size="small" label={option} {...getTagProps({ index })} />
                      ))
                    }
                    renderInput={params => (
                      <TextField
                        {...params}
                        label="Occasions"
                        margin="dense"
                        variant="outlined"
                        fullWidth

                        InputProps={{ ...params.InputProps, type: 'search' }}
                      />
                    )}
                  />
    </Grid>
    <Grid item xs={12} sm={4}>
  
   

                  <Autocomplete
                      id="product_category"
                      multiple
                      className={classes.fixedTag}
                      defaultValue={productCtx.collections}
                      onChange={handleChange('collections')}
                      options={productCtx.masterData.collections.map(option => option.label)}
                      renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip variant="outlined" size="small" label={option} {...getTagProps({ index })} />
                      ))
                    }
                    renderInput={params => (
                      <TextField
                        {...params}
                        label="Collections"
                        margin="dense"
                        variant="outlined"
                        fullWidth
                        InputProps={{ ...params.InputProps, type: 'search' }}
                      />
                    )}
                  />
    </Grid>
    <Grid item xs={12} sm={4} >
    
                  <Autocomplete
                      id="product_category"
                      multiple
                      className={classes.fixedTag}
                      defaultValue={productCtx.stonecount}
                      onChange={handleChange('stonecount')}
                      options={productCtx.masterData.stones.map(option => option.label)}
                      renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip variant="outlined" size="small" label={option} {...getTagProps({ index })} />
                      ))
                    }
                    renderInput={params => (
                      <TextField
                        {...params}
                        label="Collections"
                        margin="dense"
                        variant="outlined"
                        fullWidth
                        InputProps={{ ...params.InputProps, type: 'search' }}
                      />
                    )}
                  />
    </Grid>
    <Grid item xs={12} sm={4}>
    
  

<Autocomplete
                      id="product_category"
                      multiple
                      className={classes.fixedTag}
                      defaultValue={productCtx.stonecolour}
                      onChange={handleChange('stonecolour')}
                      options={productCtx.masterData.gemstonecolor.map(option => option.label)}
                      renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip variant="outlined" size="small" label={option} {...getTagProps({ index })} />
                      ))
                    }
                    renderInput={params => (
                      <TextField
                        {...params}
                        label="Collections"
                        margin="dense"
                        variant="outlined"
                        fullWidth
                        InputProps={{ ...params.InputProps, type: 'search' }}
                      />
                    )}
                  />
    </Grid>
    
    
    </Grid>
    
        <Grid item xs={6} >
        </Grid>
        </CardContent>
        </Card>
 </React.Fragment>
  );
}