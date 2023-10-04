import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon } from "react-native-heroicons/solid";
import {
  HeartIcon,
  MinusIcon,
  PlusIcon,
  BookmarkIcon,
  BookOpenIcon,
  UserCircleIcon,
  UserPlusIcon,
  AcademicCapIcon,
  SparklesIcon,
  FireIcon,
} from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import { useMutation, useQuery } from "@apollo/client";
import { GET_JOB, APPLY_JOB, GET_MY_APPLIED_JOBS } from "../config/queries";
import GoogleMaps from "../components/googleMaps";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "../context/useNavigate";
import { generateChatId } from "../utils/chat";

export default function JobDetailsScreen({ route, navigation }) {
  // let item = props.route.params;

  // const navigation = useNavigation();
  const { accessToken, user } = useAuth();
  const { navigateToAppliedJob } = useNavigate();
  const { jobId } = route.params;
  const [job, setJob] = useState({});
  const [coordinate, setCoordinate] = useState({
    lat: "",
    long: "",
  });
  const { data, loading, error } = useQuery(GET_JOB, {
    variables: {
      jobPostingId: jobId,
    },
  });

  const [funcApplyJob] = useMutation(APPLY_JOB, {
    refetchQueries: [GET_MY_APPLIED_JOBS],
    context: {
      headers: {
        access_token: accessToken,
      },
    },
    onCompleted: () => {
      navigateToAppliedJob();
    },
  });

  // console.log(job, "<<<<<<<<<<job");

  useEffect(() => {
    setJob(data?.jobPosting || {});
    setCoordinate((prevState) => ({
      ...prevState,
      lat: data?.jobPosting?.lat,
      long: data?.jobPosting?.long,
    }));
  }, [data]);

  console.log(user);

  // console.log(coordinate);

  // if (loading) {
  //   return <Preloader />;
  // }

  // if (error) {
  //   return <ErrorData />;
  // }

  const get3dIcon = () => {
    switch (job?.category?.name) {
      case "Cleaning":
        return require("../assets/images/roll-brush-front-gradient.png");
      case "Construction":
        return require("../assets/images/tool-front-gradient.png");
      case "Factory & Industry":
        return require("../assets/images/axe-front-gradient.png");
      case "Cooking":
        return require("../assets/images/glass-front-gradient.png");
      case "Office":
        return require("../assets/images/travel-front-gradient.png");
      case "House Work":
        return require("../assets/images/tea-cup-front-gradient.png");
      default:
        return require("../assets/images/travel-front-gradient.png"); // Default color
    }
  };
  const formatSalary = (num) => {
    return Math.abs(num) > 999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
      : Math.sign(num) * Math.abs(num);
  };

  const RegionMaps = {
    latitude: coordinate?.lat,
    longitude: coordinate?.long,
    latitudeDelta: 0.00502,
    longitudeDelta: 0.01,
  };
  // console.log(job?.lat, job?.long);
  const markerCoordinate = {
    coordinate: { latitude: coordinate?.lat, longitude: coordinate?.long },
    title: `jobs location`,
  };

  const toChat = () => {
    console.log("pressed");
    // console.log(job.author.name);
    // console.log(job.author.id);
    const userName = job?.author?.name
    const userId = job?.author?.id
    navigation.navigate("Chat", {id: generateChatId(user, job?.author), username: userName, userId: +userId})
  }

  const applyJob = () => {
    const payload = job;
    console.log(payload, "<<<<<<<payload");
    funcApplyJob({
      variables: {
        jobPostingId: jobId,
      },
    });
  };
  return (
    <View className="flex-1 bg-gray-200">
      <Image
        source={require("../assets/images/background9.png")}
        blurRadius={100}
        className="absolute w-full h-full"
      />
      <Image
        style={{
          marginTop: 45,
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          borderColor: "white",
          borderWidth: 1,
        }}
        source={require("../assets/images/sub-background9.png")}
        blurRadius={100}
        className="absolute w-full h-full"
      />
      <View className="flex-row justify-between mx-8 mt-20 items-center">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          // className="bg-white rounded-2xl p-3 shadow"
        >
          <ChevronLeftIcon size="23" stroke={50} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
        //  className="bg-white rounded-2xl p-3 shadow"
        >
          <BookmarkIcon size="23" color="black" />
        </TouchableOpacity>
      </View>
      <ScrollView style={{ marginTop: 3, marginHorizontal: 4 }}>
        <View className="flex justify-center items-center">
          <Image className="h-20 w-20" source={get3dIcon()} />
          <Text className="text-2xl font-bold text-gray-800">
            {" "}
            {job?.title}
          </Text>
        </View>
        <View className="flex-row justify-between items-center mt-1 mx-8 h-20 overflow-hidden">
          <Animatable.View
            delay={180}
            animation="slideInDown"
            className="flex items-center space-y-2"
          >
            {/* <Image
              source={require("../assets/icons/calories.png")}
              className="h-6 w-6"
            /> */}
            <FireIcon size="23" stroke={500} color="#fff" />

            <Text className="font-semibold">
              {job?.isUrgent === true ? "Urgent" : "Available"}
            </Text>
          </Animatable.View>
          <Animatable.View
            delay={380}
            animation="slideInDown"
            className="flex items-center space-y-2"
          >
            {/* <Image
              source={require("../assets/icons/chat.png")}
              className="h-6 w-6"
            /> */}
            <SparklesIcon size="23" stroke={500} color="#fff" />

            <Text className="font-semibold">
              {job?.requiredGender ? job?.requiredGender : "All Gender"}
            </Text>
          </Animatable.View>
          <Animatable.View
            delay={280}
            animation="slideInDown"
            className="flex items-center space-y-2"
          >
            {/* <Image
              source={require("../assets/icons/clock.png")}
              className="h-6 w-6"
            /> */}
            <UserPlusIcon size="23" stroke={500} color="#fff" />

            <Text className="font-semibold">Max Age {job?.maxAge}</Text>
          </Animatable.View>
          <Animatable.View
            delay={480}
            animation="slideInDown"
            className="flex items-center space-y-2"
          >
            {/* <Image
              source={require("../assets/icons/weight.png")}
              className="h-6 w-6"
            /> */}
            <AcademicCapIcon size="23" stroke={500} color="#fff" />

            <Text className="font-semibold">
              {job?.requiredEducation ? job?.requiredEducation.education : "-"}
            </Text>
          </Animatable.View>
        </View>
        <View className="mx-8 space-y-3 h-32">
          <Animatable.Text
            animation="slideInUp"
            className="text-2xl font-bold text-white"
          >
            Description
          </Animatable.Text>
          <Animatable.Text
            delay={100}
            animation="slideInUp"
            className="text-white tracking-wider"
          >
            {job?.description}
          </Animatable.Text>
        </View>
        <View className="mx-8 space-y-3 h-10">
          <Animatable.Text
            animation="slideInUp"
            className="text-2xl font-bold text-white"
          >
            Location
          </Animatable.Text>
          <Animatable.Text
            delay={100}
            animation="slideInUp"
            className="text-white tracking-wider"
          >
            {job?.address}
          </Animatable.Text>
        </View>
        {data ? (
          <View
            style={{
              height: 279,
              marginBottom: 10,
              padding: 25,
              paddingTop: 10,
              borderRadius: 25,
            }}
          >
            <GoogleMaps region={RegionMaps} markers={markerCoordinate} />
          </View>
        ) : (
          <></>
        )}
        <View className="mx-8 mb-3 space-y-3">
          <Animatable.Text
            animation="slideInUp"
            className="text-2xl font-bold text-white"
          >
            Contacts
          </Animatable.Text>
          <Animatable.Text
            delay={100}
            animation="slideInUp"
            className="text-white tracking-wider"
          >
            {job?.author?.name} - {job?.author?.telephone}
          </Animatable.Text>
        </View>
        {/* apply button */}
        <View className="mx-8 mt-2 mb-5 flex-row justify-between items-center">
          <Animatable.Text
            delay={100}
            animation="slideInLeft"
            className="text-2xl font-bold text-white"
          >
            Rp. {formatSalary(job?.minSalary)} - {formatSalary(job?.maxSalary)}
          </Animatable.Text>
          <Animatable.View delay={100} animation="slideInRight">
            <TouchableOpacity
              onPress={applyJob}
              className="bg-lime-300 py-3 px-6 rounded-2xl"
            >
              <Text className="text-s font-semibold">Apply</Text>
            </TouchableOpacity>
          </Animatable.View>
          {job?.author?.id !== user?.id ? (
            <Animatable.View delay={100} animation="slideInRight">
              <TouchableOpacity
                className="bg-lime-300 py-3 px-6 rounded-2xl"
                onPress={toChat}
              >
                <Text className="text-s font-semibold">Chat</Text>
              </TouchableOpacity>
            </Animatable.View>
          ) : (
            <></>
          )}
        </View>
      </ScrollView>
      <View className="flex-row justify-between mx-8 mt-16 items-center"></View>
    </View>
  );
}
