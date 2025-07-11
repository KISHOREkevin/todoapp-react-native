import { Tabs } from 'expo-router'
import { View, Text } from 'react-native'
import {Ionicons}  from "@expo/vector-icons"
export default function TabLayout() {
  return(
    <Tabs screenOptions={{headerShown:false}}>
      <Tabs.Screen name='index' options={{tabBarIcon:({color})=><Ionicons name='home-sharp' color={color} size={24} />}}  />
      <Tabs.Screen name='about' options={{tabBarIcon:({color})=><Ionicons name='infinite-sharp' color={color} size={24} />}} />
    </Tabs>
  ) 

}
