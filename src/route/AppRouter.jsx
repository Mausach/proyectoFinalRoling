import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { LoginScreen } from '../auth/pages/LoginScreen'
import { RegisterScreen } from '../auth/pages/RegisterScreen'
import { HomePage } from '../home/homepage/HomePage'
import { AdminPage } from '../Admin/AdminPage/AdminPage'
import { ReestablecerScreen } from '../auth/pages/ReestablecerScreen'
import { TiendaScreen } from '../auth/pages/TiendaScreen'







export const AppRouter = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/*" element={<HomePage/>} />

      <Route path="/login" element={<LoginScreen/>} />
      <Route path="/register" element={<RegisterScreen/>} />
      
      <Route path="/admin" element={<AdminPage/>} />
      <Route path="/restablecer" element={<ReestablecerScreen/>} />
      <Route path="/tienda" element={<TiendaScreen/>} />
      
    </Routes>

  </BrowserRouter>
  )
}
