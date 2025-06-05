import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

function RutaProtegida({ isAuthenticated, children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const userRole = localStorage.getItem('userRole');
      const isAuth = localStorage.getItem('isAuth');
      
      // Mensajes de depuración (solo en desarrollo)
      if (process.env.NODE_ENV === 'development') {
        console.log('Estado de autenticación:', {
          isAuthenticated,
          userRole,
          isAuth,
          isAuthorized
        });
      }
      
      if (userRole === 'admin' && isAuth === 'true') {
        setIsAuthorized(true);
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [isAuthenticated]);

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #2C3E50 0%, #3498DB 100%)',
        color: 'white',
        fontSize: '1.2rem'
      }}>
        Verificando acceso...
      </div>
    );
  }

  if (!isAuthenticated || !isAuthorized) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Redirigiendo a login - Razón:', !isAuthenticated ? 'No autenticado' : 'No autorizado');
    }
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default RutaProtegida;