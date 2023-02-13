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
import { useEffect } from "react";



const header = [
    "S.No",
    "Text",
    "Action",
];
const tableData = [
    { type: "INCREMENT", name: "" },
    { type: "TEXT", name: "text" },
    { type: "ACTION", name: "" },
];

const initialState = {
    "text": "",
    "image": "",
    "url": ""
}

const initialEdit = {
    isEdit: false,
    editIndex: null,
}

export const HomeNotificationCMS = (props) => {
    const { data } = props

 
    const classes = consolePagesStyles()
    const [open, setOpen] = useState(false)
    const [state, setState] = useState({ ...initialState })
    const [editData, setEditData] = useState({ ...initialEdit })
    const [index,setIndex] = useState()

    useEffect(() => {
        const index = props?.state?.indexOf(data);
        setIndex(index)
    },[])

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
        props.handleSubmit(getData, "HomeNotifiaction", "cardContent",index);
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
                console.log(getData, "EDITgetDatagetData")
                props.handleSubmit(getData, "HomeNotifiaction", "cardContent",index);
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
                console.log(getData, "ADDgetDatagetData")

                props.handleSubmit(getData, "HomeNotifiaction", "data",index);

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

                name={"Notification Component"}
                handleAddNew={handleAddNew}
            />
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle id="form-dialog-title">Edit Home Notification</DialogTitle>
                <DialogContent>
                    {
                        <Grid container>
                            <Grid Item xs={12}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="text"
                                    label="Text"
                                    variant="outlined"
                                    fullWidth
                                    onChange={(e) => onChangeData('text', e.target.value)}
                                    value={state?.text}
                                    name="text"
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