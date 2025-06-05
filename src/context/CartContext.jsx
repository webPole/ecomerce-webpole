import { createContext, useState, useEffect } from "react";

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([])
    const [productos, setProductos] = useState([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState(false)
    const [isAuthenticated, setIsAuth] = useState(false)
    const apiUrl = 'https://682e2f0e746f8ca4a47c2dbd.mockapi.io/product'

    const cargarProductos = async () => {
        try {
            console.log('Iniciando carga de productos...');
            
            // Cargamos productos del data.json primero
            const respuestaLocal = await fetch('/data/data.json');
            const productosLocal = await respuestaLocal.json();
            console.log('Productos locales cargados:', productosLocal.length);
            
            // Cargamos productos de la API
            const respuestaApi = await fetch(apiUrl);
            const productosApi = await respuestaApi.json();
            console.log('Productos de la API cargados:', productosApi.length);
            
            // Creamos un Map para evitar duplicados, usando el ID como clave
            const productosMap = new Map();
            
            // Primero agregamos los productos locales
            productosLocal.forEach(producto => {
                const id = parseInt(producto.id);
                productosMap.set(id, {
                    ...producto,
                    id: id
                });
            });
            
            // Luego agregamos los productos de la API, sobrescribiendo los locales si tienen el mismo ID
            productosApi.forEach(producto => {
                const id = parseInt(producto.id);
                productosMap.set(id, {
                    ...producto,
                    id: id
                });
            });
            
            // Convertimos el Map a array y ordenamos por ID
            const todosLosProductos = Array.from(productosMap.values())
                .sort((a, b) => a.id - b.id);
            
            console.log('Total de productos cargados:', todosLosProductos.length);
            console.log('Productos cargados:', todosLosProductos);
            
            setProductos(todosLosProductos);
        } catch (error) {
            console.error('Error al cargar productos:', error);
            setError(true);
        } finally {
            setCargando(false);
        }
    };

    const actualizarProductos = async (nuevoProducto) => {
        try {
            // Agregamos el producto a la API
            const respuesta = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(nuevoProducto)
            });

            if (!respuesta.ok) {
                throw new Error('Error al agregar producto');
            }

            const productoAgregado = await respuesta.json();
            
            // Actualizamos el estado local
            setProductos(prevProductos => [...prevProductos, productoAgregado]);
            
            return productoAgregado;
        } catch (error) {
            console.error('Error al actualizar productos:', error);
            throw error;
        }
    };

    const actualizarProducto = async (producto) => {
        try {
            console.log('Producto a actualizar:', producto);
            
            // Aseguramos que el ID sea un número
            const productoId = parseInt(producto.id);
            
            // Verificamos si el producto existe en el estado local
            const productoExistente = productos.find(p => parseInt(p.id) === productoId);
            
            if (!productoExistente) {
                throw new Error('El producto no existe en el sistema');
            }

            // Preparamos el producto para la actualización
            const productoFormateado = {
                ...productoExistente,
                ...producto,
                id: productoId,
                precio: parseFloat(producto.precio),
                stock: parseInt(producto.stock)
            };

            // Intentamos actualizar el producto en la API
            const respuesta = await fetch(`${apiUrl}/${productoId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(productoFormateado)
            });

            if (!respuesta.ok) {
                // Si falla la actualización, intentamos crear uno nuevo
                const respuestaCrear = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(productoFormateado)
                });

                if (!respuestaCrear.ok) {
                    throw new Error(`Error al crear el producto: ${respuestaCrear.status}`);
                }

                const nuevoProducto = await respuestaCrear.json();
                
                // Actualizamos el estado local
                setProductos(prevProductos => {
                    const productosFiltrados = prevProductos.filter(p => parseInt(p.id) !== productoId);
                    return [...productosFiltrados, nuevoProducto];
                });

                return nuevoProducto;
            }

            const productoActualizado = await respuesta.json();
            
            // Actualizamos el estado local
            setProductos(prevProductos => {
                const productosFiltrados = prevProductos.filter(p => parseInt(p.id) !== productoId);
                return [...productosFiltrados, productoActualizado];
            });

            return productoActualizado;
        } catch (error) {
            console.error('Error detallado en actualizarProducto:', error);
            throw error;
        }
    };

    const eliminarProducto = async (id) => {
        try {
            const respuesta = await fetch(`${apiUrl}/${id}`, {
                method: 'DELETE'
            });

            if (!respuesta.ok) {
                throw new Error('Error al eliminar producto');
            }

            // Actualizamos el estado local eliminando el producto
            setProductos(prevProductos => prevProductos.filter(p => p.id !== id));
        } catch (error) {
            console.error('Error al eliminar producto:', error);
            throw error;
        }
    };

    const agregarProducto = async (producto) => {
        try {
            // Encontrar el ID más alto actual
            const maxId = productos.reduce((max, item) => Math.max(max, item.id), 0);
            
            // Asignar el siguiente ID disponible
            const nuevoId = maxId < 9 ? maxId + 1 : maxId + 1;
            
            // Crear el nuevo producto con el ID asignado
            const productoConId = {
                ...producto,
                id: nuevoId
            };

            const response = await fetch(`${apiUrl}/product`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productoConId),
            });

            if (!response.ok) {
                throw new Error('Error al agregar el producto');
            }

            const nuevoProducto = await response.json();
            
            // Actualizar el estado local solo con el nuevo producto
            setProductos(prevProductos => {
                // Filtrar productos existentes para evitar duplicados
                const productosFiltrados = prevProductos.filter(p => p.id !== nuevoProducto.id);
                return [...productosFiltrados, nuevoProducto];
            });

            return nuevoProducto;
        } catch (error) {
            console.error('Error al agregar producto:', error);
            throw error;
        }
    };

    useEffect(() => {
        cargarProductos();
    }, []);

    const handleAddToCart = (product) => {
        const productInCart = cart.find((item) => item.id === product.id);
        if (productInCart) {
            setCart(cart.map((item) => 
                item.id === product.id 
                    ? { 
                        ...item, 
                        cantidad: item.cantidad + product.cantidad,
                        precioTotal: (item.cantidad + product.cantidad) * item.precio
                    } 
                    : item
            ));
        } else {
            setCart([...cart, { 
                ...product, 
                cantidad: product.cantidad,
                precioTotal: product.cantidad * product.precio
            }]);
        }
    };

    const handleDeleteFromCart = (product) => {
        setCart(prevCart => prevCart.filter(item => item.id !== product.id));
    };

    return (
        <CartContext.Provider 
        value={
            { 
                cart, 
                productos, 
                cargando, 
                error, 
                handleAddToCart, 
                handleDeleteFromCart, 
                isAuthenticated, 
                setIsAuth,
                actualizarProductos,
                actualizarProducto,
                cargarProductos,
                eliminarProducto,
                agregarProducto
            }
        }>
            {children}
        </CartContext.Provider>
    )
}