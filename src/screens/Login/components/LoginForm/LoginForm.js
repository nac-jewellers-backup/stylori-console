/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Button, TextField } from '@material-ui/core';
import gradients from '../../../../utils/gradients';
import LockIcon from '@material-ui/icons/Lock';

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Divider,
  Link,
  Avatar
} from '@material-ui/core';

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
    width: theme.breakpoints.values.md,
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

const LoginForm = props => {
  const { className, ...rest } = props;

  const classes = useStyles();
  

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  useEffect(() => {
    // const errors = validate(formState.values, schema);

    // setFormState(formState => ({
    //   ...formState,
    //   isValid: errors ? false : true,
    //   errors: errors || {}
    // }));
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
    // dispatch(login());
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
        Log in
        </Typography>
        <Typography variant="subtitle2">
        Log in on the internal platform
        </Typography>
        <form
          {...rest}
          className={clsx(classes.root, className)}
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
        Sign in
          </Button>
        </form>
       
      </CardContent>
      <CardMedia
        className={classes.media}
        title="Cover"

      >
             <div className={classes.person}>
                <img src="/images/shape1.png"
                 />
              </div> 
        {/* <Typography
          color="inherit"
          variant="subtitle1"
        >
            Hella narvwhal Cosby sweater McSweeney's, salvia kitsch before they
            sold out High Life.
        </Typography>
        <div className={classes.person}>
        
          <Avatar
            alt="Person"
            className={classes.avatar}
            src="/images/avatar_2.png"
            backgroundImage="/images/blob-shape.svg"
          />
          <div>
            <Typography
              color="inherit"
              variant="body1"
            >
                Ekaterina Tankova
            </Typography>
            <Typography
              color="inherit"
              variant="body2"
            >
                Manager at inVision
            </Typography>
          </div>
        </div> */}
      </CardMedia>
    </Card>
  );
};

LoginForm.propTypes = {
  className: PropTypes.string
};

export default LoginForm;
