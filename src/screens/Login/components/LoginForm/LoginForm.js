/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Button, TextField } from '@material-ui/core';
import gradients from '../../../../utils/gradients';
import LockIcon from '@material-ui/icons/Lock';
import { NetworkContext } from '../../../../context/NetworkContext';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Divider,
  Link,
  Avatar
} from '@material-ui/core';
var validate = require("validate.js");

const schema = {
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true
  },
  password: {
    presence: { allowEmpty: false, message: 'is required' }
  }
};

const useStyles = makeStyles(theme => ({
  root: {
   
  },
  card: {
    maxWidth: '100%',
    overflow: 'unset',
    display: 'flex',
    position: 'relative',
    '& > *': {
      flexGrow: 1,
      flexBasis: '50%',
      width: '50%'
    }
  },
  content: {
    padding: theme.spacing(8, 4, 8, 4)
  },
  media: {
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    color: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  icon: {
    backgroundImage: gradients.green,
    color: theme.palette.white,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    position: 'absolute',
    top: -32,
    left: theme.spacing(3),
    height: 64,
    width: 64,
    fontSize: 32
  },
  loginForm: {

  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  person: {
    display: 'flex'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  fields: {
    margin: theme.spacing(-1),
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      flexGrow: 1,
      margin: theme.spacing(1)
    }
  },
  submitButton: {
    marginTop: theme.spacing(2),
    width: '100%'
  }
}));
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const LoginForm = props => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const { sendNetworkRequest } = React.useContext(NetworkContext);


  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });
  const [open, setOpen] = React.useState(false);
  const [showmessage, setShowmessage] = React.useState("");
  const [iserror, setIserror] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  useEffect(() => {
   const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    if(formState.isValid)
    {
      //alert(JSON.stringify(formState.values))
   let signinobj =   await sendNetworkRequest('/api/auth/signin', {}, formState.values)
   
   
   if(signinobj.statuscode === 200)
   {
    localStorage.setItem('accesstoken', signinobj.accessToken);
    props.history.push('/productlist')

   }else
   {

    setShowmessage(signinobj.message)
    setOpen(true);
   }
  
    }else{
      alert("has some error")
    }


    //alert(JSON.stringify(formState))
    // dispatch(login());
    //alert("i am here")
  };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <Card className={classes.card}>
      <CardContent className={classes.content}>
        <Typography
          gutterBottom
          variant="h3"
        >
        Log in Page
        </Typography>
        <Typography variant="subtitle2">
        {/* Sign in on the internal platform */}
        </Typography>
        
        <form
          {...rest}
          className={clsx(classes.root, className)}
          autoComplete={"off"}
          onSubmit={handleSubmit}
        >
          <div className={classes.fields}>
            <TextField
              error={hasError('email')}
              fullWidth
              helperText={hasError('email') ? formState.errors.email[0] : null}
              label="Email address"
              name="email"
              
              onChange={handleChange}
              value={formState.values.email || ''}
              variant="outlined"
            />
            <TextField
              error={hasError('password')}
              fullWidth
              helperText={
                hasError('password') ? formState.errors.password[0] : null
              }
              label="Password"
              name="password"
              onChange={handleChange}
              type="password"
              value={formState.values.password || ''}
              variant="outlined"
            />
          </div>
          <Button
            className={classes.submitButton}
            color="primary"
            size="large"
            type="submit"
            variant="contained"
          >
        Log in
          </Button>
          <Snackbar open={open} autoHideDuration={6000}
          anchorOrigin={{vertical:'top', horizontal:'center'}}
          onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
             {showmessage}
            </Alert>
      </Snackbar>
        </form>
       
      </CardContent>
     
    </Card>
  );
};

LoginForm.propTypes = {
  className: PropTypes.string
};

export default withRouter(LoginForm);
