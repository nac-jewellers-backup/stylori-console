import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Mastercontent from './Components/Mastercontent/Mastercontent';
import columnnames from './columnnames.json';

export default function ResponsiveDialog(props) {
  const [open, setOpen] = React.useState(true);
  const theme = useTheme();
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('lg');
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    props.onClose()
  };

  return (
    <div>
      
      <Dialog
      fullWidth={fullWidth}
      maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Price Summary"}</DialogTitle>
        <DialogContent>
        <Mastercontent title= {"Metal Colours"} button_title=""   columns={columnnames.pricesummary} values={props.values}/>
        </DialogContent>
        <DialogActions>
       
          <Button onClick={handleClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}