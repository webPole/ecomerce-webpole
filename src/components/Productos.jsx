import React, { useState, useContext } from 'react'
import './styleProductos.css'
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext'

const Productos = ({ producto }) => {
    const [cantidad, setCantidad] = useState(0)
    const { handleAddToCart } = useContext(CartContext)

    const handleAddToCartClick = () => {
        if (cantidad > 0) {
            handleAddToCart({ ...producto, cantidad })
            setCantidad(0)
        }
    }

    return (
        <section className='card'>
            <div className='imganContainer'>
                <img src={producto.imagen} alt={producto.nombre} className='imagen' />
            </div>

            <h3 className='nombre'>{producto.nombre}</h3>
            <p className='precio'>${producto.precio}</p>
            <p className='descripcion'>{producto.descripcion}</p>

            <div className='cantidadContainer'>
                <button 
                    onClick={() => setCantidad(prev => Math.max(0, prev - 1))}
                    className='qtyButton'
                >
                    -
                </button>
                <span>{cantidad}</span>
                <button 
                    onClick={() => setCantidad(prev => prev + 1)}
                    className='qtyButton'
                >
                    +
                </button>
            </div>

            {cantidad > 0 && (
                <button 
                    onClick={handleAddToCartClick}
                    className='addToCartButton'
                >
                    Agregar al carrito
                </button>
            )}

            <Link to={`/productos/${producto.id}`} className='verMasLink'>Ver más</Link>
        </section>
    )
}

export default Productos
