import React from "react";
import { AuthStack } from "./stacks/auth";

interface RoutesProps {}

export const Routes: React.FC<RoutesProps> = ({}) => {
  return <AuthStack />;
};
