import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import Select from 'react-select';

import { ProductContext } from '../../context';

export default function Review() {
  const { productCtx, setProductCtx } = React.useContext(ProductContext);

  const handleChange = type => selectedOption => {
    setProductCtx({ ...productCtx, [type]: selectedOption  })

  };
 
  
  return (
    <React.Fragment>
    <Grid container xs={12} sm={12} spacing={2}>
    <Grid item xs={6} sm={4} >
                    <FormLabel component="legend" >Theme</FormLabel>
                    <Box mt={1} > 
                          <Select
                          placeholder=""
                          isMulti
                          value={productCtx.themes}
                          onChange={handleChange('themes')}
                          options={productCtx.masterData.themes} />
                         </Box>                        
            </Grid>
   
    <Grid item xs={12} sm={4}>
          <FormLabel component="legend">Style</FormLabel>
          <Box mt={1} >            
    <Select
        placeholder=""
        isMulti
        value={productCtx.prod_styles}
        onChange={handleChange('prod_styles')}
        options={productCtx.masterData.styles}
      />
      </Box>
    </Grid>
    <Grid item xs={12} sm={4}>
          <FormLabel component="legend">Ocassion</FormLabel>
          <Box mt={1} > 
    <Select
        placeholder=""
        isMulti
        value={productCtx.occassions}
        onChange={handleChange('occassions')}
        options={productCtx.masterData.occasions}
      />
      </Box>
    </Grid>
    <Grid item xs={12} sm={4}>
    <FormLabel component="legend" >Collection</FormLabel>
    <Box mt={1} > 
    <Select
        placeholder=""
        isMulti
        value={productCtx.collections}
        onChange={handleChange('collections')}
        options={productCtx.masterData.collections}
      />
      </Box>
    </Grid>
    <Grid item xs={12} sm={4} >
    <FormLabel component="legend" ># of Stones</FormLabel>
    <Box mt={1} > 
    <Select
        placeholder=""
        value={productCtx.stonecount}
        onChange={handleChange('stonecount')}
        options={productCtx.masterData.stones}
      />
      </Box>
    </Grid>
    <Grid item xs={12} sm={4}>
    <FormLabel component="legend" >Gemstone Colour</FormLabel>
    <Box mt={1} > 
    <Select
        placeholder=""
        value={productCtx.stonecolour}
        onChange={handleChange('stonecolour')}
        isMulti
        options={productCtx.masterData.gemstonecolor}
      />
      </Box>
    </Grid>
    
    
    </Grid>
    
        <Grid item xs={6} >
        </Grid>
 </React.Fragment>
  );
}