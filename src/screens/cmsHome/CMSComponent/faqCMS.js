import React, { useContext, useState } from "react";
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
import TableComp from "../../../components/table/tableComp";
import { consolePagesStyles } from "./style";
import EditorConvertToHTML from "./richTextEditor";
import CloseIcon from "@material-ui/icons/Close";
import parse from "html-react-parser";
import { AlertContext } from "../../../context";

const header = ["S.No", "Heading", "View", "Action"];
const tableData = [
  { type: "INCREMENT", name: "" },
  { type: "TEXT", name: "role" },
  { type: "VIEW_DETAILS", name: "" },
  { type: "ACTION", name: "" },
];

const initialState = {
  role: "",
  JobDescription: "",
};

const initialEdit = {
  isEdit: false,
  editIndex: null,
  isView: false,
};

const FaqCMS = (props) => {
  const { data } = props;

  const alert = useContext(AlertContext);

  const classes = consolePagesStyles();
  const [open, setOpen] = useState(false);
  const [openBlog, setOpenBlog] = useState(false);
  const [blog, setBlog] = useState([]);
  const [state, setState] = React.useState(initialState);
  const [editData, setEditData] = React.useState({ ...initialEdit });

  const handleViewMore = (e, rowData, rowIndex) => {
    setOpenBlog(true);
    setBlog(rowData);
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

  const onsubmitvalue = async () => {
    if (state?.role && state?.JobDescription) {
      if (editData.isEdit) {
        const storeDataEdit = props?.data?.props;
        storeDataEdit.splice(editData.editIndex, 1, {
          role: state?.role,
          JobDescription: state?.JobDescription,
        });
        const getData = {
          component: props?.data?.component,
          props: storeDataEdit,
        };
        setOpen(false);
        props.handleSubmit(getData, "faqComponent", "props");
        setState(initialState);
        setEditData(initialEdit);
      } else {
        let getData = [];
        getData = {
          component: props?.data?.component,
          props: [...props?.data?.props, state],
        };
        setOpen(false);
        setState(initialState);
        setEditData(initialEdit);

        props.handleSubmit(getData, "faqComponent", "props");
      }
    } else {
      alert.setSnack({
        open: true,
        severity: "error",
        msg: "Please fill all the fields in the form ",
      });
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleChangeState = (data) => {
    setState({
      ...state,
      JobDescription: data,
    });
  };

  const handleCloseStores = () => {
    setOpenBlog(false);
  };

  const handleDelete = (e, rowData, rowIndex) => {
    let getData = [];
    const content = props?.data?.props;
    content.splice(rowIndex, 1);
    getData = {
      component: props?.data?.component,
      props: content,
    };
    props.handleSubmit(getData, "faqComponent", "props");
  };

  return (
    <Paper className={classes.root}>
      <TableComp
        header={header}
        tableData={tableData}
        data={data?.props}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleViewStores={handleViewMore}
        handleAddNew={handleClickOpen}
        name={"Careers Component"}
      />

      {/* View More */}
      <Dialog
        // classes={{ paper: classes.dialogPaper }}
        fullWidth
        open={openBlog}
        onClose={handleCloseStores}
      >
        <DialogTitle id="form-dialog-title">
          <div className={classes.dialogHeader}>
            <div>Careers Inner Page</div>
            <div style={{ cursor: "pointer" }} onClick={handleCloseStores}>
              <CloseIcon />
            </div>
          </div>
        </DialogTitle>
        <DialogContent>
          <div className={classes.innerDialog}>
            <Typography>Role :</Typography>
          </div>
          <div className={classes.innerDialog}>
            <Typography>{blog?.role}</Typography>
          </div>
          <div className={classes.innerDialog}>
            <Typography>Job Description :</Typography>
          </div>
          <div className={classes.innerDialog}>
            <Typography>
              {blog?.JobDescription
                ? parse(blog?.JobDescription)
                : blog?.JobDescription}
            </Typography>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={open} onClose={handleClose} classes={{ paper: classes.dialogPaperMid }}>
        <DialogTitle id="form-dialog-title">View Career Details</DialogTitle>
        <DialogContent>
          {[state].map((val) => {
            return (
              <>
                <TextField
                  autoFocus
                  margin="dense"
                  id="role"
                  label="Role"
                  variant="outlined"
                  fullWidth
                  value={val?.role}
                  onChange={onChangeData}
                  name="role"
                  required
                />
                <div className={classes.headerBottom}>
                  <Typography>Job Description :</Typography>
                </div>
                <EditorConvertToHTML
                  handleChangeState={handleChangeState}
                  parentState={val?.JobDescription}
                />
              </>
            );
          })}
        </DialogContent>
        <DialogActions>
          <Button onClick={onsubmitvalue}>Add</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};
export default FaqCMS;
