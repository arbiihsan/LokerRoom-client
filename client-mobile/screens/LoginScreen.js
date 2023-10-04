import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";

import CustomButton from "../components/CustomButton";
import InputField from "../components/InputField";
import { LOGIN_USER } from "../config/queries";
import { useMutation } from "@apollo/client";
import { useAuth } from "../context/useAuth";
import { useFonts } from "expo-font";

const LoginScreen = ({ navigation }) => {
  const { login } = useAuth(); // Use the useAuth hook
  const [user, setUser] = useState({
    telephone: "",
    password: "",
  });
  const [funcLoginUser] = useMutation(LOGIN_USER);

  let [fontsLoaded] = useFonts({
    // "Syne-SemiBold": require("../assets/fonts/Syne-SemiBold.ttf"),
    "Syne-Bold": require("../assets/fonts/Syne-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return undefined;
  }

  const onChange = (key, value) => {
    setUser((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const loginUser = async () => {
    try {
      const response = await funcLoginUser({
        variables: {
          loginCredentials: user,
        },
      });

      if (response?.data && response?.data?.login) {
        const { access_token, userId } = response?.data?.login;
        await login(access_token, userId); // Use the login function from useAuth

        // navigation.navigate("Home");
      } else {
        // Handle login failure (e.g., display an error message)
        console.log("Login failed");
      }
    } catch (error) {
      console.log("Login error:", error);
    }
  };

  return (
    <View className="flex-1 relative">
      <Image
        blurRadius={50}
        source={require("../assets/images/background9.png")}
        className="absolute w-full h-full"
      />
      <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
        <View style={{ paddingHorizontal: 40 }}>
          <View style={{ alignItems: "center" }}>
            {/* <LoginSVG
            height={300}
            width={300}
            style={{ transform: [{ rotate: "-5deg" }] }}
          /> */}
          </View>

          <Text
            style={{
              // fontFamily: "Roboto-Medium",
              fontSize: 36,
              // fontWeight: "b old",
              color: "#333",
              marginBottom: 30,
              fontFamily: "Syne-Bold",
            }}
          >
            Login
          </Text>

          <InputField
            onChangeText={(text) => onChange("telephone", text)}
            label={"Phone Numbers"}
            icon={
              <Feather
                name="phone"
                size={20}
                color="white"
                style={{ marginRight: 5 }}
              />
            }
          />

          <InputField
            onChangeText={(text) => onChange("password", text)}
            label={"Password"}
            icon={
              <Ionicons
                name="ios-lock-closed-outline"
                size={20}
                color="white"
                style={{ marginRight: 5 }}
              />
            }
            inputType="password"
            fieldButtonLabel={"Forgot?"}
            fieldButtonFunction={() => {}}
          />

          <CustomButton label={"Login"} onPress={loginUser} />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginBottom: 30,
            }}
          >
            <Text>Don't have an account yet?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={{ color: "white", fontWeight: "700" }}>
                {" "}
                Register
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default LoginScreen;
