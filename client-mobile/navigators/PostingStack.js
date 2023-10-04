import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text } from "react-native";
import JobDetailsScreen from "../screens/JobDetailsScreen";
import JobAppliedScreen from "../screens/JobAppliedScreen";
import JobPostingsScreen from "../screens/JobPostingsScreen";

const Stack = createNativeStackNavigator();

const PostingStack = () => {
  return (
    <Stack.Navigator initialRouteName="JobPostings">
      <Stack.Screen
        name="JobPostingsScreen"
        component={JobPostingsScreen}
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

export default PostingStack;
