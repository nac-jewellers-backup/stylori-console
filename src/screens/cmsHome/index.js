import React, { useEffect, useState } from "react";
import { useHistory, withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { API_URL } from "../../config";
import {
  ALLPAGESCMS,
  UPDATE_STATUS_CMS,
  UPDATE_URL,
} from "../../graphql/query";
import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  Switch,
  TextField,
  Typography,
} from "@material-ui/core";
import { AlertContext } from "../../context";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles(() => ({
  align: { display: "flex", alignItems: "center", justifyContent: "center" },
  cardName: {
    textAlign: "center",
    margin: "8px 0px",
    textTransform: "capitalize",
    cursor: "pointer",
    borderRadius: "8px",
    backgroundColor: "#3f51b5",
    padding: "8px",
    color: "#fff",
  },
  labelAlign: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "4px",
  },
  edit:{
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: "4px",
  },
  dialogPaperMid: {
    minWidth: "400px",
  },
}));

export const CmsHome = withRouter((props) => {
  const classes = useStyles();
  let history = useHistory();
  const snack = React.useContext(AlertContext);

  const [state, setState] = useState([]);
  const [newPage, setNewPage] = useState("");
  const [edit, setEdit] = useState({
    open: false,
    page: "",
  })

  console.log("handleHome", state);

  useEffect(() => {
    fetch(`${API_URL}/graphql`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: ALLPAGESCMS,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // debugg(er;
        const dataRecieved = data.data.allCdns.nodes;
        setState(dataRecieved);
      });
  }, []);

  // Fetch the initial data
  const fetchData = () => {
    fetch(`${API_URL}/graphql`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: ALLPAGESCMS,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // debugger;
        const dataRecieved = data.data.allCdns.nodes;
        setState(dataRecieved);
      });
  };

  // render the title name of the Cards
  const getThePageTitle = (name) => {
    let createdName = name.replace(
      /[A-Z]/g,
      (val) => " " + `${val.toLowerCase()}`
    );
    return createdName;
  };

  // Open the Edit page 
  const handleOpenEdit = (page) => {
    setEdit({
      open: true,
      page:page
    })
  };

  // Chnage the name of the new UrL
  const handleChangeData = (value) => {
    setNewPage(value);
  };

  // Load the Respective page
  const handleClick = (name) => {
    history.push({
      pathname: "/cmsComponent",
      state: {
        name: name,
      },
    });
  };

  // Change the Status of the page
  const handleChangeActive = (page, isActive) => {
    fetch(`${API_URL}/graphql`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: UPDATE_STATUS_CMS,
        variables: {
          isActive: !isActive,
          page: page,
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // debugger;
        snack.setSnack({
          open: true,
          msg: "Status Updated Successfully",
        });
        fetchData();
      });
  };

  // Edit the URL
  const handleEditSumbit = () => {
    fetch(`${API_URL}/graphql`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: UPDATE_URL,
        variables: {
          page: edit.page,
          changePage: newPage,
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        snack.setSnack({
          open: true,
          msg: "Url changed Successfully",
        });
        setEdit({
          open: false,
          page: "",
        });
        fetchData();
      });
  };

  return (
    <div>
      <Grid container spacing={3}>
        {state.map((val) => (
          <Grid item xs={6} sm={4} lg={3}>
            <div>
              <Card fullwidth className="card2">
                <CardContent>
                  <Typography
                    className={classes.cardName}
                    component="h6"
                    variant="h5"
                    onClick={() => handleClick(val.page)}
                  >
                    {getThePageTitle(val.page)}
                  </Typography>
                  <div className={classes.labelAlign}>
                    <div className={classes.edit}>
                      <Typography>Is page active:</Typography>
                      <FormControlLabel
                        className={classes.align}
                        control={
                          <Switch
                            checked={val.isActive}
                            onChange={() =>
                              handleChangeActive(val.page, val.isActive)
                            }
                            name="checkedB"
                            color="primary"
                          />
                        }
                      />
                    </div>
                    <EditIcon
                      style={{ cursor: "pointer" }}
                      onClick={() => handleOpenEdit(val.page)}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </Grid>
        ))}
      </Grid>
      <Dialog
        classes={{ paper: classes.dialogPaperMid }}
        open={edit.open}
        onClose={() => {
          setEdit({
            open: false,
            page: "",
          });
        }}
      >
        <DialogTitle id="form-dialog-title">Change the URL</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="page"
            label="Page Route"
            variant="outlined"
            fullWidth
            onChange={(e) => handleChangeData(e.target.value)}
            value={newPage}
            name="page"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditSumbit}>Edit Url</Button>
          <Button
            onClick={() => {
              setEdit({
                open: false,
                page: "",
              });
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
});

export default CmsHome;
