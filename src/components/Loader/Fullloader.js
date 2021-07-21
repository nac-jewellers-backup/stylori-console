import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";

import LinearProgress from "@material-ui/core/LinearProgress";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  loader: {
    display: "flex",
    width: 100,
    paddingLeft: 25,
  },
}));
function FullLoader(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={props.isopen} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
      <DialogContent>
        <div className={classes.loader}>
          <CircularProgress />
        </div>
      </DialogContent>
    </Dialog>
  );
}
export default FullLoader;
