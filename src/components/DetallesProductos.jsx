import React, { useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import { CartContext } from '../context/CartContext'
import './styleDetallesProductos.css'

const DetallesProductos = () => {
    const { productos } = useContext(CartContext)
    const { id } = useParams()
    const product = productos.find(producto => producto.id == id)

    if (!product) {
        return (
            <div className="detalles-container">
                <h2>Producto no encontrado</h2>
                <Link to="/productos" className="volver-btn">Volver a productos</Link>
            </div>
        )
    }

    return (
        <div className="detalles-container">
            <div className="detalles-producto">
                <div className="imagen-container">
                    <img src={product.imagen} alt={product.nombre} />
                </div>
                <div className="info-container">
                    <h1>{product.nombre}</h1>
                    <p className="precio">${product.precio}</p>
                    <p className="descripcion">{product.descripcion}</p>
                    {product.categoria && (
                        <p className="categoria">Categoría: {product.categoria}</p>
                    )}
                    {product.stock !== undefined && (
                        <p className="stock">Stock disponible: {product.stock}</p>
                    )}
                    <div className="acciones">
                        <Link to="/productos" className="volver-btn">Volver a productos</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetallesProductos
