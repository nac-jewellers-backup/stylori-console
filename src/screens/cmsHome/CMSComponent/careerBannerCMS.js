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
import { UploadImage } from "../../../utils/imageUpload";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

const header = ["S.No", "Banner Image", "Action"];
const tableData = [
  { type: "INCREMENT", name: "" },
  { type: "WEB_IMAGE", name: "web" },
  { type: "EDIT", name: "" },
];
const initialState = {
  web: "",
};
const initialEdit = {
  isEdit: false,
  editIndex: null,
};

const CareerBannerCMS = (props) => {
  const { data } = props;
  const alert = useContext(AlertContext);
  const classes = consolePagesStyles();
  const [open, setOpen] = React.useState(false);
  const [editData, setEditData] = React.useState({ ...initialEdit });
  const [state, setState] = React.useState({ ...initialState });

  const handleChange = (file, name) => {
    UploadImage(file)
      .then((res) => {
        if (res?.data?.web) {
          setState({
            ...state,
            [name]: res?.data?.web,
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
  };

  const handleEdit = (e, rowData, rowIndex) => {
    setOpen(true);
    setEditData({ ...editData, editIndex: rowIndex, isEdit: true });
    setState(rowData);
  };

  const handleClose = () => {
    setOpen(false);
    setState(initialState);
  };

  const onsubmitvalue = async () => {
    if (state.web) {
      if (editData.isEdit) {
        const editBanner = data?.props?.banners;
        editBanner.splice(editData.editIndex, 1, state);
        let getData = [];
        getData = {
          component: props?.data?.component,
          props: {
            banners: editBanner,
          },
        };
        setOpen(false);
        props.handleSubmit(getData, "bannerComponent", "banners");
      } else {
        let getData = [];
        getData = {
          component: props?.data?.component,
          props: {
            banners: [...data?.props?.banners, state],
          },
        };
        setOpen(false);
        props.handleSubmit(getData, "bannerComponent", "banners");
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

  return (
    <Paper className={classes.root}>
      <TableComp
        header={header}
        tableData={tableData}
        data={data?.props?.banners}
        handleEdit={handleEdit}
        name={"Career Banner Component"}
        noAddNew
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="form-dialog-title">View Banner</DialogTitle>
        <DialogContent>
          <Grid
            item
            style={{
              margin: "7px 0",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <input
              accept="image/*"
              className={classes.input}
              style={{ display: "none" }}
              id="img"
              multiple
              type="file"
              onChange={(e) => handleChange(e.target.files[0], "web")}
            />
            <label htmlFor="img">
              <Button
                variant="outlined"
                component="span"
                startIcon={<CloudUploadIcon />}
              >
                Banner Image
              </Button>
            </label>
          </Grid>
          {state?.web && (
            <Grid item style={{ margin: "7px 0" }}>
              <img
                alt="nacimages"
                src={state?.web}
                style={{ width: "100%", height: "auto" }}
              />
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onsubmitvalue}>Add</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};
export default CareerBannerCMS;
