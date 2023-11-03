import React from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, colors, fonts } from "shared";
import { validationSchema } from "../model";

export const Form: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: "",
      confirmEmail: "",
    },
  });

  const onSubmit = (data: { confirmEmail?: string; email?: string }) => {
    console.log(data);
  };

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Log in</Text>
      <View style={styles.innerInput}>
        <Text style={styles.label}>Email</Text>
        <Controller
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="looool"
              onChangeText={onChange}
              value={value}
              onBlur={onBlur}
            />
          )}
          control={control}
        />
        {errors.email && (
          <Text style={styles.error}>{errors.email.message}</Text>
        )}
      </View>
      <View style={[styles.innerInput, { marginBottom: 25 }]}>
        <Text style={styles.label}>Confirm email</Text>
        <Controller
          name="confirmEmail"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onChangeText={onChange}
              value={value}
              onBlur={onBlur}
            />
          )}
          control={control}
        />
        {errors.confirmEmail && (
          <Text style={styles.error}>{errors.confirmEmail.message}</Text>
        )}
      </View>
      <Button mode="light" onPress={handleSubmit(onSubmit)}>
        Сonfirm
      </Button>
      <Pressable>
        <Text style={styles.link}>Create a new user</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    padding: 25,
    backgroundColor: colors.primary[700],
    borderRadius: 10,
  },
  title: {
    fontFamily: fonts.gilroy800,
    fontSize: 28,
    color: colors.white,
    marginBottom: 15,
  },
  label: {
    fontFamily: fonts.roboto700,
    fontSize: 16,
    color: colors.white,
    marginBottom: 7,
  },
  input: {
    fontFamily: fonts.roboto400,
    fontSize: 16,
    borderWidth: 1,
    borderColor: colors.gray[500],
    padding: 15,
    borderRadius: 8,
    color: colors.white,
  },
  innerInput: {
    marginVertical: 12,
  },
  link: {
    fontFamily: fonts.roboto700,
    fontSize: 16,
    textAlign: "center",
    marginTop: 25,
    color: colors.white,
  },
  error: {
    marginTop: 7,
    color: colors.error[100],
    fontFamily: fonts.roboto400,
    fontSize: 14,
  },
});
