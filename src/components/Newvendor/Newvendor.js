import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import {
  Button,
  Grid,
  TextField
} from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
    loader: {
      display: 'flex',
      width: 100,
      paddingLeft: 25
    }
  }));
function Newvendor(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    return (
      <Dialog
      open={props.isopen}
      fullWidth={true}
      maxWidth={'md'}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
      <DialogContent>
      <Grid container  spacing={2}> 
          <Grid   item xs={6} sm={6} >
          <TextField
            variant="outlined"
            margin="dense"
            fullWidth
            // onChange={handleInputChange('vouchername')}
            id="vendorname"
            name="vendorname"
            value={"test"}
            label="Vendor Name"
            />
          </Grid>
          <Grid   item xs={6} sm={6} >
          <TextField
            variant="outlined"
            margin="dense"
            fullWidth
            // onChange={handleInputChange('vouchername')}
            id="vendorcode"
            name="vendorcode"
            value={"test"}
            label="Vendor Code"
            />
          </Grid>
          <Grid   item xs={6} sm={6} >
          <TextField
            variant="outlined"
            margin="dense"
            fullWidth
            // onChange={handleInputChange('vouchername')}
            id="organization"
            name="organization"
            value={"test"}
            label="Organization"
            />
          </Grid>
          <Grid   item xs={6} sm={6} >
          <TextField
            variant="outlined"
            margin="dense"
            fullWidth
            // onChange={handleInputChange('vouchername')}
            id="partnercategory"
            name="partnercategory"
            value={"test"}
            label="Partner Category"
            />
          </Grid>
          <Grid   item xs={6} sm={6} >
          <TextField
            variant="outlined"
            margin="dense"
            fullWidth
            // onChange={handleInputChange('vouchername')}
            id="gstno"
            name="gstno"
            value={"test"}
            label="GST Number"
            />
          </Grid>
          <Grid   item xs={6} sm={6} >
          <TextField
            variant="outlined"
            margin="dense"
            fullWidth
            // onChange={handleInputChange('vouchername')}
            id="vendordeliverydays"
            name="vendordeliverydays"
            value={"test"}
            label="Vendor Delivery Days"
            />
          </Grid>
          <Grid   item xs={12} sm={12} >
          <TextField
            variant="outlined"
            margin="dense"
            fullWidth
            rows={3}
            multiline
            id="vendordeliverydays"
            name="vendordeliverydays"
            value={"test"}
            label="Vendor Delivery Days"
            />
          </Grid>
      </Grid>

      </DialogContent>
      <DialogActions>
      <Button  color="primary">
            Cancel
          </Button>
          <Button  color="primary">
            Update
          </Button>
      </DialogActions>
    </Dialog>
 
    )
}
export default Newvendor;