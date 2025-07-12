import { View, Text } from 'react-native'

export default function AboutScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding:5
      }}

    >
    
      <Text style={{textAlign:"center",fontSize:20}}>This app was developed with contributions from open source communities, 
  including React Native, Supabase, and other supporting libraries.
  Special thanks to all contributors who helped make these technologies available.</Text>
    <Text>Copyright (c) 2025 Kishore Kevin. All Rights Reserved.</Text>
      </View>
  )
}
