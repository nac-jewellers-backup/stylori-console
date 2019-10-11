import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import MainApp from './routes';
import { GlobalProvider } from './context';
import { CssBaseline } from '@material-ui/core';

function App() {
  
  return (
    <GlobalProvider>
        <div className="App">
          <CssBaseline />
            <Router>
              <MainApp />
            </Router>
        </div>
    </GlobalProvider>

  );
}

export default App;
