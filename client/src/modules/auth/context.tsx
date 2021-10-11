import React, { createContext } from "react";

interface AuthProviderProps {}

const AuthContext = createContext({});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};
