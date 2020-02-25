import React, { useEffect, useContext, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, TextField, Button, Fab } from '@material-ui/core';
import { Input } from '../../components/Input.js'
import { ProductContext, ProductProvider } from '../../context';
import { withRouter } from "react-router-dom";
import DiamondDetails from './DiamondDetails';
import GemstoneDetails from './GemstoneDetails';
import Variants from './Variants';
import Skupricing from './Skupricing';

import { productCategory } from '../../services/mapper';
import { useQuery } from 'react-apollo';
import CircularProgress from '@material-ui/core/CircularProgress';
import "../Productupload/Productupload.css";
import AddIcon from '@material-ui/icons/Add';
import { PRODUCTEDIT, PRODUCTDIAMONDTYPES } from '../../graphql/query';
import CreateVariant from './CreateVariant';
import { API_URL, GRAPHQL_DEV_CLIENT } from '../../config';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
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

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyle = makeStyles(theme => ({
  helperinput: {
    '& .MuiFormHelperText-root': {
      color: "#e53935",
    }
  }
}))

export function Component(props) {
  const [open, setOpen] = React.useState(false);
  const [snackMessage,setSnackMessage] = React.useState({
    message:"",
    severity:""
  });
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const { productCtx, setProductCtx } = useContext(ProductContext);
  const [state, setstate] = useState({
    create_variant: false,
    duplicate_productName: ""
  })
  let prod_id = props.location.pathname.split('/')[2];
  const classes = useStyle();
  function keyPress(evt) {
    const productname = (evt.target.validity.valid) ? evt.target.value : productCtx.productname;
    setProductCtx({ ...productCtx, productname })
  }
  function changeVariant() {
    setstate({ ...state, create_variant: false })
  }
  const handleoptionChange = type => (event, value) => {
      setProductCtx({ ...productCtx, [type]: value})
}
  function createVariant() {
    let diamondTypesArray = [];
    // let diamondClaritySku = [];
    productCtx.diamondlist && productCtx.diamondlist.map(diamond_type => {
      let diamond_data = {
        id: diamond_type.id,
        diamondType: diamond_type.diamondType
      }
      let status = diamondTypesArray.some(store_dia => store_dia.diamondType == diamond_type.diamondType) ? '' : diamondTypesArray.push(diamond_data);
      return diamond_type;
    })
    productCtx['productDiamondTypesArray'] = diamondTypesArray
    setProductCtx({
      ...productCtx,
      productCtx
    })
    let params = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: PRODUCTDIAMONDTYPES })
    }
    fetch(GRAPHQL_DEV_CLIENT, params)
      .then(res => res.json())
      .then(diamondtypesData => {
        console.log(diamondtypesData.data.allMasterDiamondTypes.nodes, 'diamondtypesdata');
        setProductCtx({
          ...productCtx,
          productDiamondTypes: diamondtypesData.data.allMasterDiamondTypes.nodes
        })
      })
      .catch(console.error)

    setstate({ ...state, create_variant: true })
  }
  function saveProductEditItem() {
    let productEditItem = {
      productId: prod_id,
      productName: productCtx.productname,
      productDiamondsByProductSku: productCtx.editDiamondLists,
      productGemstonesByProductSku: productCtx.editGemstoneLists,
      transSkuListsByProductId: productCtx.editVariants,
      productImages:productCtx.productImages,
      createVariants: productCtx.createVariantList
    }
    if (productCtx.editDiamondLists.length > 0 && productCtx.name !== "" || productCtx.editGemstoneLists.length > 0 && productCtx.name !== "" || productCtx.editVariants.length > 0 && productCtx.name !== "" || productCtx.createVariantList.length > 0 && productCtx.name !== "" || state.duplicate_productName !== productCtx.productname) {
      setSnackMessage({
        ...snackMessage,
        message:"This is successfully saved",
        severity:"success"
      })
      handleClick();
      console.log(JSON.stringify(productEditItem))
      // setTimeout(()=>{  window.location='/productlist'},1000)
    } else {
      setSnackMessage({
        ...snackMessage,
        message:"You are not edit product",
        severity:"info"
      })
      handleClick();
    }
    // const opts = {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(productEditItem)
    // }
    // fetch(GRAPHQL_DEV_CLIENT,opts)
    // .then(res=>res.json())
    // .then(fetchValue=>{

    // })
    // .catch(console.error)
    console.log(JSON.stringify(productEditItem))
    // props.history.push('/productlist')
  }
  function backProductList() {
    window.location='/productlist';
  }
  useEffect(() => {
    const url = GRAPHQL_DEV_CLIENT;
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: PRODUCTEDIT, variables: { "productId": prod_id } })
    };
    // console.log("helo",setProductCtx)
    fetch(url, opts)
      .then(res => res.json())
      .then(fatchvalue => {
        let gender_arr = fatchvalue.data.productListByProductId.gender
        setProductCtx({
          ...productCtx,
          productname: fatchvalue.data.productListByProductId.productName,
          product_type: fatchvalue.data.productListByProductId.productType,
          product_categoy: fatchvalue.data.productListByProductId.productCategory,
          gemstonelist: fatchvalue.data.productListByProductId.productGemstonesByProductSku.nodes,
          diamondlist: fatchvalue.data.productListByProductId.productDiamondsByProductSku.nodes,
          variants: fatchvalue.data.productListByProductId.transSkuListsByProductId.nodes,
          product_images: fatchvalue.data.productListByProductId.productImagesByProductId.nodes,
          productMetalColor: fatchvalue.data.productListByProductId.productMetalcoloursByProductId.nodes,
          productMetalPurity: fatchvalue.data.productListByProductId.productPuritiesByProductId.nodes,
          variant_size: fatchvalue.data.productListByProductId.sizeVarient,
          vendorcode:fatchvalue.data.productListByProductId.vendorCode,
          product_gender:gender_arr.split(','),
          themes: fatchvalue.data.productListByProductId.productThemesByProductId.nodes,
          prod_styles: fatchvalue.data.productListByProductId.productStylesByProductId.nodes,// productDiamondColor:diamondTypesArray,
          occassions:fatchvalue.data.productListByProductId.productOccassionsByProductId.nodes,
          collections:fatchvalue.data.productListByProductId.productCollectionsByProductId.nodes,
          stonecount:fatchvalue.data.productListByProductId.productStonecountsByProductId.nodes,
          stonecolour:fatchvalue.data.productListByProductId.productStonecolorsByProductId.nodes
          // productDiamondClarity:diamondClaritySku,
        })
        setstate({
          ...state,
          duplicate_productName: JSON.parse(JSON.stringify(fatchvalue.data.productListByProductId.productName))
        })

      })
      .catch(console.error)
  }, [])
  return (
    state.create_variant ? <CreateVariant productMetalColor={productCtx.productMetalColor} productMetalPurity={productCtx.productMetalPurity} changeVariant={changeVariant} productId={prod_id} /> :
      <Grid container>
             <React.Fragment>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={snackMessage.severity}>
          {snackMessage.message}
        </Alert>
      </Snackbar>
        </React.Fragment>
          <Grid item container spacing={1} >
          <Grid item xs={12} sm={12} md={3} lg={3} spacing={2} style={{padding:"15px",  backgroundColor: "#FFFFFF" }}>
              
              
              <TextField
                    className={classes.helperinput}
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    pattern="[a-zA-Z]*"
                    value={productCtx.productname}
                    id="productname"
                    error={productCtx && productCtx.error_message && productCtx.error_message.productname}
                    name="productname"
                    label="Product Name"
                    onInput={keyPress.bind(this)}
                  // onChange={(e)=>keyPress(e,'productname')}
                  />
                <TextField
                  className={classes.helperinput}
                  variant="outlined"
                  margin="dense"
                  fullWidth
                  value={productCtx.product_categoy}
                  id="product_category"
                  InputProps={{
                    readOnly: true,
                  }}
                  error={productCtx && productCtx.error_message && productCtx.error_message.product_categoy}
                  name="product_category"
                  label="Product Category"
  
                />
                <TextField
                  className={classes.helperinput}
                  variant="outlined"
                  margin="dense"
                  fullWidth
                  value={productCtx.product_type}
                  id="product_type"
                  error={productCtx && productCtx.error_message && productCtx.error_message.product_type}
                  InputProps={{
                    readOnly: true,
                  }}
                  name="product_type"
                  label="Product Type"
  
                />
                  <Input
                        variant="outlined"
                        margin="dense"
                        label="Vendor Name"
                        fullWidth
                        className={classes.helperinput}
                        value={productCtx.vendorcode}
                        id="productvendorcode"
                        InputProps={{
                          readOnly: true,
                        }}
                        name="Vendor Name"
                        />
  
                 <TextField
                  className={classes.helperinput}
                  variant="outlined"
                  margin="dense"
                  fullWidth
                  defaultValue={productCtx.productname}
                  id="seo_text"
                  error={productCtx && productCtx.error_message && productCtx.error_message.productname}
                  
                  name="seo_text"
                  label="Minimum Order Quantity"
  
                /> 
               <TextField
                  className={classes.helperinput}
                  variant="outlined"
                  margin="dense"
                  fullWidth
                  defaultValue={productCtx.productname}
                  id="url"
                  error={productCtx && productCtx.error_message && productCtx.error_message.productname}
                  
                  name="url"
                  label="Maximum Order Quantity"
                /> 
                    <Autocomplete
                      multiple
                      id="free-solo-2-demo"
                      disabled
                      className={classes.fixedTag}
                      value={[{label: "Silver",name:"Silver"},{label: "Gold",name:"Gold"}]}
                      renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                      <Chip variant="outlined" size="small" label={option.label} {...getTagProps({ index })} />
                      ))
                      }
                      renderInput={params => (
                      <TextField
                      {...params}
                      label="Product Materials"
                      margin="dense"
                      variant="outlined"
                      fullWidth
                      InputProps={{ ...params.InputProps, readOnly: true, type: 'search' }}
                      />
                      )}
                      />
                 <Autocomplete
                      multiple
                      id="free-solo-2-demo"
                      disabled
                      className={classes.fixedTag}
                      value={productCtx.productMetalColor}
                      renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                      <Chip variant="outlined" size="small" label={option.productColor} {...getTagProps({ index })} />
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
                      <Autocomplete
                      multiple
                      id="free-solo-2-demo"
                      disabled
                      className={classes.fixedTag}
                      value={productCtx.productMetalPurity}
                      renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                      <Chip variant="outlined" size="small" label={option.purity} {...getTagProps({ index })} />
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
  
                    <Autocomplete
                      multiple
                      id="free-solo-2-demo"
                      disabled
                      className={classes.fixedTag}
                      value={productCtx.product_gender}
                      renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                      <Chip variant="outlined" size="small" label={option} {...getTagProps({ index })} />
                      ))
                      }
                      renderInput={params => (
                      <TextField
                      {...params}
                      label="Gender"
                      margin="dense"
                      variant="outlined"
                      fullWidth
                      InputProps={{ ...params.InputProps, type: 'search' }}
                      />
                      )}
                      />
  
                <Autocomplete
                      multiple
                      id="free-solo-2-demo"
                      className={classes.fixedTag}
                      getOptionLabel={option => option.label}
                      defaultValue={productCtx.themes}
                      options={productCtx.masterData.themes}
                      value={productCtx.themes}
                      onChange={handleoptionChange('themes')}
                      renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                      <Chip variant="outlined" size="small" label={option.themeName} {...getTagProps({ index })} />
                      ))
                      }
                      renderInput={params => (
                      <TextField
                      {...params}
                      label="Themes"
                      margin="dense"
                      variant="outlined"
                      fullWidth
                      InputProps={{ ...params.InputProps, type: 'search' }}
                      />
                      )}
                      />
                      <Autocomplete
                      multiple
                      id="free-solo-2-demo"
                      className={classes.fixedTag}
                      getOptionLabel={option => option.label}
                      defaultValue={productCtx.prod_styles}
                      options={productCtx.masterData.styles}
                      onChange={handleoptionChange('prod_styles')}
                      value={productCtx.prod_styles}
                      renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                      <Chip variant="outlined" size="small" label={option.styleName} {...getTagProps({ index })} />
                      ))
                      }
                      renderInput={params => (
                      <TextField
                      {...params}
                      label="Styles"
                      margin="dense"
                      variant="outlined"
                      fullWidth
                      InputProps={{ ...params.InputProps, type: 'search' }}
                      />
                      )}
                      />
  
                    <Autocomplete
                      multiple
                      id="free-solo-2-demo"
                      className={classes.fixedTag}
                      value={productCtx.occassions}
                      getOptionLabel={option => option.label}
                      defaultValue={productCtx.occassions}
                      options={productCtx.masterData.occasions}
                      onChange={handleoptionChange('occassions')}
                      renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                      <Chip variant="outlined" size="small" label={option.occassionName} {...getTagProps({ index })} />
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
              <Autocomplete
                      multiple
                      id="free-solo-2-demo"
                      className={classes.fixedTag}
                      value={productCtx.collections}
                      getOptionLabel={option => option.label}
                      defaultValue={productCtx.collections}
                      options={productCtx.masterData.collections}
                      onChange={handleoptionChange('collections')}
                      renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                      <Chip variant="outlined" size="small" label={option.collectionName} {...getTagProps({ index })} />
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
                  <Autocomplete
                      multiple
                      id="free-solo-2-demo"
                      className={classes.fixedTag}
                      value={productCtx.stonecount}
                      getOptionLabel={option => option.label}
                      defaultValue={productCtx.stonecount}
                      options={productCtx.masterData.stones}
                      onChange={handleoptionChange('stonecount')}
                      renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                      <Chip variant="outlined" size="small" label={option.stonecount} {...getTagProps({ index })} />
                      ))
                      }
                      renderInput={params => (
                      <TextField
                      {...params}
                      label="No of Stones"
                      margin="dense"
                      variant="outlined"
                      fullWidth
                      InputProps={{ ...params.InputProps, type: 'search' }}
                      />
                      )}
                      />
  
                  <Autocomplete
                      multiple
                      id="free-solo-2-demo"
                      className={classes.fixedTag}
                      value={productCtx.stonecolour}
                      getOptionLabel={option => option.label}
                      defaultValue={productCtx.stonecolour}
                      options={productCtx.masterData.gemstonecolor}
                      onChange={handleoptionChange('stonecolour')}
                      renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                      <Chip variant="outlined" size="small" label={option.stonecolor} {...getTagProps({ index })} />
                      ))
                      }
                      renderInput={params => (
                      <TextField
                      {...params}
                      label="Stone Colour"
                      margin="dense"
                      variant="outlined"
                      fullWidth
                      InputProps={{ ...params.InputProps, type: 'search' }}
                      />
                      )}
                      />
              </Grid>
             
            <Grid item xs={12} sm={12} md={9} lg={9}  spacing={2} style={{ padding: "15px" }}>
              <Grid container item md={6}>
                
              </Grid>
              <Grid style={{ fontSize: ".9rem", padding: "8px" }}>Diamond Table</Grid>
              <DiamondDetails diamond={productCtx.diamondlist} />
              {productCtx.gemstonelist.length > 0 ? <> <Grid style={{ fontSize: ".9rem", padding: "8px", marginTop: "28px" }}>Gemstone Table</Grid>
              <GemstoneDetails gemstone={productCtx.gemstonelist} /> </> : null }
              <Grid style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "42px"
              }}>
                <Grid style={{ fontSize: ".9rem", display: "flex", alignItems: "center" }}>Create Variant</Grid>
                <Button onClick={(e) => createVariant()}>
                  <Fab style={{ height: "20px", width: " 37px" }} color="primary" aria-label="add">
                    <AddIcon />
                  </Fab>
                </Button></Grid>
              <Grid style={{ fontSize: ".9rem", padding: "8px" }}>Variant Table</Grid>
              <Variants variants={productCtx.variants} />
              <Skupricing variants={productCtx.variants} />

            </Grid>
             <Grid container style={{
              display: "flex",
              justifyContent: "center"
            }}>
              <Grid item>
                <Button color="primary" variant="contained" onClick={(e) => saveProductEditItem()}>
                  Save
        </Button>
                <Button color="default" style={{  marginLeft:"16px" }} variant="contained" onClick={(e) => backProductList()}>
                  Back
        </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

  )
}



const useStyles2 = makeStyles(theme => ({
  progress: {
    margin: 'auto'
  },
}));

export const ProductAttributes = withRouter(props => {

  const classes = useStyles2();

  const { data, loading, error } = useQuery(productCategory.query);

  if (loading) return <div className="loaderdiv"><CircularProgress className={classes.progress} />
  </div>
  if (error) return <div>error</div>

  const _content = <ProductProvider value={{ data, mapper: productCategory.mapper, mappertype: "masterData" }} >
    <Component {...props} />
  </ProductProvider>
  return _content
});
export default withRouter(ProductAttributes);