import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { NavigationContainer, useFocusEffect } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../context/useAuth";

function notLogged() {
  return <AuthStack />;
}

function Logged() {
  return <AppStack />;
}

export default function RootNavigator() {
  const { isLogged } = useAuth()
  return <>{isLogged ? <Logged /> : notLogged()}</>;
}
