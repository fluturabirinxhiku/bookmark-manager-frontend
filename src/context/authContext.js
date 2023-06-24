import { createContext, useContext, useEffect, useState } from "react";
import { signIn } from "../services/authService";
import jwtDecode from "jwt-decode";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const setUserFromToken = () => {
    let token = localStorage.getItem("access_token");
    if (token) {
      let decoded = jwtDecode(token);
      const user = {
        username: decoded.sub,
      };
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
    }
  };

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = async (userData) => {
    try {
      const res = await signIn(userData);
      const jwtToken = res.headers["authorization"];
      localStorage.setItem("access_token", jwtToken);
      setUserFromToken();
      return res;
    } catch (err) {
      throw err;
    }
  };

  const isAuthenticated = () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      return false;
    }
    const { exp: expiration } = jwtDecode(token);
    if (Date.now() > expiration * 1000) {
      logout();
      return false;
    }
    return true;
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;
