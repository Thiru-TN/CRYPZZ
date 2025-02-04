import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // List of public routes that don't require authentication
    const publicRoutes = ['/api/login','/api/profile','/api/home', '/', '/api'];

    // Check if the current route is a public route
    if (publicRoutes.includes(location.pathname)) {
      setIsLoading(false);
      return;
    }

    // Check authentication status on route change
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/auth/verify', { 
          withCredentials: true 
        });
        
        setIsAuthenticated(response.data.isAuthenticated);
        setIsLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setIsLoading(false);
        
        // Only redirect to login if not on a public route
        if (!publicRoutes.includes(location.pathname)) {
          navigate('/api/login');
        }
      }
    };

    checkAuthStatus();
  }, [location.pathname, navigate]);

  const login = (userData) => {
    setIsAuthenticated(true);
  };

  const logout = async () => {
    try {
      await axios.post('http://localhost:8000/api/auth/logout', {}, { 
        withCredentials: true 
      });
      setIsAuthenticated(false);
      navigate('/api/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      isLoading, 
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);