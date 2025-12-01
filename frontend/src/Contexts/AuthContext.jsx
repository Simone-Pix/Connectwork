import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // chekauth non controlla solo la sessione ma recupera anche i dati dell'utente
  const checkAuth = async () => {
    try {
      const res = await fetch("/api/auth/me", {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        setUser(null);
        return;
      }

      const data = await res.json();

      setUser({
        id: data.id,
        email: data.email,
        role: data.ruolo,
        nome: data.nome,
        cognome: data.cognome,
        telefono: data.telefono,
      });
    } catch (err) {
      console.error("Errore checkAuth:", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // --- LOGIN ---
  const login = async (email, password) => {
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);

      const res = await fetch("/api/auth/session-login", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const result = await res.json();

      if (!result.success) {
        return { success: false, message: result.message };
      }

      await checkAuth();

      return { success: true };
    } catch (err) {
      console.error("Errore login:", err);
      return { success: false, message: "Errore durante il login" };
    }
  };

  // --- LOGOUT ---
  const logout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      setUser(null);
    } catch (err) {
      console.error("Errore logout:", err);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
