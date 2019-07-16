import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Listing from "./pages/Listing";
import ErrorComp from "./components/ErrorComp";
import AlertTemplate from "react-alert-template-basic";
import { Provider } from "react-redux";
import PrivateRoute from "./utils/PrivateRoute";
import ReduxStore from "./reduxStore";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import setAuthToken from './utils/setAuthToken';
import jwt_decode from "jwt-decode";
import { setCurrentUser, logoutUser } from './actions/authentication';

const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 1500,
  offset: "30px",
  transition: transitions.SCALE
};

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  ReduxStore.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    ReduxStore.dispatch(logoutUser());
    window.location.href = "/login";
  }
}

function App() {
    return (
      <Provider store={ReduxStore}>
        <AlertProvider template={AlertTemplate} {...options}>
          <BrowserRouter>
            <Switch>
              <Route path="/login" exact={true} component={Login} />
              <PrivateRoute path="/listing" exact={true} component={Listing} />
              <Route path="*" exact={true} component={ErrorComp} />
            </Switch>
          </BrowserRouter>
        </AlertProvider>
      </Provider>
    );
}
export default App;
