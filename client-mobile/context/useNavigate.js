import { View, Text } from "react-native";
import React, { createContext, useContext } from "react";
import { useNavigation } from "@react-navigation/native";

const NavigateContext = createContext();

export function useNavigate() {
  return useContext(NavigateContext);
}
export function UseNavigateProvider({ children }) {
  const navigation = useNavigation();
  const navigateToAppliedJob = () => {
    navigation.navigate("JobApplied");
  };
  const navigateContext = {
    navigateToAppliedJob,
  };
  return (
    <NavigateContext.Provider value={navigateContext}>
      {children}
    </NavigateContext.Provider>
  );
}
