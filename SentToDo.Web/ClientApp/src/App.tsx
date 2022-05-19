
import logo from './logo.svg'
import { useState } from 'react'
import {Navigate, Route, Routes} from "react-router-dom";
import AppPage from "./pages/AppPage";
import TasksPage from "./pages/TasksPage";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Navigate to="/app" replace />} />
        <Route path="app" element={<AppPage />} >
            <Route path="" element={<TasksPage/>}/>
        </Route>
        <Route path="*" element={<Navigate to="/app" replace />} />
      </Routes>
  )
}

export default App
