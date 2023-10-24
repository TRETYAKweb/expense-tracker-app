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
}

export const Input: React.FC<inputProps> = ({ lable, inputConfig }) => {
  return (
    <View style={styles.root}>
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
    flex: 1,
  },
  lable: {
    fontFamily: fonts.gilroy800,
    fontSize: 18,
    color: colors.primary[900],
    marginBottom: 5,
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
