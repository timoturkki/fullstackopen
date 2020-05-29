import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { ThemeProvider as MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import store from './store';
import App from './App';
import './index.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: 'rgba(255, 255, 255, 1)',
    },
    secondary: {
      main: 'rgba(0, 0, 0, 1)',
    },
    type: 'light',
  },
});

ReactDOM.render(
  <React.StrictMode>
    <MuiThemeProvider theme={theme}>
      <Router>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>
    </MuiThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);