
import React, { createContext, useContext, useState, useEffect } from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // The password is hardcoded here
  const AUTH_PASSWORD = "s1ngos@r1ujung.rammah";
  
  // Check if user is already authenticated in local storage
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem("zakat_auth") === "true";
  });

  // Update local storage when authentication state changes
  useEffect(() => {
    localStorage.setItem("zakat_auth", isAuthenticated ? "true" : "false");
  }, [isAuthenticated]);

  const login = (password: string): boolean => {
    if (password === AUTH_PASSWORD) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
