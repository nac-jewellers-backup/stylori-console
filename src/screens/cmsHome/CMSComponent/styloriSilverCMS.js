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
    "Content",
    "Action",
];
const tableData = [
    { type: "INCREMENT", name: "" },
    { type: "TEXT", name: "title" },
    { type: "TEXT", name: "content" },
    { type: "EDIT", name: "" },
];

const initialState = {
    title: "",
    content: ""
}

const initialEdit = {
    isEdit: false,
    editIndex: null,
}


const StyloriSilverCMS = (props) => {
    const { data } = props

    const [open, setOpen] = useState(false)
    const [state, setState] = useState({ ...initialState })
    const [arrData, setArrData] = useState()
    const [editData, setEditData] = useState({ ...initialEdit })

    useEffect(() => {
        setArrData([data?.props])
    }, [])


    const onChangeData = (key, value) => {
        setState({ ...state, [key]: value })
    }

    const handleEdit = (e, rowData, rowIndex) => {
        setOpen(true)
        setEditData({ ...editData, isEdit: true, editIndex: rowIndex })
        setState(rowData)
    }

    const handleClose = () => {
        setOpen(false)
    }


    const validate = () => {
        if (
            state.title &&
            state.content
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
            let getData = [];
            getData = {
                component: props?.data?.component,
                props: values
            };

            setOpen(false);
            setState(initialState);
            setEditData(initialEdit);

            props.handleSubmit(getData, "StyloriSilver", "props");
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
                name={"Stylori Silver Component"}
                noAddNew
            />
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle id="form-dialog-title">Edit Stylori Silver Details</DialogTitle>
                <DialogContent>
                    {
                        <Grid container>
                            <Grid item xs={12}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="title"
                                    label="Title"
                                    variant="outlined"
                                    fullWidth
                                    onChange={(e) => onChangeData('title', e.target.value)}
                                    value={state?.title}
                                    name="title"
                                    required
                                    style={{ margin: "7px 0" }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="content"
                                    label="Content"
                                    variant="outlined"
                                    fullWidth
                                    onChange={(e) => onChangeData('content', e.target.value)}
                                    value={state?.content}
                                    name="content"
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
export default StyloriSilverCMS