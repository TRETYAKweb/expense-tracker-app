import React from "react";
import {
  Text,
  TextInput,
  View,
  KeyboardTypeOptions,
  StyleSheet,
} from "react-native";
import { colors, fonts } from "shared/lib";

interface IInputConfig {
  placeholder: string;
  keyboardType: KeyboardTypeOptions;
  onChangeText: (value: string) => void;
  maxLength?: number;
  value?: string;
  multiline?: boolean;
  numberOfLines?: number;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
}

interface inputProps {
  lable: string;
  inputConfig: IInputConfig;
  style?: { flex: number };
  isValid: boolean;
}

export const Input: React.FC<inputProps> = ({
  lable,
  inputConfig,
  style,
  isValid,
}) => {
  const lableStyle = [styles.lable, isValid && styles.errorLable];
  const inputStyle = [
    styles.input,
    inputConfig.multiline && styles.multiline,
    isValid && styles.errorInput,
  ];

  return (
    <View style={[styles.root, style]}>
      <Text style={lableStyle}>{lable}</Text>
      <TextInput style={inputStyle} {...inputConfig} />
      {isValid && <Text style={styles.textError}>Invalid input format.</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    marginVertical: 8,
  },
  lable: {
    fontFamily: fonts.roboto700,
    fontSize: 16,
    color: colors.primary[900],
    marginBottom: 7,
  },
  errorLable: {
    color: colors.error[500],
  },
  input: {
    fontFamily: fonts.roboto400,
    fontSize: 16,
    borderWidth: 1,
    borderColor: colors.gray[500],
    padding: 15,
    borderRadius: 8,
  },
  errorInput: {
    backgroundColor: colors.error[50],
    borderColor: colors.error[500],
  },
  textError: {
    fontFamily: fonts.roboto400,
    fontSize: 12,
    color: colors.error[500],
    marginTop: 5,
  },
  multiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
});
