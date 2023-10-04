import { useState } from "react";
import Checkbox from "expo-checkbox";
import { Modal, StyleSheet, Text, Pressable, View } from "react-native";
import InputField from "../components/InputField";
import SelectDropdown from "react-native-select-dropdown";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useFonts } from "expo-font";

export default function JobFilterModal({
  categories = [],
  educationLevels = [],
  state = [],
  show = false,
  handleClose,
}) {
  const [initialState, setFilter] = state;
  const [modalFilters, setModalFilters] = useState(initialState);

  let [fontsLoaded] = useFonts({
    // "Syne-SemiBold": require("../assets/fonts/Syne-SemiBold.ttf"),
    "Syne-Bold": require("../assets/fonts/Syne-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return undefined;
  }

  const onChange = (key, value) => {
    setModalFilters((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={show}
      onRequestClose={handleClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text
            style={{
              fontSize: 28,
              color: "#333",
              marginBottom: 30,
              fontFamily: "Syne-Bold",
            }}
          >
            Filter Jobs
          </Text>

          <InputField
            value={modalFilters.maxAge || ""}
            onChangeText={(text) =>
              onChange("maxAge", text.trim() === "" ? +text : null)
            }
            keyboardType="number-pad"
            label="Max. age requirement"
            icon={
              <AntDesign
                name="filter"
                size={20}
                color="#666"
                style={{ marginRight: 5 }}
              />
            }
          />

          <InputField
            value={modalFilters.location || ""}
            onChangeText={(text) => onChange("location", text.trim() || null)}
            label="Location"
            icon={
              <AntDesign
                name="filter"
                size={20}
                color="#666"
                style={{ marginRight: 5 }}
              />
            }
          />

          <SelectDropdown
            data={["Male", "Female", "None"]}
            defaultButtonText={initialState.gender || "Gender requirement"}
            onSelect={(selectedItem) => {
              setModalFilters({
                ...modalFilters,
                gender: selectedItem === "None" ? null : selectedItem,
              });
            }}
            buttonTextAfterSelection={(selectedItem) => {
              return selectedItem;
            }}
            rowTextForSelection={(item) => {
              return item;
            }}
            buttonStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              // borderColor: "#D5DDE5",
              borderWidth: 0.8,
              borderRadius: 10,
              marginBottom: 20,
              width: "100%",
              height: "10%",
            }}
            buttonTextStyle={{
              fontSize: 15,
              color: "grey",
              textAlign: "left",
            }}
            renderDropdownIcon={(isOpened) => {
              return (
                <FontAwesome
                  name={isOpened ? "chevron-up" : "chevron-down"}
                  // color={"#FFF"}
                  size={18}
                />
              );
            }}
            dropdownIconPosition={"right"}
          />

          <SelectDropdown
            data={[...categories, { id: null, name: "None" }]}
            defaultButtonText={
              initialState.categoryId
                ? categories.find((el) => el.id === initialState.categoryId)
                    .name
                : "Category"
            }
            onSelect={(selectedItem) => {
              setModalFilters({
                ...modalFilters,
                categoryId: selectedItem.id,
              });
            }}
            buttonTextAfterSelection={(selectedItem) => {
              return selectedItem.name;
            }}
            rowTextForSelection={(item) => {
              return item.name;
            }}
            buttonStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              // borderColor: "#D5DDE5",
              borderWidth: 0.8,
              borderRadius: 10,
              marginBottom: 20,
              width: "100%",
              height: "10%",
            }}
            buttonTextStyle={{
              fontSize: 15,
              color: "grey",
              textAlign: "left",
            }}
            renderDropdownIcon={(isOpened) => {
              return (
                <FontAwesome
                  name={isOpened ? "chevron-up" : "chevron-down"}
                  // color={"#FFF"}
                  size={18}
                />
              );
            }}
            dropdownIconPosition={"right"}
          />

          <SelectDropdown
            data={[...educationLevels, { id: null, education: "None" }]}
            defaultButtonText={
              initialState.educationId
                ? educationLevels.find(
                    (el) => el.id === initialState.educationId
                  ).education
                : "Education requirement"
            }
            onSelect={(selectedItem) => {
              setModalFilters({
                ...modalFilters,
                educationId: selectedItem.id,
              });
            }}
            buttonTextAfterSelection={(selectedItem) => {
              return selectedItem.education;
            }}
            rowTextForSelection={(item) => {
              return item.education;
            }}
            buttonStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              // borderColor: "#D5DDE5",
              borderWidth: 0.8,
              borderRadius: 10,
              marginBottom: 20,
              width: "100%",
              height: "10%",
            }}
            buttonTextStyle={{
              fontSize: 15,
              color: "grey",
              textAlign: "left",
            }}
            renderDropdownIcon={(isOpened) => {
              return (
                <FontAwesome
                  name={isOpened ? "chevron-up" : "chevron-down"}
                  // color={"#FFF"}
                  size={18}
                />
              );
            }}
            dropdownIconPosition={"right"}
          />

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "65%",
              marginBottom: 15,
            }}
          >
            <Checkbox
              value={!!modalFilters.isUrgent}
              onValueChange={(value) => {
                setModalFilters({
                  ...modalFilters,
                  isUrgent: value,
                });
              }}
            />
            <Text>Is urgently required?</Text>
          </View>

          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => {
              // console.log(modalFilters, "<<< Pilih ini");
              setFilter(modalFilters);
              handleClose();
            }}
          >
            <Text style={styles.textStyle}>Apply Filter</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    width: "100%",
    borderRadius: 30,
    padding: 15,
    paddingHorizontal: 20,
    elevation: 2,
  },
  buttonOpen: {
    // backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2BD0FF",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  dropdownBtnStyle: {
    width: "100%",
    height: 50,
    backgroundColor: "#FFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#444",
  },
  dropdownBtnTxtStyle: {
    color: "#444",
    textAlign: "left",
  },
  dropdownDropdownStyle: {
    backgroundColor: "#EFEFEF",
  },
  dropdownRowStyle: {
    backgroundColor: "#EFEFEF",
    borderBottomColor: "#C5C5C5",
  },
  dropdownRowTxtStyle: {
    color: "#444",
    textAlign: "left",
  },
});
