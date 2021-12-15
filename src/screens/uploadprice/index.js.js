import { Box, CircularProgress, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { RiFileUploadFill } from "react-icons/ri";
import xlsxParser from 'xlsx-parse-json';
import { AlertContext } from "../../context";
import { NetworkContext } from '../../context/NetworkContext';

const styles = makeStyles((theme) => ({
    file: {
        fontSize: "60px"
    },
    root: {
        border: "1px solid #c1c1c1",
        borderRadius: "10px",
        cursor: "pointer"
    },
    title: {
        fontSize: "18px",
        color: "black",
        textAlign: "center",
        marginTop: "10px"
    },
    roots: {
        marginTop: "10%"
    },
    res: {
        color: "green",
        fontSize: "18px",

        textAlign: "center",
        marginTop: "10px"
    }
}));
const PriceUpload = (props) => {
    const [data, setData] = React.useState("")
    const { sendNetworkRequest } = React.useContext(NetworkContext);
    const [open, setOpen] = React.useState(false);

    const classes = styles();
    const snack = React.useContext(AlertContext)
    const handleFile = (file) => {
        xlsxParser
            .onFileSelection(file)
            .then(data => {

                if (data.Sheet1.length == 0) {

                } else {

                    let body = {
                        sku_details: data.Sheet1.map(item => {
                            return {
                                "product_id": item["SKU"],
                                "selling_price": Number(item["Selling Price"]),
                                "selling_price_tax": Number(item["Selling Price Tax"]),
                                "markup_price": Number(item["Markup Price"]),
                                "markup_price_tax": Number(item["Markup Price Tax"]),
                                "discount_price": Number(item["Discount Price"]),
                                "discount_price_tax": Number(item["Discount Price Tax"]),
                            }
                        })
                    }
                    setOpen(true)
                    sendNetworkRequest('/silverpriceupload', {}, body)
                        .then((response) => {
                            setOpen(false)

                            snack.setSnack({
                                open: true,
                                severity: "success",
                                msg: response.message,
                            });
                        }).catch(err => {
                            setOpen(false)
                            snack.setSnack({
                                open: true,
                                severity: "error",
                                msg: "Some error occured!,Please Try later",
                            });
                        })
                }
            });
    }
    const selectimg = (e) => {
        const files = e.target.files;
        if (files && files[0]) handleFile(files[0]);


    };

    return (
        <div className={classes.roots}
        >



            <label

            >
                <Grid container direction="row" justifyContent="center" >
                    {open ?
                        <Grid item xs={12} >
                            <center>
                                <CircularProgress color="primary" />
                            </center>
                        </Grid>
                        :
                        <Grid item xs={11} sm={6} md={3} lg={3} className={classes.root}>
                            <br />
                            <br />
                            <input
                                type="file"
                                name="img"
                                style={{ display: "none" }}
                                id="uplodebtn"
                                onChange={selectimg}
                            />

                            <Box
                                display="flex"
                                flexDirection="row"
                                justifyContent="center"
                                alignItems="center"

                            >
                                <Box >
                                    <RiFileUploadFill className={classes.file} />
                                </Box>

                            </Box>

                            <br />
                            <br />

                        </Grid>}

                </Grid >
            </label>
            <Typography className={classes.title}>{open ? "Uploading..." : "Upload Price Sheet"}</Typography>




        </div>
    );
};
export default PriceUpload;