import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import { TextField, Grid, Chip } from '@material-ui/core';

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);
const useStyles = makeStyles(theme => ({
  root: {
  //  padding: theme.spacing(3)
  },
  aboutvoucher: {
    marginTop: theme.spacing(3)
  },
  results: {
    marginTop: theme.spacing(3)
  },
  productcontent: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing(0.5),
    marginTop: theme.spacing(1)
  },
  errorchip: {
    margin: theme.spacing(0.5),
    backgroundColor: theme.palette.error.dark,
    textColor : theme.palette.white
  },
  chip: {
    margin: theme.spacing(0.5),
   
  }

}));
export default function Viewsku(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(props.isadd);
  const [markup, setMarkup] = React.useState({});

  const handleSave = () => {
    props.actionSave(markup,props.refetch)
  };
  const handleoptionChange = type => (event, value) => {
    setMarkup({ ...markup, [type]: value})
}
const handleinputChange =type => e => {
  setMarkup({
    ...markup,
    [type]: e.target.value
  })
}
const handleDelete = chipToDelete => () => {

 }
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    props.actionclose()
  };

  return (
    <div>
  
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
         SKUs
        </DialogTitle>
        <DialogContent dividers>
        <Grid container spacing={2}>
        {props.products.map(data => (
        <Chip
        key={data.generated_sku}
        label={data.generated_sku}
        variant="outlined"
        // color={errorskus.indexOf(data) > -1 ?  "secondary" : "primary"}
         onDelete={handleDelete(data.generated_sku)}
        className={classes.chip}
      />

      
      ))}
       
       </Grid>
        
        
        </DialogContent>
        <DialogActions>
        <Button autoFocus onClick={handleClose} >
            Cancel
          </Button>
          
          
        </DialogActions>
      </Dialog>
    </div>
  );
}
