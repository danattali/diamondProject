import React, { createContext, useState, ReactNode } from "react";

// Define types for context value
type AuthContextType = {
  isLoggedIn: boolean;
  login: (JWT: string) => void;
  logout: () => void;
};

// Create context with default values
export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

// Create the provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const login = (JWT: string) => {
    // Handle login logic, e.g., store JWT and set logged in state
    localStorage.setItem("authToken", JWT); // Example usage
    setIsLoggedIn(true);
  };

  const logout = () => {
    // Handle logout logic, e.g., clear JWT and set logged out state
    localStorage.removeItem("authToken"); // Example usage
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
