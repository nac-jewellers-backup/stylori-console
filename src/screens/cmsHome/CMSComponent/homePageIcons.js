import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Paper,
  TextField,
} from "@material-ui/core";
import React from "react";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { UploadImage } from "../../../utils/imageUpload";
import { AlertContext } from "../../../context";
import { useContext } from "react";
import TableComp from "../../../components/table/tableComp";
import { consolePagesStyles } from "./style";

const header = ["S.No", "Name", "Icon Image", "Image Class Name", "Action"];
const tableData = [
  { type: "INCREMENT", name: "" },
  { type: "TEXT", name: "name" },
  { type: "WEB_IMAGE", name: "icon" },
  { type: "TEXT", name: "class" },
  { type: "ACTION", name: "" },
];

const HomePageIconsCMS = (props) => {
  console.log("11-11", props);
  const classes = consolePagesStyles();
  const alert = useContext(AlertContext);
  const [open, setOpen] = React.useState(false);
  const initialState = {
    name: "",
    icon: "",
    class: "",
  };
  const initialEdit = {
    isEdit: false,
    editIndex: null,
  };
  const [state, setState] = React.useState(initialState);
  const [editData, setEditData] = React.useState(initialEdit);
  const [disableButton, setDisable] = React.useState({
    icon: false,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setState(initialState);
    setEditData(initialEdit);
  };

  const onChangeData = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const onsubmitvalue = async () => {
    if (state.name && state.icon && state.class) {
      if (editData.isEdit) {
        const editContent = props?.data?.props?.cardContent;
        editContent.splice(editData.editIndex, 1, state);
        let getData = [];
        getData = {
          component: props?.data?.component,
          props: {
            banners: editContent,
          },
        };
        setOpen(false);
        props.handleSubmit(getData, "HomePageIconsList", "cardContent");
      } else {
        let getData = [];
        getData = {
          component: props?.data?.component,
          props: {
            cardContent: [...props?.data?.props?.cardContent, state],
          },
        };
        setOpen(false);
        props.handleSubmit(getData, "HomePageIconsList", "cardContent");
      }
      setEditData(initialEdit);
      setState(initialState);
    } else {
      alert.setSnack({
        open: true,
        severity: "error",
        msg: "Please fill all the fields",
      });
    }
  };

  const handleChange = (file, name) => {
    UploadImage(file)
      .then((res) => {
        if (res?.data?.web) {
          setState({
            ...state,
            [name]: res?.data?.web,
          });
          // setDisable({ ...disableButton, [name]: true });

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
  };

  const handleDelete = (e, rowData, rowIndex) => {
    let getData = [];
    const content = props?.data?.props?.cardContent;
    content.splice(rowIndex, 1);
    getData = {
      component: props?.data?.component,
      props: {
        cardContent: content,
      },
    };
    props.handleSubmit(getData, "HomePageIconsList", "cardContent");
  };

  const handleEdit = (e, rowData, rowIndex) => {
    setOpen(true);
    setEditData({ ...editData, isEdit: true, editIndex: rowIndex });
    setState(rowData);
  };

  return (
    <Paper className={classes.root}>
      <TableComp
        header={header}
        tableData={tableData}
        data={props?.data?.props?.cardContent}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        name={"Home Page Icon Component"}
        handleAddNew={handleClickOpen}
        noAddNew
      />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="form-dialog-title">
          Add New Home Page Icons Item
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            variant="outlined"
            fullWidth
            onChange={onChangeData}
            value={state.name}
            name="name"
            required
          />
          <TextField
            margin="dense"
            id="class"
            label="Icon's Class Name"
            variant="outlined"
            fullWidth
            onChange={onChangeData}
            value={state.class}
            name="class"
            required
          />
          <Grid container style={{ padding: "16px 0px" }}>
            <Grid item>
              <input
                accept="image/*"
                className={classes.input}
                style={{ display: "none" }}
                id="button-files"
                multiple
                type="file"
                onChange={(e) => handleChange(e.target.files[0], "icon")}
              />
              <label htmlFor="button-files">
                <Button
                  variant="outlined"
                  component="span"
                  disabled={disableButton.icon}
                  startIcon={<CloudUploadIcon />}
                >
                  Desktop Image
                </Button>
              </label>
            </Grid>
            {state.icon.length > 0 && (
              <Grid container style={{ padding: "16px 0px" }}>
                {state.icon.length > 0 && (
                  <Grid style={{ textAlign: "center" }} xs={6} md={6} item>
                    <img
                      alt="nacimages"
                      src={state.icon}
                      style={{ width: "100px", height: "auto" }}
                    />
                  </Grid>
                )}
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onsubmitvalue}>Add</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default HomePageIconsCMS;
