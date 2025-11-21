import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/auth/check", { // qui la rotta del backend per il check della sessione da implementare
        method: "POST",
        credentials: "include"
      });
      const data = await response.json();

      if (data.authenticated) {
        setIsAuthenticated(true);
        setUser({
          id: data.userId,
          email: data.email,
          role: data.role
        });
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // --- Login ---
  const login = async (email, password) => {
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);

      const response = await fetch("/api/auth/session-login", {
        method: "POST",
        body: formData,
        credentials: "include"
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
      }

      return { success: false, message: data.message || "Login failed" };
    } catch (error) {
      return { success: false, message: "Connection error" };
    }
  };

  // --- Logout ---
  const logout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include"
      });
      const data = await response.json();

      if (data.success) {
        setIsAuthenticated(false);
        setUser(null);
        return { success: true };
      }
    } catch (error) {
      console.error("Logout error:", error);
    }

    // fallback
    setIsAuthenticated(false);
    setUser(null);
    return { success: true };
  };

  // --- Check session ---
  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        login,
        logout,
        checkAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook comodo per usare il context
export const useAuthContext = () => useContext(AuthContext);

export default AuthContext;
