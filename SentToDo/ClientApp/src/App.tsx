import React, {Component} from 'react';
import {Route, Routes, useLocation} from 'react-router';
import Home from './pages/Home';
import Settings from './pages/Settings';
import {AnimatePresence} from "framer-motion";
import {ipcRenderer} from 'electron-renderer';
import TitleBar from "./components/TitleBar";

function App() {
    let location = useLocation();

    return (
        <>
            <TitleBar/>
            <AnimatePresence exitBeforeEnter>
                <Routes location={location} key={location.pathname}>
                    <Route path='/' element={<Home/>}/>
                    <Route path='settings' element={<Settings/>}/>
                </Routes>
            </AnimatePresence>
        </>
    );
}

export default App;