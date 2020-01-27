import React, { useEffect, useContext,useState } from 'react';
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
import { PRODUCTEDIT } from '../../graphql/query';
import CreateVariant from './CreateVariant';
import { API_URL,GRAPHQL_DEV_CLIENT } from '../../config';

const useStyle = makeStyles(theme => ({
  helperinput: {
    '& .MuiFormHelperText-root': {
      color: "#e53935",
    }
  }
}))

export function Component(props) {

  const { productCtx, setProductCtx } = useContext(ProductContext);
  const [state,setstate] = useState({
    create_variant:false
  })
  let prod_id = localStorage.getItem('productEditId');
  // alert(productCtx.productname)
  const classes = useStyle();
  const keyPress = type => e => {
    console.log(e.target.value,'keypress')
    console.log('product', productCtx, e)
    const re = /^[a-zA-Z\b]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      setProductCtx({ ...productCtx, [type]: e.target.value })
    }

  }
  function changeVariant() {
    setstate({...state,create_variant:false})
  }
  function createVariant() {
    let diamondColorSku = [];
    let diamondClaritySku = [];
    productCtx.diamondlist&&productCtx.diamondlist.map(diamond_color=>{
      let diamond_data ={
        id:diamond_color.id,
        diamondColour:diamond_color.diamondColour
      }
     let status = diamondColorSku.some(store_dia=>store_dia.diamondColour==diamond_color.diamondColour) ?'': diamondColorSku.push(diamond_data) ;
      return diamond_color;
    })
    productCtx.diamondlist&&productCtx.diamondlist.map(diamond_clarity=>{
      let diamond_data ={
        id:diamond_clarity.id,
        diamondClarity:diamond_clarity.diamondClarity
      }
      let status = diamondClaritySku.some(store_dia=>store_dia.diamondClarity==diamond_clarity.diamondClarity) ? '': diamondClaritySku.push(diamond_data);
      return diamond_clarity;
    })
    setProductCtx({
      ...productCtx,
      productDiamondColor:diamondColorSku,
        productDiamondClarity:diamondClaritySku,
    })
    setstate({...state,create_variant:true})
    // props.history.push('create_variant')
  }
  function saveProductEditItem(){
    let productEditItem = {
      productId:prod_id,
      productName:productCtx.productname,
      productDiamondsByProductSku:productCtx.diamondlist,
      productGemstonesByProductSku:productCtx.gemstonelist,
      transSkuListsByProductId:productCtx.variants,
      createVariants:productCtx.createVariantList
    }
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
          // productDiamondColor:diamondColorSku,
          // productDiamondClarity:diamondClaritySku,
        })

      })
      .catch(console.error)
  }, [])
  return (
    state.create_variant? <CreateVariant productMetalColor={productCtx.productMetalColor} productMetalPurity={productCtx.productMetalPurity} changeVariant={changeVariant}/>:
    <Grid container>
      <Grid item>
      <Grid container spacing={1} >
    <Grid item xs={12} sm={12} md={9} spacing={2} style={{ padding: "15px" }}>
      <Grid container item md={6}>
        <TextField
          className={classes.helperinput}
          variant="outlined"
          margin="dense"
          fullWidth
          value={productCtx.productname}
          id="productname"
          error={productCtx && productCtx.error_message && productCtx.error_message.productname}
          name="productname"
          label="Product Name"
          onChange={keyPress('productname')}
        />
      </Grid>
      <Grid style={{fontSize:".9rem",    padding: "8px"}}>Diamond Table</Grid>
      <DiamondDetails diamond={productCtx.diamondlist} />
      <Grid style={{fontSize:".9rem",padding: "8px"}}>Gemstone Table</Grid>
      <GemstoneDetails gemstone={productCtx.gemstonelist} />
      <Grid style={{
        display: "flex",
        justifyContent: "flex-end"
      }}>
        <Grid style={{fontSize:".9rem",display:"flex",alignItems:"center"}}>Create Variant</Grid>
        <Button  onClick={(e) => createVariant()}>
          <Fab style={{height: "20px",width:" 37px"}} color="primary" aria-label="add">
            <AddIcon />
          </Fab>
        </Button></Grid>
        <Grid style={{fontSize:".9rem",padding: "8px"}}>Variant Table</Grid>
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
        </Button></Grid>
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