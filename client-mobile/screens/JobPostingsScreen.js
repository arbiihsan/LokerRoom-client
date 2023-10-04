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
  PlusIcon,
} from "react-native-heroicons/solid";
// import { categories, jobItems } from "../constants";
import { useState, useEffect } from "react";
import JobCard from "../components/JobCard";
import JobStatusModal from "../components/JobStatusModal";
import { GET_MY_POSTED_JOBS } from "../config/queries";
import { useQuery } from "@apollo/client";
import { useFonts } from "expo-font";

const JobPostingScreen = ({ navigation }) => {
  // const [activeCategory, setActiveCategory] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [jobStatus, setJobStatus] = useState({
    id: null,
    status: "",
  });

  const { data, error, loading, refetch } = useQuery(GET_MY_POSTED_JOBS);
  const { me: { postedJobs = [] } = {} } = data || {};
  // console.log(postedJobs, "<<<<<<data di jobposting");

  useEffect(() => {
    refetch();
  }, [showModal]);

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
      <SafeAreaView className="flex-1">
        {/* punch line */}
        <View className="mt-16 mb-5 space-y-2 flex-row justify-between items-center">
          <Text
            className="mx-6 mt-1 text-2xl text-gray-800"
            style={{ fontFamily: "Syne-Bold" }}
          >
            Created Jobs List
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
        {/* <View className="mt-4 mb-5 mx-5 flex-row justify-between items-center space-x-3">
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

        {/* add job button */}
        <TouchableOpacity onPress={() => navigation.navigate("JobAdd")}>
          <View
            className="bg-white rounded-2xl px-24 py-2 mx-5 mb-6 flex-row justify-evenly items-center"
            style={{
              backgroundColor: "rgba(255,255,255,0.3)",
              borderColor: "white",
              borderWidth: 0.8,
            }}
          >
            <PlusIcon size="22" stroke={40} color="black" />
            <Text className="font-bold">Create a Job</Text>
          </View>
        </TouchableOpacity>

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
          contentContainerStyle={{ paddingHorizontal: 20 }}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {postedJobs.map((item, index) => (
            <JobCard
              item={item}
              index={index}
              key={index}
              axis={"horizontal"}
              handleUpdateStatus={() => {
                console.log("Clicked!");
                setJobStatus({
                  id: item.id,
                  status: item.status,
                });
                setShowModal(true);
              }}
            />
          ))}
        </ScrollView>

        <JobStatusModal
          show={showModal}
          handleClose={() => {
            setShowModal(false);
          }}
          state={jobStatus}
        />
      </SafeAreaView>
    </View>
  );
};

export default JobPostingScreen;

const styles = StyleSheet.create({});
