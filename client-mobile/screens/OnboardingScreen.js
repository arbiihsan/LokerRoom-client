import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
// import { useFonts, Syne_600SemiBold } from "@expo-google-fonts/syne";
import { useFonts } from "expo-font";

const OnboardingScreen = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    // "Syne-SemiBold": require("../assets/fonts/Syne-SemiBold.ttf"),
    "Syne-Bold": require("../assets/fonts/Syne-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return undefined;
  }

  return (
    <View className="flex-1 relative">
      <Image
        blurRadius={50}
        source={require("../assets/images/background9.png")}
        className="absolute w-full h-full"
      />
      <Image
        source={require("../assets/images/tea-cup-dynamic-gradient.png")}
        className="absolute w-20 h-20 ml-36 mt-14"
      />
      <Image
        source={require("../assets/images/axe-dynamic-gradient.png")}
        className="absolute w-20 h-20 ml-12 mt-14"
      />
      <Image
        source={require("../assets/images/roll-brush-dynamic-gradient.png")}
        className="absolute w-20 h-20 ml-80 mt-14"
      />
      <Image
        source={require("../assets/images/travel-dynamic-gradient.png")}
        className="absolute w-20 h-20 -ml-10 mt-14"
      />
      <Image
        source={require("../assets/images/tool-dynamic-gradient.png")}
        className="absolute w-20 h-20 ml-60 mt-14"
      />

      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "start",
        }}
      >
        <View style={{ marginTop: 130 }}>
          <Text
            style={{
              // fontWeight: "bold",
              fontSize: 53,
              // color: "#20315f",
              marginLeft: 25,
              fontFamily: "Syne-Bold",
            }}
          >
            Your Solution
          </Text>
          <Text
            style={{
              // fontWeight: "bold",
              fontSize: 53,
              // color: "#20315f",
              marginLeft: 25,
              fontFamily: "Syne-Bold",
            }}
          >
            For Many Services
          </Text>
          <Text
            style={{
              // fontWeight: "bold",
              fontSize: 30,
              color: "white",
              marginLeft: 25,
              marginTop: 4,
              fontFamily: "Syne-Bold",
            }}
          >
            Hire, Done, Thrive!
          </Text>
        </View>
        <TouchableOpacity
          style={{
            padding: 20,
            width: "84%",
            borderRadius: 40,
            marginTop: 40,
            marginBottom: 50,
            marginLeft: 25,
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: "rgba(255,255,255,0.3)",
            borderColor: "#D5DDE5",
            borderWidth: 0.8,
          }}
          onPress={() => navigation.navigate("Login")}
        >
          <Text
            style={{
              color: "white",
              fontSize: 18,
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Get Started
          </Text>
          <MaterialIcons name="arrow-forward-ios" size={22} color="#fff" />
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

export default OnboardingScreen;
