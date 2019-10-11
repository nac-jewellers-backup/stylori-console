import React from 'react';
import { withRouter } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import {Input} from '../../components/Input.js'
import "./Login.css"

export class Login extends React.Component {

   
  render() {
  return (
    <Container component="main" maxWidth="xs">
    <CssBaseline />
    <div className="paper">
     
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
     
      <form  noValidate>
        <Input
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <Input
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
       
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className="submitbtn"
        >
          Sign In
        </Button>
       
      </form>
    </div>
    <Box mt={5}>
    </Box>
  </Container>
         
  );
}
}


  
  export default (withRouter(Login));