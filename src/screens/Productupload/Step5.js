import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import SelectPlaceholder from '../../components/SelectPlaceholder.js'

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
                   
                          <SelectPlaceholder
                          placeholder="Themes"
                          isMulti
                          value={productCtx.themes}
                          onChange={handleChange('themes')}
                          options={productCtx.masterData.themes}
                          placeholderzindex="8"
                          selectzindex="8"
                           placeholderUp={productCtx.themes.length ? true : false} />
            </Grid>
   
    <Grid item xs={12} sm={4}>
                     
    <SelectPlaceholder
        placeholder="Style"
        isMulti
        value={productCtx.prod_styles}
        onChange={handleChange('prod_styles')}
        options={productCtx.masterData.styles}
        placeholderzindex="7"
        selectzindex="7"
         placeholderUp={productCtx.prod_styles.length ? true : false}
      />
    </Grid>
    <Grid item xs={12} sm={4}>
      
    <SelectPlaceholder
        placeholder="Occasions"
        isMulti
        value={productCtx.occassions}
        onChange={handleChange('occassions')}
        options={productCtx.masterData.occasions}
        placeholderzindex="6"
        selectzindex="6"
         placeholderUp={productCtx.occassions.length ? true : false}
      />
    </Grid>
    <Grid item xs={12} sm={4}>
  
    <SelectPlaceholder
        placeholder="Collections"
        isMulti
        value={productCtx.collections}
        onChange={handleChange('collections')}
        options={productCtx.masterData.collections}
        placeholderzindex="5"
        selectzindex="5"
         placeholderUp={productCtx.collections.length ? true : false}
      />
    </Grid>
    <Grid item xs={12} sm={4} >
    
    <SelectPlaceholder
        placeholder="Number of stones"
        value={productCtx.stonecount}
        onChange={handleChange('stonecount')}
        options={productCtx.masterData.stones}
        placeholderzindex="4"
        selectzindex="4"
       placeholderUp={productCtx.stonecount ? true : false}
      />
    </Grid>
    <Grid item xs={12} sm={4}>
    
    <SelectPlaceholder
        placeholder="Stone Colour"
        value={productCtx.stonecolour}
        onChange={handleChange('stonecolour')}
        isMulti
        options={productCtx.masterData.gemstonecolor}
        placeholderzindex="3"
        selectzindex="3"
         placeholderUp={productCtx.stonecolour.length ? true : false}
      />
    </Grid>
    
    
    </Grid>
    
        <Grid item xs={6} >
        </Grid>
 </React.Fragment>
  );
}