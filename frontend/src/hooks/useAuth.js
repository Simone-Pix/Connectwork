import { useState, useEffect } from 'react';

/**
 * Hook personalizzato per gestire l'autenticazione senza complessità frontend.
 * Usa le API backend per controllare lo stato auth e fare login/logout.
 */
export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Controlla se l'utente è autenticato al caricamento
  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/check', {
        method: 'POST',
        credentials: 'include'
      });
      const data = await response.json();
      
      if (data.authenticated) {
        setIsAuthenticated(true);
        setUser({
          id: data.userId,
          email: data.email
        });
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.log('Auth check failed:', error);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Login semplice - backend gestisce tutto
  const login = async (email, password) => {
    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);
      
      const response = await fetch('/api/auth/session-login', {
        method: 'POST',
        body: formData,
        credentials: 'include'
      });
      
      const data = await response.json();
      
      if (data.success) {
        setIsAuthenticated(true);
        setUser({
          id: data.userId,
          email: data.email,
          role: data.role
        });
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.message || 'Login failed' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Errore di connessione' };
    }
  };

  // Logout semplice
  const logout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
      
      const data = await response.json();
      
      if (data.success) {
        setIsAuthenticated(false);
        setUser(null);
        return { success: true };
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
    
    // Fallback: clear state anyway
    setIsAuthenticated(false);
    setUser(null);
    return { success: true };
  };

  // Check auth on mount
  useEffect(() => {
    checkAuth();
  }, []);

  return {
    isAuthenticated,
    user,
    loading,
    login,
    logout,
    checkAuth
  };
};

export default useAuth;