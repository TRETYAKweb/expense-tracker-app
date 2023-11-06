import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Input,
  colors,
  fonts,
  openNotificationError,
  openNotificationSuccess,
} from "shared";
import { IFormData, validationSchema } from "../model";
import { useNavigation } from "@react-navigation/native";

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

  const navigation = useNavigation();

  const onSubmit = (data: { password?: string; email?: string }) => {
    console.log(data);
  };

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Log in</Text>

      <View style={styles.inputContainer}>
        <Controller
          name="email"
          control={control}
          render={({ field: { onBlur, onChange, value } }) => (
            <Input
              label="Email"
              mode="light"
              error={errors.email}
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              inputProps={{
                placeholder: "Email",
                placeholderTextColor: colors.gray[300],
              }}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field: { onBlur, onChange, value } }) => (
            <Input
              label="Password"
              mode="light"
              error={errors.password}
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              inputProps={{
                placeholder: "Password",
                placeholderTextColor: colors.gray[300],
              }}
            />
          )}
        />
      </View>

      <Button mode="light" onPress={handleSubmit(onSubmit)}>
        Сonfirm
      </Button>
      <Pressable
        style={({ pressed }) => pressed && { opacity: 0.5 }}
        onPress={() => navigation.navigate("SignUp" as never)}
      >
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
  inputContainer: {
    marginBottom: 20,
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
