import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from './CartContext';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { setIsAuth } = useContext(CartContext);

  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    const isAuth = localStorage.getItem('isAuth');
    console.log('Estado inicial - userRole:', userRole, 'isAuth:', isAuth);
    
    if (userRole === 'admin' && isAuth === 'true') {
      setIsAuth(true);
      navigate('/admin');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Intentando iniciar sesión con:', { email, password });
    
    let validationErrors = {};
    if (!email) validationErrors.email = 'Email es requerido';
    if (!password) validationErrors.password = 'Password es requerido';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      console.log('Intentando cargar usuarios...');
      const res = await fetch('/data/users.json');
      console.log('Respuesta del servidor:', res.status);
      
      if (!res.ok) {
        throw new Error(`Error al cargar usuarios: ${res.status}`);
      }
      
      const users = await res.json();
      console.log('Usuarios cargados:', users);

      const foundUser = users.find(
        (user) => user.email === email && user.password === password
      );
      console.log('Usuario encontrado:', foundUser);

      if (!foundUser) {
        console.log('Credenciales inválidas');
        setErrors({ email: 'Credenciales inválidas' });
        return;
      }

      console.log('Rol del usuario:', foundUser.role);
      
      if (foundUser.role === 'admin') {
        console.log('Configurando sesión de administrador');
        setIsAuth(true);
        localStorage.setItem('isAuth', 'true');
        localStorage.setItem('userRole', 'admin');
        setEmail('');
        setPassword('');
        setErrors({});
        navigate('/admin');
      } else if (foundUser.role === 'cliente') {
        console.log('Configurando sesión de cliente');
        localStorage.setItem('userRole', 'cliente');
        setEmail('');
        setPassword('');
        setErrors({});
        navigate('/productos');
      }
    } catch (err) {
      console.error('Error en el proceso de autenticación:', err);
      setErrors({ email: 'Error al cargar usuarios. Por favor, inténtalo de nuevo más tarde.' });
      setEmail('');
      setPassword('');
    }
  };

  return (
    <AuthContext.Provider value={{email, setEmail, password, setPassword, handleSubmit, errors}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
