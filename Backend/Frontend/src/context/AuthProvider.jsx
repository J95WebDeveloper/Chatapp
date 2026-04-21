import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("jwt");
    const user = localStorage.getItem("chat-user");

    if (token && user) {
      try {
        setAuthUser(JSON.parse(user));
      } catch {
        localStorage.removeItem("chat-user");
        setAuthUser(null);
      }
    } else {
      setAuthUser(null);
    }

    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
