import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
// import BaseLayout from "../layouts/BaseLayout";
import React, { useEffect, useState } from "react";
import { collection, onSnapshot, or, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig";
import {
  AntDesign,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import Chat from "../components/Chat";
import { useAuth } from "../context/useAuth";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ChatScreens() {
  const { user, logout } = useAuth();
  const loginUser = user;
  const [summaryChats, setSummaryChats] = useState([]);
  const [localSummaryChats, setLocalSummaryChats] = useState([]); // for search
  const [searchUser, setSearchUser] = useState("");
  const [onSearchFocus, setOnSearchFocus] = useState(false);
  const [onSearchCaretHidden, setOnSearchCaretHidden] = useState(false);
  const [onRead, SetOnRead] = useState(true);
  const [currentChat, setCurrentChat] = useState("");
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      const q = query(
        collection(db, "summary_chats"),
        loginUser?.id
          ? or(
              where(`senderId`, "in", [
                String(loginUser?.id),
                Number(loginUser?.id),
              ]),
              where(`receiverId`, "in", [
                String(loginUser?.id),
                Number(loginUser?.id),
              ])
            )
          : undefined
      );
      const unSub = onSnapshot(q, (doc) => {
        const summary = doc.docs.map((e) => e.data()) || [];
        setSummaryChats(summary);
        setLocalSummaryChats(summary);
      });

      return () => {
        unSub();
      };
    }, [loginUser])
  );

  const _onPressSearchIcon = () => {
    if (onSearchFocus) {
      setSearchUser("");
      setOnSearchFocus(false);
      setOnSearchCaretHidden(true);
    }
  };

  const _onChangeSearch = (text) => {
    setOnSearchCaretHidden(false);
    setSearchUser(text);
    setOnSearchFocus(true);
  };

  useEffect(() => {
    if (searchUser) {
      const currSummaryChats = summaryChats.filter((item) => {
        const key = loginUser?.id == item?.Id ? "senderName" : "receiverName";
        return item[key]?.toLowerCase()?.includes(searchUser.toLowerCase());
      });
      setLocalSummaryChats(currSummaryChats);
    } else {
      setLocalSummaryChats(summaryChats);
    }
  }, [searchUser]);

  const _onPressChat = (chat) => {
    navigation.navigate("RoomChat", { id: chat.chatId });
  };

  const _onPressCreateMsg = () => {
    navigation.navigate("CreateMessage");
  };

  // console.log(summaryChats, "<<< summary chats");
  return (
    <View className="flex-1 relative">
      <Image
        blurRadius={50}
        source={require("../assets/images/background9.png")}
        className="absolute w-full h-full"
      />
      <SafeAreaView className="flex-1 mx-4">
        <View style={styles.headerContainerTitle}>
          <Text
            style={[styles.header, { flex: 1, height: 40, fontWeight: "bold" }]}
          >
            Chats
          </Text>
        </View>
        <View style={styles.headerContainer}>
          <Text style={[styles.header, { flex: 1, height: 40 }]}>
            Hi, {loginUser.name || "User"} !
          </Text>
        </View>
        <View style={{ flex: 14, marginTop: 12 }}>
          <View style={[styles.searchContainer]}>
            <TextInput
              value={searchUser}
              onChangeText={_onChangeSearch}
              placeholder="Search"
              onFocus={() => {
                setOnSearchFocus(true);
                setOnSearchCaretHidden(false);
              }}
              onBlur={() => setOnSearchFocus(false)}
              caretHidden={onSearchCaretHidden}
            />
            <TouchableOpacity onPress={_onPressSearchIcon}>
              <AntDesign
                name={onSearchFocus ? "closecircleo" : "search1"}
                size={20}
                color={"gray"}
              />
            </TouchableOpacity>
          </View>
          <FlatList
            data={localSummaryChats}
            style={{ marginTop: 12 }}
            renderItem={({ item, index }) => (
              <>
                <Chat
                  index={index}
                  item={item}
                  onPress={_onPressChat}
                  loginUser={loginUser}
                  onRead={onRead}
                />
              </>
            )}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainerTitle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  headerContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerIconContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
    alignItems: "center",
    marginRight: 5,
  },
  header: {
    fontSize: 25,
    fontWeight: "600",
    margin: 10,
  },
  searchContainer: {
    margin: 10,
    height: 50,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderWidth: 0.5,
    borderRadius: 30,
    borderColor: "white",
    flexDirection: "row",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
