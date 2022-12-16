import React, { useEffect, useState } from "react";
import { useHistory, withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { API_URL } from "../../config";
import { ALLPAGESCMS } from "../../graphql/query";
import {
  Card,
  CardContent,
  FormControlLabel,
  Grid,
  Switch,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {},
  contantview: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
}));

export const CmsHome = withRouter((props) => {
  const [state, setState] = useState([]);
  let history = useHistory();

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

  const getThePageTitle = (name) => {
    let createdName = name.replace(
      /[A-Z]/g,
      (val) => " " + `${val.toLowerCase()}`
    );
    return createdName;
  };

  const handleClick = (name) => {
    history.push({
      pathname: "/cmsComponent",
      state: {
        name: name,
      },
    });
  };

  return (
    <div>
      {state.map((val) => (
        <Grid item xs={6} sm={4} lg={3}>
          <div>
            <Card fullwidth className="card2">
              <CardContent>
                <Typography
                  style={{
                    textAlign: "center",
                    margin: "8px 0px",
                    textTransform: "capitalize",
                    cursor: "pointer",
                    borderRadius: "8px",
                    backgroundColor: "#3f51b5",
                    padding: "8px",
                    color: "#fff",
                  }}
                  component="h6"
                  variant="h5"
                  onClick={() => handleClick(val.page)}
                >
                  {getThePageTitle(val.page)}
                </Typography>
                <FormControlLabel
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  control={
                    <Switch
                      // checked={val.isActive}
                      // onChange={() => handleChangeActive(val.page,val.isActive)}
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
    </div>
  );
});

export default CmsHome;
