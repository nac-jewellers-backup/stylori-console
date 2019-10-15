import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import SelectPlaceholder from '../../components/SelectPlaceholder.js'
import TextField from '@material-ui/core/TextField';

import {Input} from '../../components/Input.js'
import { ProductContext } from '../../context';
import "./Productupload.css"
import Select from 'react-select';
import "./floating_dropdown.css"

  
  
export default function AddressForm() {
    const { productCtx, setProductCtx } = React.useContext(ProductContext);

    React.useEffect(() => {
    },[productCtx])
    // const handleChange = selectedOption => {
    
    // };
    const handlesizeChange  = selectedOption => {
      setProductCtx({ ...productCtx, selected_sizes: selectedOption })
    };
    const handlevendorChange  = selectedOption => {
      setProductCtx({ ...productCtx, vendorcode: selectedOption})
    };

    const handlechange = type =>  selectedOption => {
      if(type === 'product_type')
      {
          var size = "";
      var minvalue = 0;
      var maxvalue = 0;
      var selected_sizes = [];

      if(selectedOption.shortCode === 'R' && productCtx.selectedgender.name === 'Male')
      {
        minvalue = 13
        maxvalue = 26
      }
      if(selectedOption.shortCode === 'R' && productCtx.selectedgender.name === 'Female')
      {
        minvalue = 8
       maxvalue = 19

      }
      
      for(var i=minvalue; i<maxvalue;i++)
      {
        selected_sizes.push(
          {
            value:i,
            label:""+i
          }
        )
      }
      
      setProductCtx({ ...productCtx, product_type_shortcode: selectedOption.shortCode,product_type:selectedOption, size,selected_sizes })
      }else{
        setProductCtx({ ...productCtx, [type]: selectedOption})

      }
    };
    const handleTextChange = type => e => {
      setProductCtx({ ...productCtx, [type]: e.target.value})

    }
    const handleInputChange = type => e => {

                var size = productCtx.size;
                var materials = productCtx.materials;
                var selected_sizes = productCtx.selected_sizes;

            if(type === 'selectedgender')
                {
                  var minvalue = 0;
                  var maxvalue = 0;
                  selected_sizes=[]
                if(productCtx.product_type_shortcode === 'R' && e.name === 'Male')
                {
                  size = "13-25"
                  minvalue = 13
                  maxvalue = 26
                }
                if(productCtx.product_type_shortcode === 'R' && e.name === 'Female')
                {
                 size = "8-18"
                 minvalue = 8
                  maxvalue = 19

                }

                for(var i=minvalue; i<maxvalue;i++)
                {
                  selected_sizes.push(
                    {
                      value:i,
                      label:""+i
                    }
                  )
                }
              }

              if(type === 'product_categoy')
              {
                  if(e.target.value === 'Platinum Jewellery')
                  {
                    materials.push('Platinum Jewellery')
                    var index = materials.indexOf('Silver Jewellery');

                    if(index >= 0)
                    {
                        materials.splice(index, 1)
                    }
                  }else if(e.target.value === 'Silver Jewellery')
                  {
                    materials.push('Silver Jewellery')
                    var index1 = materials.indexOf('Platinum Jewellery');
                    if(index1 >= 0)
                    {
                      materials.splice(index1, 1)
                    }
                  }else{
                    var indexval = materials.indexOf('Silver Jewellery');

                    if(indexval >= 0)
                    {
                        materials.splice(indexval, 1)
                    }
                    indexval = materials.indexOf('Platinum Jewellery');
                    if(indexval >= 0)
                    {
                      materials.splice(indexval, 1)
                    }
                  }
              }

               setProductCtx({ ...productCtx, size ,[type]: e, materials, selected_sizes })

              
      }


    const materialChange = type => selectedOption => {
      //   let material = { ...productCtx.material, [type]: selectedOption }
        var steps = ['Step1', 'Step2','Step4','Step5','Step6']
      //   if(material.material)
      //   {
      //   material.material.forEach(element => {
        let material_names = []
          if(selectedOption)
          {

            selectedOption.forEach(element => {
              material_names.push(element.name)
              if(element.name === 'Diamond' || element.name === 'Gemstone' )
            {
            
            if(steps.indexOf('Step3') === -1)
            {
              steps = ['Step1', 'Step2','Step3','Step4','Step5','Step6']

            }

          }
            });
            
        }
      //   });
      // }

        setProductCtx({ ...productCtx, [type]:selectedOption, steps,material_names })

    }
    
    
  return (

    <React.Fragment>
    
      <Grid container  spacing={1}>  
      <Grid item xs={12} sm={6} spacing={1}>
                  <Input
                      variant="outlined"
                      margin="dense"
                      fullWidth
                      value={productCtx.productname}
                      id="productname"
                      name="productname"
                      label="Productname"
                      onChange={handleTextChange('productname')}
                      />
       
          </Grid>  
          
          <Grid item xs={12} sm={6} spacing={1}>
            <Box mt={1} >
            <SelectPlaceholder
                    placeholder="Select Product Type"
                    value={productCtx.product_type}
                    placeholderzindex="6"
                    selectzindex="6"
                    placeholderUp={productCtx.product_type ? true : false}

                    onChange={handlechange('product_type')}
                    options={productCtx.masterData.product_type}
                  />
            </Box>      
            </Grid>

            <Grid item xs={12} sm={6}>
                  <SelectPlaceholder
                  value={productCtx.product_categoy}
                    placeholder="Select Product Category"
                    placeholderzindex="6"
                    selectzindex="6"
                    options={productCtx.masterData.category}
                    onChange={handlechange('product_categoy')}
                    placeholderUp={productCtx.product_categoy ? true : false}

                  />
            </Grid>

            
           
            <Grid item xs={12} sm={6}>
                <SelectPlaceholder
                    placeholder="Select Product Materials"
                    isMulti
                    style={{zIndex: 500}}
                    value={productCtx.material}
                    placeholderzindex="5"
                    selectzindex="5"
                    onChange={materialChange('material')}
                    options={productCtx.masterData.material}
                    placeholderUp={productCtx.material ? true : false}

                  />
                             
          

            </Grid>
            
            <Grid item xs={12} sm={6}>
                <Box mt={1} >
            <SelectPlaceholder
                    className="suboverlay"
                    fullWidth
                    value={productCtx.vendorcode}
                    placeholder="Select Vendor Code"
                    onChange={handlevendorChange}
                    placeholderzindex="5"
                    selectzindex="5"
                    placeholderUp={productCtx.vendorcode ? true : false}
                    options={productCtx.masterData.vendorcode}
                  />
                </Box>
            </Grid> 
            <Grid item xs={12} sm={6} spacing={1}>
                    <Input
                      variant="outlined"
                      margin="dense"
                      label="productvendorcode"
                      fullWidth
                      value={productCtx.productvendorcode}
                      id="productvendorcode"
                      name="productvendorcode"
                      onChange={handleTextChange('productvendorcode')}
                      />
          </Grid>
          <Grid item xs={12} sm={6}>
            
                <Box mt={1} >
            <SelectPlaceholder
           
                    placeholder="Earring Backing"
                    value={productCtx.earringbacking}
                    options={productCtx.masterData.earringbacking}
                    onChange={handleInputChange('earringbacking')}
                    placeholderzindex="4"
                    selectzindex="4"
                    placeholderUp={productCtx.earringbacking ? true : false}
                  />
                </Box>
            </Grid>        
            <Grid item xs={12} sm={6}>
            
                <Box mt={1} >
            <SelectPlaceholder
                    placeholder="Select Gender"
                    value={productCtx.selectedgender}
                    placeholderzindex="3"
                    selectzindex="3"
                    options={productCtx.masterData.gender}
                    onChange={handleInputChange('selectedgender')}
                    placeholderUp={productCtx.selectedgender ? true : false}
                  />
                </Box>
            </Grid>

            <Grid item xs={12} sm={6} spacing={1}>
                <Box mt={1} >
                <SelectPlaceholder
                        isMulti
                        isDisabled = {!['BA','R','BR'].includes(productCtx.product_type_shortcode)}
                        placeholder="Select Product Size"
                        onChange={handlesizeChange}
                        placeholderzindex="2"
                       selectzindex="2"
                        placeholderUp={productCtx.selected_sizes.length ? true : false}
                        value={productCtx.selected_sizes}
                        options={productCtx.sizes}
                      />
                </Box>      
                </Grid>
        
      </Grid>
    </React.Fragment>
  );
}