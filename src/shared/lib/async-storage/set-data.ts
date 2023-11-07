import AsyncStorage from "@react-native-async-storage/async-storage";

export const setDataToAs = async <T>(key: string, data: T) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (error) {}
};
