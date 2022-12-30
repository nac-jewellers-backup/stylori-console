import React, { useState, useContext } from "react";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    Paper,
    TextField,
    Typography,
} from "@material-ui/core";
import { AlertContext } from "../../../context";
import TableComp from "../../../components/table/tableComp";
import { consolePagesStyles } from "./style";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { UploadImage } from "../../../utils/imageUpload";



const header = [
    "S.No",
    "Image",
    "Text",
    "Price",
    "Action",
];
const tableData = [
    { type: "INCREMENT", name: "" },
    { type: "WEB_IMAGE", name: "image" },
    { type: "TEXT", name: "bottomText" },
    { type: "TEXT", name: "price" },
    { type: "ACTION", name: "" },
];

const initialState = {
    "bottomText": "",
    "image": "",
    "price": "",
    "url": "",

}

const initialEdit = {
    isEdit: false,
    editIndex: null,
}

export const StylesCardPrice = (props) => {
    const { data } = props


    const classes = consolePagesStyles()
    const [open, setOpen] = useState(false)
    const [state, setState] = useState({ ...initialState })
    const [editData, setEditData] = useState({ ...initialEdit })

    const onChangeData = (key, value) => {
        debugger
        setState({ ...state, [key]: value })
    }

    const HandleImageUpload = (file, name) => {
        UploadImage(file)
            .then((res) => {
                if (res?.data?.web) {
                    setState({ ...state, image: res?.data?.web })

                }
                alert.setSnack({
                    open: true,
                    severity: "success",
                    msg: "Image Uploaded Successfully",
                });
            })
            .catch((err) => {
                console.log(err)
            })
    }


    const handleEdit = (e, rowData, rowIndex) => {
        setOpen(true)
        setEditData({ ...editData, isEdit: true, editIndex: rowIndex })
        setState(rowData)
    }

    const handleDelete = (e, rowData, rowIndex) => {
        debugger
        let getData = []
        let card = data?.props?.cardContent
        card.splice(rowIndex, 1)

        getData = {
            component: data?.component,
            props: {
                cardContent: card
            }
        };
        console.log(getData, "getDatagetData")
        props.handleSubmit(getData, "StyloriCardPrice", "cardContent");
    }

    const handleAddNew = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
        setState(initialState)
        setEditData(initialEdit)
    }

    const validate = () => {
        if (
            state.image &&
            state.text &&
            state.url
        ) {
            return true;
        } else {
            return false;
        }
    };

    const onsubmitvalue = async () => {

        if (validate) {
            if (editData.isEdit) {
                const values = data?.props?.cardContent;
                values.splice(editData.editIndex, 1, state);
                let getData = [];
                getData = {
                    component: data?.component,
                    props: {
                        cardContent: values
                    }
                };
                setOpen(false);
                setState(initialState);
                setEditData(initialEdit);
                props.handleSubmit(getData, "StyloriCardPrice", "cardContent");
            } else {
                debugger
                let getData = [];
                getData = {
                    component: data?.component,
                    props: {
                        cardContent: [...data?.props?.cardContent, state]
                    }
                };
                setOpen(false);
                setState(initialState);
                setEditData(initialEdit);

                props.handleSubmit(getData, "StyloriCardPrice", "data");

            }
        } else {
            alert.setSnack({
                open: true,
                severity: "error",
                msg: "Please fill all the fields in the form ",
            });
        }

    };
    return (
        <Paper>

            <TableComp
                header={header}
                tableData={tableData}
                data={data?.props?.cardContent}
                handleEdit={handleEdit}
                handleDelete={handleDelete}

                name={"Price Card Component"}
                handleAddNew={handleAddNew}
            />
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle id="form-dialog-title">Edit Price Card Details</DialogTitle>
                <DialogContent>
                    {
                        <Grid container>
                            <Grid item xs={12}
                                style={{
                                    margin: "7px 0", display: "flex",
                                    justifyContent: "center", width: "100%"
                                }}>
                                <input
                                    accept="image/*"
                                    className={classes.input}
                                    style={{ display: "none" }}
                                    id="containerImage"
                                    multiple
                                    type="file"
                                    onChange={(e) => HandleImageUpload(e.target.files[0], "image")}
                                />
                                <label htmlFor="containerImage">
                                    <Button
                                        variant="outlined"
                                        component="span"
                                        startIcon={<CloudUploadIcon />}
                                    >Card Image
                                    </Button>
                                </label>
                            </Grid>
                            {state?.image && (
                                <Grid item style={{ margin: "7px 0" }}>
                                    <img
                                        alt="nacimages"
                                        src={state?.image}
                                        style={{ width: "100%", height: "auto" }}
                                    />
                                </Grid>
                            )}
                            <Grid Item xs={12}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="bottomText"
                                    label="Text"
                                    variant="outlined"
                                    fullWidth
                                    onChange={(e) => onChangeData('bottomText', e.target.value)}
                                    value={state?.bottomText}
                                    name="bottomText"
                                    required
                                    style={{ margin: "7px 0" }}
                                />
                            </Grid>
                            <Grid Item xs={12}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="url"
                                    label="Url"
                                    variant="outlined"
                                    fullWidth
                                    onChange={(e) => onChangeData('url', e.target.value)}
                                    value={state?.url}
                                    name="url"
                                    required
                                    style={{ margin: "7px 0" }}
                                />
                            </Grid>
                            <Grid Item xs={12}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="price"
                                    label="Price"
                                    variant="outlined"
                                    fullWidth
                                    onChange={(e) => onChangeData('price', e.target.value)}
                                    value={state?.price}
                                    name="price"
                                    required
                                    style={{ margin: "7px 0" }}
                                />
                            </Grid>

                        </Grid>

                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={onsubmitvalue}>Add</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </Paper>
    )
}