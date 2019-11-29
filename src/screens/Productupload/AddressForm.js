import React,{ useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import clsx from 'clsx';

// import SelectPlaceholder from '../../components/SelectPlaceholder.js'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/styles';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import {Input} from '../../components/Input.js'
import { ProductContext } from '../../context';
import "./Productupload.css"
import Select from 'react-select';
import "./floating_dropdown.css"
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  Card,
  CardHeader,
  Chip,
  CardContent,
  Divider,
  RadioGroup,
  Radio,
  FormLabel,
  FormControlLabel,
  Checkbox
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 }
]
const useStyles = makeStyles(theme => ({
  fixedTag: {
    padding: 0,
    '& .MuiOutlinedInput-root':{
      padding: 0,
    }
  },
  dropdownlayout: {
    '& .menu':{
      position: "Relative !important",
    }
  },
  helperinput: {
    '& .MuiFormHelperText-root':{
      color: "#e53935",
    }
  },
  
  root: {
    marginTop: theme.spacing(2)
  },
  alert: {
    marginBottom: theme.spacing(3)
  },
  formGroup: {
    marginBottom: theme.spacing(3)
  },
  fieldGroup: {
    display: 'flex',
    alignItems: 'center'
  },
  fieldHint: {
    margin: theme.spacing(1, 0)
  },
  tags: {
    marginTop: theme.spacing(1),
    '& > * + *': {
      marginLeft: theme.spacing(1)
    }
  },
  flexGrow: {
    flexGrow: 1
  },
  dateField: {
    '& + &': {
      marginLeft: theme.spacing(2)
    }
  }
}));

  
export default function AddressForm(props) {
    const { productCtx, setProductCtx } = React.useContext(ProductContext);
    const classes = useStyles();
    const { className, ...rest } = props;

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
   
    const changeproducttype = type => (event, newvalue) => {
      setProductCtx({ ...productCtx, product_type: newvalue})

    }
    const handlechange = type =>  selectedOption => {
      if(type === 'product_type')
      {
        if(selectedOption)
        {
          var size = "";
      var minvalue = 0;
      var maxvalue = 0;
      var selected_sizes = [];
      var default_size = 0;

      if(selectedOption.shortCode === 'R' && productCtx.selectedgender.name === 'Male')
      {
        minvalue = 13
        maxvalue = 25
        default_size = 15
      }
      if(selectedOption.shortCode === 'R' && productCtx.selectedgender.name === 'Female')
      {
        minvalue = 8
       maxvalue = 23
       default_size = 12
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
      
      setProductCtx({ ...productCtx, product_type_shortcode: selectedOption.shortCode,product_type:selectedOption, size,default_size,selected_sizes })
        }else{
          setProductCtx({ ...productCtx, product_type_shortcode: "",product_type:"", size,selected_sizes: "" })

        }  
    }else{
        setProductCtx({ ...productCtx, [type]: selectedOption})

      }
    };
    const handleTextChange = type => e => {
      setProductCtx({ ...productCtx, [type]: e.target.value})

    }
    const handleoptionChange = type => (event, value) => {
      if(type === 'vendorcode')
      {
        setProductCtx({ ...productCtx, [type]: value,'vendorleadtime':value.vendorDelivaryDays})

      }else
      {
        setProductCtx({ ...productCtx, [type]: value})

      }

    }


    const handleChange = event => {
    
        setProductCtx({ ...productCtx, ['isreorderable']: event.target.value})

     

    };


    const purityChange = type => selectedOption => {
      setProductCtx({ ...productCtx, [type]:selectedOption })
  
    }
 

    const handleGenderChange = type => (event, value)  => {
      var minvalue = 0;
      var maxvalue = 0;
      var selected_sizes=[]
      var sizes = [];
      var default_size = 0
      var selected_sizes = productCtx.selected_sizes;
    if(productCtx.product_type === 'Rings' && value === 'Male')
    {
      minvalue = 13
      maxvalue = 25
      default_size = ''+15
    }
    if(productCtx.product_type === 'Rings' && value === 'Female')
    {
     minvalue = 8
      maxvalue = 23
      default_size = ''+12

    }

    for(var i=minvalue; i<maxvalue;i++)
    {
      selected_sizes.push(
        ''+i
      )
      sizes.push(
        ''+i
      )
    }
    alert(default_size)
    setProductCtx({ ...productCtx,  [type]: value,sizes, selected_sizes,default_size })

    }



    const handleMaterialChange = type => (event, value)  => {
      var steps = ['Step1', 'Step2','Step4','Step5','Step6']
      if(value)
      {
      if(value.indexOf('Diamond' ) > -1 || value.indexOf('Gemstone' ) > -1 )
            {
            
            if(steps.indexOf('Step3') === -1)
            {
              steps = ['Step1', 'Step2','Step3','Step6']

            }

          }
        }
      setProductCtx({ ...productCtx, [type]:value,steps})

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
              steps = ['Step1', 'Step2','Step3','Step6']

            }

          }
            });
            
        }
      //   });
      // }

        setProductCtx({ ...productCtx, [type]:selectedOption, steps,material_names })

    }
    
    
  return (
    <>
    <div>
    <Grid container  spacing={1}>  
    <Grid item xs={12} sm={6} spacing={1}>

      <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader title="Product Information 1" />
      <Divider />
      <CardContent className={classes.cardcontent}>
      <Grid container  spacing={1}>  
      <Grid item xs={12} sm={12} spacing={1}>
                      <Input
                          className={classes.helperinput}
                          variant="outlined"
                          margin="dense"
                          fullWidth
                          value={productCtx.productname}
                          id="productname"
                          error = {productCtx.error_message.productname}
                         // helperText={productCtx.error_message.productname ? productCtx.error_message.productname : "" }
                          name="productname"
                          label="Product Name"
                          onChange={handleTextChange('productname')}
                          />
          
      </Grid> 
            <Grid item   className={'dropdownlayout'} xs={12} sm={6}>
                  <Autocomplete
                      id="product_category"
                      className={classes.fixedTag}
                      defaultValue={productCtx.product_categoy}
                      onChange={handleoptionChange('product_categoy')}
                      options={productCtx.masterData.category.map(option => option.label)}
                      renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip variant="outlined" label={option.label} {...getTagProps({ index })} />
                      ))
                    }
                    renderInput={params => (
                      <TextField
                        {...params}
                        label="Select Product Category"
                        margin="dense"
                        error = {productCtx.error_message.product_categoy}
                        variant="outlined"
                        fullWidth

                        InputProps={{ ...params.InputProps, type: 'search' }}
                      />
                    )}
                  />

            </Grid>
      <Grid    item xs={12} sm={6} spacing={1}>
            
                  <Autocomplete
                    id="product_type"
                    className={classes.fixedTag}
                    defaultValue={productCtx.product_type}
                    options={productCtx.masterData.product_type.map(option => option.label)}
                    onChange={handleoptionChange('product_type')}
                    
                    renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                    <Chip variant="outlined" label={option.label} {...getTagProps({ index })} />
                    ))
                    }
                    renderInput={params => (
                    <TextField
                    {...params}
                    label="Select Product Type"
                    margin="dense"
                    variant="outlined"
                    error = {productCtx.error_message.product_type}
                    fullWidth

                    InputProps={{ ...params.InputProps, type: 'search' }}
                    />
                    )}
                  />
            </Grid>

     
          
      </Grid>
      </CardContent>
      </Card>
      </Grid>
      <Grid item xs={12} sm={6}>

      { productCtx.product_type ? <>
      <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader title="Product Information 2" />
      <Divider />
      <CardContent className={classes.cardcontent}>
      <Grid container spacing={1}>   
      { productCtx.product_type ? <>              
              <Grid item xs={12} sm={6}>
  
                  <Autocomplete
                      id="free-solo-2-demo"
                      multiple
                      className={classes.fixedTag}
                      defaultValue={productCtx.material_names}
                      options={productCtx.masterData.material.map(option => option.label)}
                      onChange={handleMaterialChange('material_names')}

                      renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                      <Chip variant="outlined" size="small" label={option} {...getTagProps({ index })} />
                      ))
                      }
                      renderInput={params => (
                      <TextField
                      {...params}
                      label="Select Product Materials"
                      margin="dense"
                      variant="outlined"
                      error = {productCtx.error_message.material_names}
                      fullWidth
  
                      InputProps={{ ...params.InputProps, type: 'search' }}
                      />
                      )}
                      />
              </Grid>
           
          
  
          
  
                </> : null } 
                <Grid item xs={12} sm={6}>
                         <Autocomplete
                    id="free-solo-2-demo"
                    className={classes.fixedTag}
                    defaultValue={productCtx.selectedgender}
                    options={productCtx.masterData.gender.map(option => option.label)}
                    onChange={handleGenderChange('selectedgender')}

                    renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                    <Chip variant="outlined" size="small" label={option} {...getTagProps({ index })} />
                    ))
                    }
                    renderInput={params => (
                    <TextField
                    {...params}
                    label="Select Gender"
                    margin="dense"
                    error = {productCtx.error_message.selectedgender}

                    variant="outlined"
                    fullWidth

                    InputProps={{ ...params.InputProps, type: 'search' }}
                    />
                    )}
                    />
                  {/* <FormHelperText error>{productCtx.error_message.selectedgender ? productCtx.error_message.earringbacking : ""}</FormHelperText> */}

            </Grid>  
      <Grid item xs={6} sm={6}>      
                  <Autocomplete
                    multiple
                    id="free-solo-2-demo"
                    className={classes.fixedTag}
                    defaultValue={productCtx.metalpurity}
                    options={productCtx.masterData.metalpurity.map(option => option.label)}
                    onChange={handleoptionChange('metalpurity')}
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
                    error = {productCtx.error_message.metalpurity}
                    InputProps={{ ...params.InputProps, type: 'search' }}
                    />
                    )}
                    />
                {/* <FormHelperText error>{productCtx.error_message.material ? productCtx.error_message.material : ""}</FormHelperText> */}
          
        </Grid>
        <Grid item xs={6} sm={6}>
      
                <Autocomplete
                    multiple
                    id="free-solo-2-demo"
                    className={classes.fixedTag}
                    defaultValue={productCtx.metalcolour}
                    options={productCtx.masterData.metalcolour.map(option => option.label)}
                    onChange={handleoptionChange('metalcolour')}
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
                    error = {productCtx.error_message.metalcolour}
                    fullWidth
                    InputProps={{ ...params.InputProps, type: 'search' }}
                    />
                    )}
                    />
      
