import React from 'react'
import Header from '../components/estaticos/Header'
import Footer from '../components/estaticos/Footer'

const Contactos = () => {
  return (
    <>
      <Header />
      <div className="p-4 my-3 border rounded shadow">
        <h3 className="mb-3">Formulario de Contacto</h3>
        <input type="text" className="form-control mb-3" placeholder="Nombre" />
        <input type="email" className="form-control mb-3" placeholder="Correo Electrónico" />
        <button className="btn btn-success w-100">Enviar</button>
      </div>
      <Footer />
    </>
  )
}

export default Contactos
