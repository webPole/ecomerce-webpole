import React, { useContext } from 'react'
import Header from '../components/estaticos/Header'
import Footer from '../components/estaticos/Footer'
import ProductList from '../components/ProductList'
import loading from '../assets/loading.gif'
import { CartContext } from '../context/CartContext'
const GaleriaDeProductos = () => {

  const {cargando} = useContext(CartContext)
  
  return (
    <>
      <Header />

      <h1 style={{ textAlign: 'center', margin: '2rem 0' }}>Galeria de productos</h1>
      {
          cargando ? <img src={loading} alt='loading' /> :

          <ProductList />
        }

      <Footer/>
    </>
  )
}

export default GaleriaDeProductos
