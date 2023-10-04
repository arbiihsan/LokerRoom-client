import { Text, TouchableOpacity } from "react-native";
import React from "react";

export default function CustomButtonAddress({ label, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        padding: 8,
        borderRadius: 10,
        marginBottom: 30,
        height: "5%",

        backgroundColor: "rgba(255,255,255,0.3)",
        borderColor: "#D5DDE5",
        borderWidth: 0.8,
      }}
    >
      <Text
        style={{
          textAlign: "center",
          //   fontWeight: "700",
          fontSize: 15,
          color: "#fff",
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
