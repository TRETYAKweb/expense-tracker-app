import React from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Input, colors, fonts } from "shared";
import { IFormData, validationSchema } from "../model";

export const Form: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>({
    mode: "onTouched",
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: { password?: string; email?: string }) => {
    console.log(data);
  };

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Log in</Text>
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <Input
            label="Email"
            error={errors.email}
            inputProps={{ ...field, placeholder: "email" }}
          />
        )}
      />

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
  link: {
    fontFamily: fonts.roboto700,
    fontSize: 16,
    textAlign: "center",
    marginTop: 25,
    color: colors.white,
  },
});
