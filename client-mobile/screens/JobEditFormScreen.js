import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  VirtualizedList,
} from "react-native";

import InputField from "../components/InputField";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import CustomButton from "../components/CustomButton";
import { ChevronLeftIcon } from "react-native-heroicons/solid";
import {
  HeartIcon,
  MinusIcon,
  PlusIcon,
  BookmarkIcon,
} from "react-native-heroicons/outline";
import { useMutation } from "@apollo/client";
import { ADD_JOB, GET_JOBS } from "../config/queries";
import SelectDropdown from "react-native-select-dropdown";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useRoute } from "@react-navigation/native";
import GoogleMaps from "../components/googleMaps";
import CustomButtonAddress from "../components/CustomButtonAddress";
import InputFieldForm from "../components/InputFieldForm";

const JobEditFormScreen = ({ navigation, props }) => {
  const route = useRoute();
  const { latitude, longitude } = route.params || {};
  // console.log(latitude, longitude, "ini coyy");
  const [accessToken, setAccessToken] = useState("");

  let item = props.route.params;

  const [job, setJob] = useState({
    title: item?.title || "",
    description: item?.description || "",
    address: item?.address || "",
    categoryId: item?.categoryId || 0,
    long: item?.long || 0,
    lat: item?.lat || 0,
    minSalary: item?.minSalary || "",
    maxSalary: item?.maxSalary || "",
    requiredGender: item?.requiredGender || "",
    maxAge: item?.maxAge || "",
    requiredEducation: item?.requiredEducation || "",
    isUrgent: item?.isUrgent || "",
  });
  // console.log(accessToken, "<<<<<<<<<< accessToken");
  const [funcCreateJob, { loading, error, data }] = useMutation(ADD_JOB, {
    refetchQueries: [GET_JOBS],
    context: {
      headers: {
        access_token: accessToken,
      },
    },
    onCompleted: () => {
      navigation.navigate("Home");
    },
  });

  useEffect(() => {
    getAccessToken();
    if (latitude && longitude) {
      setJob((prevState) => ({
        ...prevState,
        lat: latitude,
        long: longitude,
      }));
    }
  }, [latitude, longitude]);

  const getAccessToken = async () => {
    try {
      const access_token = await AsyncStorage.getItem("access_token");
      setAccessToken(access_token);
      // console.log(access_token, "<<<<<< access token");
    } catch (err) {
      console.log(err);
    }
  };

  const onChange = (key, value) => {
    // console.log(key, value);
    setJob((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const createJob = () => {
    const payload = job;
    // console.log(payload, "<<< payload");
    funcCreateJob({
      variables: {
        jobPosting: payload,
      },
    });
    navigation.navigate("Dashboard");
  };

  // if (loading) {
  //   return <Preloader />;
  // }

  // if (error) {
  //   return <ErrorData />;
  // }

  const gotoMaps = () => {
    navigation.navigate("addMaps");
  };

  const gender = ["Male", "Female"];

  const category = [
    { name: "Construction", id: 1 },
    { name: "Factory & Industry", id: 2 },
    { name: "House Work", id: 3 },
    { name: "Office", id: 4 },
    { name: "Cooking", id: 5 },
    { name: "Cleaning", id: 6 },
    { name: "Utility", id: 7 },
  ];

  const education = ["SD", "SMK", "Diploma", "S1", "S2"];
  const region = {
    latitude: latitude,
    longitude: longitude,
    latitudeDelta: 0.00502,
    longitudeDelta: 0.01,
  };

  return (
    <View className="flex-1 relative">
      <Image
        blurRadius={150}
        source={require("../assets/images/background9.png")}
        className="absolute w-full h-full"
      />
      <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
        <ScrollView
          horizontal={false}
          showsVerticalScrollIndicator={false}
          style={{ paddingHorizontal: 30 }}
        >
          <View className="flex-row justify-start items-center">
            <View className="mt-3 items-center">
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                className="bg-white rounded-2xl p-2 shadow"
              >
                <ChevronLeftIcon size="23" stroke={50} color="black" />
              </TouchableOpacity>
            </View>
            <Text
              style={{
                // fontFamily: "Roboto-Medium",
                fontSize: 28,
                fontWeight: "bold",
                color: "#333",
                marginBottom: 30,
                marginTop: 40,
                marginLeft: 15,
              }}
            >
              Create Job
            </Text>
          </View>

          <InputFieldForm
            onChangeText={(text) => onChange("title", text)}
            value={job.title}
            label={"Title"}
            icon={
              <Ionicons
                name="person-outline"
                size={20}
                color="white"
                style={{ marginRight: 5 }}
              />
            }
          />

          <InputFieldForm
            onChangeText={(text) => onChange("description", text)}
            value={job.description}
            label={"Description"}
            icon={
              <Feather
                name="phone"
                size={20}
                color="white"
                style={{ marginRight: 5 }}
              />
            }
            // keyboardType="phone-number"
          />

          <InputFieldForm
            onChangeText={(text) => onChange("address", text)}
            value={job.address}
            label={"Address Name"}
            icon={
              <MaterialIcons
                name="alternate-email"
                size={20}
                color="white"
                style={{ marginRight: 5 }}
              />
            }
          />

          {/* <InputFieldForm
            onChangeText={(text) => onChange("categoryId", text)}
            label={"Category"}
            icon={
              <Ionicons
                name="ios-lock-closed-outline"
                size={20}
                color="white"
                style={{ marginRight: 5 }}
              />
            }
          /> */}

          <InputFieldForm
            onChangeText={(text) => onChange("minSalary", +text)}
            value={job.minSalary}
            label={"Minimum Salary"}
            icon={
              <Ionicons
                name="ios-lock-closed-outline"
                size={20}
                color="white"
                style={{ marginRight: 5 }}
              />
            }
          />

          <InputFieldForm
            onChangeText={(text) => onChange("maxSalary", +text)}
            value={job.maxSalary}
            label={"Maximum Salary"}
            icon={
              <Ionicons
                name="ios-lock-closed-outline"
                size={20}
                color="white"
                style={{ marginRight: 5 }}
              />
            }
          />

          {/* <InputFieldForm
            onChangeText={(text) => onChange("requiredGender", text)}
            label={"Gender (Optional)"}
            icon={
              <Ionicons
                name="ios-lock-closed-outline"
                size={20}
                color="white"
                style={{ marginRight: 5 }}
              />
            }
          /> */}

          <InputFieldForm
            onChangeText={(text) => onChange("maxAge", +text)}
            value={job.maxAge}
            label={"Maximum Age (Optional)"}
            icon={
              <Ionicons
                name="ios-lock-closed-outline"
                size={20}
                color="white"
                style={{ marginRight: 5 }}
              />
            }
          />

          {/* <InputFieldForm
            onChangeText={(text) => onChange("requiredEducation", text)}
            label={"Education (Optional)"}
            icon={
              <Ionicons
                name="ios-lock-closed-outline"
                size={20}
                color="white"
                style={{ marginRight: 5 }}
              />
            }
          /> */}

          {/* <InputFieldForm
            onChangeText={(text) => onChange("isUrgent", text)}
            label={"Urgency Status"}
            icon={
              <Ionicons
                name="ios-lock-closed-outline"
                size={20}
                color="white"
                style={{ marginRight: 5 }}
              />
            }
          /> */}
          <SelectDropdown
            data={category.map((el) => el.name)}
            defaultButtonText="Choose a Category"
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
              setJob({
                ...job,
                categoryId: index + 1,
              });
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return item;
            }}
            buttonStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              borderColor: "#D5DDE5",
              borderWidth: 0.8,
              borderRadius: 10,
              marginBottom: 20,
              width: "100%",
              height: "5%",
            }}
            buttonTextStyle={{
              fontSize: 15,
              color: "white",
              textAlign: "left",
            }}
            renderDropdownIcon={(isOpened) => {
              return (
                <FontAwesome
                  name={isOpened ? "chevron-up" : "chevron-down"}
                  color={"#FFF"}
                  size={18}
                />
              );
            }}
            dropdownIconPosition={"right"}
          />

          <SelectDropdown
            data={gender}
            defaultButtonText="Choose a Gender"
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
              setJob({
                ...job,
                requiredGender: selectedItem,
              });
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return item;
            }}
            buttonStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              borderColor: "#D5DDE5",
              borderWidth: 0.8,
              borderRadius: 10,
              marginBottom: 20,
              width: "100%",
              height: "5%",
            }}
            buttonTextStyle={{
              fontSize: 15,
              color: "white",
              textAlign: "left",
            }}
            renderDropdownIcon={(isOpened) => {
              return (
                <FontAwesome
                  name={isOpened ? "chevron-up" : "chevron-down"}
                  color={"#FFF"}
                  size={18}
                />
              );
            }}
            dropdownIconPosition={"right"}
          />

          <SelectDropdown
            data={education}
            defaultButtonText="Choose Education"
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
              setJob({
                ...job,
                requiredEducation: index + 1,
              });
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return item;
            }}
            buttonStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              borderColor: "#D5DDE5",
              borderWidth: 0.8,
              borderRadius: 10,
              marginBottom: 20,
              width: "100%",
              height: "5%",
            }}
            buttonTextStyle={{
              fontSize: 15,
              color: "white",
              textAlign: "left",
            }}
            renderDropdownIcon={(isOpened) => {
              return (
                <FontAwesome
                  name={isOpened ? "chevron-up" : "chevron-down"}
                  color={"#FFF"}
                  size={18}
                />
              );
            }}
            dropdownIconPosition={"right"}
          />
          <SelectDropdown
            data={["Urgent", "Not Urgent"]}
            defaultButtonText="Choose Urgency Status"
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
              setJob({
                ...job,
                isUrgent: selectedItem === "Urgent" ? true : false,
              });
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return item;
            }}
            buttonStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              borderColor: "#D5DDE5",
              borderWidth: 0.8,
              borderRadius: 10,
              marginBottom: 20,
              width: "100%",
              height: "5%",
            }}
            buttonTextStyle={{
              fontSize: 15,
              color: "white",
              textAlign: "left",
            }}
            renderDropdownIcon={(isOpened) => {
              return (
                <FontAwesome
                  name={isOpened ? "chevron-up" : "chevron-down"}
                  color={"#FFF"}
                  size={18}
                />
              );
            }}
            dropdownIconPosition={"right"}
          />

          {/* <Text>Input address</Text>
          <View style={{ height: 260, padding: 2 , marginBottom: 25}}>
          <MapContainer/>
          </View> */}

          <CustomButtonAddress
            label={"Add your Address hitpoint Here"}
            onPress={gotoMaps}
          />
          {latitude && longitude && (
            <View style={{ height: 220, marginBottom: 45 }}>
              {/* Display the map with the marker */}
              <Text>Preview Hitpoint</Text>
              <GoogleMaps
                region={region}
                markers={{
                  coordinate: { latitude, longitude },
                }}
              />
            </View>
          )}
          <View style={{ marginBottom: 90, marginTop: 20 }}>
            <CustomButton label={"Submit"} onPress={createJob} />
          </View>
        </ScrollView>
        <View className="flex-row justify-between mx-8 mt-16 items-center"></View>
      </SafeAreaView>
    </View>
  );
};

export default JobEditFormScreen;
