import React from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";

export default function InputFieldForm({
  label,
  icon,
  inputType,
  keyboardType,
  fieldButtonLabel,
  fieldButtonFunction,
  value, // Add value prop
  onChangeText, // Add onChangeText prop
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        borderBottomColor: "white",
        borderBottomWidth: 1,
        paddingBottom: 8,
        marginBottom: 25,
      }}
    >
      {icon}
      {inputType == "password" ? (
        <TextInput
          placeholder={label}
          keyboardType={keyboardType}
          style={{ flex: 1, paddingVertical: 0 }}
          secureTextEntry={true}
          value={value} // Bind value to the input field
          onChangeText={(text) => onChangeText(text)} // Bind onChangeText to the input field's text change event
        />
      ) : (
        <TextInput
          placeholder={label}
          keyboardType={keyboardType}
          style={{ flex: 1, paddingVertical: 0 }}
          value={value} // Bind value to the input field
          onChangeText={(text) => onChangeText(text)} // Bind onChangeText to the input field's text change event
          placeholderTextColor="white"
        />
      )}
      {fieldButtonLabel && fieldButtonFunction && (
        <TouchableOpacity onPress={fieldButtonFunction}>
          <Text style={{ color: "white", fontWeight: "700" }}>
            {fieldButtonLabel}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
