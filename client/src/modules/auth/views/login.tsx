import React from "react";
import { View, Text, Button } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack/lib/typescript/src/types";
import { AuthProps } from "../../../routes/stacks/auth/params";

interface LoginProps extends AuthProps<"Login"> {}

export const Login: React.FC<LoginProps> = ({ navigation }: LoginProps) => {
  return (
    <View>
      <Text>Login</Text>
      <Button
        title="LOGIN"
        onPress={() => {
          navigation.navigate("Register");
        }}
      ></Button>
    </View>
  );
};
