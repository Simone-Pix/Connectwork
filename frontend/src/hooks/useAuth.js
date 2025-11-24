  // import { useState, useEffect } from "react";

  // export const useAuth = () => {
  //   const [isAuthenticated, setIsAuthenticated] = useState(false);
  //   const [user, setUser] = useState(null);
  //   const [loading, setLoading] = useState(true);

  //   // Check session status from backend
  //   const checkAuth = async () => {
  //     try {
  //       const response = await fetch("PLACEHOLDER", {    //da fare rotta nel backend per sessioni
  //         method: "POST",
  //         credentials: "include"
  //       });

  //       const data = await response.json();

  //       if (data.authenticated) {
  //         setIsAuthenticated(true);
  //         setUser({
  //           id: data.userId,
  //           email: data.email
  //         });
  //       } else {
  //         setIsAuthenticated(false);
  //         setUser(null);
  //       }
  //     } catch (error) {
  //       console.error("Auth check failed:", error);
  //       setIsAuthenticated(false);
  //       setUser(null);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   // Perform session-based login (backend handles the session)
  //   const login = async (email, password) => {
  //     try {
  //       const formData = new FormData();
  //       formData.append("email", email);
  //       formData.append("password", password);

  //       const response = await fetch("/api/auth/session-login", {
  //         method: "POST",
  //         body: formData,
  //         credentials: "include"
  //       });

  //       const data = await response.json();

  //       if (data.success) {
  //         setIsAuthenticated(true);
  //         setUser({
  //           id: data.userId,
  //           email: data.email,
  //           role: data.role
  //         });

  //         return { success: true, message: data.message };
  //       }

  //       return { success: false, message: data.message || "Login failed" };
  //     } catch (error) {
  //       return { success: false, message: "Connection error" };
  //     }
  //   };

  //   // Logout (invalidate backend session)
  //   const logout = async () => {
  //     try {
  //       const response = await fetch("/api/auth/logout", {
  //         method: "POST",
  //         credentials: "include"
  //       });

  //       const data = await response.json();

  //       if (data.success) {
  //         setIsAuthenticated(false);
  //         setUser(null);
  //         return { success: true };
  //       }
  //     } catch (error) {
  //       console.error("Logout error:", error);
  //     }

  //     // Fallback clear
  //     setIsAuthenticated(false);
  //     setUser(null);
  //     return { success: true };
  //   };

  //   // Run session check when the hook loads
  //   useEffect(() => {
  //     checkAuth();
  //   }, []);

  //   return {
  //     isAuthenticated,
  //     user,
  //     loading,
  //     login,
  //     logout,
  //     checkAuth
  //   };
  // };

  // export default useAuth;
