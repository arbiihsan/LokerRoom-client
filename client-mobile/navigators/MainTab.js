import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Ionicons,
  AntDesign,
  Octicons,
  MaterialIcons,
  Entypo,
} from "@expo/vector-icons";
import MainStack from "./MainStack";
import JobAppliedScreen from "../screens/JobAppliedScreen";
import JobPostingsScreen from "../screens/JobPostingsScreen";
import ChatStack from "./ChatStack";
import AppliedStack from "./AppliedStack";
import PostingStack from "./PostingStack";

const Tab = createBottomTabNavigator();

const MainTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "gray",
        tabBarLabelPosition: 10,
        tabBarStyle: {
          height: 64,
          paddingHorizontal: 25,
          paddingTop: 10,
          backgroundColor: "rgba(255,255,255,0.3)",
          position: "absolute",
          borderTopWidth: 0,
          paddingBottom: 5,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          // borderColor: "#D5DDE5",
          // borderWidth: 0.8,
        },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={MainStack}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Octicons
                name="home"
                color={focused ? "white" : "black"}
                size={23}
              />
            );
          },
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="JobApplied"
        component={AppliedStack}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <MaterialIcons
                name="work-outline"
                color={focused ? "white" : "black"}
                size={27}
              />
            );
          },
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="JobPostings"
        component={PostingStack}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Ionicons
                name="create-outline"
                color={focused ? "white" : "black"}
                size={25}
              />
            );
          },
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="chat"
        component={ChatStack}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Ionicons
                name="ios-chatbox-ellipses-outline"
                color={focused ? "white" : "black"}
                size={28}
              />
            );
          },
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};

export default MainTab;

const styles = StyleSheet.create({});
