/**
 * Componente Admin - Panel de administración de productos
 * Permite gestionar (crear, editar, eliminar) los productos de la tienda
 */
import React, { useState, useEffect, useContext } from "react";
import FormularioProducto from "../components/FormularioProducto";
import FormularioEdicion from "../components/FormularioEdicion";
import { CartContext } from "../context/CartContext";
import { useNavigate, Link } from "react-router-dom";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import './Admin.css';

const Admin = () => {
    // Contexto y estados
    const { 
        setIsAuth, 
        actualizarProductos, 
        actualizarProducto,
        productos, 
        cargarProductos,
        eliminarProducto 
    } = useContext(CartContext);
    
    // Estados locales
    const [loading, setLoading] = useState(true);        // Controla el estado de carga
    const [open, setOpen] = useState(false);             // Controla la visibilidad del formulario de nuevo producto
    const [seleccionado, setSeleccionado] = useState(null); // Producto seleccionado para editar
    const [openEditor, setOpenEditor] = useState(false); // Controla la visibilidad del editor
    const apiUrl = 'https://682e2f0e746f8ca4a47c2dbd.mockapi.io/product';
    const navigate = useNavigate();

    // Efecto para verificar autenticación y cargar productos
    useEffect(() => {
        const userRole = localStorage.getItem('userRole');
        if (userRole !== 'admin') {
            navigate('/login');
            return;
        }

        const inicializar = async () => {
            setLoading(true);
            try {
                await cargarProductos();
            } catch (error) {
                console.error("Error al cargar productos:", error);
            } finally {
                setLoading(false);
            }
        };

        inicializar();
    }, []);

    /**
     * Maneja el cierre de sesión del administrador
     * Limpia el localStorage y redirige al inicio
     */
    const handleLogout = () => {
        setIsAuth(false);
        localStorage.removeItem('isAuth');
        localStorage.removeItem('userRole');
        navigate('/');
    };

    /**
     * Agrega un nuevo producto a la tienda
     * @param {Object} producto - Datos del nuevo producto
     */
    const agregarProducto = async (producto) => {
        if (!producto) {
            setOpen(false);
            return;
        }

        try {
            await actualizarProductos(producto);
            
            await Swal.fire({
                title: '¡Éxito!',
                text: 'Producto agregado correctamente',
                icon: 'success',
                confirmButtonColor: '#1a237e',
                background: '#fff',
                color: '#1a237e'
            });

            setOpen(false);
        } catch (error) {
            await Swal.fire({
                title: 'Error',
                text: error.message,
                icon: 'error',
                confirmButtonColor: '#1a237e',
                background: '#fff',
                color: '#1a237e'
            });
        }
    };

    /**
     * Maneja la actualización de un producto existente
     * @param {Object} resultado - Resultado de la edición del producto
     */
    const handleActualizarProducto = async (resultado) => {
        if (resultado.action === 'cancel') {
            setOpenEditor(false);
            setSeleccionado(null);
            return;
        }

        if (resultado.action === 'update') {
            try {
                console.log('Iniciando actualización de producto...');
                console.log('Datos recibidos:', resultado.data);
                
                const productoActualizado = {
                    ...resultado.data,
                    id: parseInt(resultado.data.id)
                };

                console.log('Datos formateados para actualización:', productoActualizado);

                await actualizarProducto(productoActualizado);
                
                await Swal.fire({
                    title: '¡Éxito!',
                    text: 'Producto actualizado correctamente',
                    icon: 'success',
                    confirmButtonColor: '#1a237e',
                    background: '#fff',
                    color: '#1a237e'
                });
                
                setOpenEditor(false);
                setSeleccionado(null);
            } catch (error) {
                console.error('Error completo:', error);
                console.error('Stack trace:', error.stack);
                
                let mensajeError = 'Hubo un problema al actualizar el producto. ';
                if (error.message) {
                    mensajeError += error.message;
                }
                
                await Swal.fire({
                    title: 'Error',
                    text: mensajeError,
                    icon: 'error',
                    confirmButtonColor: '#1a237e',
                    background: '#fff',
                    color: '#1a237e'
                });
            }
        }
    };

    const handleEliminarProducto = async (id) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás revertir esta acción",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#1a237e',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            background: '#fff',
            color: '#1a237e'
        });

        if (result.isConfirmed) {
            try {
                await eliminarProducto(id);
                await Swal.fire({
                    title: '¡Eliminado!',
                    text: 'El producto ha sido eliminado',
                    icon: 'success',
                    confirmButtonColor: '#1a237e',
                    background: '#fff',
                    color: '#1a237e'
                });
            } catch (error) {
                await Swal.fire({
                    title: 'Error',
                    text: 'Hubo un problema al eliminar el producto',
                    icon: 'error',
                    confirmButtonColor: '#1a237e',
                    background: '#fff',
                    color: '#1a237e'
                });
            }
        }
    };

    return (
        <div className="admin-container">
            <div className="admin-header">
                <h1>Panel de Administración</h1>
                <div className="admin-actions">
                    <button onClick={() => setOpen(true)} className="btn-nuevo">
                        <i className="fas fa-plus"></i> Nuevo Producto
                    </button>
                    <button onClick={handleLogout} className="btn-logout">
                        <i className="fas fa-sign-out-alt"></i> Cerrar Sesión
                    </button>
                </div>
            </div>

            <div className="admin-content">
                <div className="productos-lista">
                    <h2>Lista de Productos</h2>
                    {loading ? (
                        <div className="loading-container">
                            <div className="loading-spinner"></div>
                            <p>Cargando productos...</p>
                        </div>
                    ) : (
                        <>
                            {productos.length === 0 ? (
                                <p className="no-productos">No hay productos disponibles</p>
                            ) : (
                                <div className="products-grid">
                                    {productos.map((product, index) => (
                                        <div key={`${product.id}-${index}`} className="product-card">
                                            <div className="product-image-container">
                                                <img
                                                    src={product.imagen}
                                                    alt={product.nombre}
                                                    className="product-image"
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = 'https://via.placeholder.com/150?text=No+Image';
                                                    }}
                                                />
                                            </div>
                                            <div className="product-info">
                                                <h3 className="product-name">{product.nombre}</h3>
                                                <p className="product-price">${product.precio}</p>
                                                <p className="product-stock">Stock: {product.stock}</p>
                                                <div className="product-actions">
                                                    <button 
                                                        className="edit-button" 
                                                        onClick={() => {
                                                            setOpenEditor(true);
                                                            setSeleccionado(product);
                                                        }}
                                                    >
                                                        <i className="fas fa-edit"></i> Editar
                                                    </button>
                                                    <button 
                                                        className="delete-button" 
                                                        onClick={() => handleEliminarProducto(product.id)}
                                                    >
                                                        <i className="fas fa-trash"></i> Eliminar
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            {open && (<FormularioProducto onAgregar={agregarProducto}/>)}
            {openEditor && (
                <FormularioEdicion 
                    productoSeleccionado={seleccionado} 
                    onActualizar={handleActualizarProducto}
                />
            )}
        </div>
    );
};

export default Admin;
