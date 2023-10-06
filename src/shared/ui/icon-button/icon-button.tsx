import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet } from "react-native";

type IconName = "add";

interface IconButtonProps {
  name: IconName;
  color: string | undefined;
  size: number;
}

export const IconButton: React.FC<IconButtonProps> = ({
  color,
  name,
  size,
}) => {
  return (
    <Pressable
      style={({ pressed }) =>
        pressed ? [styles.root, styles.pressed] : styles.root
      }
    >
      <Ionicons name={name} color={color} size={size} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  root: {
    marginHorizontal: 15,
    borderRadius: 8,
  },
  pressed: {
    opacity: 0.4,
  },
});
