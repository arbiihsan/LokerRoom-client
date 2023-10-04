import { Text, TouchableOpacity } from "react-native";
import React from "react";

export default function CustomButton({ label, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        padding: 10,
        borderRadius: 20,
        marginBottom: 30,

        backgroundColor: "rgba(255,255,255,0.3)",
        borderColor: "#D5DDE5",
        borderWidth: 0.8,
      }}
    >
      <Text
        style={{
          textAlign: "center",
          fontWeight: "700",
          fontSize: 16,
          color: "#fff",
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
