import React, { useState } from 'react';
import { Grid, FormGroup, FormControlLabel, Checkbox, TextField, Button } from '@material-ui/core';
import { withRouter } from "react-router-dom";
import { ProductContext, ProductProvider } from '../../context';
import axios from 'axios';
import CardMedia from '@material-ui/core/CardMedia';
import { API_URL } from '../../config';
import { isString } from 'util';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import FilePondPluginImageValidateSize from 'filepond-plugin-image-validate-size';
import FilePondPluginFileRename from 'filepond-plugin-file-rename';
// import { NetworkContext } from '../../context/NetworkContext';
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginImageValidateSize, FilePondPluginFileRename);
const useStyle = makeStyles(theme => ({
    helperinput: {
        '& .MuiFormHelperText-root': {
            color: "#e53935",
        }
    },
    variantFontSize: {
        fontSize: '.9rem'
    },
    variantMarginTop:{
        marginTop: "20px"
    }
    
}))
export function CreateVariant(props) {
    const classes = useStyle();
    let prod_id = props.productId;
    const TOKEN = 'token'
    const { productCtx, setProductCtx } = React.useContext(ProductContext);
    const [variant, setVariant] = useState({
        metal_color: [],
        metal_purity: [],
        diamond_color: [],
        diamond_clarity: [],
        product_images: {},
        size: []

    });
    console.log(productCtx, 'createvariants')
    function handleMetalColor(status_data) {
        let color = variant.metal_color;
        color.some(color_data => color_data.id === status_data.id) ? color = color.filter(color_fil => color_fil.id !== status_data.id) : color.push(status_data)
        setVariant({
            ...variant,
            metal_color: color
        })
    }
    const sendNetworkRequest = async (url, params, data, auth = false) => {
        url = API_URL + url;
        console.info('URL', url, data)
        const method = data ? 'POST' : 'GET',
            headers = {
                'Content-Type': 'application/json'
            };
        let resdata = null;
        if (auth) {
            const token = localStorage.getItem(TOKEN)
            if (token) headers["auth"] = token
            else window.location = '/'
        }
        const response = await fetch(url, {
            method, body: isString(data) ? data : JSON.stringify(data), headers
        })

        if (response.status < 400) {
            resdata = await response.json();
        } else {
            alert(`${response.status}:${response.statusText} - Unable to complete your request to \n${url}`)
        }
        return resdata;
    }
    function handleMetalPurity(status_data) {
        status_data.metal_weight = ""
        alert(JSON.stringify(status_data));
        let purity = variant.metal_purity;
        purity.some(purity_data => purity_data.id === status_data.id) ? purity = purity.filter(purity_fil => purity_fil.id !== status_data.id) : purity.push(status_data)
        setVariant({
            ...variant,
            metal_purity: purity
        })
    }
    function diamondColorChange(status_data) {
        let diamondColor = variant.diamond_color;
        diamondColor.some(diamond_color_data => diamond_color_data.id === status_data.id) ? diamondColor = diamondColor.filter(diamond_color_fil => diamond_color_fil.id !== status_data.id) : diamondColor.push(status_data)
        setVariant({
            ...variant,
            diamond_color: diamondColor
        })
    }
    function diamondClarityChange(status_data) {
        let diamondClarity = variant.diamond_clarity;
        diamondClarity.some(diamond_clarity_data => diamond_clarity_data.id === status_data.id) ? diamondClarity = diamondClarity.filter(diamond_clarity_fil => diamond_clarity_fil.id !== status_data.id) : diamondClarity.push(status_data)
        setVariant({
            ...variant,
            diamond_clarity: diamondClarity
        })

    }
    function sizeChange(status_data) {
        let variantSize = variant.size;
        variantSize.some(variant_size_data => variant_size_data === status_data) ? variantSize = variantSize.filter(variant_size_fil => variant_size_fil !== status_data) : variantSize.push(status_data)
        setVariant({
            ...variant,
            size: variantSize
        })

    }
    function setMetalWeightInput(e, metalPurityId) {
        // alert(e.target.value)
        let metalWeight = variant.metal_purity;
        metalWeight = metalWeight && metalWeight.map((metal_weight, index) => {
            if (metalPurityId === metal_weight.id) {
                metal_weight.metal_weight = e.target.value;
            }
            return metal_weight;
        });
        setVariant({
            ...variant,
            metal_purity: metalWeight
        })
    }
    function saveCreateVariant(){
        let createVariant={
            productMetalcoloursByProductId:variant.metal_color,
            productPuritiesByProductId:variant.metal_purity,
            productDiamondColor:variant.diamond_color,
            productDiamondClarity:variant.diamond_clarity,
            productSize:variant.size,
            productImage:variant.product_images
        }
        let createVariants = productCtx.createVariantList;
        createVariants.push(createVariant);
        setProductCtx({
            ...productCtx,
            createVariantList:createVariants
        })
        setVariant({
            ...variant,
            metal_color: [],
            metal_purity: [],
            diamond_color: [],
            diamond_clarity: [],
            product_images: {},
            size: []
        })
        props.changeVariant();
    }
    function backToProductAttribute(){
        props.changeVariant();
    }
    async function uploadimagetoserver(bodaydata, imageposition, imagecolor, uploadtype) {
        let prodimages = variant.product_images;
        // if(true)
        // {
        var prodid = prod_id;
        let imagecolourobj = variant.product_images[imagecolor];
        var imagecount = 1;
        if (imagecolourobj) {
            imagecount = imagecolourobj.length + 1;
        }

        let imagename = (prodid + "_" + (imagecount) + imagecolor.charAt(0));
        let responsedata = await sendNetworkRequest('/uploadimage', {}, { image: bodaydata.fileExtension, filename: imagename, product_id: prodid }, false)
        var returnData = responsedata && responsedata.data && responsedata.data.returnData;
        var signedRequest = returnData && returnData.signedRequest;
        var url = returnData && returnData.url;
        console.log("responseurl" + url);
        var filepathname = returnData && returnData.filepath;
        var options = {
            headers: {
                'Content-Type': bodaydata.fileExtension,
                'Access-Control-Allow-Origin': '*'
            }
        };

        if (imagecolourobj) {
            const imageobj = {
                "name": (prodid + "_" + (imagecolourobj.length + 1) + imagecolor.charAt(0)),
                "position": imageposition,
                "color": imagecolor,
                "image_url": filepathname,
                "url": 'https://s3.ap-south-1.amazonaws.com/styloribaseimages/' + filepathname
            }
            if (uploadtype === 'edit') {
                imagecolourobj[imageposition] = imageobj;

            } else {
                imagecolourobj.push(imageobj)

            }
            prodimages[imagecolor] = imagecolourobj;

        } else {
            const imageobj = {
                "name": (prodid + "_1" + imagecolor.charAt(0)),
                "position": imageposition,
                "color": imagecolor,
                "image_url": filepathname,
                "url": 'https://s3.ap-south-1.amazonaws.com/styloribaseimages/' + filepathname
            }
            imagecolourobj = [];
            imagecolourobj.push(imageobj)
        }
        prodimages[imagecolor] = imagecolourobj;
        setVariant({ ...variant, product_images: prodimages })
        // setFiles([])
        // }

        await axios.put(signedRequest, bodaydata.file, options)
    }
    return (
        <Grid container>
            <Grid item>
                <Grid container >
                    <Grid item>
                        <Grid item className={classes.variantFontSize} >Metal Color</Grid>
                        <Grid item >
                            <FormGroup row>
                                {
                                    productCtx.masterData && productCtx.masterData.metalcolour.map((data, index) => (

                                        productCtx.productMetalColor && productCtx.productMetalColor.some((prod_metal_color) => prod_metal_color.productColor === data.name) ?
                                            <FormControlLabel
                                                disabled
                                                control={
                                                    <Checkbox checked={true} value="checkedA" />
                                                }
                                                label={data.name}
                                            /> :
                                            <FormControlLabel
                                                control={
                                                    <Checkbox checked={variant.metal_color && variant.metal_color.some(met_colr => met_colr.id == data.id) ? true : false} onChange={() => handleMetalColor(data)} value="checkedA" />
                                                }
                                                label={data.name}
                                            />

                                    ))
                                }
                            </FormGroup>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container className={classes.variantMarginTop}>
                    <Grid item>
                        <Grid item className={classes.variantFontSize} >
                            Metal Purity
                        </Grid>
                        <Grid item>
                            <FormGroup row>
                                {
                                    productCtx.masterData && productCtx.masterData.metalpurity.map((data, index) => (

                                        productCtx.productMetalColor && productCtx.productMetalPurity.some((prod_metal_purity) => prod_metal_purity.purity === data.name) ?
                                            <FormControlLabel
                                                disabled
                                                control={
                                                    <Checkbox checked={true} value="checkedA" />
                                                }
                                                label={data.name}
                                            /> :
                                            <FormControlLabel
                                                control={
                                                    <Checkbox checked={variant.metal_purity && variant.metal_purity.some(met_purity => met_purity.id == data.id) ? true : false} onChange={() => handleMetalPurity(data)} value="checkedA" />
                                                }
                                                label={data.name}
                                            />

                                    ))
                                }
                            </FormGroup>
                            {
                                variant.metal_purity && variant.metal_purity.map(metal_purity => (
                                    <TextField
                                        className={classes.helperinput}
                                        style={{ width: "124px" }}
                                        variant="outlined"
                                        margin="dense"
                                        fullWidth
                                        type="number"
                                        value={metal_purity.metal_weight}
                                        id="metal_weight"
                                        error={productCtx && productCtx.error_message && productCtx.error_message.product_type}
                                        name="metal_weight"
                                        label={`Metal Weight${metal_purity.name}`}
                                        onChange={(e) => setMetalWeightInput(e, metal_purity.id)}
                                    />
                                ))
                            }
                        </Grid>
                    </Grid>
                </Grid>
                {
                    productCtx.diamondlist && productCtx.diamondlist.length>0 ?<Grid container className={classes.variantMarginTop}>
                    <Grid item>
                        <Grid item className={classes.variantFontSize} >
                            Diamond Color
                        </Grid>
                        <Grid item>
                            <FormGroup row>
                                {
                                    productCtx.masterData && productCtx.masterData.diamondcolors.map((data, index) => (

                                        productCtx.productDiamondColor && productCtx.productDiamondColor.some((prod_diamon_color) => prod_diamon_color.diamondColour === data.name) ?
                                            <FormControlLabel
                                                disabled
                                                control={
                                                    <Checkbox checked={true} value="checkedA" />
                                                }
                                                label={data.name}
                                            /> :
                                            <FormControlLabel
                                                control={
                                                    <Checkbox checked={variant.diamond_color && variant.diamond_color.some(diamond_color => diamond_color.id == data.id) ? true : false} onChange={() => diamondColorChange(data)} value="checkedA" />
                                                }
                                                label={data.name}
                                            />

                                    ))
                                }
                            </FormGroup>
                        </Grid>
                    </Grid>
                </Grid> : ''
                }
                 {
                    productCtx.diamondlist && productCtx.diamondlist.length>0 ? <Grid container className={classes.variantMarginTop}>
                    <Grid item>
                        <Grid item className={classes.variantFontSize} >
                            Diamond Clarity
                        </Grid>
                        <Grid item>
                            <FormGroup row>
                                {
                                    productCtx.masterData && productCtx.masterData.diamondclarities.map((data, index) => (

                                        productCtx.productDiamondClarity && productCtx.productDiamondClarity.some((prod_diamond_clarity) => prod_diamond_clarity.diamondClarity === data.name) ?
                                            <FormControlLabel
                                                disabled
                                                control={
                                                    <Checkbox checked={true} value="checkedA" />
                                                }
                                                label={data.name}
                                            /> :
                                            <FormControlLabel
                                                control={
                                                    <Checkbox checked={variant.diamond_clarity && variant.diamond_clarity.some(prod_diamond_clarity => prod_diamond_clarity.id == data.id) ? true : false} onChange={() => diamondClarityChange(data)} value="checkedA" />
                                                }
                                                label={data.name}
                                            />

                                    ))
                                }
                            </FormGroup>
                        </Grid>
                    </Grid>
                </Grid>: ''
                }
                
                
                <Grid container className={classes.variantMarginTop}>
                    <Grid item>
                        <Grid item className={classes.variantFontSize} >
                            Size
                        </Grid>
                        <Grid item>
                            <FormGroup row>
                                {
                                    productCtx.productVariantSize && productCtx.productVariantSize.map((data, index) => (

                                        productCtx.variant_size && productCtx.variant_size.some((variantSize) => variantSize === data) ?
                                            <FormControlLabel
                                                disabled
                                                control={
                                                    <Checkbox checked={true} value="checkedA" />
                                                }
                                                label={data}
                                            /> :
                                            <FormControlLabel
                                                control={
                                                    <Checkbox checked={variant.size && variant.size.some(var_size => var_size == data) ? true : false} onChange={() => sizeChange(data)} value="checkedA" />
                                                }
                                                label={data}
                                            />

                                    ))
                                }
                            </FormGroup>
                        </Grid>
                    </Grid>

                </Grid>
            </Grid>
            <Grid container>
                {variant.metal_color === undefined ? null : variant.metal_color.map((value, index) => (
                    <Grid xs={12} container spacing={1} item>
                        <Grid xs={12} item>

                            <Typography component="h6" variant="h6" align="left">
                                {value.name}
                            </Typography>
                        </Grid>
                        <Grid xs={12} sm={12} md={12} item>
                            <FilePond
                                allowImageValidateSize
                                imageValidateSizeMinWidth="2400"
                                imageValidateSizeMinHeight="2400"
                                imageValidateSizeMeasure={(file) => new Promise((resolve, reject) => {

                                })}
                                labelIdle="Upload Image"
                                allowMultiple={true}
                                //files = {files}
                                onupdatefiles={fileItem => {
                                    // Set currently active file objectsfiles to this.state

                                }}
                                onaddfile={(error, fileItem) => {
                                    uploadimagetoserver(fileItem, index, value.name, "add")
                                }}
                                onremovefile={(error, fileItem) => {

                                }}
                                fileRenameFunction={
                                    (file) => new Promise(resolve => {
                                        var prodid = prod_id;
                                        let imagecolourobj = variant.product_images[value.name];
                                        var imagecount = 1;
                                        if (imagecolourobj) {
                                            imagecount = imagecolourobj.length + 1;
                                        }
                                        let imagename = (prodid + "_" + (imagecount) + value.name.charAt(0)) + file.extension;
                                        resolve(imagename)

                                    })
                                }
                            >
                            </FilePond>
                        </Grid>

                    </Grid>
                ))}
            </Grid>
            <Grid container style={{display:"flex",justifyContent:"flex-end"}}>
                    <Grid item >
                <Button color="primary" variant="contained" onClick={(e) => saveCreateVariant()}>
                Save
                </Button>
                </Grid>
                <Grid item >
                <Button  style={{background: "#b5b6b8"}} variant="contained" onClick={(e) => backToProductAttribute()}>
                Back
                </Button>
                </Grid>
            </Grid>
        </Grid>
    )
}
export default CreateVariant;