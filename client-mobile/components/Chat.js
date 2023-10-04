import { Image, Text, TouchableOpacity, View } from "react-native";

export default function Chat({ item = {}, index, onPress, loginUser = {} }) {
  const _onPress = () => onPress(item);

  return (
    <View
      style={{
        // borderTopWidth: index === 0 ? 1 : 0,
        // borderTopColor: "black",
        marginHorizontal: 15,
        backgroundColor: "rgba(255,255,255,0.3)",
        borderColor: "#D5DDE5",
        borderWidth: 0.8,
        marginBottom: 15,
        borderRadius: 25,
        padding: 15,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <TouchableOpacity
        style={{ flex: 1, flexDirection: "row" }}
        onPress={_onPress}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            borderRadius: 25,
            height: 58,
            // width: 58,
          }}
        >
          <Image
            source={{
              uri: "https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png",
            }}
            style={{
              width: "50%",
              height: "50%",
            }}
          />
        </View>
        <View
          style={{
            flex: 5,
            marginStart: 4,
            // borderTopWidth: 1,
            // borderTopColor: "black",
            // borderBottomWidth: 1,
            padding: 6,
            backgroundColor: "white",
            borderRadius: 20,
            // borderBottomColor: "black",
            marginLeft: 20,
            height: 60,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              marginBottom: 1,
              paddingLeft: 12,
              paddingTop: 3,
            }}
          >
            {loginUser?.id == item?.receiverId
              ? item?.senderName
              : item?.receiverName}
          </Text>
          <Text style={{ paddingLeft: 12, color: "grey" }} numberOfLines={2}>
            {item?.text}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
