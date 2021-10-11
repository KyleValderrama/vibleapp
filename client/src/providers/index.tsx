import React from "react";
import { NavigationProvider } from "./navigation";

interface ProvidersProps {}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return <NavigationProvider>{children}</NavigationProvider>;
};
