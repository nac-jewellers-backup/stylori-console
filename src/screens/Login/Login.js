import React from 'react';
import { withRouter } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import {Input} from '../../components/Input.js'
import Page from '../../components/Page'

import "./Login.css"
import { LoginForm } from './components';
import {
  Card,
  CardContent,
  CardMedia,
  Divider,
  Link,
  Avatar
} from '@material-ui/core';


export class Login extends React.Component {

   
  render() {
  return (
    <Page
    className='root'
      title="Login"
    >
    <LoginForm />
        </Page>
         
  );
}
}


  
  export default (withRouter(Login));