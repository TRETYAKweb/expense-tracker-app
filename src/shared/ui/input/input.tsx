import React from "react";
import { Text, TextInput, View } from "react-native";

interface IInputConfig {
  placeholder: string;
  keyboardType: string;
  onChangeText?: (value: string) => void;
  maxLength?: number;
  multiline?: boolean;
  numberOfLines?: number;
  autoCapitalize?: string;
}

interface inputProps {
  lable: "string";
  inputConfig: IInputConfig;
}

export const Input: React.FC<inputProps> = ({ lable, inputConfig }) => {
  return (
    <View>
      <Text>{lable}</Text>
      <TextInput />
    </View>
  );
};
