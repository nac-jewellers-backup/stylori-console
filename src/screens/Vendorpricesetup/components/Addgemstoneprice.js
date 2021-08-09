import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Autocomplete from "@material-ui/lab/Autocomplete";

import { TextField, Grid, Chip } from "@material-ui/core";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
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

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function Addgemstoneprice(props) {
  const [open, setOpen] = React.useState(props.isadd);
  const [gemstonedata, setGemstonedata] = React.useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    props.actionclose();
  };

  const handleSave = () => {
  
    props.actionSave(gemstonedata);
  };
  const handleoptionChange = (type) => (event, value) => {
 
    setGemstonedata({ ...gemstonedata, [type]: value });
  };
  const handleinputChange = (type) => (e) => {
  
    setGemstonedata({
      ...gemstonedata,
      [type]: e.target.value,
    });
  };

  return (
    <div>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {props.title}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Autocomplete
                id="free-solo-2-demo"
                fullWidth
                disableClearable
                onChange={handleoptionChange("gemstone")}
                getOptionLabel={(option) => option.name}
                options={props.gems}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip variant="outlined" size="small" label={option.name} {...getTagProps({ index })} />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Choose Gemstone"
                    margin="dense"
                    variant="outlined"
                    fullWidth
                    InputProps={{ ...params.InputProps, readOnly: true, type: "search" }}
                  />
                )}
              />
            </Grid>
            {props.viewtype == 1 ? 
             <>          
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                margin="dense"
                label="Weight Start"
                fullWidth
                onChange={handleinputChange("weightstart")}
                id="productvendorcode"
                name="Cost Price"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                margin="dense"
                label="Weight End"
                onChange={handleinputChange("weightend")}
                fullWidth
                id="productvendorcode"
                name="Cost Price"
              />
            </Grid>
              </> : null }
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="dense"
                label="Cost Price"
                fullWidth
                id="productvendorcode"
                onChange={handleinputChange("costprice")}
                name="Cost Price"
              />
            </Grid>

            <Grid item xs={6}>
              <Autocomplete
                id="free-solo-2-demo"
                fullWidth
                disableClearable
                onChange={handleoptionChange("pricetype")}
                getOptionLabel={(option) => option.name}
                options={[
                  { label: 1, name: "Flat" },
                  { label: 2, name: "Percentage" },
                ]}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip variant="outlined" size="small" label={option.name} {...getTagProps({ index })} />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Selling Price Type"
                    margin="dense"
                    variant="outlined"
                    fullWidth
                    InputProps={{ ...params.InputProps, readOnly: true, type: "search" }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                variant="outlined"
                margin="dense"
                label="Selling Price"
                fullWidth
                onChange={handleinputChange("sellingPrice")}
                id="productvendorcode"
                name="Cost Price"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
