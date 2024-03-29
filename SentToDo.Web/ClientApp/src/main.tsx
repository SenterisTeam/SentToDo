import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import {registerSW} from "virtual:pwa-register";
import {BrowserRouter} from "react-router-dom";

if ("serviceWorker" in navigator) {
    // && !/localhost/.test(window.location)) {
    registerSW();
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </React.StrictMode>
)
