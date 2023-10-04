import { useState } from "react";
import { Modal, StyleSheet, Text, Pressable, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { GET_MY_POSTED_JOBS, UPDATE_JOB_STATUS } from "../config/queries";
import { useMutation } from "@apollo/client";

export default function JobStatusModal({
  state = { id: null, status: 'Processing' },
  show = false,
  handleClose,
}) {

  const [updatedStatus, setUpdatedStatus] = useState(state.status);
  const [funcUpdateJobStatus] = useMutation(UPDATE_JOB_STATUS);

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
              // fontFamily: "Roboto-Medium",
              fontSize: 20,
              fontWeight: "bold",
              color: "#333",
              marginBottom: 10,
            }}
          >
            Update Job Status
          </Text>

          <SelectDropdown
            data={["Active", "Inactive", "Filled"]}
            defaultButtonText={state.status}
            onSelect={(selectedItem) => {
              setUpdatedStatus(selectedItem);
            }}
            buttonStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              // borderColor: "#D5DDE5",
              borderWidth: 0.8,
              borderRadius: 10,
              marginBottom: 20,
              width: "100%",
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

          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => {
              // console.log(state.id, updatedStatus);
              funcUpdateJobStatus({
                variables: {
                  jobPostingId: state.id,
                  jobPostingStatus: updatedStatus
                }
              })
              handleClose();
            }}
          >
            <Text style={styles.textStyle}>Update Job Status</Text>
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
    borderRadius: 20,
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
