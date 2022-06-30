import logo from './logo.svg'
import {useState} from 'react'
import {Link, Navigate, Outlet, Route, Routes, useLocation} from "react-router-dom";
import AppPage from "./pages/AppPage";
import TasksPage from "./pages/TasksPage";
import GoogleOAuthCallback from "./pages/GoogleOAuthCallback";
import AuthProvider from "./components/AuthProvider";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import TaskDetails from "./pages/TaskDetails";

import 'semantic-ui-css/semantic.min.css'
import {AnimatePresence} from "framer-motion";

function App() {
    const location = useLocation();
    
    return (
        <AuthProvider>
            <AnimatePresence exitBeforeEnter>
                <Routes>
                    <Route path="/" element={<Navigate to="/app" replace/>}/>
                    <Route path="app" element={<AppPage/>}>
                        <Route path="" element={<TasksPage/>}>
                            <Route path="task/:selectedToDo" element={<TaskDetails/>}></Route>
                        </Route>
                    </Route>
                    <Route path={"login"} element={<LoginPage/>}/>
                    <Route path={"logout"} element={<LogoutPage/>}/>
                    <Route path="oauth">
                        <Route path="google" element={<GoogleOAuthCallback/>}/>
                    </Route>
                    <Route path="*" element={<Navigate to="/app" replace/>}/>
                </Routes>
            </AnimatePresence>
        </AuthProvider>
    )
}

export default App
