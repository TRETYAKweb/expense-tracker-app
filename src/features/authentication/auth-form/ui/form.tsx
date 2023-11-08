import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IFormData, authenticateModel } from "../model";
import { Button, Input, colors, fonts } from "shared";

interface IFormProps {
  isLogin?: boolean;
}

export const Form: React.FC<IFormProps> = ({ isLogin }) => {
  const { hooks, schema } = authenticateModel;
  const navigation = useNavigation();
  const validationSchema = isLogin ? schema.logInSchema : schema.signUpSchema;
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormData>({
    mode: "onTouched",
    resolver: yupResolver(validationSchema),
  });
  const logIn = hooks.useLogIn();
  const signUp = hooks.useSignUp();
  const navigateToScreen = isLogin ? "SignUp" : "Login";

  const onSubmit = (data: IFormData) => {
    const { email, password } = data;
    if (isLogin) {
      logIn.mutateAsync({ email, password });
    } else {
      signUp.mutateAsync({ email, password });
    }
    reset();
    // navigation.navigate(navigateToScreen as never);
  };

  return (
    <View style={styles.root}>
      <Text style={styles.title}>{isLogin ? "Log in" : "Sign up"}</Text>

      <View style={styles.inputContainer}>
        <Controller
          name="email"
          control={control}
          render={({ field: { onBlur, onChange, value } }) => (
            <Input
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              label="Email"
              mode="light"
              error={errors.email}
              inputProps={{
                placeholder: "Email",
                placeholderTextColor: colors.gray[300],
                keyboardType: "email-address",
                autoCapitalize: "none",
              }}
            />
          )}
        />
        {!isLogin && (
          <Controller
            name="confirmEmail"
            control={control}
            render={({ field: { onBlur, onChange, value } }) => (
              <Input
                onBlur={onBlur}
                onChange={onChange}
                value={value ? value : ""}
                label="Confirm Email"
                mode="light"
                error={errors.confirmEmail}
                inputProps={{
                  placeholder: "Confirm Email",
                  placeholderTextColor: colors.gray[300],
                  keyboardType: "email-address",
                  autoCapitalize: "none",
                }}
              />
            )}
          />
        )}

        <Controller
          name="password"
          control={control}
          render={({ field: { onBlur, onChange, value } }) => (
            <Input
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              label="Password"
              mode="light"
              error={errors.password}
              inputProps={{
                placeholder: "Password",
                placeholderTextColor: colors.gray[300],
              }}
            />
          )}
        />

        {!isLogin && (
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field: { onBlur, onChange, value } }) => (
              <Input
                onBlur={onBlur}
                onChange={onChange}
                value={value ? value : ""}
                label="Confirm Password"
                mode="light"
                error={errors.confirmPassword}
                inputProps={{
                  placeholder: "Confirm Password",
                  placeholderTextColor: colors.gray[300],
                }}
              />
            )}
          />
        )}
      </View>

      <Button mode="light" onPress={handleSubmit(onSubmit)}>
        Сonfirm
      </Button>
      <Pressable
        style={({ pressed }) => pressed && { opacity: 0.5 }}
        onPress={() => navigation.navigate(navigateToScreen as never)}
      >
        <Text style={styles.link}>
          {isLogin ? "Create a new user" : "Log in instead"}
        </Text>
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
