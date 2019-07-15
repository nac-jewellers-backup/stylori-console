import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import ErrorComp from "./components/ErrorComp";
import AlertTemplate from 'react-alert-template-basic'
import { transitions, positions, Provider as AlertProvider } from 'react-alert';

const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 1500,
  offset: '30px',
  transition: transitions.SCALE
}

function App() {
  return (
    <AlertProvider template={AlertTemplate} {...options}>

    <BrowserRouter>
      <Switch>
        <Route path="/login" exact={true} component={Login} />
        <Route path="*" exact={true} component={ErrorComp} />
      </Switch>
    </BrowserRouter>
    </AlertProvider>
  );
}
export default App;
