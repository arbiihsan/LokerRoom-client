import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { PencilSquareIcon, Bars3Icon } from "react-native-heroicons/solid";
import { GET_USER } from "../config/queries";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../context/useAuth";
import { useFonts } from "expo-font";

const UserDetailsScreen = ({ navigation }) => {
  const { user } = useAuth();
  // console.log(user, "<<<<<<<<<<detail");
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
      <ScrollView style={{ marginTop: 55, marginHorizontal: 20 }}>
        <View className="flex-row justify-between items-center">
          <View className="flex-row justify-start items-center gap-4">
            <Text
              className="text-3xl"
              style={{
                fontFamily: "Syne-Bold",
              }}
            >
              Profile
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("UserEdit", { ...user })}
            >
              <PencilSquareIcon size="27" stroke={50} color="black" />
            </TouchableOpacity>
          </View>
          <View
            className="rounded-2xl"
            style={{ backgroundColor: "rgba(255,255,255,0.5)", padding: 8 }}
          >
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Bars3Icon size="27" stroke={50} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex-row justify-start gap-5 items-center mt-0.5">
          <View
            className="rounded-2xl"
            style={{
              backgroundColor: "rgba(255,255,255,0.5)",
              padding: 8,
              borderColor: "white",
              borderWidth: 0.8,
            }}
          >
            <Image
              className="h-24 w-24 rounded-2xl"
              source={require("../assets/images/avatar.png")}
            />
          </View>
          <View className="flex justify-between gap-1">
            <Text className="text-xl font-bold">{user?.name}</Text>
            <Text className="text-md">{user?.telephone}</Text>
            <Text className="text-md">{user?.email}</Text>
            <Text className="text-md">{user?.address}</Text>
          </View>
        </View>
        <View
          className="flex gap-1 mt-5 rounded-2xl ml-0.5"
          style={{
            backgroundColor: "rgba(255,255,255,0.5)",
            padding: 20,
            borderColor: "white",
            borderWidth: 0.8,
          }}
        >
          <Text className="text-md font-bold">Gender: {user?.gender}</Text>
          <Text className="text-md font-bold">
            Birth Date: {user?.dateOfBirth}
          </Text>
          <Text className="text-md font-bold">
            Education: {user?.educationLevel?.education}
          </Text>
          <Text className="text-md font-bold">Profile Description:</Text>
          <Text>{user?.profileDescription}</Text>
        </View>
        <View
          className="flex gap-1 mt-5 rounded-2xl ml-0.5"
          style={{
            backgroundColor: "rgba(255,255,255,0.5)",
            padding: 20,
            borderColor: "white",
            borderWidth: 0.8,
          }}
        >
          <Text className="text-xl font-bold">Reviews</Text>
          <Text>{user?.receivedReviews}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default UserDetailsScreen;

const styles = StyleSheet.create({});
