import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
  import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Select from 'react-select';
import {Input} from '../../components/Input.js'
import FormGroup from '@material-ui/core/FormGroup';
import { ProductContext } from '../../context';
import Box from '@material-ui/core/Box';

import "./Productupload.css"





export default function PaymentForm() {

  const { productCtx, setProductCtx } = React.useContext(ProductContext);
  const handleInputChange = type => e => {
    setProductCtx({ ...productCtx, [type]: e.target.value  })
  }
  const materialChange = type => e => {
    let selected_metal_colour = { ...productCtx.selected_metal_colour, [type]: e.target.checked }
    setProductCtx({ ...productCtx, selected_metal_colour })
    }
  const purityChange = type => selectedOption => {
    setProductCtx({ ...productCtx, [type]:selectedOption })

  }

  return (
    <React.Fragment>
      

      <Grid container spacing={1}>
      <Grid item xs={6} sm={3}>
      {/* <FormLabel component="legend" >Product Code</FormLabel> */}
                  <Input
                      variant="outlined"
                      margin="dense"
                      fullWidth
                      disabled
                      id="size"
                      onChange={handleInputChange('product_code')}
                      name="size"
                      value={"S"+productCtx.product_type_shortcode+(productCtx.masterData.productseries[0].value+1)}
                      
                      />
      </Grid>
      
     <Grid item xs={6} sm={3}>      
          {/* <FormLabel component="legend" >Material Purity</FormLabel> */}
           <Box mt={1} >         
          <Select
                    isMulti
                    value = {productCtx.metalpurity}
                    className="masteroverlay"
                    placeholder="Metal Purity"
                    onChange={purityChange('metalpurity')}
                    options={productCtx.masterData.metalpurity}
                  />
          </Box>          
          
    </Grid>
    

    <Grid item xs={6} sm={3}>
      
      
      {/* <FormLabel component="legend" >Metal Colour</FormLabel> */}
       <Box mt={1} >         
      <Select
                isMulti
                value = {productCtx.metalcolour}

                className="masteroverlay"
                placeholder="Metal Colour"
                onChange={purityChange('metalcolour')}
                options={productCtx.masterData.metalcolour}
              />
      </Box>          
      
</Grid>
<Grid item xs={3} >

<Input
    variant="outlined"
    margin="dense"
    fullWidth
    id="size"
    label="Default Size For Price"
    name="size"
    autoComplete="size"
    onChange = {handleInputChange('default_size')}
    value={productCtx.default_size}
    
    />
</Grid>
      
     <Grid item xs={3} >

      <Input
          variant="outlined"
          margin="dense"
          fullWidth
          id="size"
          label="Weight For Default Size"
          name="size"
          autoComplete="size"
          onChange = {handleInputChange('metal_weight')}
          value={productCtx.metal_weight}
          
          />
    </Grid>
    <Grid item xs={3} >

      <Input
          variant="outlined"
          margin="dense"
          fullWidth
          id="size"
          label="Height"
          name="size"
          autoComplete="size"
          onChange = {handleInputChange('metal_height')}
          value={productCtx.metal_height}
          
          />
    </Grid>

    <Grid item xs={3} >

      <Input
          variant="outlined"
          margin="dense"
          fullWidth
          id="size"
          label="Width"
          name="size"
          onChange = {handleInputChange('metal_width')}
          value={productCtx.metal_width}
          autoComplete="size"
          
          />
    </Grid>
    <Grid item xs={3} >

      <Input
          variant="outlined"
          margin="dense"
          fullWidth
          id="size"
          label="Length"
          name="size"
          autoComplete="size"
          onChange = {handleInputChange('metal_length')}
          value={productCtx.metal_length}
          
          />
    </Grid>
           
        
      </Grid>
    </React.Fragment>
  );
}