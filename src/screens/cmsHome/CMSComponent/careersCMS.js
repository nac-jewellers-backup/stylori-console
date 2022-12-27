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
import update from 'immutability-helper';
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
        "descr": "",
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
const initialKeyPoints = {
    points: ""
}

const initialRequirementPoints = {
    points: ""
}

const CareersCMS = (props) => {
    const { data } = props

    const classes = consolePagesStyles()
    const [open, setOpen] = useState(false)
    const [state, setState] = React.useState({ ...initialState });
    const [editData, setEditData] = React.useState({ ...initialEdit });
    const [keyrolePoint, setKeyRolePoint] = React.useState({ ...initialKeyPoints })
    const [requirementPoint, setRequirementPoint] = React.useState({ ...initialRequirementPoints })


    const handleViewStores = (e, rowData, rowIndex) => {
        setState(rowData)
        setOpen(true);
        setEditData({ ...editData, isEdit: false, editIndex: rowIndex });
    }



    const handleClose = () => {
        setOpen(false);
        setState(initialState);
    };

    const onChangeData = (key, value) => {
        // debugger
        setState({ ...state, [key]: value })
    }

    const handleChangeKeyRoleData = (key, value, i, parentKey) => {
        const data = [...state?.KeyRole?.listingPoints]
        data[i]["points"] = value
        setState({ ...state, ["keyRole"]: data })
    }


    const handleChangeRequirementData = (key, value, i, parentKey) => {
        debugger
        const data = [...state?.requirements?.listingPoints]
        data[i]["points"] = value
        setState({
            ...state, ["requirements"]: {
                ...state.requirements, listingPoints: data
            }
        })
        console.log("points", data)
    }

    const handlekeyRoleAdd = (key, value) => {
        setKeyRolePoint({ ...keyrolePoint, [key]: value })
    }

    const handleReqAdd = (key, value) => {
        setRequirementPoint({ ...requirementPoint, [key]: value })
    }

    const addKeyRolePoint = () => {
        const constructedData = {
            points: keyrolePoint.points
        }
        const data = [...state?.KeyRole?.listingPoints, constructedData]
        setState({
            ...state, KeyRole: {
                ...state.KeyRole, listingPoints: data
            }
        })
        setKeyRolePoint({ ...initialKeyPoints })
    }
    const addReqPoint = () => {
        const constructedData = {
            points: requirementPoint.points
        }
        const data = [...state?.requirements?.listingPoints, constructedData]
        setState({
            ...state, requirements: {
                ...state.requirements, listingPoints: data
            }
        })
        setRequirementPoint({ ...initialRequirementPoints })
    }


    const handleEdit = (e, rowData, rowIndex) => {
        setOpen(true);
        setEditData({ ...editData, isEdit: true, editIndex: rowIndex })
        setState(rowData)
    }

    const validate = () => {
        if (
            state.heading &&
            state.descriptionOne &&
            state.descriptionTwo &&
            state.finalDescription &&
            state.postion &&
            state.role &&
            state.JobDescription &&
            state.jobExperience &&
            state.KeyRole &&
            state.requirements &&
            state.note &&
            state.contactUs
        ) {
            return true;
        } else {
            return false;
        }
    };

    const onsubmitvalue = async () => {

        if (validate) {
            const values = data?.props;
            values.splice(editData.editIndex, 1, state);
            let getData = [];
            getData = {
                component: props?.data?.component,
                props: values
            };

            setOpen(false);
            setState(initialState);
            setEditData(initialEdit);

            props.handleSubmit(getData, "careersComponent", "props");
        }
        else {
            alert.setSnack({
                open: true,
                severity: "error",
                msg: "Please fill all the fields in the form ",
            });
        }

    };

    console.log(data?.props, "data?.props");
    console.log(state, "state ===>");
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
                                                    onChange={(e) => onChangeData('descriptionOne', e.target.value)}
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
                                                    onChange={(e) => onChangeData('descriptionTwo', e.target.value)}
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
                                                    onChange={(e) => onChangeData('finalDescription', e.target.value)}
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
                                                    onChange={(e) => onChangeData('role', e.target.value)}
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
                                                    onChange={(e) => onChangeData('jobExperience', e.target.value)}
                                                    value={val?.jobExperience}
                                                    name="jobExperience"
                                                    required
                                                    style={{ margin: "7px 0" }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} >

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
                                                <Box className={classes.addpoints}>
                                                    <TextField
                                                        autoFocus
                                                        margin="dense"
                                                        id="points"
                                                        label="KeyRole Point"
                                                        variant="outlined"
                                                        fullWidth
                                                        onChange={(e) => handlekeyRoleAdd('points', e.target.value)}
                                                        value={keyrolePoint?.points}
                                                        name="points"
                                                        required
                                                        style={{ margin: "7px 0" }}
                                                    />
                                                    <Button
                                                        onClick={addKeyRolePoint}
                                                        style={{ marginLeft: "10px" }} variant="contained" color="primary">ADD
                                                    </Button>
                                                </Box>
                                                <div className={classes.keyRoleDiv}>

                                                    {
                                                        val?.KeyRole?.listingPoints?.map((points, i) => {
                                                            return (
                                                                <TextField
                                                                    autoFocus
                                                                    margin="dense"
                                                                    id="points"
                                                                    label="Key Role Points"
                                                                    variant="outlined"
                                                                    fullWidth
                                                                    onChange={(e) => handleChangeKeyRoleData('points', e.target.value, i, "KeyRole")}
                                                                    value={points?.points}
                                                                    name="points"
                                                                    required
                                                                    style={{ margin: "7px 0" }}
                                                                />
                                                            )
                                                        })
                                                    }
                                                </div>



                                            </Grid>
                                            <Grid item xs={12} >
                                                {/* <EditorConvertToHTML
                                                // handleChangeState={handleChangeTitle}
                                                parentState={val?.requirements?.title}
                                            /> */}
                                                <Box className={classes.addpoints}>
                                                    <TextField
                                                        autoFocus
                                                        margin="dense"
                                                        id="points"
                                                        label="Requirement Point"
                                                        variant="outlined"
                                                        fullWidth
                                                        onChange={(e) => handleReqAdd('points', e.target.value)}
                                                        value={requirementPoint?.points}
                                                        name="points"
                                                        required
                                                        style={{ margin: "7px 0" }}
                                                    />
                                                    <Button
                                                        onClick={addReqPoint}
                                                        style={{ marginLeft: "10px" }}
                                                        variant="contained" color="primary">ADD</Button>
                                                </Box>
                                                <div className={classes.requirementsDiv}>

                                                    {
                                                        val?.requirements?.listingPoints?.map((points, i) => {
                                                            return (
                                                                <TextField
                                                                    autoFocus
                                                                    margin="dense"
                                                                    id="requirements"
                                                                    label="Requirements Points"
                                                                    variant="outlined"
                                                                    fullWidth
                                                                    onChange={(e) => handleChangeRequirementData('points', e.target.value, i, "requirements")}
                                                                    value={points?.points}
                                                                    name="requirements"
                                                                    required
                                                                    style={{ margin: "7px 0" }}
                                                                />
                                                            )
                                                        })
                                                    }
                                                </div>

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
                                                    onChange={(e) => onChangeData('contactUs', e.target.value)}
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
                    <Button onClick={onsubmitvalue}>Add</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </Paper>
    )
}
export default CareersCMS