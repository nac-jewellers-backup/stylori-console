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
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { AlertContext } from "../../../context";
import { TableComp } from "../../../components/table";
import { consolePagesStyles } from "./style";
import { UploadImage } from "../../../utils/imageUpload";
import DeleteIcon from "@material-ui/icons/Delete";
import update from 'immutability-helper';





const header = [
    "S.No",
    "Banner",
    "primary Image Name",
    "Primary Image",
    "Secondary Image",
    "Secondary Image Name",
    "View Details",
    "Action",
];
const tableData = [
    { type: "INCREMENT", name: "" },
    { type: "IMG_ARRAY", name: "containerImage" },
    { type: "TEXT", name: "primaryContantName" },
    { type: "WEB_IMAGE", name: "primaryImage" },
    { type: "WEB_IMAGE", name: "secondaryImage" },
    { type: "TEXT", name: "secondaryContantName" },
    { type: "VIEW_STORES", name: "" },
    { type: "ACTION", name: "" },
];


const initialState = {
    containerImage: {
        img: "",
        navigateUrl: ""
    },
    primaryImage: "",
    primaryNavigateUrl: "",
    primaryContantName: "",
    primaryButtonName: "",
    primaryCarouselDetails: [],
    secondaryImage: "",
    secondaryNavigateUrl: "",
    secondaryContantName: "",
    secondaryButtonName: "",
    secondaryCarouselDetails: []
}
const initialEdit = {
    isEdit: false,
    editIndex: null,
    isView: false
};

const initialPrimary = {
    imageTitle: "",
    price: "",
    navigateUrl: "",
    primaryCarouselitem: "",
}

const initialSecondary = {
    imageTitle: "",
    price: "",
    navigateUrl: "",
    primaryCarouselitem: "",
}