</Grid>
      
        </Grid>
      </CardContent>
      </Card>
      </> : null}
</Grid>
</Grid>
<Grid container  spacing={1}>  

<Grid item xs={12} sm={6}>
{ productCtx.product_type ? <>
  <Card
  {...rest}
  className={clsx(classes.root, className)}
>
  <CardHeader title="Vendor Information" />
  <Divider />
  <CardContent className={classes.cardcontent}>
      <Grid container  spacing={1}>  
      <Grid item xs={12} sm={6}>
                  <Autocomplete
                    id="free-solo-2-demo"
                    className={classes.fixedTag}
                    defaultValue={productCtx.vendorcode}
                    getOptionLabel={option => option.label}
                    options={productCtx.masterData.vendorcode}
                    onChange={handleoptionChange('vendorcode')}
                    renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                    <Chip variant="outlined" label={option.label} {...getTagProps({ index })} />
                    ))
                    }
                    renderInput={params => (
                    <TextField
                    {...params}
                    label="Select Vendor Code"
                    margin="dense"
                    variant="outlined"
                    error = {productCtx.error_message.vendorcode}
                    fullWidth
                    InputProps={{ ...params.InputProps, type: 'search' }}
                    />
                    )}
                    />
            </Grid> 
            <Grid item xs={12} sm={6} spacing={1}>
                    <Input
                      variant="outlined"
                      margin="dense"
                      label="Vendor Product Code"
                      fullWidth
                      className={classes.helperinput} 
                      value={productCtx.productvendorcode}
                      error = {productCtx.error_message.productvendorcode}
                      id="productvendorcode"
                      name="productvendorcode"
                      onChange={handleTextChange('productvendorcode')}
                      />

          </Grid>
          <Grid item xs={12} sm={6} spacing={1}>
                    <Input
                      variant="outlined"
                      margin="dense"
                      label="Vendor Lead Time"
                      fullWidth
                      className={classes.helperinput} 
                      error = {productCtx.error_message.vendorleadtime}
                      value={productCtx.vendorleadtime}
                      InputLabelProps={{ shrink: productCtx.vendorleadtime }}
                      id="vendorleadtime"
                      name="vendorleadtime"
                      onChange={handleTextChange('vendorleadtime')}
                      />

          </Grid>
          <Grid item xs={12} sm={6} spacing={1}>

          <FormControl component="fieldset">
          <FormLabel component="legend">IsReorderable</FormLabel>
          <RadioGroup aria-label="position" name="position" value={productCtx.isreorderable} onChange={handleChange} row>
            <FormControlLabel
              value="Yes"
              
              control={<Radio color="primary" 
               />}
              label="Yes"
              labelPlacement="right"
            />
            <FormControlLabel
              value="No"
              control={<Radio  color="primary" />}
              label="No"
              labelPlacement="right"
            />
            </RadioGroup>
            </FormControl>
      </Grid>
      </Grid>
      </CardContent>
      </Card> </>: null}



   </Grid>
    <Grid item xs={12} sm={6}>
    <Grid container  spacing={1}> 
    <Grid item xs={12} sm={12}>

