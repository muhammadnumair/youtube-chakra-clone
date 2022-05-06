import { ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import store from './redux/store';
import './index.css';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <ColorModeScript />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ChakraProvider>
    </Provider>
  </StrictMode>,
  document.getElementById('root')
);
