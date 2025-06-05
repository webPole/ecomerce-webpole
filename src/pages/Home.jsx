import React, { useContext } from 'react'
import Header from '../components/estaticos/Header'
import Footer from '../components/estaticos/Footer'
import ProductList from '../components/ProductList'
import loading from '../assets/loading.gif'
import { CartContext } from '../context/CartContext'


const Home = () => {
  const { cargando } = useContext(CartContext)


  return (
    <>
      <Header />
      <main>
        <h1 style={{ textAlign: 'center' }}>Bienvenidos a mi Tienda</h1>
        
        {
          cargando ? <img src={loading} alt='loading' /> :
            <ProductList />
        }
      </main>
      <Footer />
    </>
  )
}

export default Home
