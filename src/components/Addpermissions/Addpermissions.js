import React, { useEffect, useContext, useState } from 'react';

import clsx from 'clsx';
import {lighten, makeStyles, useTheme } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Paper,Button,Grid,Typography, 
  FormControlLabel,
  Checkbox,
  Divider} from '@material-ui/core';

import { Query, withApollo } from 'react-apollo';
import { useHistory } from "react-router-dom";

import { NetworkContext } from '../../context/NetworkContext';

// const columns = [
//   { id: 'name', label: 'Name' },
//   { id: 'vendorcode', label: 'Vendor Code' },
//   { id: 'Address', label: 'Address' },
//   { id: 'City', label: 'City' },
//   { id: 'gstNo', label: 'gstNo' },
//   { id: 'vendorDelivaryDays', label: 'vendorDelivaryDays' },
//   { id: 'updatedAt', label: 'updated on' },
//   { id: 'actions', label: 'actions' }

// ];

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'fit-content',
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  },
}));














const   Addpermissions=(props)=> {
  let history = useHistory();
  const classes = useStyles();
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');
  const [permissions, setPermissions] = React.useState(props.permissions);

  const handleClose = () => {
    props.onClose()

  };
  const handleSave = () => {
    //setOpen(false);
    props.onSave(permissions, props.role_id)

  };
  const updateread = (permission_id,key) => (event) => {
    var permissonobj = {}

      if(permissions[permission_id])
      {
        permissonobj = permissions[permission_id];
       
      }
      permissonobj[key] = event.target.checked
    setPermissions({...permissions,[permission_id] :permissonobj})
    //setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <>
        <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={props.isopen}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">Page Permissions</DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText>
          {props.pages.map((pagecontent, index) => (
            <Grid container xs= {12} spacing={3}>
             <Grid item container alignItems="center"  row xs= {6} spacing={2}>

               <Typography variant="h6" component="h5">
               {pagecontent.displayname}
              </Typography>
              </Grid>
              <Grid item container alignItems="center"  row xs= {6} spacing={2}>

              <FormControlLabel
                control={
                  <Checkbox
                     checked={permissions[pagecontent.id] ? permissions[pagecontent.id].isview : false }
                     onChange={updateread(pagecontent.id,'isview')}
                    name="checkedB"
                    color="primary"
                  />
                }
                label="View"
              />
               <FormControlLabel
                control={
                  <Checkbox
                  checked={permissions[pagecontent.id] ? permissions[pagecontent.id].iswrite : false }

                  onChange={updateread(pagecontent.id,'iswrite')}

                    name="checkedB"
                    color="primary"
                  />
                }
                label="Edit"
              />
              </Grid>
            </Grid>
          ))}
          </DialogContentText>
          </DialogContent>
          <Divider />

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Update 
          </Button>
        </DialogActions>
      </Dialog>

       
      </>
  );
}
export default withApollo(Addpermissions);
