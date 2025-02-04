import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication status on initial load
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/auth/verify', { 
          withCredentials: true 
        });
        
        if (response.data.isAuthenticated) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          navigate('/api/login');
        }
        setIsLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setIsLoading(false);
        navigate('/api/login');
      }
    };

    checkAuthStatus();
  }, [navigate]);

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