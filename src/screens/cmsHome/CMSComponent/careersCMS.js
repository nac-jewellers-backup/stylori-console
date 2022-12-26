import React, { useState, useContext } from "react";
import {
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
// import EditorConvertToHTML from "./richTextEditor";



const header = [
    "S.No",
    "Heading",
    "View",
    "Action",
];
const tableData = [
    { type: "INCREMENT", name: "" },
    { type: "TEXT", name: "role" },
    { type: "VIEW_DETAILS", name: "" },
    { type: "EDIT", name: "" },
];

const initialState = {
    "heading": "",
    "descriptionOne": "",
    "descriptionTwo": "",
    "finalDescription": "",
    "postion": "",
    "role": "",
    "JobDescription": "",
    "jobExperience": "",
    "KeyRole": {
        "title": "",
        "listingPoints": []
    },
    "requirements": {
        "title": "",
        "listingPoints": []
    },
    "note": {
        "title": "",
        "txt": ""
    },
    "contactUs": ""
}

const initialEdit = {
    isEdit: false,
    editIndex: null,
    isView: false
};

const CareersCMS = (props) => {
    const { data } = props

    const classes = consolePagesStyles()
    const [open, setOpen] = useState(false)
    const [state, setState] = React.useState({ ...initialState });
    const [editData, setEditData] = React.useState({ ...initialEdit });

    const handleViewStores = (e, rowData, rowIndex) => {
        setState(rowData)
        setOpen(true);
        setEditData({ ...editData, isEdit: false, editIndex: rowIndex });
    }



    const handleClose = () => {
        setOpen(false);
        setState(initialState);
    };

    const handleEdit = (e, rowData, rowIndex) => {
        setOpen(true);
        setEditData({ ...editData, isEdit: true, editIndex: rowIndex })
        setState(rowData)
    }

    console.log(data?.props, "data?.props");
    return (
        <Paper className={classes.root}>
            <TableComp
                header={header}
                tableData={tableData}
                data={data?.props}
                handleEdit={handleEdit}
                handleViewStores={handleViewStores}
                name={"Careers Component"}
                noAddNew
            />
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle id="form-dialog-title">View Career Details</DialogTitle>
                <DialogContent>
                    <Grid container>
                        {
                            editData?.isEdit ?
                                [state]?.map((val, index) => {
                                    return (
                                        <>
                                            <Grid item xs={12}>
                                                <Typography>{val?.heading}</Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    autoFocus
                                                    margin="dense"
                                                    id="descriptionOne"
                                                    label="Description"
                                                    variant="outlined"
                                                    fullWidth
                                                    // onChange={(e) => onChangeData('primaryContantName', e.target.value)}
                                                    value={val?.descriptionOne}
                                                    name="descriptionOne"
                                                    required
                                                    style={{ margin: "7px 0" }}
                                                />
                                                <TextField
                                                    autoFocus
                                                    margin="dense"
                                                    id="descriptionTwo"
                                                    label="Description"
                                                    variant="outlined"
                                                    fullWidth
                                                    // onChange={(e) => onChangeData('primaryContantName', e.target.value)}
                                                    value={val?.descriptionTwo}
                                                    name="descriptionTwo"
                                                    required
                                                    style={{ margin: "7px 0" }}
                                                />
                                                <TextField
                                                    autoFocus
                                                    margin="dense"
                                                    id="finalDescription"
                                                    label="Description"
                                                    variant="outlined"
                                                    fullWidth
                                                    // onChange={(e) => onChangeData('primaryContantName', e.target.value)}
                                                    value={val?.finalDescription}
                                                    name="finalDescription"
                                                    required
                                                    style={{ margin: "7px 0" }}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    autoFocus
                                                    margin="dense"
                                                    id="role"
                                                    label="Role"
                                                    variant="outlined"
                                                    fullWidth
                                                    // onChange={(e) => onChangeData('primaryContantName', e.target.value)}
                                                    value={val?.role}
                                                    name="role"
                                                    required
                                                    style={{ margin: "7px 0" }}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                {/* <EditorConvertToHTML
                                                // handleChangeState={handleChangeTitle}
                                                parentState={val?.JobDescriptions}
                                            /> */}
                                            </Grid>
                                            <Grid item xs={12}>
                                                {/* Years or Experience: */}
                                                <TextField
                                                    autoFocus
                                                    margin="dense"
                                                    id="jobExperience"
                                                    label="Job Experience"
                                                    variant="outlined"
                                                    fullWidth
                                                    // onChange={(e) => onChangeData('primaryContantName', e.target.value)}
                                                    value={val?.jobExperience}
                                                    name="jobExperience"
                                                    required
                                                    style={{ margin: "7px 0" }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} className={classes.keyRoleDiv}>

                                                {/* <EditorConvertToHTML
                                                // handleChangeState={handleChangeTitle}
                                                parentState={val?.KeyRole?.title}
                                            /> */}
                                                <TextField
                                                    autoFocus
                                                    margin="dense"
                                                    id="descr"
                                                    label="Description"
                                                    variant="outlined"
                                                    fullWidth
                                                    // onChange={(e) => onChangeData('primaryContantName', e.target.value)}
                                                    value={val?.KeyRole?.descr}
                                                    name="descr"
                                                    required
                                                    style={{ margin: "7px 0" }}
                                                />
                                                {
                                                    val?.KeyRole?.listingPoints?.map((points) => {
                                                        return (
                                                            <TextField
                                                                autoFocus
                                                                margin="dense"
                                                                id="points"
                                                                label="KeyRole Points"
                                                                variant="outlined"
                                                                fullWidth
                                                                // onChange={(e) => onChangeData('primaryContantName', e.target.value)}
                                                                value={points?.points}
                                                                name="points"
                                                                required
                                                                style={{ margin: "7px 0" }}
                                                            />
                                                        )
                                                    })
                                                }



                                            </Grid>
                                            <Grid item xs={12} className={classes.requirementsDiv}>
                                                {/* <EditorConvertToHTML
                                                // handleChangeState={handleChangeTitle}
                                                parentState={val?.requirements?.title}
                                            /> */}
                                                {
                                                    val?.requirements?.listingPoints?.map((points) => {
                                                        return (
                                                            <TextField
                                                                autoFocus
                                                                margin="dense"
                                                                id="requirements"
                                                                label="Requirements Points"
                                                                variant="outlined"
                                                                fullWidth
                                                                // onChange={(e) => onChangeData('primaryContantName', e.target.value)}
                                                                value={points?.points}
                                                                name="requirements"
                                                                required
                                                                style={{ margin: "7px 0" }}
                                                            />
                                                        )
                                                    })
                                                }
                                            </Grid>
                                            <Grid item xs={12}>
                                                {/* <EditorConvertToHTML
                                                // handleChangeState={handleChangeTitle}
                                                parentState={val?.note?.title}
                                            /> */}
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    autoFocus
                                                    margin="dense"
                                                    id="note"
                                                    label="Note"
                                                    variant="outlined"
                                                    fullWidth
                                                    // onChange={(e) => onChangeData('primaryContantName', e.target.value)}
                                                    value={val?.note?.txt}
                                                    name="note"
                                                    required
                                                    style={{ margin: "7px 0" }}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    autoFocus
                                                    margin="dense"
                                                    id="contactUs"
                                                    label="Contact Us"
                                                    variant="outlined"
                                                    fullWidth
                                                    // onChange={(e) => onChangeData('primaryContantName', e.target.value)}
                                                    name="contactUs"
                                                    value={val?.contactUs}
                                                    required
                                                    style={{ margin: "7px 0" }}
                                                />
                                            </Grid>
                                        </>
                                    )
                                })
                                :
                                [state]?.map((val, index) => {
                                    return (
                                        <>
                                            <Grid item xs={12}>
                                                <Typography className={classes.careerColor}>{val?.heading}</Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Typography className={classes.careerdescr}>{val.descriptionOne}
                                                </Typography>
                                                <Typography className={classes.careerdescr}>{val.descriptionTwo}
                                                </Typography>
                                                <Typography className={classes.careerdescr}>{val.finalDescription}</Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Typography className={classes.positionHead}>{val?.postion}</Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Typography className={classes.role}>{val?.role}</Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Typography className={classes.jobHead}>{val?.JobDescription}</Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                Years or Experience:
                                                <span className={classes.experience}>{val?.jobExperience}</span>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Typography className={classes.jobHead}>{val?.KeyRole?.title} :
                                                    <span className={classes.careerdescr}> {val?.KeyRole?.descr}
                                                    </span></Typography>
                                                <ul>
                                                    {
                                                        val?.KeyRole?.listingPoints?.map((points) => {
                                                            return (
                                                                <li>{points?.points}</li>
                                                            )
                                                        })
                                                    }
                                                </ul>



                                            </Grid>
                                            <Grid item xs={12}>
                                                <Typography className={classes.jobHead}>
                                                    {val?.requirements?.title} : </Typography>
                                                <ul>
                                                    {
                                                        val?.requirements?.listingPoints?.map((points) => {
                                                            return (
                                                                <li>{points?.points}</li>
                                                            )
                                                        })
                                                    }
                                                </ul>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Typography className={classes.jobHead}>{val?.note?.title} :
                                                    <span className={classes.careerdescr}> {val?.note?.txt}</span>
                                                </Typography>
                                                {/* <EditorConvertToHTML
                                                // handleChangeState={handleChangeTitle}
                                                parentState={}
                                            /> */}
                                            </Grid>

                                            <Grid item xs={12}>
                                                <Typography>{val?.contactUs}</Typography>
                                            </Grid>
                                        </>
                                    )
                                })
                        }
                    </Grid>
                </DialogContent>
                <DialogActions>
                    {/* <Button onClick={onsubmitvalue}>Add</Button> */}
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </Paper>
    )
}
export default CareersCMS