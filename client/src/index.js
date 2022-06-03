import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ContextProvider } from "./context/Context";

ReactDOM.render(
  <React.StrictMode>
        <ContextProvider>        
    <App />                   
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
//WE IMPORTED <Context.Provider    AND WE ARE ABLE TO REACH OUR USER  AND FETCHING AN ERROR