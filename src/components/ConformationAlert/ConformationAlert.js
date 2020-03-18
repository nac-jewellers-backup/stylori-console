import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Divider} from '@material-ui/core'
export default function ConformationAlert(props) {
  
  const handleOk = () => {
    props.onSuccess(props.data, props.refetch)
  };
  const handleClose = () => {
    props.onCancel()
  };
  return (
    <div>

      <Dialog
        open={props.isshow}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={'sm'}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
        <DialogContent dividers>
          <DialogContentText id="alert-dialog-description">
            {props.message}
            Verify details before deleting
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="default">
            Cancel
          </Button>
          <Button onClick={handleOk} variant={"contained"} color="primary" autoFocus>
          {props.positivebtn}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}