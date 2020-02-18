import React, { useEffect, useContext, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, TextField, Button, Fab } from '@material-ui/core';
import { Input } from '../../components/Input.js'
import { ProductContext, ProductProvider } from '../../context';
import { withRouter } from "react-router-dom";
import DiamondDetails from './DiamondDetails';
import GemstoneDetails from './GemstoneDetails';
import Variants from './Variants';
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
          variant_size: fatchvalue.data.productListByProductId.sizeVarient
          // productDiamondColor:diamondTypesArray,
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
        <Grid item>
          <Grid container spacing={1} >
            <Grid item xs={12} sm={12} md={9} spacing={2} style={{ padding: "15px" }}>
              <Grid container item md={6}>
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
              </Grid>
              <Grid style={{ fontSize: ".9rem", padding: "8px" }}>Diamond Table</Grid>
              <DiamondDetails diamond={productCtx.diamondlist} />
              <Grid style={{ fontSize: ".9rem", padding: "8px", marginTop: "28px" }}>Gemstone Table</Grid>
              <GemstoneDetails gemstone={productCtx.gemstonelist} />
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
            </Grid>
            <Grid item xs={12} sm={12} md={3} spacing={2} style={{ padding: "15px", backgroundColor: "#FFFFFF" }}>
              <TextField
                className={classes.helperinput}
                variant="outlined"
                margin="dense"
                fullWidth
                defaultValue={productCtx.productname}
                InputProps={{
                  readOnly: true,
                }}
                id="short_description"
                error={productCtx && productCtx.error_message && productCtx.error_message.productname}
                InputProps={{
                  readOnly: true,
                }}
                name="short_description"
                label="Short Description"

              />
              <TextField
                className={classes.helperinput}
                variant="outlined"
                margin="dense"
                fullWidth
                defaultValue={productCtx.productname}
                id="seo_text"
                error={productCtx && productCtx.error_message && productCtx.error_message.productname}
                InputProps={{
                  readOnly: true,
                }}
                name="seo_text"
                label="SEO Text"

              />
              <TextField
                className={classes.helperinput}
                variant="outlined"
                margin="dense"
                fullWidth
                defaultValue={productCtx.productname}
                id="url"
                error={productCtx && productCtx.error_message && productCtx.error_message.productname}
                InputProps={{
                  readOnly: true,
                }}
                name="url"
                label="URL"
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

            </Grid>
            <Grid container style={{
              display: "flex",
              justifyContent: "flex-end"
            }}>
              <Grid item >
                <Button color="primary" variant="contained" onClick={(e) => saveProductEditItem()}>
                  Save
        </Button>
                <Button color="default" style={{ background: "#b5b6b8" }} variant="contained" onClick={(e) => backProductList()}>
                  Back
        </Button>
              </Grid>
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