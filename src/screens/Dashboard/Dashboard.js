import React from 'react';
import { withRouter } from "react-router-dom";

import Container from '@material-ui/core/Container';
import {Input} from '../../components/Input.js'

import "./Dashboard.css"

class Dashboard_ extends React.Component {
  
   
  render() {
  return (
    <Container className="root" component="main">
    <Input />
  </Container>
         
  );
}
}

export const Dashboard = withRouter(Dashboard_);
  export default Dashboard;