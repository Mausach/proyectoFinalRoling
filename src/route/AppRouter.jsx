import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { LoginScreen } from '../Pages/Login/LoginScreen'
import { RegisterScreen } from '../Pages/Register/RegisterScreen'
import { HomePage } from '../Pages/Home/HomePage'
import { AdminPage } from '../Pages/Admin/AdminPage'
import { ReestablecerScreen } from '../Pages/Restablecer/ReestablecerScreen'
import { TiendaScreen } from '../Pages/Tienda/TiendaScreen'
import { NosotrosPage } from '../Pages/Nosotros/NosotrosPage'
import { NuestroEquipoPage } from '../Pages/Nosotros/NuestroEquipoPage'







export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/*" element={<HomePage />} />
        <Route path="/Nosotros" element={<NosotrosPage />} />
        <Route path="/NuestroEquipo" element={<NuestroEquipoPage />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/restablecer" element={<ReestablecerScreen />} />
        <Route path="/tienda" element={<TiendaScreen />} />

      </Routes>
    </BrowserRouter>
  )
}
