import React,{useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography, Button } from '@material-ui/core';
// import {  SnackBarContext } from '../../../../context';
import SortHeader from './SortHeader';

const useStyles = makeStyles(() => ({
  root: {}
}));

const Header = props => {
  const { className, ...rest } = props;
  const [openApplication, setOpenApplication] = useState(false);
  // const showSnackbar = React.useContext(SnackBarContext);

  const handleApplicationOpen = () => {
    setOpenApplication(true);
  };

  const handleApplicationClose = () => {
    setOpenApplication(false);
  };
  const handleApplicationsave = () => {
   // showSnackbar.setSnack({ open: true, type: 'success', msg: 'New Category Added Successfully' })
    setOpenApplication(false);

  };
  const classes = useStyles();

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Grid
        alignItems="flex-end"
        container
        justify="space-between"
        spacing={3}
      >
        <Grid item>
          {/* <Typography
            component="h2"
            gutterBottom
            variant="overline"
          >
            Management
          </Typography> */}
           <Typography
            component="h1"
            variant="h5"
          >
             Order List
          </Typography> 
        </Grid>
        <Grid item>

          <SortHeader columnnames={props.columns} getColumnnames={props.getColumnnames}/>
         
        </Grid>
      </Grid>
      
    </div>
   
  );
};

Header.propTypes = {
  className: PropTypes.string
};

export default Header;
