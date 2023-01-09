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

const header = [
    "S.No",
    "Title",
    "Subtitle",
    "Action",
];
const tableData = [
    { type: "INCREMENT", name: "" },
    { type: "TEXT", name: "title_Text" },
    { type: "TEXT", name: "sub_Text" },
    { type: "EDIT", name: "" },
];

const initialEdit = {
    isEdit: false,
    editIndex: null,
}


export const StyloriSilverTitleCMS = (props) => {
    const { data } = props

    const classes = consolePagesStyles()
    const [open, setOpen] = useState(false)
    const [state, setState] = useState({
        title_Text: "",
        sub_Text: "",
    })
    const [arrData, setArrData] = useState()
    const [editData, setEditData] = useState({ ...initialEdit })

    useEffect(() => {
        setArrData([data?.props])
    }, [])


    const onChangeData = (key, value) => {
        setState({ ...state, [key]: value })
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleEdit = (e, rowData, rowIndex) => {
        setOpen(true)
        setEditData({ ...editData, isEdit: true, editIndex: rowIndex })
        setState(rowData)
    }

    const validate = () => {
        if (
            state.title_Text &&
            state.sub_Text
        ) {
            return true;
        } else {
            return false;
        }
    };

    const onsubmitvalue = async () => {
        if (validate) {
            debugger
            const values = arrData;
            values.splice(editData.editIndex, 1, state);
            let getData = [];
            getData = {
                component: data?.component,
                props: {
                    title_Text: state.title_Text,
                    sub_Text: state.sub_Text
                }
            };
            setOpen(false);
            setEditData(initialEdit);
            props.handleSubmit(getData, "StyloriTitle", "props");
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
                noAddNew
                name={"Stylori Silver Title Component"}
            />
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle id="form-dialog-title">Edit Stylori Silver Title</DialogTitle>
                <DialogContent>
                    {
                        <Grid container>
                            <Grid Item xs={12}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="title_Text"
                                    label="Title"
                                    variant="outlined"
                                    fullWidth
                                    onChange={(e) => onChangeData('title_Text', e.target.value)}
                                    value={state?.title_Text}
                                    name="title_Text"
                                    required
                                    style={{ margin: "7px 0" }}
                                />
                            </Grid>
                            <Grid Item xs={12}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="sub_Text"
                                    label="Text"
                                    variant="outlined"
                                    fullWidth
                                    onChange={(e) => onChangeData('sub_Text', e.target.value)}
                                    value={state?.sub_Text}
                                    name="sub_Text"
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
