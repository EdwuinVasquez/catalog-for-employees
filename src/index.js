import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, HashRouter } from "react-router-dom";
import { DataContextProvider } from "./components/view/contex.jsx"
import { SnackbarProvider, useSnackbar } from 'notistack';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
      <SnackbarProvider>  
        <DataContextProvider>
          <App />
        </DataContextProvider>
      </SnackbarProvider>
    </HashRouter>
  </React.StrictMode>
);