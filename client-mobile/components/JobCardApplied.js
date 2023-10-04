import { View, Text, Image, TouchableOpacity, Animated } from "react-native";
import React from "react";
import { EyeIcon } from "react-native-heroicons/solid";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";

export default function JobCardApplied({ item, status, index, axis }) {
  // console.log(item, "<<<<<<<<<item");
  const navigation = useNavigation();
  const getBackgroundColor = () => {
    switch (item?.category?.name) {
      case "Cleaning":
        return "rgba(212,246,237,0.6)";
      case "Construction":
        return "rgba(251,226,244,0.6)";
      case "Factory & Industry":
        return "rgba(227,219,250,0.6)";
      case "Cooking":
        return "rgba(255,225,204,0.6)";
      default:
        return "rgba(212, 246, 237, 0.6)"; // Default color
    }
  };
  const get3dIcon = () => {
    switch (item?.category?.name) {
      case "Cleaning":
        return require("../assets/images/bulb-front-gradient.png");
      case "Construction":
        return require("../assets/images/bulb-front-color.png");
      case "Factory & Industry":
        return require("../assets/images/axe-front-gradient.png");
      case "Cooking":
        return require("../assets/images/tea-cup-front-gradient.png");
      case "Office":
        return require("../assets/images/travel-front-gradient.png");
      default:
        return require("../assets/images/travel-front-gradient.png"); // Default color
    }
  };
  const getAxis = () => {
    switch (axis) {
      case "vertical":
        return "w-72 h-72 p-3 mb-4 rounded-3xl";
      case "horizontal":
        return "w-72 h-72 p-3 ml-4 rounded-3xl";
      default:
        return "w-72 h-72 p-3 mb-4 rounded-3xl"; // Default axis
    }
  };
  const getStatusColor = () => {
    switch (status) {
      case "Processing":
        return "bg-teal-300 text-gray-700 px-3 py-1.5 rounded-full";
      case "Accepted":
        return "bg-lime-300 text-gray-700 px-3 py-1.5 rounded-full";
      case "Rejected":
        return "bg-amber-300 text-gray-700 px-3 py-1.5 rounded-full";
      default:
        return "bg-lime-300 text-gray-700 px-3 py-1.5 rounded-full"; // Default axis
    }
  };
  const getUrgentColor = () => {
    switch (item?.isUrgent) {
      case true:
        return "bg-purple-200 text-gray-700 px-3 py-1.5 rounded-full";
      case false:
        return "bg-teal-200 text-gray-700 px-3 py-1.5 rounded-full";
      default:
        return "bg-lime-200 text-gray-700 px-3 py-1.5 rounded-full"; // Default axis
    }
  };
  const formatSalary = (num) => {
    return Math.abs(num) > 999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
      : Math.sign(num) * Math.abs(num);
  };

  return (
    <Animatable.View
      delay={index * 180}
      animation="slideInRight"
      className={getAxis()}
      style={{
        backgroundColor: "rgba(255,255,255,0.3)",
        borderColor: "#D5DDE5",
        borderWidth: 0.8,
      }}
    >
      <View
        className="w-64 h-52 mx-4 mt-4 rounded-3xl absolute"
        style={{ backgroundColor: getBackgroundColor() }}
      ></View>
      <View className="flex-row mt-5 justify-between items-center px-4">
        <TouchableOpacity className={getUrgentColor()}>
          <Text className="text-xs">
            {item?.isUrgent === true ? "Urgent" : "Available"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-white px-3 py-1.5 rounded-full">
          <Text className="text-xs">{item?.category?.name}</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-column mt-3 justify-center">
        <Text
          numberOfLines={1}
          className="text-black px-4 text-xl font-medium tracking-wider"
        >
          {item?.title}
        </Text>
        <View className="flex-row mx-4 space-y-2 justify-between">
          <View className="mt-1">
            {item?.requiredGender ? (
              <Text
                className="text-gray-500 text-s px-3 py-1.5 h-8 mt-3 w-16 flex justify-center items-center"
                style={{
                  backgroundColor: "rgba(255,255,255,0.3)",
                  borderRadius: 15,
                }}
              >
                {item?.requiredGender}
              </Text>
            ) : (
              ""
            )}
            {item.maxAge ? (
              <Text
                className="text-gray-500 text-s px-3 py-1.5 h-8 mt-3 flex justify-center items-center"
                style={{
                  backgroundColor: "rgba(255,255,255,0.3)",
                  borderRadius: 15,
                }}
              >
                Max. Age {item?.maxAge}
              </Text>
            ) : (
              ""
            )}
          </View>
          <Image source={get3dIcon()} className="h-20 w-20 mt-5" />
        </View>
      </View>
      <View className="flex-row mt-11 justify-between items-center px-4">
        <View>
          <Text className="text-xs font-semibold text-gray-200">
            {item?.address}
          </Text>
          <Text className="text-s font-bold text-black">
            Rp. {formatSalary(item?.minSalary)} -{" "}
            {formatSalary(item?.maxSalary)}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.push("JobDetails", { jobId: item?.id })}
          className="bg-black px-3 py-2.5 rounded-full"
        >
          <Text className="text-white">See Details</Text>
        </TouchableOpacity>
      </View>
      {axis === "horizontal" ? (
        <View className="mt-6 mx-10 flex justify-center items-center">
          <Text className={getStatusColor()}>{status}</Text>
        </View>
      ) : (
        <View></View>
      )}
    </Animatable.View>
  );
}
