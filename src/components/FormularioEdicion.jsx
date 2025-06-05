/**
 * Componente FormularioEdicion
 * Permite editar los detalles de un producto existente
 * Incluye validación de campos y vista previa de imagen
 */
import React, { useState, useEffect } from 'react';
import './FormularioProducto.css';

function FormularioEdicion({ productoSeleccionado, onActualizar }) {
    // Estado para almacenar los datos del producto en edición
    const [producto, setProducto] = useState({
        ...productoSeleccionado,
        id: parseInt(productoSeleccionado.id)
    });
    
    // Estado para manejar errores de validación
    const [errores, setErrores] = useState({});
    
    // Estado para controlar el envío del formulario
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // Estado para controlar la vista previa de la imagen
    const [showPreview, setShowPreview] = useState(false);

    // Efecto para actualizar el estado cuando cambia el producto seleccionado
    useEffect(() => {
        setProducto({
            ...productoSeleccionado,
            id: parseInt(productoSeleccionado.id)
        });
        setErrores({});
        setShowPreview(false);
    }, [productoSeleccionado]);

    /**
     * Valida un campo específico del formulario
     * @param {string} name - Nombre del campo
     * @param {string|number} value - Valor del campo
     * @returns {string} Mensaje de error o cadena vacía si es válido
     */
    const validarCampo = (name, value) => {
        switch (name) {
            case 'nombre':
                return value.trim().length < 3 ? 'El nombre debe tener al menos 3 caracteres' : '';
            case 'precio':
                return parseFloat(value) <= 0 ? 'El precio debe ser mayor que 0' : '';
            case 'stock':
                return parseInt(value) < 0 ? 'El stock no puede ser negativo' : '';
            case 'imagen':
                try {
                    new URL(value);
                    return '';
                } catch {
                    return 'URL de imagen inválida';
                }
            case 'categoria':
                return value.trim().length < 2 ? 'La categoría debe tener al menos 2 caracteres' : '';
            default:
                return '';
        }
    };

    /**
     * Maneja los cambios en los campos del formulario
     * @param {Event} e - Evento del input
     */
    const handleChange = (e) => {
        const { name, value } = e.target;
        let newValue = value;
        
        // Conversión de tipos según el campo
        if (name === 'id') {
            newValue = parseInt(value) || '';
        } else if (name === 'precio') {
            newValue = parseFloat(value) || '';
        } else if (name === 'stock') {
            newValue = parseInt(value) || '';
        }

        // Actualiza el estado del producto
        setProducto(prev => ({
            ...prev,
            [name]: newValue
        }));

        // Valida el campo y actualiza errores
        const error = validarCampo(name, value);
        setErrores(prev => ({
            ...prev,
            [name]: error
        }));
    };

    /**
     * Maneja la cancelación de la edición
     */
    const handleCancel = () => {
        onActualizar({ action: 'cancel' });
    };

    /**
     * Maneja el envío del formulario
     * @param {Event} e - Evento del formulario
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Validación de todos los campos
        const nuevosErrores = {};
        Object.keys(producto).forEach(key => {
            const error = validarCampo(key, producto[key]);
            if (error) nuevosErrores[key] = error;
        });

        if (Object.keys(nuevosErrores).length > 0) {
            setErrores(nuevosErrores);
            setIsSubmitting(false);
            return;
        }

        try {
            // Formatea los datos del producto
            const productoCompleto = {
                ...producto,
                id: parseInt(producto.id),
                nombre: producto.nombre.trim(),
                precio: parseFloat(producto.precio),
                stock: parseInt(producto.stock),
                imagen: producto.imagen.trim(),
                categoria: producto.categoria.trim(),
                cantidad: producto.cantidad || 0
            };

            console.log('Enviando producto para actualizar:', productoCompleto);
            await onActualizar({ action: 'update', data: productoCompleto });
        } catch (error) {
            console.error('Error al actualizar el producto:', error);
            setErrores(prev => ({
                ...prev,
                submit: 'Error al actualizar el producto. Por favor, intente nuevamente.'
            }));
        } finally {
            setIsSubmitting(false);
        }
    };

    /**
     * Muestra la vista previa de la imagen al enfocar el campo
     */
    const handleImageFocus = () => {
        setShowPreview(true);
    };

    /**
     * Oculta la vista previa de la imagen al desenfocar el campo
     */
    const handleImageBlur = () => {
        if (!producto.imagen || errores.imagen) {
            setShowPreview(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                {/* Encabezado del modal */}
                <div className="modal-header">
                    <h2>
                        <i className="fas fa-edit"></i> Editar Producto
                    </h2>
                    <button 
                        className="close-button" 
                        onClick={handleCancel}
                        title="Cerrar formulario"
                    >
                        <i className="fas fa-times"></i>
                    </button>
                </div>

                {/* Formulario de edición */}
                <form onSubmit={handleSubmit} className="product-form">
                    {/* Mensaje de error global */}
                    {errores.submit && (
                        <div className="error-message global-error">
                            <i className="fas fa-exclamation-circle"></i> {errores.submit}
                        </div>
                    )}

                    {/* Campo ID */}
                    <div className="form-group">
                        <label htmlFor="id">
                            <i className="fas fa-hashtag"></i> ID
                        </label>
                        <input
                            type="number"
                            id="id"
                            name="id"
                            value={producto.id || ''}
                            onChange={handleChange}
                            placeholder="Ingrese el ID del producto"
                            required
                            min="1"
                            disabled
                            title="El ID no puede ser modificado"
                        />
                        {errores.id && (
                            <span className="error-message">
                                <i className="fas fa-exclamation-circle"></i> {errores.id}
                            </span>
                        )}
                    </div>

                    {/* Campo Nombre */}
                    <div className="form-group">
                        <label htmlFor="nombre">
                            <i className="fas fa-tag"></i> Nombre del Producto
                        </label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            value={producto.nombre || ''}
                            onChange={handleChange}
                            placeholder="Ingrese el nombre del producto"
                            required
                            title="Mínimo 3 caracteres"
                        />
                        {errores.nombre && (
                            <span className="error-message">
                                <i className="fas fa-exclamation-circle"></i> {errores.nombre}
                            </span>
                        )}
                    </div>

                    {/* Campo Precio */}
                    <div className="form-group">
                        <label htmlFor="precio">
                            <i className="fas fa-dollar-sign"></i> Precio
                        </label>
                        <div className="input-with-icon">
                            <span className="currency-symbol">$</span>
                            <input
                                type="number"
                                id="precio"
                                name="precio"
                                value={producto.precio || ''}
                                onChange={handleChange}
                                placeholder="0.00"
                                required
                                min="0"
                                step="0.01"
                                title="Debe ser mayor que 0"
                            />
                        </div>
                        {errores.precio && (
                            <span className="error-message">
                                <i className="fas fa-exclamation-circle"></i> {errores.precio}
                            </span>
                        )}
                    </div>

                    {/* Campo Stock */}
                    <div className="form-group">
                        <label htmlFor="stock">
                            <i className="fas fa-boxes"></i> Stock
                        </label>
                        <input
                            type="number"
                            id="stock"
                            name="stock"
                            value={producto.stock || ''}
                            onChange={handleChange}
                            placeholder="Ingrese el stock disponible"
                            required
                            min="0"
                            title="No puede ser negativo"
                        />
                        {errores.stock && (
                            <span className="error-message">
                                <i className="fas fa-exclamation-circle"></i> {errores.stock}
                            </span>
                        )}
                    </div>

                    {/* Campo Imagen */}
                    <div className="form-group">
                        <label htmlFor="imagen">
                            <i className="fas fa-image"></i> URL de la Imagen
                        </label>
                        <input
                            type="url"
                            id="imagen"
                            name="imagen"
                            value={producto.imagen || ''}
                            onChange={handleChange}
                            onFocus={handleImageFocus}
                            onBlur={handleImageBlur}
                            placeholder="Ingrese la URL de la imagen"
                            required
                            title="Debe ser una URL válida"
                        />
                        {errores.imagen && (
                            <span className="error-message">
                                <i className="fas fa-exclamation-circle"></i> {errores.imagen}
                            </span>
                        )}
                        {/* Vista previa de la imagen */}
                        {showPreview && producto.imagen && !errores.imagen && (
                            <div className="image-preview">
                                <img src={producto.imagen} alt="Vista previa" />
                                <div className="image-preview-overlay">
                                    <span>Vista previa</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Campo Categoría */}
                    <div className="form-group">
                        <label htmlFor="categoria">
                            <i className="fas fa-tags"></i> Categoría
                        </label>
                        <input
                            type="text"
                            id="categoria"
                            name="categoria"
                            value={producto.categoria || ''}
                            onChange={handleChange}
                            placeholder="Ingrese la categoría del producto"
                            required
                            title="Mínimo 2 caracteres"
                        />
                        {errores.categoria && (
                            <span className="error-message">
                                <i className="fas fa-exclamation-circle"></i> {errores.categoria}
                            </span>
                        )}
                    </div>

                    {/* Botones de acción */}
                    <div className="form-actions">
                        <button 
                            type="button" 
                            className="cancel-button" 
                            onClick={handleCancel}
                            disabled={isSubmitting}
                            title="Cancelar edición"
                        >
                            <i className="fas fa-times"></i> Cancelar
                        </button>
                        <button 
                            type="submit" 
                            className="submit-button"
                            disabled={isSubmitting}
                            title="Guardar cambios"
                        >
                            <i className="fas fa-save"></i> 
                            {isSubmitting ? (
                                <>
                                    <span className="spinner"></span>
                                    Guardando...
                                </>
                            ) : 'Guardar Cambios'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default FormularioEdicion;