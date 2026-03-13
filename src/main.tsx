import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import StudentApp from './App'
import TeacherApp from './TeacherApp'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StudentApp />} />
        <Route path="/lehrer" element={<TeacherApp />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)