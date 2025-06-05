import React from 'react'
import './styleEstatico.css'

const Footer = () => {
  return (
    <footer>
        <p>&copy; 2025 - Mi Tienda Online</p>
        <p className="developer-link">
            Desarrollado por: <a href="#" target="_blank" rel="noopener noreferrer" style={{ color: '#00ff00' }}>WebPole</a>
        </p>
    </footer>
  )
}

export default Footer
