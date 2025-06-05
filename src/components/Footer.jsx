import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>Enlaces Rápidos</h3>
                    <ul>
                        <li><Link to="/">Inicio</Link></li>
                        <li><Link to="/productos">Productos</Link></li>
                        <li><Link to="/contacto">Contacto</Link></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>Contacto</h3>
                    <p>Email: info@cocktails.com</p>
                    <p>Teléfono: (123) 456-7890</p>
                </div>
                <div className="footer-section">
                    <h3>Síguenos</h3>
                    <div className="social-links">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2024 Cocktails. Todos los derechos reservados.</p>
                <p className="developer-link">
                    Desarrollado por <a href="https://github.com/tu-usuario" target="_blank" rel="noopener noreferrer" style={{ color: '#00ff00' }}>Tu Nombre</a>
                </p>
            </div>
        </footer>
    );
};

export default Footer; 