const CollectionCarouselCMS = (props) => {

    const { data } = props
    console.log(data?.props, "Parentpropsss")




    const classes = consolePagesStyles()
    const [open, setOpen] = useState(false)
    const [state, setState] = React.useState({ ...initialState });
    const [editData, setEditData] = React.useState(initialEdit);
    const [formState, setFormState] = React.useState({
        imageTitle: ""
    })
    const [hidden, setHidden] = React.useState({
        primary: false
    })
    const [primary, setPrimary] = React.useState({ ...initialPrimary })
    const [secondary, setSecondary] = React.useState({ ...initialSecondary })


    const handleViewStores = () => {
        debugger
        setOpen(true);
        setEditData({ ...editData, isEdit: false, isView: true });
        // setEditData(initialEdit);

    }


    const updatePrimary = (key, name) => {
        debugger
        setPrimary({ ...primary, [key]: name })
    }

    const updateSecondary = (key, name) => {
        debugger
        setSecondary({ ...secondary, [key]: name })
    }

    const updateState = (key, value) => {
        setHidden({ ...hidden, [key]: value })
    }

    const handleChange = (file, name) => {
        if (name === "containerImage") {
            UploadImage(file)
                .then((res) => {
                    if (res?.data?.web) {
                        debugger
                        setState({
                            ...state,
                            containerImage: {
                                img: res?.data?.web
                            }
                        });
                        alert.setSnack({
                            open: true,
                            severity: "success",
                            msg: "Image Uploaded Successfully",
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } else if (name === "primaryCarouselImage") {
            UploadImage(file)
                .then((res) => {
                    if (res?.data?.web) {
                        debugger
                        updatePrimary("primaryCarouselitem", res?.data?.web)

                        alert.setSnack({
                            open: true,
                            severity: "success",
                            msg: "Image Uploaded Successfully",
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } else if (name === "secondaryCarouselImage") {
            UploadImage(file)
                .then((res) => {
                    if (res?.data?.web) {
                        debugger
                        updateSecondary("primaryCarouselitem", res?.data?.web)

                        alert.setSnack({
                            open: true,
                            severity: "success",
                            msg: "Image Uploaded Successfully",
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            UploadImage(file)
                .then((res) => {
                    if (res?.data?.web) {
                        setState({
                            ...state,
                            [name]: res?.data?.web,
                        });
                        // updatePrimary(name , res?.data?.web)
                        alert.setSnack({
                            open: true,
                            severity: "success",
                            msg: "Image Uploaded Successfully",
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }

    };

    const onChangeData = (key, name) => {
        debugger
        setState(prevState => ({
            ...prevState,
            [key]: name,
        }));
    };

    const handleClose = () => {
        setOpen(false);
        setState(initialState);
    };

    const handleDelete = (e, rowData, rowIndex) => {
        debugger
        let getData = [];
        const content = data?.props?.Testimony?.carousel?.data;
        content.splice(rowIndex, 1);
        getData = {
            component: props?.data?.component,
            props: {
                carouselTop: data.props.carouselTop,
                Testimony: {
                    carousel: {
                        setting: data.props.Testimony.carousel.setting,
                        data: content
                    }
                }
            }
        };

        console.log(getData, "DELETEgetDatagetData")
        props.handleSubmit(getData, "collectionCarouselCardComponent", "data");
    };

    const handleAddNew = () => {
        setOpen(true);
        setState(initialState)
    }

    const delPrimaryItems = (val, i, data) => {
        const delRow = [...state?.primaryCarouselDetails]
        delRow.splice(i, 1);
        setState({ ...state, primaryCarouselDetails: delRow })
    }

    const delSecondaryItems = (val, i, data) => {
        const delRow = [...state?.secondaryCarouselDetails]
        delRow.splice(i, 1);
        setState({ ...state, secondaryCarouselDetails: delRow })
    }

    const addPrimaryItems = () => {
        debugger
        updateState("primary", true)
        const payload = {
            imageTitle: primary?.imageTitle ?? "",
            img: primary?.primaryCarouselitem ?? "",
            navigateUrl: primary?.navigateUrl ?? "",
            price: primary?.price ?? ""
        }
        const data = [...state?.primaryCarouselDetails, payload]
        onChangeData("primaryCarouselDetails", data)
        setPrimary({ ...initialPrimary })
    }

    const addSecondaryItems = () => {
        debugger
        const payload = {
            imageTitle: secondary?.imageTitle ?? "",
            img: secondary?.primaryCarouselitem ?? "",
            navigateUrl: secondary?.navigateUrl ?? "",
            price: secondary?.price ?? ""
        }
        const data = [...state?.secondaryCarouselDetails, payload]
        onChangeData("secondaryCarouselDetails", data)

        updateState("secondary", true)
        setSecondary({ ...initialSecondary })

    }

    const handleEdit = (e, rowData, rowIndex) => {
        debugger
        setOpen(true);
        setHidden({ ...hidden, primary: "true" })
        setEditData({ ...editData, isEdit: true, editIndex: rowIndex, isView: false });
        setState({
            ...rowData,
            primaryCarouselDetails: rowData.primaryCarouselDetails,
            secondaryCarouselDetails: rowData.secondaryCarouselDetails
        });
        // setEditData(initialEdit)
    }


    const validate = () => {
        if (
            state.containerImage &&
            state.primaryImage &&
            state.primaryNavigateUrl &&
            state.primaryContantName &&
            state.primaryButtonName &&
            state.primaryCarouselDetails &&
            state.secondaryImage &&
            state.secondaryNavigateUrl &&
            state.secondaryContantName &&
            state.secondaryButtonName &&
            state.secondaryCarouselDetails
        ) {
            return true;
        } else {
            return false;
        }
    };

    const onsubmitvalue = async () => {

        if (validate) {
            if (editData.isEdit) {
                const values = data?.props?.Testimony?.carousel?.data;
                values.splice(editData.editIndex, 1, state);
                let getData = [];
                getData = {
                    component: props?.data?.component,
                    props: {
                        carouselTop: data.props.carouselTop,
                        Testimony: {
                            carousel: {
                                setting: data.props.Testimony.carousel.setting,
                                data: values
                            }
                        }
                    }
                };

                setOpen(false);
                setState(initialState);
                setEditData(initialEdit);
                console.log(getData, "EDITgetDatagetData")

                props.handleSubmit(getData, "collectionCarouselCardComponent", "data");
            } else {
                debugger
                let getData = [];
                getData = {
                    component: props?.data?.component,
                    props: {
                        carouselTop: data.props.carouselTop,
                        Testimony: {
                            carousel: {
                                setting: data.props.Testimony.carousel.setting,
                                data: [...data?.props?.Testimony?.carousel?.data, state]
                            }
                        }
                    }
                };
                setOpen(false);
                setState(initialState);
                setEditData(initialEdit);
                console.log(getData, "ADDgetDatagetData")

                props.handleSubmit(getData, "collectionCarouselCardComponent", "data");

            }
        } else {
            alert.setSnack({
                open: true,
                severity: "error",
                msg: "Please fill all the fields in the form ",
            });
        }

    };

    console.log(primary, "stateRowstateRow")
    console.log(state, "statestatestate")


    const handlePrimaryContentChange = (key, value, index) => {
        debugger
        const newState = update(state, {
            primaryCarouselDetails: {
                [index]: {
                    [key]: { $set: value }
                }
            }
        })
        setState(newState)
    }

    const handleSecondaryContentChange = (key, value, index) => {
        debugger
        const newState = update(state, {
            secondaryCarouselDetails: {
                [index]: {
                    [key]: { $set: value }
                }
            }
        })
        setState(newState)
    }

    return (
        <>
            <TableComp
                name="Collection Component"
                header={header}
                tableData={tableData}
                data={data?.props?.Testimony?.carousel?.data}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                handleAddNew={handleAddNew}
                handleViewStores={handleViewStores}
            />
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle id="form-dialog-title">View Collection Details</DialogTitle>
                {
                    editData?.isView ?
                        <DialogContent>
                            <Grid container className={classes.addContainer}>
                                {
                                    data?.props?.Testimony?.carousel?.data?.map((val => {
                                        debugger
                                        return (
                                            <>
                                                <Grid item xs={12}>
                                                    <img
                                                        alt="nacimages"
                                                        src={val?.containerImage?.img}
                                                        style={{ width: "100%", height: "auto" }} />
                                                </Grid>
                                                <h1>Primary Carousel Details</h1>
                                                <Grid item xs={12}>
                                                    <Typography className={classes.collectionName}
                                                        alt="nacimages" >
                                                        {val?.primaryContantName}</Typography>
                                                </Grid>
                                                <Grid item xs={12} style={{ display: "flex" }}>
                                                    <img alt="nacimages"
                                                        src={val?.primaryImage ?? ""}
                                                        style={{ width: "75%", margin: "auto" }} />
                                                </Grid>
                                                <Grid item xs={12} className={classes.carouselItems}>
                                                    <Grid container>

                                                        {val?.primaryCarouselDetails?.map(e => {
                                                            return (
                                                                <Grid item xs={6} style={{ textAlign: "center" }}>
                                                                    <Grid item xs={12} >

                                                                        <Grid item
                                                                            style={{ margin: "7px 0" }}>
                                                                            <img alt="nacimages"
                                                                                className={classes.carouselImage}
                                                                                src={e?.img ?? ""} />
                                                                        </Grid>
                                                                    </Grid>
                                                                    <Grid item xs={12}>
                                                                        <Typography className={classes.carouselImageName}
                                                                            alt="nacimages" >
                                                                            {e?.imageTitle ?? ""}</Typography>
                                                                    </Grid>
                                                                    <Grid item xs={12}>
                                                                        <Typography className={classes.carouselPrice}
                                                                            alt="nacimages" >
                                                                            {e.price ?? ""}</Typography>
                                                                    </Grid>
                                                                    <Grid item xs={12}>
                                                                        <Typography
                                                                            className={classes.carouselUrl}
                                                                            alt="nacimages" >
                                                                            <a>{e?.navigateUrl ?? ""}</a>
                                                                        </Typography>

                                                                    </Grid>

                                                                </Grid>
                                                            )
                                                        })}
                                                    </Grid>

                                                </Grid>
                                                <h1>Secondary Carousel Details</h1>
                                                <Grid item xs={12}>
                                                    <Typography className={classes.collectionName}
                                                        alt="nacimages" >
                                                        {val?.secondaryContantName}</Typography>
                                                </Grid>
                                                <Grid item xs={12} style={{ display: "flex" }}>
                                                    <img alt="nacimages"
                                                        src={val?.secondaryImage ?? ""}
                                                        style={{ width: "75%", margin: "auto" }} />
                                                </Grid>
                                                <Grid item xs={12} className={classes.carouselItemsTwo}>
                                                    <Grid container>

                                                        {val?.secondaryCarouselDetails?.map(e => {
                                                            return (
                                                                <Grid item xs={6} style={{ textAlign: "center" }}>
                                                                    <Grid item xs={12} >

                                                                        <Grid item
                                                                            style={{ margin: "7px 0" }}>
                                                                            <img alt="nacimages"
                                                                                className={classes.carouselImage}
                                                                                src={e?.img ?? ""} />
                                                                        </Grid>
                                                                    </Grid>
                                                                    <Grid item xs={12}>
                                                                        <Typography className={classes.carouselImageName}
                                                                            alt="nacimages" >
                                                                            {e?.imageTitle ?? ""}</Typography>
                                                                    </Grid>
                                                                    <Grid item xs={12}>
                                                                        <Typography className={classes.carouselPrice}
                                                                            alt="nacimages" >
                                                                            {e.price ?? ""}</Typography>
                                                                    </Grid>
                                                                    <Grid item xs={12}>
                                                                        <Typography
                                                                            className={classes.carouselUrl}
                                                                            alt="nacimages" >
                                                                            <a>{e?.navigateUrl ?? ""}</a>
                                                                        </Typography>

                                                                    </Grid>

                                                                </Grid>
                                                            )
                                                        })}
                                                    </Grid>

                                                </Grid>
                                            </>
                                        )
                                    }))
                                }
                            </Grid>
                        </DialogContent>
                        : <DialogContent>
                            <Grid item style={{ margin: "7px 0" }}>
                                <input
                                    accept="image/*"
                                    className={classes.input}
                                    style={{ display: "none" }}
                                    id="containerImage"
                                    multiple
                                    type="file"
                                    onChange={(e) => handleChange(e.target.files[0], "containerImage")}
                                />
                                <label htmlFor="containerImage">
                                    <Button
                                        variant="outlined"
                                        component="span"
                                        startIcon={<CloudUploadIcon />}
                                    >Banner Image
                                    </Button>
                                </label>
                            </Grid>
                            {state?.containerImage?.img && (
                                <Grid item style={{ margin: "7px 0" }}>
                                    <img
                                        alt="nacimages"
                                        src={state?.containerImage?.img}
                                        style={{ width: "100px", height: "auto" }}
                                    />
                                </Grid>
                            )}
                            <Typography className={classes.headerName}>Primary Carousel Item</Typography>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="primaryContantName"
                                label="Primary Colection Name"
                                variant="outlined"
                                fullWidth
                                onChange={(e) => onChangeData('primaryContantName', e.target.value)}
                                value={state.primaryContantName}
                                name="primaryContantName"
                                required
                                style={{ margin: "7px 0" }}
                            />

                            <Grid container className={classes.addContainer} style={{ alignItems: "center" }}>
                                <Grid item xs={6}>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="Image Title"
                                        label="Image Title"
                                        variant="outlined"
                                        fullWidth
                                        onChange={(val) =>
                                            updatePrimary("imageTitle", val.target.value, "primaryCarouselDetails")}
                                        value={primary.imageTitle}
                                        name="Image Title"
                                        required
                                        style={{ margin: "7px 7px 7px 0", }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="price"
                                        label="price"
                                        variant="outlined"
                                        fullWidth
                                        onChange={(val) =>
                                            updatePrimary("price", val.target.value, "primaryCarouselDetails")}
                                        value={primary.price}
                                        name="price"
                                        required
                                        style={{ margin: "7px 0" }}
                                    />
                                </Grid>
                                <Grid item xs={5} >
                                    <input
                                        accept="image/*"
                                        className={classes.input}
                                        style={{ display: "none" }}
                                        id="Primary carousel item"
                                        multiple
                                        type="file"
                                        onChange={(e) => {
                                            handleChange(e.target.files[0], "primaryCarouselImage")
                                        }}
                                    />
                                    <label htmlFor="Primary carousel item">
                                        <Button
                                            variant="outlined"
                                            component="span"
                                            startIcon={<CloudUploadIcon />}
                                        >Primary carousel item
                                        </Button>
                                    </label>
                                    {
                                        primary?.primaryCarouselitem &&
                                        <Grid item style={{ margin: "7px 0" }}>
                                            <img
                                                alt="nacimages"
                                                src={primary?.primaryCarouselitem ?? ""}
                                                style={{ width: "100px", height: "auto" }}
                                            />
                                        </Grid>
                                    }

                                </Grid>
                                <Grid item xs={5}>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="navigateUrl"
                                        label="Navigate Url"
                                        variant="outlined"
                                        fullWidth
                                        onChange={(val) =>
                                            updatePrimary("navigateUrl", val.target.value, "primaryCarouselDetails")}
                                        value={primary.navigateUrl}
                                        name="navigateUrl"
                                        required
                                        style={{ margin: "7px 0" }}
                                    />
                                </Grid>
                                <Grid Item xs={1} className={classes.addBtn}>
                                    <Button variant="contained" color="primary" onClick={addPrimaryItems}>
                                        Add
                                    </Button>
                                </Grid>
                            </Grid>

                            <Grid
                                container
                                style={{ padding: "16px 0px" }}
                            >
                                <Grid item>
                                    <input
                                        accept="image/*"
                                        className={classes.input}
                                        style={{ display: "none" }}
                                        id="Primary collection Image"
                                        multiple
                                        type="file"
                                        onChange={(e) => handleChange(e.target.files[0], "primaryImage")}
                                    />
                                    <label htmlFor="Primary collection Image">
                                        <Button
                                            variant="outlined"
                                            component="span"
                                            startIcon={<CloudUploadIcon />}
                                        >Primary collection Image
                                        </Button>
                                    </label>
                                </Grid>
                            </Grid>
                            {state.primaryImage && (

                                <Grid item xs={12} className={classes.carouselParentImg}>
                                    <img
                                        alt="nacimages"
                                        src={state.primaryImage}
                                        className={classes.carouselImage}
                                    />
                                </Grid>
                            )}
                            {
                                state?.primaryCarouselDetails?.length > 0 &&
                                hidden?.primary &&
                                state?.primaryCarouselDetails?.map((e, i) => {
                                    console.log(e, "eeeeee")
                                    return (
                                        <Grid container className={classes.containerDiv}>

                                            <Grid Item xs={6}>

                                                <TextField
                                                    autoFocus
                                                    margin="dense"
                                                    id={`"imageTitle"`}
                                                    label="Item image title"
                                                    variant="outlined"
                                                    fullWidth
                                                    onChange={(event) => handlePrimaryContentChange("imageTitle", event.target.value, i)}
                                                    value={e?.imageTitle}
                                                    name="imageTitle"
                                                    required
                                                    style={{ margin: "7px 7px 7px 0", }}

                                                />

                                            </Grid>
                                            <Grid item xs={6} style={{ margin: "7px 0" }}>
                                                <input
                                                    accept="image/*"
                                                    className={classes.input}
                                                    style={{ display: "none" }}
                                                    id={`button-files_${i}`}
                                                    multiple
                                                    type="file"
                                                    onChange={(e) => handleChange(e.target.files[0], "primaryDetailImage")}
                                                />
                                                <label htmlFor={`button-files_${i}`}>
                                                    <Button
                                                        variant="outlined"
                                                        component="span"
                                                        startIcon={<CloudUploadIcon />}
                                                    >Primary carousel item
                                                    </Button>
                                                </label>
                                                {e.img && (
                                                    <Grid item style={{ margin: "7px 0" }}>
                                                        <img
                                                            alt="nacimages"
                                                            src={e.img}
                                                            style={{ width: "100px", height: "auto" }}
                                                        />
                                                    </Grid>
                                                )}
                                            </Grid>

                                            <Grid Item xs={5}>
                                                <TextField
                                                    autoFocus
                                                    margin="dense"
                                                    id="price"
                                                    label="Item Price"
                                                    variant="outlined"
                                                    fullWidth
                                                    onChange={(val) => handlePrimaryContentChange("price", val.target.value, i)}
                                                    value={e?.price}
                                                    name="price"
                                                    required
                                                />
                                            </Grid>
                                            <Grid Item xs={5}>
                                                <TextField
                                                    autoFocus
                                                    margin="dense"
                                                    id="navigateUrl"
                                                    label="Navigate Url"
                                                    variant="outlined"
                                                    fullWidth
                                                    onChange={(val) => handlePrimaryContentChange("navigateUrl", val.target.value, i)}
                                                    value={e?.navigateUrl}
                                                    name="navigateUrl"
                                                    required
                                                />
                                            </Grid>
                                            <Grid Item xs={1}
                                                style={{ display: "flex", justifyContent: "center" }}>
                                                <DeleteIcon onClick={(val) => delPrimaryItems(val, i, state)}
                                                    style={{ color: "red", cursor: "pointer" }} />
                                            </Grid>
                                        </Grid>
                                    )
                                })
                            }
                            <Typography className={classes.headerName}>Secondary Carousel Item</Typography>
                            <TextField
                                margin="dense"
                                id="secondaryContantName"
                                label="Secondary collection name"
                                variant="outlined"
                                fullWidth
                                onChange={(e) => onChangeData('secondaryContantName', e.target.value)}
                                value={state.secondaryContantName}
                                name="secondaryContantName"
                                required
                                style={{ margin: "7px 0" }}
                            />

                            <Grid container className={classes.addContainer} style={{ alignItems: "center" }}>
                                <Grid item xs={6}>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="Image Title"
                                        label="Image Title"
                                        variant="outlined"
                                        fullWidth
                                        onChange={(val) =>
                                            updateSecondary("imageTitle", val.target.value, "secondaryCarouselDetails")}
                                        value={secondary.imageTitle}
                                        name="Image Title"
                                        required
                                        style={{ margin: "7px 7px 7px 0", }}

                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="price"
                                        label="price"
                                        variant="outlined"
                                        fullWidth
                                        onChange={(val) =>
                                            updateSecondary("price", val.target.value, "secondaryCarouselDetails")}
                                        value={secondary.price}
                                        name="price"
                                        required
                                        style={{ margin: "7px 0" }}
                                    />
                                </Grid>
                                <Grid item xs={5} >
                                    <input
                                        accept="image/*"
                                        className={classes.input}
                                        style={{ display: "none" }}
                                        id="Secondary carousel item"
                                        multiple
                                        type="file"
                                        onChange={(e) => handleChange(e.target.files[0], "secondaryCarouselImage")}
                                    />
                                    <label htmlFor="Secondary carousel item">
                                        <Button
                                            variant="outlined"
                                            component="span"
                                            startIcon={<CloudUploadIcon />}
                                        >Secondary carousel item
                                        </Button>
                                    </label>
                                    {
                                        secondary?.primaryCarouselitem &&
                                        <Grid item style={{ margin: "7px 0" }}>
                                            <img
                                                alt="nacimages"
                                                src={secondary?.primaryCarouselitem ?? ""}
                                                style={{ width: "100px", height: "auto" }}
                                            />
                                        </Grid>
                                    }
                                </Grid>
                                <Grid item xs={5}>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="navigateUrl"
                                        label="Navigate Url"
                                        variant="outlined"
                                        fullWidth
                                        onChange={(val) =>
                                            updateSecondary("navigateUrl", val.target.value, "secondaryCarouselDetails")}
                                        value={secondary.navigateUrl}
                                        name="navigateUrl"
                                        required
                                        style={{ margin: "7px 0" }}
                                    />
                                </Grid>
                                <Grid Item xs={1} className={classes.addBtn}>
                                    <Button variant="contained" color="primary" onClick={addSecondaryItems}>
                                        Add
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid item style={{ margin: "7px 0" }}>
                                <input
                                    accept="image/*"
                                    className={classes.input}
                                    style={{ display: "none" }}
                                    id="Secondary collection Image"
                                    multiple
                                    type="file"
                                    onChange={(e) => handleChange(e.target.files[0], "secondaryImage")}
                                />
                                <label htmlFor="Secondary collection Image">
                                    <Button
                                        variant="outlined"
                                        component="span"
                                        startIcon={<CloudUploadIcon />}
                                    >Secondary collection Image
                                    </Button>
                                </label>
                            </Grid>
                            {state.secondaryImage && (
                                <Grid item xs={12} className={classes.carouselParentImg}>
                                    <img
                                        alt="nacimages"
                                        src={state.secondaryImage}
                                        className={classes.carouselImage}
                                    />
                                </Grid>
                            )}
                            {
                                state?.secondaryCarouselDetails?.length > 0 &&
                                hidden?.primary &&
                                state?.secondaryCarouselDetails?.map((e, i) => {
                                    return (
                                        <Grid container className={classes.containerDiv}
                                        >

                                            <Grid Item xs={6} style={{ margin: "7px 0" }}>

                                                <TextField
                                                    autoFocus
                                                    margin="dense"
                                                    id="imageTitle"
                                                    label="Item image title"
                                                    variant="outlined"
                                                    fullWidth
                                                    // onChange={(val) => handleChange("imagetitle", val.target.value, i, "secondaryCarouselDetails")}
                                                    onChange={(event) => handleSecondaryContentChange("imageTitle", event.target.value, i)}
                                                    value={e?.imageTitle}
                                                    name="imageTitle"
                                                    required
                                                    style={{ margin: "7px 7px 7px 0", }}

                                                />

                                            </Grid>
                                            <Grid item xs={6} style={{ margin: "7px 0" }}>
                                                <input
                                                    accept="image/*"
                                                    className={classes.input}
                                                    style={{ display: "none" }}
                                                    id={`button-files_${i}`}
                                                    multiple
                                                    type="file"
                                                    onChange={(e) => handleChange(e.target.files[0], "secondary")}
                                                />
                                                <label htmlFor={`button-files_${i}`}>
                                                    <Button
                                                        variant="outlined"
                                                        component="span"
                                                        startIcon={<CloudUploadIcon />}
                                                    >Secondary carousel item
                                                    </Button>
                                                </label>
                                                {e.img && (
                                                    <Grid item style={{ margin: "7px 0" }}>
                                                        <img
                                                            alt="nacimages"
                                                            src={e.img}
                                                            style={{ width: "100px", height: "auto" }}
                                                        />
                                                    </Grid>
                                                )}
                                            </Grid>

                                            <Grid Item xs={5} style={{ margin: "7px 0" }}>
                                                <TextField
                                                    autoFocus
                                                    margin="dense"
                                                    id="price"
                                                    label="Item Price"
                                                    variant="outlined"
                                                    fullWidth
                                                    onChange={(val) => handleSecondaryContentChange("price", val.target.value, i)}
                                                    value={e?.price}
                                                    name="price"
                                                    required
                                                />
                                            </Grid>
                                            <Grid Item xs={5}>
                                                <TextField
                                                    autoFocus
                                                    margin="dense"
                                                    id="navigateUrl"
                                                    label="Navigate Url"
                                                    variant="outlined"
                                                    fullWidth
                                                    onChange={(val) => handleSecondaryContentChange("navigateUrl", val.target.value, i)}
                                                    value={e?.navigateUrl}
                                                    name="navigateUrl"
                                                    required
                                                />
                                            </Grid>
                                            <Grid Item xs={1}
                                                style={{ display: "flex", justifyContent: "center" }}>
                                                <DeleteIcon onClick={(val) => delSecondaryItems(val, i, state)}
                                                    style={{ color: "red", cursor: "pointer" }} />
                                            </Grid>
                                        </Grid>
                                    )
                                })
                            }
                        </DialogContent>
                }
                <DialogActions>
                    <Button onClick={onsubmitvalue}>Add</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
export default CollectionCarouselCMS