import React, { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import { Link } from 'react-router-dom'
import './Cliente.css'

const Cliente = () => {
    const { cart, removeFromCart, clearCart, total } = useContext(CartContext)

    return (
        <div className="cliente-container">
            <div className="cliente-header">
                <h2>Carrito de Compras</h2>
                <Link to="/" className="volver-inicio">
                    Volver al Inicio
                </Link>
            </div>
            
            {cart.length === 0 ? (
                <p className="carrito-vacio">Tu carrito está vacío</p>
            ) : (
                <>
                    <div className="productos-carrito">
                        {cart.map((item) => (
                            <div key={item.id} className="producto-carrito">
                                <img src={item.imagen} alt={item.nombre} />
                                <div className="producto-info">
                                    <h3>{item.nombre}</h3>
                                    <p>Precio: ${item.precio}</p>
                                    <p>Cantidad: {item.cantidad}</p>
                                    <p>Subtotal: ${item.precio * item.cantidad}</p>
                                </div>
                                <button 
                                    onClick={() => removeFromCart(item.id)}
                                    className="eliminar-btn"
                                >
                                    Eliminar
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="carrito-footer">
                        <p className="total">Total: ${total}</p>
                        <button onClick={clearCart} className="limpiar-btn">
                            Limpiar Carrito
                        </button>
                    </div>
                </>
            )}
        </div>
    )
}

export default Cliente 