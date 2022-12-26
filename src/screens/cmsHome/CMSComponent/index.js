import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { API_URL } from "../../../config";
import { AlertContext } from "../../../context";
import { CMSBYPAGES, CMS_UPDATE, CREATE_CMS } from "../../../graphql/query";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@material-ui/core";
import BannerCMS from "./bannerCMS";
import CollectionCardCMS from "./collectionCardCMS";
import HomePageIconsCMS from "./homePageIcons";
import CollectionJewelleryCardCMS from "./collectionJewelleryCardCMS";
import StoriesCardCMS from "./storiesCardCMS";
import TestimonialCollectionCardCMS from "./testimonialCardCMS";
import { consolePagesStyles } from "./style";
import CollectionCarouselCMS from "./collectionCarouselCMS";
import CareersCMS from "./careersCMS";

function CmsComponent(props) {
  const location = useLocation();
  const snack = React.useContext(AlertContext);
  const classes = consolePagesStyles();

  const [state, setState] = useState([]);
  const [cloneDialog, setCloneDialog] = useState(false);
  const [cloneState, setCloneState] = useState({
    page: null,
  });

  console.log("dataRecieved", state);

  useEffect(() => {
    fetchCall();
  }, []);

  // Initial fetch call by the page
  const fetchCall = () => {
    const pageName = location?.state?.name;
    fetch(`${API_URL}/graphql`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: CMSBYPAGES,
        variables: { page: pageName },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        const dataRecieved = JSON.parse(data?.data?.cdnByPage?.data);
        setState(dataRecieved);
      });
  };

  // Open Handle Clone
  const handleClone = () => {
    console.log("handleClone", state);
    setCloneDialog(true);
  };

  // Close Handle Clone
  const handleCloneDialogClose = () => {
    setCloneDialog(false);
  };

  // Handle the clone State
  const onChangeData = (event) => {
    setCloneState({
      ...cloneState,
      [event.target.name]: event.target.value,
    });
  };

  // Clone Submit
  const handleCloneSumbit = () => {
    if (cloneState.page) {
      const cloneData = JSON.stringify(state);
      const pageName = cloneState.page;
      fetch(`${API_URL}/graphql`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: CREATE_CMS,
          variables: {
            cloneData: cloneData,
            page: pageName,
          },
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          handleCloneDialogClose();
          snack.setSnack({
            open: true,
            msg: "Page Created Successfully",
          });
        });
    } else {
      snack.setSnack({
        open: true,
        msg: "Please enter the page Route",
      });
    }
  };

  // on submitting each component (for Add, Edit and Delete) same Update call
  const handleSubmit = async (data, component, propsKey) => {
    const replaceIndex = state.findIndex((val) => val.component === component);
    const newState = state;
    newState.splice(replaceIndex, 1, data);
    const stringifyState = JSON.stringify(newState);
    fetch(`${API_URL}/graphql`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: CMS_UPDATE,
        variables: {
          stringifyState: stringifyState,
          page: location.state.name,
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        snack.setSnack({
          open: true,
          msg: "Successfully Updated!",
        });
        const newStateSet = JSON.parse(JSON.stringify(newState));
        setState(newStateSet);
        fetchCall();
      });
  };

  // Rendering the Tables based on the type of the component
  const getTheTable = (val) => {
    switch (val?.component) {
      case "HomePageBanner": {
        return <BannerCMS data={val} handleSubmit={handleSubmit} />;
      }

      case "CollectionCardData": {
        return <CollectionCardCMS data={val} />;
      }

      case "HomePageIconsList": {
        return <HomePageIconsCMS data={val} />;
      }

      case "CollectionJewelleryData": {
        return <CollectionJewelleryCardCMS data={val} />;
      }

      case "TestimonialCard": {
        return <TestimonialCollectionCardCMS data={val} />;
      }

      case "StoriesCard": {
        return <StoriesCardCMS data={val} />;
      }


      case "collectionCarouselCardComponent": {
        return <CollectionCarouselCMS data={val} handleSubmit={handleSubmit} />;
      }

      case "careersComponent": {
        return <CareersCMS data={val} handleSubmit={handleSubmit} />;
      }
    }
  };

  return (
    <div>
      {/* Clone Button */}
      <Grid
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        style={{ marginBottom: "10px" }}
      >
        <Grid>
          <Button variant="contained" onClick={handleClone} color="primary">
            Clone
          </Button>
        </Grid>
      </Grid>

      {/* Tables in the Component */}
      {state.map((val, i) => {
        return getTheTable(val);
      })}

      {/* Clone Dialog  */}
      <Dialog
        classes={{ paper: classes.dialogPaperMid }}
        open={cloneDialog}
        onClose={handleCloneDialogClose}
      >
        <DialogTitle id="form-dialog-title">Clone the {location?.state?.name} page</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="page"
            label="Page Route"
            variant="outlined"
            fullWidth
            onChange={onChangeData}
            value={cloneState.page}
            name="page"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloneSumbit}>Clone Page</Button>
          <Button onClick={handleCloneDialogClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CmsComponent;
