import React from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import { useQuery } from "react-apollo";
import { productCategory } from "../../services/mapper";
import Component from "./PriceupdateContent";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  progress: {
    margin: theme.spacing(2),
  },
}));
export const Priceupdate = withRouter((props) => {
  const classes = useStyles();

  const { data, loading, error } = useQuery(productCategory.query);

  if (loading)
    return (
      <div>
        <CircularProgress className={classes.progress} />
      </div>
    );
  if (error) return <div>error</div>;
  return <Component {...props} data={data} />;
});
export default Priceupdate;
