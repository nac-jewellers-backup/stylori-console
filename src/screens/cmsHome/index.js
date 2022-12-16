import React, { useEffect, useState } from "react";
import { useHistory, withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { API_URL } from "../../config";
import { ALLPAGESCMS, UPDATE_STATUS_CMS } from "../../graphql/query";
import {
  Card,
  CardContent,
  FormControlLabel,
  Grid,
  Switch,
  Typography,
} from "@material-ui/core";
import { AlertContext } from "../../context";

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
}));

export const CmsHome = withRouter((props) => {
  const classes = useStyles();
  let history = useHistory();
  const snack = React.useContext(AlertContext);

  const [state, setState] = useState([]);
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
                  label="Is Page Active?"
                />
              </CardContent>
            </Card>
          </div>
        </Grid>
      ))}
      </Grid>
    </div>
  );
});

export default CmsHome;
