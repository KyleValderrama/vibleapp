import React, { useState } from "react";
import { TextInput, TextInputProps } from "react-native";
import tw from "tailwind-react-native-classnames";

interface InputProps extends TextInputProps {
  eye?: boolean;
}

export const Input: React.FC<InputProps> = (props, {}: InputProps) => {
  const [focus, setFocus] = useState(false);
  return (
    <TextInput
      {...props}
      placeholderTextColor="#cfffd6"
      style={tw`bg-black bg-opacity-5 px-3 text-green-700 rounded-lg py-2 my-1 border-2 ${
        focus ? "border-green-300" : "border-transparent"
      }`}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
    />
  );
};

