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
  onChangeText?: (value: string) => void;
  maxLength?: number;
  multiline?: boolean;
  numberOfLines?: number;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
}

interface inputProps {
  lable: string;
  inputConfig: IInputConfig;
  style?: { flex: number };
}

export const Input: React.FC<inputProps> = ({ lable, inputConfig, style }) => {
  return (
    <View style={[styles.root, style]}>
      <Text style={styles.lable}>{lable}</Text>
      <TextInput
        style={[styles.input, inputConfig.multiline && styles.multiline]}
        {...inputConfig}
      />
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
  input: {
    fontFamily: fonts.roboto400,
    fontSize: 16,
    borderWidth: 1,
    borderColor: colors.gray[500],
    padding: 15,
    borderRadius: 8,
  },
  multiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
});
