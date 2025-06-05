import React, { useState } from 'react';
import './FormularioProducto.css';

const FormularioProducto = ({ onAgregar }) => {
    const [producto, setProducto] = useState({
        nombre: '',
        precio: '',
        imagen: '',
        descripcion: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProducto(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await onAgregar(producto);
            // Solo limpiamos el formulario si la operación fue exitosa
            setProducto({
                nombre: '',
                precio: '',
                imagen: '',
                descripcion: ''
            });
        } catch (error) {
            console.error('Error al agregar el producto:', error);
        }
    };

    const handleCancel = () => {
        // Simplemente cerramos el modal sin mostrar alertas
        onAgregar(null);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Agregar Nuevo Producto</h2>
                    <button className="close-button" onClick={handleCancel}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="product-form">
                    <div className="form-group">
                        <label htmlFor="nombre">
                            <i className="fas fa-tag"></i> Nombre del Producto
                        </label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            value={producto.nombre}
                            onChange={handleChange}
                            placeholder="Ingrese el nombre del producto"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="precio">
                            <i className="fas fa-dollar-sign"></i> Precio
                        </label>
                        <input
                            type="number"
                            id="precio"
                            name="precio"
                            value={producto.precio}
                            onChange={handleChange}
                            placeholder="Ingrese el precio"
                            required
                            min="0"
                            step="0.01"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="imagen">
                            <i className="fas fa-image"></i> URL de la Imagen
                        </label>
                        <input
                            type="url"
                            id="imagen"
                            name="imagen"
                            value={producto.imagen}
                            onChange={handleChange}
                            placeholder="Ingrese la URL de la imagen"
                            required
                        />
                        {producto.imagen && (
                            <div className="image-preview">
                                <img src={producto.imagen} alt="Vista previa" />
                            </div>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="descripcion">
                            <i className="fas fa-align-left"></i> Descripción
                        </label>
                        <textarea
                            id="descripcion"
                            name="descripcion"
                            value={producto.descripcion}
                            onChange={handleChange}
                            placeholder="Ingrese la descripción del producto"
                            rows="4"
                            required
                        />
                    </div>

                    <div className="form-actions">
                        <button type="button" className="cancel-button" onClick={handleCancel}>
                            <i className="fas fa-times"></i> Cancelar
                        </button>
                        <button type="submit" className="submit-button">
                            <i className="fas fa-plus"></i> Agregar Producto
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FormularioProducto;