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
import { useContext } from "react";
import TableComp from "../../../components/table/tableComp";
import { AlertContext } from "../../../context";
import { UploadImage } from "../../../utils/imageUpload";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { consolePagesStyles } from "./style";

const header = ["S.No", "Image", "Navigation URL", "Action"];

const tableData = [
  { type: "INCREMENT", name: "" },
  { type: "WEB_IMAGE", name: "image" },
  { type: "TEXT", name: "navigateUrl" },
  { type: "ACTION", name: "" },
];

const CollectionJewelleryCardCMS = (props) => {
  const classes = consolePagesStyles();

  const alert = useContext(AlertContext);

  const [open, setOpen] = React.useState(false);
  const initialState = {
    image: "",
    navigateUrl: "",
  };

  const [disableButton, setDisable] = React.useState({
    image: false,
  });

  const initialEdit = {
    isEdit: false,
    editIndex: null,
  };

  const [editData, setEditData] = React.useState(initialEdit);
  const [state, setState] = React.useState(initialState);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const onsubmitvalue = async () => {
    if (state.image && state.navigateUrl) {
      if (editData.isEdit) {
        const editContent = props?.data?.props?.jewelleryGrid;
        editContent.splice(editData.editIndex, 1, state);
        let getData = [];
        getData = {
          component: props?.data?.component,
          props: {
            jewelleryGrid: editContent,
          },
        };
        setOpen(false);
        props.handleSubmit(getData, "CollectionJewelleryData", "jewelleryGrid");
      } else {
        let getData = [];
        getData = {
          component: props?.data?.component,
          props: {
            jewelleryGrid: [...props?.data?.props?.jewelleryGrid, state],
          },
        };
        setOpen(false);
        props.handleSubmit(getData, "CollectionJewelleryData", "jewelleryGrid");
      }
    } else {
      alert.setSnack({
        open: true,
        severity: "error",
        msg: "Please fill all the fields",
      });
    }
  };

  const handleDelete = (e, rowData, rowIndex) => {
    let getData = [];
    const cardContent = props?.data?.props?.jewelleryGrid;
    cardContent.splice(rowIndex, 1);
    getData = {
      component: props?.data?.component,
      props: {
        jewelleryGrid: cardContent,
      },
    };
    props.handleSubmit(getData, "CollectionJewelleryData", "jewelleryGrid");
  };

  const handleClose = () => {
    setOpen(false);
    setState(initialState);
  };

  const onChangeData = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const handleEdit = (e, rowData, rowIndex) => {
    setOpen(true);
    setEditData({ ...editData, isEdit: true, editIndex: rowIndex });
    setState(rowData);
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

  return (
    <>
      <Paper className={classes.root}>
        <TableComp
          header={header}
          tableData={tableData}
          name={"Collection Jewellery Card Component"}
          data={props?.data?.props?.jewelleryGrid}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          handleAddNew={handleClickOpen}
          noAddNew
        />

        {/* Dialog */}

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle id="form-dialog-title">
            Add New Collection Jewellery Card Item
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="navigateUrl"
              label="Navigate Url"
              variant="outlined"
              fullWidth
              value={state.navigateUrl}
              onChange={onChangeData}
              name="navigateUrl"
              required
            />

            <Grid
              container
              justifyContent="space-around"
              style={{ padding: "16px 0px" }}
            >
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
                    Jewellery Image
                  </Button>
                </label>
              </Grid>
            </Grid>
            {state.image.length > 0 && (
              <Grid
                container
                justifyContent="flex-start"
                style={{ padding: "16px 0px" }}
              >
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
          </DialogContent>
          <DialogActions>
            <Button onClick={onsubmitvalue}>Add</Button>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </>
  );
};

export default CollectionJewelleryCardCMS;
