import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthRoutes } from "./routes";
import { AuthParamList } from "./params";
import { AuthProvider } from "../../../modules/auth/context";

interface AuthStackProps {}

const Stack = createNativeStackNavigator<AuthParamList>();

export const AuthStack: React.FC<AuthStackProps> = ({}) => {
  return (
    <AuthProvider>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}
      >
        {AuthRoutes.map(({ name, component }, key) => {
          return <Stack.Screen key={key} name={name} component={component} />;
        })}
      </Stack.Navigator>
    </AuthProvider>
  );
};
