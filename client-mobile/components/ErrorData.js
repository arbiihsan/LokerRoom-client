import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function ErrorData() {
  return (
    <View style={[styles.container, styles.horizontal]}>
      <Text style={{ color: "white" }}>Data Not Found....</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "black",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});