{ productCtx.product_type ? 

  <Card
    {...rest}
    className={clsx(classes.root, className)}
  >
    <CardHeader title="Default SKU For Display
  " />
    <Divider />
    <CardContent className={classes.cardcontent}>
      <Grid container xs={12} alignItems="center" spacing={2}>
      
      
      
      
      <Grid item xs={6} >
  
                    
                  
  
                    <Autocomplete
                        id="product_category"
                        className={classes.fixedTag}
                        defaultValue={productCtx.default_metal_colour}
                        onChange={handleoptionChange('default_metal_colour')}
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
                          error = {productCtx.error_message.default_metal_colour}
  
                          InputProps={{ ...params.InputProps, type: 'search' }}
                        />
                      )}
                    />
      </Grid>
      <Grid item xs={6} >
             
  
                  <Autocomplete
                        id="product_category"
                        multiple
                        className={classes.fixedTag}
                        defaultValue={productCtx.default_metal_purity}
                        onChange={handleoptionChange('default_metal_purity')}
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
                          error = {productCtx.error_message.default_metal_purity}
                          variant="outlined"
                          fullWidth
  
                          InputProps={{ ...params.InputProps, type: 'search' }}
                        />
                      )}
                    />
     
      </Grid>
      </Grid>
      </CardContent>
      </Card> : null }
      
    </Grid>
    </Grid> 
    <Grid item xs={12} sm={12}>

    {(productCtx.product_type && productCtx.product_type  === 'Rings') ? <>
  <Card
  {...rest}
  className={clsx(classes.root, className)}
>
  <CardHeader title="Size Information" />
  <Divider />
  <CardContent className={classes.cardcontent}>
      <Grid container spacing={1}> 
      <Grid item xs={6} >
               
               <Autocomplete
                       id="free-solo-2-demo"
                       multiple
                       freeSolo
                       className={classes.fixedTag}
                       defaultValue={productCtx.selected_sizes}
                       options={productCtx.sizes}
                       onChange={handleoptionChange('selected_sizes')}
                       renderTags={(value, getTagProps) =>
                       value.map((option, index) => (
                       <Chip variant="outlined" size="small" label={option} {...getTagProps({ index })} />
                       ))
                       }
                       renderInput={params => (
                       <TextField
                       {...params}
                       label="Ring Sizes"
                       margin="dense"
                       variant="outlined"
                       fullWidth
                       error = {productCtx.error_message.selected_sizes}

                       InputProps={{ ...params.InputProps, type: 'search' }}
                       />
                       )}
                       />
               </Grid> 


               <Grid item xs={6} >
               
               <Autocomplete
                    id="product_type"
                    className={classes.fixedTag}
                    freeSolo
                    defaultValue={productCtx.default_size}
                    options={productCtx.selected_sizes}
                    onChange={handleoptionChange('default_size')}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                      <Chip variant="outlined" size="small" label={option} {...getTagProps({ index })} />
                      ))
                      }
                    renderInput={params => (
                    <TextField
                    {...params}
                    label="Select Default Size"
                    margin="dense"
                    variant="outlined"
                    fullWidth
                    error = {productCtx.error_message.default_size}

                    InputProps={{ ...params.InputProps, type: 'search' }}
                    />
                    )}
                  />
               </Grid> 
     
      
      </Grid>
          </CardContent>
      </Card> </>: null}
    </Grid>
    <Grid item xs={12} sm={12}>
{ (productCtx.product_type && productCtx.product_type  === 'Earrings') ? <>
  <Card
  {...rest}
  className={clsx(classes.root, className)}
>
  <CardHeader title="Type of Fit" />
  <Divider />
  <CardContent className={classes.cardcontent}>
      <Grid container spacing={1}>  
      
        <Grid item xs={12} >
               
            <Autocomplete
                    id="free-solo-2-demo"
                    className={classes.fixedTag}
                    defaultValue={productCtx.earringbacking}
                    options={productCtx.masterData.earringbacking.map(option => option.label)}
                    onChange={handleoptionChange('earringbacking')}
                    renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                    <Chip variant="outlined" label={option.label} {...getTagProps({ index })} />
                    ))
                    }
                    renderInput={params => (
                    <TextField
                    {...params}
                    label="Earring Backing"
                    margin="dense"
                    variant="outlined"
                    fullWidth
                    error = {productCtx.error_message.earringbacking}
                    InputProps={{ ...params.InputProps, type: 'search' }}
                    />
                    )}
                    />
            </Grid>
      </Grid>
          </CardContent>
      </Card> </>: null}

      </Grid>
   
    </Grid>
</Grid>
<Grid container  spacing={1}>  
    
</Grid>
   
      

            


               
      </div>

     </>
  );
}