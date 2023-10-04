import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";

import DatePicker from "react-native-date-picker";

import InputField from "../components/InputField";
import SelectDropdown from "react-native-select-dropdown";

import FontAwesome from "react-native-vector-icons/FontAwesome";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import CustomButton from "../components/CustomButton";
import { ADD_USER } from "../config/queries";
import { useMutation } from "@apollo/client";
import DateTimePicker from "@react-native-community/datetimepicker";
import { ChevronLeftIcon } from "react-native-heroicons/solid";
import { useFonts } from "expo-font";

const RegisterScreen = ({ navigation }) => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onDateChange = (event, selectedDate) => {
    setShow(false);
    setDate(selectedDate);
  };

  const [user, setUser] = useState({
    name: "",
    telephone: "",
    password: "",
    email: "",
    address: "",
    gender: "",
    dateOfBirth: "",
    educationId: 1,
  });
  const [funcCreateUser, { loading, error, data }] = useMutation(ADD_USER);

  let [fontsLoaded] = useFonts({
    // "Syne-SemiBold": require("../assets/fonts/Syne-SemiBold.ttf"),
    "Syne-Bold": require("../assets/fonts/Syne-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return undefined;
  }

  const onChange = (key, value) => {
    console.log(key, value);
    setUser((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const registerUser = () => {
    const payload = user;
    // console.log(payload, "<<<< payload");
    console.log({ ...payload, dateOfBirth: date }, "ini coyyy");
    funcCreateUser({
      variables: {
        registerDetails: { ...payload, dateOfBirth: date },
      },
    });
    navigation.navigate("Login");
  };

  const gender = ["Male", "Female"];

  // if (loading) {
  //   return <Preloader />;
  // }

  // if (error) {
  //   return <ErrorData />;
  // }

  return (
    <View className="flex-1 relative">
      <Image
        blurRadius={50}
        source={require("../assets/images/background9.png")}
        className="absolute w-full h-full"
      />
      <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ paddingHorizontal: 40 }}
        >
          <Text
            style={{
              fontSize: 28,
              // fontWeight: "bold",
              color: "#333",
              marginBottom: 20,
              marginTop: 90,
              fontFamily: "Syne-Bold",
            }}
          >
            Register
          </Text>

          <InputField
            onChangeText={(text) => onChange("name", text)}
            value={user.name}
            label={"Full Name"}
            icon={
              <Ionicons
                name="person-outline"
                size={20}
                color="white"
                style={{ marginRight: 5 }}
              />
            }
          />

          <InputField
            onChangeText={(text) => onChange("telephone", text)}
            label={"Phone Number"}
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

          <InputField
            onChangeText={(text) => onChange("email", text)}
            label={"Email"}
            icon={
              <MaterialIcons
                name="alternate-email"
                size={20}
                color="white"
                style={{ marginRight: 5 }}
              />
            }
            keyboardType="email-address"
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
          />

          {/* <InputField
            onChangeText={(text) => onChange("dateOfBirth", text)}
            label={"Date of birth"}
            icon={
              
            }
          /> */}

          <View
            style={{
              flexDirection: "row",
              borderBottomColor: "#ccc",
              borderBottomWidth: 1,
              paddingBottom: 8,
              marginBottom: 25,
            }}
          >
            <Ionicons
              name="calendar-outline"
              size={20}
              color="white"
              style={{ marginRight: 5 }}
            />
            <TextInput
              placeholder={"Date of birth"}
              style={{ flex: 1, paddingVertical: 0 }}
              value={date.toLocaleDateString()} // Bind value to the input field
              onPressIn={() => {
                setShow(true);
              }}
            />
          </View>

          <InputField
            onChangeText={(text) => onChange("address", text)}
            label={"Address"}
            icon={
              <Ionicons
                name="calendar-outline"
                size={20}
                color="white"
                style={{ marginRight: 5 }}
              />
            }
          />

          <SelectDropdown
            data={gender}
            defaultButtonText="Choose a Gender"
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
              setUser({
                ...user,
                gender: selectedItem,
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
              borderRadius: 20,
              marginBottom: 20,
              width: 200,
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

          {/* <Button title="Select Date of Birth" onPress={() => setOpen(true)} />
          <DatePicker
            modal
            open={open}
            date={date}
            onConfirm={(date) => {
              setOpen(false);
              setDate(date);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          /> */}

          {/* <View
            style={{
              flexDirection: "row",
              borderBottomColor: "#ccc",
              borderBottomWidth: 1,
              paddingBottom: 8,
              marginBottom: 30,
            }}
          >
            <Ionicons
              name="calendar-outline"
              size={20}
              color="white"
              style={{ marginRight: 5 }}
            />
            <TouchableOpacity onPress={() => setOpen(true)}>
              <Text style={{ color: "white", marginLeft: 5, marginTop: 5 }}>
                {dobLabel}
              </Text>
            </TouchableOpacity>
          </View> */}

          {/* <DatePicker
          modal
          open={open}
          date={date}
          mode={"date"}
          maximumDate={new Date("2005-01-01")}
          minimumDate={new Date("1980-01-01")}
          onConfirm={(date) => {
            setOpen(false);
            setDate(date);
            setDobLabel(date.toDateString());
          }}
          onCancel={() => {
            setOpen(false);
          }}
        /> */}

          <CustomButton label={"Register"} onPress={registerUser} />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginBottom: 30,
            }}
          >
            <Text style={{ color: "grey" }}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={{ color: "white", fontWeight: "700" }}> Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            onChange={onDateChange}
          />
        )}
      </SafeAreaView>
    </View>
  );
};

export default RegisterScreen;
