import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import CustomDrawer from "../components/CustomDrawer";

import { Ionicons, AntDesign } from "@expo/vector-icons";

import MessagesScreen from "../screens/MessagesScreen";
import SettingsScreen from "../screens/SettingsScreen";
import UserDetailsScreen from "../screens/UserDetailsScreen";

import MainTab from "./MainTab";

const Drawer = createDrawerNavigator();

const AppStack = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: "#4DAAA9",
        drawerActiveTintColor: "#fff",
        drawerInactiveTintColor: "#333",
        drawerLabelStyle: {
          marginLeft: -25,
          // fontFamily: "Roboto-Medium",
          fontSize: 15,
        },
        drawerStyle: {
          // backgroundColor: "rgba(255,255,255,0.9)",
          width: 275,
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={MainTab}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={UserDetailsScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="person-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Messages"
        component={MessagesScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="chatbox-ellipses-outline" size={22} color={color} />
          ),
        }}
      />
      {/* <Drawer.Screen
        name="Reviews"
        component={SettingsScreen}
        options={{
          drawerIcon: ({ color }) => (
            <AntDesign name="staro" size={22} color={color} />
          ),
        }}
      /> */}
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="settings-outline" size={22} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default AppStack;
