import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { LoginScreen } from '../auth/pages/LoginScreen'
import { RegisterScreen } from '../auth/pages/RegisterScreen'
import { HomePage } from '../home/homepage/HomePage'
import { AdminPage } from '../Admin/AdminPage/AdminPage'







export const AppRouter = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginScreen/>} />
      <Route path="/register" element={<RegisterScreen/>} />
      <Route path="/home" element={<HomePage/>} />
      <Route path="/admin" element={<AdminPage/>} />
      
    </Routes>

  </BrowserRouter>
  )
}
