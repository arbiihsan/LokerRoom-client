import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../config/queries";

// Create an AuthContext
const AuthContext = createContext();

// Custom hook for using the AuthContext
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState({});
  const [accessToken, setAccesToken] = useState("");
  const [currentUserId, setCurrentUserId] = useState("");
  const { data, loading, error } = useQuery(GET_USER, {
    variables: {
      userId: +currentUserId,
    },
  });

  // console.log(data, "ini users di auth");
  // console.log(currentUserId, "ini dari auth userid");

  useEffect(() => {
    checkLoginStatus();
  }, [data, isLogged]);

  // Check if the user is logged in based on the presence of an access token
  const checkLoginStatus = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("access_token");
      const userId = await AsyncStorage.getItem("userId");
      setCurrentUserId(userId);
      setIsLogged(accessToken !== null);
      setAccesToken(accessToken);
      setUser(data?.user);
    } catch (error) {
      console.error("Error checking login status:", error);
    }
  };

  const login = async (accessToken, userId) => {
    // Add the login function
    try {
      await AsyncStorage.setItem("access_token", accessToken);
      await AsyncStorage.setItem("userId", JSON.stringify(userId));
      setIsLogged(true);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  // Logout function to clear the access token
  const logout = async () => {
    try {
      await AsyncStorage.clear();
      setIsLogged(false);
      setCurrentUserId("");
      setAccesToken("");
      setUser({});
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Provide the value to the context
  const authContextValue = {
    isLogged,
    login,
    logout,
    currentUserId,
    user,
    accessToken,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}
