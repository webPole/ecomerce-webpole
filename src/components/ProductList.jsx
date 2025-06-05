import React, {useContext} from 'react'
import Productos from './Productos'
import { CartContext } from '../context/CartContext'
const ProductList = () => {

    const { productos } = useContext(CartContext)

    return (
        <>
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '20px',
                padding: '20px'
            }}>
                {
                    productos.map(producto => (
                        <Productos key={producto.id} producto={producto} />
                    ))
                }
            </div>
        </>
    )
}

export default ProductList
