import React from "react";
import {
  Text,
  TextInput,
  View,
  KeyboardTypeOptions,
  StyleSheet,
  TextInputProps,
} from "react-native";
import { Control, Controller, FieldError } from "react-hook-form";
import { colors, fonts } from "shared/lib";

interface InputProps {
  label: string;
  error?: FieldError | undefined;
  inputProps?: TextInputProps;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  inputProps = {},
}) => {
  const lableStyle = [styles.lable];
  const inputStyle = [styles.input, inputProps.multiline && styles.multiline];

  return (
    <View style={[styles.root, inputProps.style]}>
      <Text style={lableStyle}>{label}</Text>
      <TextInput {...inputProps} />
      {error && <Text>{error.message}</Text>}
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
