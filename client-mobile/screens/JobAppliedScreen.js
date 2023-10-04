import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  AdjustmentsHorizontalIcon,
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/solid";
// import { categories, jobItems } from "../constants";
// import { useState } from "react";
import JobCard from "../components/JobCard";
import { GET_MY_APPLIED_JOBS } from "../config/queries";
import { useQuery } from "@apollo/client";
import JobCardApplied from "../components/JobCardApplied";
import { useFonts } from "expo-font";

const JobAppliedScreen = ({ navigation }) => {
  // const [activeCategory, setActiveCategory] = useState("");

  const obj = useQuery(GET_MY_APPLIED_JOBS);
  const { data, error, loading } = obj;
  const { me: { appliedJobs = [] } = {} } = data || {};
  // console.log(data, "<<<< INI DARI APOLLO");
  console.log(appliedJobs, "<<<< INI APPLIED JOBS (deconstruct)");

  let [fontsLoaded] = useFonts({
    // "Syne-SemiBold": require("../assets/fonts/Syne-SemiBold.ttf"),
    "Syne-Bold": require("../assets/fonts/Syne-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return undefined;
  }

  if (error) {
    console.log(error);
    // return null;
  }

  return (
    <View className="flex-1 relative">
      <Image
        blurRadius={50}
        source={require("../assets/images/background9.png")}
        className="absolute w-full h-full"
      />
      <SafeAreaView className="flex-1">
        {/* punch line */}
        <View className="mt-32 space-y-2 flex-row justify-between items-center">
          <Text
            className="mx-6 mt-1 text-3xl text-gray-800"
            style={{ fontFamily: "Syne-Bold" }}
          >
            Applied Jobs List
          </Text>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <ImageBackground
              source={require("../assets/images/avatar.png")}
              style={{
                width: 45,
                height: 45,
                marginRight: 23,
                marginBottom: 2,
              }}
              imageStyle={{ borderRadius: 25 }}
            />
          </TouchableOpacity>
        </View>

        {/* search  */}
        {/* <View className="mt-4 mb-12 mx-5 flex-row justify-between items-center space-x-3">
          <View className="flex-row flex-1 px-4 py-2 bg-white rounded-2xl">
            <MagnifyingGlassIcon stroke={40} color="gray" />
            <TextInput
              placeholder="Food"
              value="Search"
              className="ml-2 text-gray-800"
            />
          </View>
          <View className="bg-white rounded-2xl px-4 py-2">
            <AdjustmentsHorizontalIcon size="29" stroke={40} color="black" />
          </View>
        </View> */}

        {/* categories scrollbar */}
        {/* <ScrollView
          className="pt-5 max-h-20"
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        >
          {categories.map((category, index) => {
            let isActive = category == activeCategory;
            let textClass = isActive ? " font-bold" : "";
            return (
              <Animatable.View
                delay={index * 180} // delay for each item
                animation="slideInDown" // animation type
                key={index}
              >
                <TouchableOpacity
                  className="mr-9"
                  onPress={() => setActiveCategory(category)}
                >
                  <Text
                    className={
                      "text-white text-base tracking-widest " + textClass
                    }
                  >
                    {category}
                  </Text>
                  {isActive ? (
                    <View className="flex-row justify-center">
                      <Image
                        source={require("../assets/images/line.png")}
                        className="h-4 w-5"
                      />
                    </View>
                  ) : null}
                </TouchableOpacity>
              </Animatable.View>
            );
          })}
        </ScrollView> */}
        {/* job cards */}
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 20, marginTop: 30 }}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {appliedJobs.map((item, index) => (
            <JobCard
              item={item?.jobPosting}
              // status={item?.applicationStatus}
              index={index}
              key={index}
              axis={"horizontal"}
            />
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default JobAppliedScreen;

const styles = StyleSheet.create({});
