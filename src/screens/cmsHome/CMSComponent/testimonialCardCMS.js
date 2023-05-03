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
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { consolePagesStyles } from "./style";
import { UploadImage } from "../../../utils/imageUpload";

const header = [
  "S.No",
  "Title",
  "Image",
  "Image Position",
  "Customer Name",
  "Product Color",
  "Product Id",
  "Sku Url",
  "Markup Price",
  "Message",
  "Action",
];

const tableData = [
  { type: "INCREMENT", name: "" },
  { type: "TEXT", name: "title" },
  { type: "WEB_IMAGE", name: "imageUrl" },
  { type: "TEXT", name: "imagePosition" },
  { type: "TEXT", name: "customerName" },
  { type: "TEXT", name: "productColor" },
  { type: "TEXT", name: "productId" },
  { type: "TEXT", name: "skuUrl" },
  { type: "TEXT", name: "markupPrice" },
  { type: "TEXT", name: "message" },
  { type: "ACTION", name: "" },
];

const TestimonialCollectionCardCMS = (props) => {
  const classes = consolePagesStyles();

  const alert = useContext(AlertContext);

  const [open, setOpen] = React.useState(false);
  const initialState = {
    title: "",
    imageUrl: "",
    imagePosition: "",
    customerName: "",
    productColor: "",
    productId: "",
    skuUrl: "",
    markupPrice: "",
    message: "",
  };

  const initialEdit = {
    isEdit: false,
    editIndex: null,
  };

  const [disableButton, setDisable] = React.useState({
    imageUrl: false,
  });

  const [editData, setEditData] = React.useState(initialEdit);
  const [state, setState] = React.useState(initialState);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const onsubmitvalue = async () => {
    if (
      state.title &&
      state.imageUrl &&
      state.imagePosition &&
      state.customerName &&
      state.productColor &&
      state.productId &&
      state.skuUrl &&
      state.markupPrice &&
      state.message
    ) {
      if (editData.isEdit) {
        const editContent = props?.data?.props?.cardContent;
        editContent.splice(editData.editIndex, 1, state);
        let getData = [];
        getData = {
          component: props?.data?.component,
          props: {
            cardContent: editContent,
          },
        };
        setOpen(false);
        props.handleSubmit(getData, "TestimonialCard", "cardContent");
      } else {
        let getData = [];
        getData = {
          component: props?.data?.component,
          props: {
            cardContent: [...props?.data?.props?.cardContent, state],
          },
        };
        setOpen(false);
        props.handleSubmit(getData, "TestimonialCard", "cardContent");
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
    const cardContent = props?.data?.props?.cardContent;
    cardContent.splice(rowIndex, 1);
    getData = {
      component: props?.data?.component,
      props: {
        cardContent: cardContent,
      },
    };
    props.handleSubmit(getData, "TestimonialCard", "cardContent");
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
          name={"Testimonial Card Component"}
          data={props?.data?.props?.cardContent}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          handleAddNew={handleClickOpen}
        />

        {/* Dialog */}

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle id="form-dialog-title">
            Add New Testimonioal Card Item
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label="Title"
              variant="outlined"
              fullWidth
              value={state.title}
              onChange={onChangeData}
              name="title"
              required
            />
            <TextField
              margin="dense"
              id="imagePosition"
              label="Image Position"
              variant="outlined"
              fullWidth
              value={state.imagePosition}
              onChange={onChangeData}
              name="imagePosition"
              required
            />
            <TextField
              margin="dense"
              id="customerName"
              label="Customer Name"
              variant="outlined"
              fullWidth
              value={state.customerName}
              onChange={onChangeData}
              name="customerName"
              required
            />
            <TextField
              margin="dense"
              id="productColor"
              label="Product Color"
              variant="outlined"
              fullWidth
              value={state.productColor}
              onChange={onChangeData}
              name="productColor"
              required
            />
            <TextField
              autoFocus
              margin="dense"
              id="productId"
              label="Product Id"
              variant="outlined"
              fullWidth
              value={state.productId}
              onChange={onChangeData}
              name="productId"
              required
            />
            <TextField
              margin="dense"
              id="skuUrl"
              label="Sku Url"
              variant="outlined"
              fullWidth
              value={state.skuUrl}
              onChange={onChangeData}
              name="skuUrl"
              required
            />
            <TextField
              margin="dense"
              id="markupPrice"
              label="Markup Price"
              variant="outlined"
              fullWidth
              value={state.markupPrice}
              onChange={onChangeData}
              name="markupPrice"
              required
            />
            <TextField
              margin="dense"
              id="message"
              label="Message"
              variant="outlined"
              fullWidth
              value={state.message}
              onChange={onChangeData}
              name="message"
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
                  onChange={(e) => handleChange(e.target.files[0], "imageUrl")}
                />
                <label htmlFor="button-files">
                  <Button
                    variant="outlined"
                    component="span"
                    disabled={disableButton.imageUrl}
                    startIcon={<CloudUploadIcon />}
                  >
                    Collection Image
                  </Button>
                </label>
              </Grid>
            </Grid>
            {state?.imageUrl?.length > 0 && (
              <Grid
                container
                justifyContent="flex-start"
                style={{ padding: "16px 0px" }}
              >
                {state?.imageUrl?.length > 0 && (
                  <Grid style={{ textAlign: "center" }} xs={6} md={6} item>
                    <img
                      alt="nacimages"
                      src={state?.imageUrl}
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

export default TestimonialCollectionCardCMS;
