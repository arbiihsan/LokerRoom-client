import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text } from "react-native";
import JobDetailsScreen from "../screens/JobDetailsScreen";
import JobAppliedScreen from "../screens/JobAppliedScreen";

const Stack = createNativeStackNavigator();

const AppliedStack = () => {
  return (
    <Stack.Navigator initialRouteName="JobApplied">
      <Stack.Screen
        name="JobAppliedScreen"
        component={JobAppliedScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="JobDetails"
        component={JobDetailsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AppliedStack;
