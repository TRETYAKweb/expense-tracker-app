import { StatusBar } from "expo-status-bar";
import { LoginForm } from "features";
import React from "react";
import { StyleSheet, View } from "react-native";

export const Screen: React.FC = () => {
  return (
    <>
      <StatusBar style="dark" />
      <View style={styles.root}>
        <LoginForm />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 200,
  },
});
