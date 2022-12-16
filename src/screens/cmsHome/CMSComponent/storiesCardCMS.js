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

const header = [
  "S.No",
  "Image",
  "Title",
  "Card Header",
  "Card Content",
  "Action",
];
const tableData = [
  { type: "INCREMENT", name: "" },
  { type: "WEB_IMAGE", name: "image" },
  { type: "TEXT", name: "title" },
  { type: "TEXT", name: "cardHeader" },
  { type: "TEXT", name: "cardContent" },
  { type: "ACTION", name: "" },
];

const StoriesCardCMS = (props) => {
  const classes = consolePagesStyles();
  const alert = useContext(AlertContext);
  const [open, setOpen] = React.useState(false);
  const initialState = {
    image: "",
    title: "",
    cardHeader: "",
    cardContent: "",
  };
  const initialEdit = {
    isEdit: false,
    editIndex: null,
  };
  const [state, setState] = React.useState(initialState);
  const [editData, setEditData] = React.useState(initialEdit);
  const [disableButton, setDisable] = React.useState({
    image: false,
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
    if (state.title && state.image && state.cardHeader && state.cardContent) {
      if (editData.isEdit) {
        const editContent = props?.data?.props?.storiesData;
        editContent.splice(editData.editIndex, 1, state);
        let getData = [];
        getData = {
          component: props?.data?.component,
          props: {
            storiesData: editContent,
          },
        };
        setOpen(false);
        props.handleSubmit(getData, "StoriesCard", "storiesData");
      } else {
        let getData = [];
        getData = {
          component: props?.data?.component,
          props: {
            storiesData: [...props?.data?.props?.storiesData, state],
          },
        };
        setOpen(false);
        props.handleSubmit(getData, "StoriesCard", "storiesData");
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
    const content = props?.data?.props?.storiesData;
    content.splice(rowIndex, 1);
    getData = {
      component: props?.data?.component,
      props: {
        storiesData: content,
      },
    };
    props.handleSubmit(getData, "StoriesCard", "storiesData");
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
        data={props?.data?.props?.storiesData}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        name={"Stories Card Component"}
        handleAddNew={handleClickOpen}
        noAddNew
      />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="form-dialog-title">
          Add New Stories Card Item
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            variant="outlined"
            fullWidth
            onChange={onChangeData}
            value={state.title}
            name="title"
            required
          />
          <TextField
            margin="dense"
            id="cardHeader"
            label="Card Header"
            variant="outlined"
            fullWidth
            onChange={onChangeData}
            value={state.cardHeader}
            name="cardHeader"
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="cardContent"
            label="Card Content"
            variant="outlined"
            fullWidth
            onChange={onChangeData}
            value={state.cardContent}
            name="cardContent"
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
                onChange={(e) => handleChange(e.target.files[0], "image")}
              />
              <label htmlFor="button-files">
                <Button
                  variant="outlined"
                  component="span"
                  disabled={disableButton.image}
                  startIcon={<CloudUploadIcon />}
                >
                  Desktop Image
                </Button>
              </label>
            </Grid>
            {state.image.length > 0 && (
              <Grid container style={{ padding: "16px 0px" }}>
                {state.image.length > 0 && (
                  <Grid style={{ textAlign: "center" }} xs={6} md={6} item>
                    <img
                      alt="nacimages"
                      src={state.image}
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

export default StoriesCardCMS;
