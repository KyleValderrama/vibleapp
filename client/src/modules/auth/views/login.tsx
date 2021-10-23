import React from "react";
import { View, Button, Text } from "react-native";
import { Input } from "../../../components/form";
import { AuthProps } from "../../../routes/stacks/auth/params";
import tw from "tailwind-react-native-classnames";

interface LoginProps extends AuthProps<"Login"> {}

export const Login: React.FC<LoginProps> = ({ navigation }: LoginProps) => {
  return (
    <View
      style={tw`p-6 flex w-full h-full justify-center items-center bg-green-200`}
    >
      <View style={tw`w-full `}>
        <Text style={tw`text-3xl font-bold text-green-700`}>Vibleapp</Text>
        <Input placeholder="Tite" style={tw`w-full`} />
        <Input placeholder="Password" secureTextEntry={true} />
        <Button
          title="LOGIN"
          onPress={() => {
            navigation.navigate("Register");
          }}
        ></Button>
      </View>
    </View>
  );
};
