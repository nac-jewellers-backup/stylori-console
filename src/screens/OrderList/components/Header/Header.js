import React,{useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography, Button,TextField } from '@material-ui/core';
// import {  SnackBarContext } from '../../../../context';
import SortHeader from './SortHeader';

const useStyles = makeStyles(() => ({
  root: {}
}));

const Header = props => {
  const { className, ...rest } = props;
  const [openApplication, setOpenApplication] = useState(false);
  // const showSnackbar = React.useContext(SnackBarContext);
  const [searchtext, setSearchtext] = useState("");

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
  function handlesearch(){
    props.onSearch(searchtext)
  }
  const handleinputChange =type => e => {
    setSearchtext(e.target.value)
  }
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
        <Grid item xs={3}>
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
        <Grid container xs={3} item spacing={2}>
        <Grid xs={9} item>
               <TextField
                    className={classes.helperinput}
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    value={searchtext}
                    id="productname"
                    name="productname"
                    label="Search by name/email/mobile"
                    //onInput={keyPress.bind(this)}
                    onChange={handleinputChange('searchtext')}

                   //onChange={(e)=>handleinputChange(e,'productname')}
                  />

          </Grid>
        <Grid xs={3} item>
        <Button variant= "contained" onClick={() => handlesearch()}>Search</Button>

          </Grid>


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
