import { Stack } from "expo-router";
import { SafeAreaView, StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={ {
    flex: 1,
    marginTop:10
  }}>
      <Stack>
          <Stack.Screen name="(tabs)" options={{headerShown:false}} />

          <Stack.Screen name="updateitem/[taskid]" options={{headerShown:true,headerTitle:"Update Item" }} />
      </Stack> 
      </SafeAreaView>
      </SafeAreaProvider>
  );
}
