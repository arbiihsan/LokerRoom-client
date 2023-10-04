import { View, Text } from 'react-native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import React from 'react'
import ChatScreens from '../screens/ChatScreen'
import { SafeAreaView } from 'react-native-safe-area-context'
import RoomChatScreen from '../screens/RoomChatScreen'

const Stack = createNativeStackNavigator()
export default function ChatStack() {
  return (
    <SafeAreaView style={{flex: 1}}>
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name='ChatScreen' component={ChatScreens}/>
      <Stack.Screen name='RoomChat' component={RoomChatScreen}/>
    </Stack.Navigator>
    </SafeAreaView>
  )
}