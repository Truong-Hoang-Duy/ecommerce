import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.scss';
import { theme } from './utils/constants';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './styles/GlobalStyles';

import { Provider } from 'react-redux';
import { store } from './app/store';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <App />
        <ToastContainer></ToastContainer>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
