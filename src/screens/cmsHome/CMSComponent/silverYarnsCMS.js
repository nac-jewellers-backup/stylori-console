import React, { useState, useContext, useEffect } from "react";
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
    "title",
    "Description",
    "Action",
];
const tableData = [
    { type: "INCREMENT", name: "" },
    { type: "WEB_IMAGE", name: "image" },
    { type: "TEXT", name: "title" },
    { type: "TEXT", name: "subText" },
    { type: "EDIT", name: "" },
];

const initialState = {
    "background_Image": "",
    "title": "",
    "image": "",
    "subText": ""
}

const initialEdit = {
    isEdit: false,
    editIndex: null,
}

export const SilverYarnsCMS = (props) => {
    const { data } = props


    const classes = consolePagesStyles()
    const [open, setOpen] = useState(false)
    const [state, setState] = useState({ ...initialState })
    const [arrData, setArrData] = useState()
    const [editData, setEditData] = useState({ ...initialEdit })
    const [index,setIndex] = useState()

    useEffect(() => {
        setArrData([data?.props]);
        const index = props?.state?.indexOf(data);
        setIndex(index)
    }, [])


    const onChangeData = (key, value) => {
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
        props.handleSubmit(getData, "StyloriCard", "cardContent",index);
    }

    const handleClose = () => {
        setOpen(false)
        setState(initialState)
        setEditData(initialEdit)
    }

    const validate = () => {
        if (
            state.image &&
            state.title &&
            state.subText
        ) {
            return true;
        } else {
            return false;
        }
    };

    const onsubmitvalue = async () => {
        if (validate) {

            const values = arrData;
            values.splice(editData.editIndex, 1, state);
            const getData = {
                component: data?.component,
                props: values[0]
            };
            setOpen(false);
            setState(initialState);
            setEditData(initialEdit);
            console.log(getData, "EDITgetDatagetData")
            props.handleSubmit(getData, "StyloriCard", "props",index);
        }
        else {
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
                data={arrData}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                noAddNew
                name={`${data?.component} Component`}
            />
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle id="form-dialog-title">{`Edit ${data?.component} Details`}</DialogTitle>
                <DialogContent>
                    {
                        <Grid container>
                            <Grid Item xs={12}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="title"
                                    label="title"
                                    variant="outlined"
                                    fullWidth
                                    onChange={(e) => onChangeData('title', e.target.value)}
                                    value={state?.title}
                                    name="title"
                                    required
                                    style={{ margin: "7px 0" }}
                                />
                            </Grid>
                            <Grid Item xs={12}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="subText"
                                    label="subText"
                                    variant="outlined"
                                    fullWidth
                                    onChange={(e) => onChangeData('subText', e.target.value)}
                                    value={state?.subText}
                                    name="subText"
                                    required
                                    style={{ margin: "7px 0" }}
                                />
                            </Grid>
                            <Grid item
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