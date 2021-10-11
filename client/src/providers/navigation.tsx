import { NavigationContainer } from "@react-navigation/native";
import React from "react";

interface NavigationProviderProps {}

export const NavigationProvider: React.FC<NavigationProviderProps> = ({
  children,
}) => {
  return <NavigationContainer>{children}</NavigationContainer>;
};
