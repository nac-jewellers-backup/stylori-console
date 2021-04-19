import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Avatar,
  Button,
  Dialog,
  Chip,
  TextField,
  Typography,
  colors,
  Input
} from '@material-ui/core';
import { ProductContext } from '../../../../context';
import Autocomplete from '@material-ui/lab/Autocomplete';

//import getInitials from 'utils/getInitials';

const useStyles = makeStyles(theme => ({
  root: {
    width: 960
  },
  header: {
    padding: theme.spacing(3),
    maxWidth: 720,
    margin: '0 auto'
  },
  content: {
    padding: theme.spacing(2, 2),
    maxWidth: 720,
    margin: '0 auto'
  },
  helperText: {
    textAlign: 'right',
    marginRight: 0
  },
  author: {
    margin: theme.spacing(4, 0),
    display: 'flex'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    backgroundColor: colors.grey[100],
    padding: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center'
  },
  applyButton: {
    color: theme.palette.white,
    backgroundColor: colors.green[600],
    '&:hover': {
      backgroundColor: colors.green[900]
    }
  }
}));

const EditPrice = props => {
  const { diamond, open, onClose, onApply, className, ...rest } = props;
  const initialValues = {
    id : diamond.id,
    editcostprice:diamond.editcostprice,
    editcostpricetax: diamond.editcostpricetax,
    editsellingprice:diamond.editsellingprice,
    editsellingpricetax:diamond.editsellingpricetax,
    editmarkupprice: diamond.editmarkupprice,
    editmarkuppricetax : diamond.editmarkuppricetax,
    editdiscountprice: diamond.editdiscountprice,
    editdiscountpricetax: diamond.editdiscountpricetax
  }
  const [value, setValue] = useState('');
  const { productCtx, setProductCtx} = React.useContext(ProductContext);
  const [editcontent, setEditcontent] = React.useState({
    ...initialValues
  });

  const classes = useStyles();
  const handleoptionChange = type => (event, value) => {
    setEditcontent({ ...editcontent, [type]: value  })

  }
  const handleInputChange = type => e => {
    setEditcontent({ ...editcontent, [type]: e.target.value  })
  }
  const handleChange = event => {
    event.persist();

    setValue(event.target.value);
  };
  React.useEffect(() => {
  },[editcontent])
 
  return (
    <Dialog
      maxWidth="lg"
      onClose={onClose}
      open={open}
    >
      <div
        {...rest}
        className={clsx(classes.root, className)}
      >
        <div className={classes.header}>
          <Typography
            align="center"
            className={classes.title}
            gutterBottom
            variant="h3"
          >
           Price Details
          </Typography>
          
        </div>
        <div className={classes.content}>
        <TextField
              variant="outlined"
              fullWidth
              id="size"
              margin="dense"
              value={editcontent.editcostprice}
              placeholder={"costPrice"}
              name="size"
              autoComplete="size"
              onChange={handleInputChange('editcostprice')}
              />
        <TextField
              variant="outlined"
              fullWidth
              id="size"
              margin="dense"
              label="#of Stones"
              placeholder="costPriceTax"
              name="size"
              type="number"
              autoComplete="size"
              onChange={handleInputChange('editcostpricetax')}
              value={editcontent.editcostpricetax}
              />
            <TextField
              variant="outlined"
              fullWidth
              id="size"
              margin="dense"
              value={editcontent.editsellingprice}
              placeholder={"Selling Price"}
              name="size"
              autoComplete="size"
              onChange={handleInputChange('editsellingprice')}
              />
        <TextField
              variant="outlined"
              fullWidth
              id="size"
              margin="dense"
              label="Selling Pricetax"
              placeholder="Selling Pricetax"
              name="size"
              type="number"
              autoComplete="size"
              onChange={handleInputChange('editsellingpricetax')}
              value={editcontent.editsellingpricetax}
              />

               <TextField
              variant="outlined"
              fullWidth
              id="size"
              margin="dense"
              value={editcontent.editmarkupprice}
              placeholder={"Markup Price"}
              name="size"
              autoComplete="size"
              onChange={handleInputChange('editmarkupprice')}
              />
        <TextField
              variant="outlined"
              fullWidth
              id="size"
              margin="dense"
              label="#of Stones"
              placeholder="Markup Price Tax"
              name="size"
              type="number"
              autoComplete="size"
              onChange={handleInputChange('editmarkuppricetax')}
              value={editcontent.editmarkuppricetax}
              />

               <TextField
              variant="outlined"
              fullWidth
              id="size"
              margin="dense"
              value={editcontent.editdiscountprice}
              placeholder={"Discount Price"}
              name="size"
              autoComplete="size"
              onChange={handleInputChange('editdiscountprice')}
              />
        <TextField
              variant="outlined"
              fullWidth
              id="size"
              margin="dense"
              label="#of Stones"
              placeholder="Discount Price tax1"
              name="size"
              type="number"
              autoComplete="size"
              onChange={handleInputChange('editdiscountpricetax')}
              value={editcontent.editdiscountpricetax}
              />
                 
          
          
        </div>
        <div className={classes.actions}>
          <Button
            className={classes.applyButton}
            onClick={() => onApply(editcontent)}
            variant="contained"
          >
            Save
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

EditPrice.propTypes = {
  diamond: PropTypes.object.isRequired,
  className: PropTypes.string,
  onApply: PropTypes.func,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired
};

export default EditPrice;
