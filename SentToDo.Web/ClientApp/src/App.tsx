import logo from './logo.svg'
import {useState} from 'react'
import {Link, Navigate, Outlet, Route, Routes} from "react-router-dom";
import AppPage from "./pages/AppPage";
import TasksPage from "./pages/TasksPage";
import GoogleOAuthCallback from "./pages/GoogleOAuthCallback";
import AuthProvider from "./components/AuthProvider";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";

function App() {
    return (
        <AuthProvider>
            <Link to={'/login'}>Login</Link> <br/>
            <Link to={'/logout'}>Logout</Link> <br/>
            <Routes>
                <Route path="/" element={<Navigate to="/app" replace/>}/>
                <Route path="app" element={<AppPage/>}>
                    <Route path="" element={<TasksPage/>}/>
                </Route>
                <Route path={"login"} element={<LoginPage/>}/>
                <Route path={"logout"} element={<LogoutPage/>}/>
                <Route path="oauth">
                    <Route path="google" element={<GoogleOAuthCallback/>}/>
                </Route>
                <Route path="*" element={<Navigate to="/app" replace/>}/>
            </Routes>
        </AuthProvider>
    )
}

export default App
