import React from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TextInputProps,
} from "react-native";
import { FieldError, Noop } from "react-hook-form";
import { colors, fonts } from "shared/lib";

type TypeMode = "light";

interface InputProps {
  label: string;
  error?: FieldError | undefined;
  inputProps?: TextInputProps;
  mode?: TypeMode;
  onBlur: Noop;
  value: string;
  onChange: (text: string) => void;
  style?: { flex: number };
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  inputProps = {},
  mode,
  value,
  onBlur,
  onChange,
  style,
}) => {
  const lableStyle = [
    styles.lable,
    error && styles.errorLable,
    mode === "light" && styles.lightLabel,
  ];
  const inputStyle = [
    styles.input,
    inputProps.multiline && styles.multiline,
    mode === "light" && styles.lightInput,
    error && styles.errorInput,
  ];

  return (
    <View style={[styles.root, style]}>
      <Text style={lableStyle}>{label}</Text>
      <TextInput
        style={[inputStyle]}
        value={value}
        onChangeText={onChange}
        onBlur={onBlur}
        {...inputProps}
      />
      {error && <Text style={styles.textError}>{error.message}</Text>}
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
  lightLabel: {
    color: colors.white,
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
  lightInput: {
    borderColor: colors.white,
    color: colors.white,
  },
  errorInput: {
    borderColor: colors.error[500],
  },
  placeholderTextColor: {
    color: colors.error[500],
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
