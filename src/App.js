import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Test from "./components/Test";
import ErrorComp from "./components/ErrorComp";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact={true} component={Test} />
        <Route path="*" exact={true} component={ErrorComp} />
      </Switch>
    </BrowserRouter>
  );
}
export default App;
