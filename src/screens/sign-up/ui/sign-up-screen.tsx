import { StatusBar } from "expo-status-bar";
import { AuthForm } from "features";
import React from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
} from "react-native";

export const Screen: React.FC = () => {
  return (
    <>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.root}>
        <ScrollView style={styles.root}>
          <KeyboardAvoidingView style={styles.root} behavior="position">
            <View style={styles.inner}>
              <AuthForm />
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  inner: {
    flex: 1,
    paddingHorizontal: 25,
    marginTop: 50,
  },
});
