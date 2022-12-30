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


const initialState = {
    text: "",
    writer: "",
    url: ""
}

const initialEdit = {
    isEdit: false,
    editIndex: null,
}


const header = [
    "S.No",
    "Writer",
    "Saying",
    "Action",
];
const tableData = [
    { type: "INCREMENT", name: "" },
    { type: "TEXT", name: "writer" },
    { type: "TEXT", name: "text" },
    { type: "ACTION", name: "" },
];

export const TestimonialCMS = (props) => {

    const { data } = props

    const classes = consolePagesStyles()
    const [open, setOpen] = useState(false)
    const [state, setState] = useState({ ...initialState })
    const [editData, setEditData] = useState({ ...initialEdit })


    const onChangeData = (key, value) => {
        setState({ ...state, [key]: value })
    }

    const handleClose = () => {
        setOpen(false)
        setState(initialState)
        setEditData(initialEdit)
    }

    const handleEdit = (e, rowData, rowIndex) => {
        // debugger
        setOpen(true)
        setEditData({ ...editData, isEdit: true, editIndex: rowIndex })
        setState(rowData)
    }



    const validate = () => {
        if (
            state.writer &&
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
            debugger
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
                setEditData(initialEdit);
                props.handleSubmit(getData, "TestimonialSlider", "props");
            } else {
                let getData = [];
                getData = {
                    component: data?.component,
                    props: {
                        cardContent: [...data?.props?.cardContent, state]
                    }
                };
                setOpen(false);
                setState(initialState)
                setEditData(initialEdit);
                props.handleSubmit(getData, "TestimonialSlider", "props");
            }
        }
        else {
            alert.setSnack({
                open: true,
                severity: "error",
                msg: "Please fill all the fields in the form ",
            });
        }

    };
    const handleAddNew = () => {
        setOpen(true)
    }

    const handleDelete = (e, rowData, rowIndex) => {
        const values = data?.props?.cardContent;
        values.splice(rowIndex, 1);
        let getData = [];
        getData = {
            component: data?.component,
            props: {
                cardContent: values
            }
        };
        props.handleSubmit(getData, "TestimonialSlider", "props");
    }
    return (
        <Paper>

            <TableComp
                header={header}
                tableData={tableData}
                data={data?.props?.cardContent}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                handleAddNew={handleAddNew}
                name={"Stylori Testimonial Component"}
            />
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle id="form-dialog-title">Edit Stylori Silver Testimonial Details</DialogTitle>
                <DialogContent>
                    {
                        <Grid container>
                            <Grid Item xs={12}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="text"
                                    label="Saying"
                                    variant="outlined"
                                    fullWidth
                                    onChange={(e) => onChangeData('text', e.target.value)}
                                    value={state?.text}
                                    name="text"
                                    required
                                    style={{ margin: "7px 0" }}
                                />
                            </Grid>
                            <Grid Item xs={12}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="writer"
                                    label="Writer"
                                    variant="outlined"
                                    fullWidth
                                    onChange={(e) => onChangeData('writer', e.target.value)}
                                    value={state?.writer}
                                    name="writer"
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