import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from "react-router-dom";
import { DataContextProvider } from "./components/view/contex.jsx"
import { SnackbarProvider } from 'notistack';
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <SnackbarProvider>  
        <DataContextProvider>
          <App />
        </DataContextProvider>
      </SnackbarProvider>
    </HashRouter>
  </React.StrictMode>,
)