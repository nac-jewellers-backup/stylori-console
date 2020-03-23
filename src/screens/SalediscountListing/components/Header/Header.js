import React,{useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography, Button,TextField } from '@material-ui/core';
// import {  SnackBarContext } from '../../../../context';
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link'

const useStyles = makeStyles(() => ({
  root: {}
}));

const Header = props => {
  const { className, ...rest } = props;
  const [openApplication, setOpenApplication] = useState(false);
  // const showSnackbar = React.useContext(SnackBarContext);
  const [searchcontent, setSearchcontent] = useState("");
  const handleinputchange = type => (event,option) =>{
    setSearchcontent(event.target.value)
    }
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
        <Grid container 
                alignItems="flex-start"       
           item   xs={6} spacing={2}> 
        {/* <Grid item > 

        <TextField
          variant="outlined"
          margin="dense"
          fullWidth
          id="size"
          label="Search"
          name="size"
          onChange={handleinputchange('searchtext')}
          autoComplete="size"
          value={searchcontent}
          />
          </Grid>
         <Grid item > 

           <Button
            color="default"
            variant="contained"
            onClick={()=>props.onSearch(searchcontent)}
          >
            Search
          </Button>
          </Grid> */}
        </Grid>
        <Grid item>
        <Link underline='none' component={RouterLink} to={'/salediscount'}>

          <Button
            color="primary"
            variant="contained"
            onClick={()=>props.onAdd()}

          >
            Add New 
          </Button>
          </Link>
         
        </Grid>
      </Grid>
      
    </div>
   
  );
};

Header.propTypes = {
  className: PropTypes.string
};

export default Header;
