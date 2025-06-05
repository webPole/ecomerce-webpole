import { useContext } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AcercaDe from './pages/AcercaDe'
import Contactos from './pages/Contactos'
import GaleriaDeProductos from './pages/GaleriaDeProductos'
import NotFound from './pages/NotFound'
import Admin from './pages/Admin'
import DetallesProductos from './components/DetallesProductos'
import Login from './pages/Login'
import RutaProtegida from './auth/RutasProtegidas'
import { CartContext } from './context/CartContext'

function App() {
  const { isAuthenticated } = useContext(CartContext)

  return (
    
    <Routes>

      <Route path='/' element={<Home />} />

      <Route path='/acercade' element={<AcercaDe />} />

      <Route path='/productos' element={<GaleriaDeProductos />} />

      <Route path='/productos/:id' element={<DetallesProductos />} />

      <Route path='/contacto' element={<Contactos />} />

      <Route path='/admin' element={<RutaProtegida isAuthenticated={isAuthenticated}> <Admin /> </RutaProtegida>} />

      <Route path='/login' element={<Login />} />

      <Route path='*' element={<NotFound />} />

    </Routes>
  )
}

export default App
