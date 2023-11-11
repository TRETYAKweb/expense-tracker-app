import AsyncStorage from "@react-native-async-storage/async-storage";

export const removeDataToAs = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {}
};
