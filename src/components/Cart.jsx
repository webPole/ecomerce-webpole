import React, { useContext } from 'react'
import './styleCart.css'
import { CartContext } from '../context/CartContext'

const Cart = ({ isOpen, onClose }) => {
    const { cart, handleDeleteFromCart } = useContext(CartContext)
    
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <>
            <div className={`cart-overlay ${isOpen ? 'open' : ''}`} onClick={handleOverlayClick} />
            <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
                <div className='cart-header'>
                    <h2>Carrito de Compras</h2>
                    <button onClick={onClose} className='close-button'>×</button>
                </div>
                <div className='cart-content'>
                    {cart.length === 0 ? (
                        <p style={{ textAlign: 'center', color: '#666', padding: '20px' }}>El carrito está vacío</p>
                    ) : (
                        <>
                            <div className='cart-items-container'>
                                {cart.map((item) => (
                                    <div key={item.id} className='cart-item'>
                                        <div className='cart-item-info'>
                                            <div className='cart-item-name'>{item.nombre}</div>
                                            <div className='cart-item-price'>${item.precio}</div>
                                            <div className='cart-item-quantity'>Cantidad: {item.cantidad}</div>
                                            <div className='cart-item-total'>Subtotal: ${(item.precio * item.cantidad).toFixed(2)}</div>
                                        </div>
                                        <button onClick={() => handleDeleteFromCart(item)}>
                                            <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <div className='cart-footer'>
                                <p>Total: ${cart.reduce((total, item) => total + (item.precio * item.cantidad), 0).toFixed(2)}</p>
                                <button className='btnCheckout'>Finalizar Compra</button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default Cart
