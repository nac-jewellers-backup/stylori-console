import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import MainApp from "./routes";
import { GlobalProvider } from "./context";
import { CssBaseline } from "@material-ui/core";
import theme from "./theme";
import { MuiThemeProvider } from "@material-ui/core/styles";
import AppAlert from "./App.Alert";

function App() {
  return (
    <GlobalProvider>
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <CssBaseline />
          <Router>
            <AppAlert>
              <MainApp />
            </AppAlert>
          </Router>
        </div>
      </MuiThemeProvider>
    </GlobalProvider>
  );
}

export default App;
