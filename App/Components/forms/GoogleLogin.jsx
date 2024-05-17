import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native"
import Google from "../../../assets/google.png"

const GoogleLogin = () => {
  return (
    <View style={{ alignItems: "center" }}>
      <TouchableOpacity>
        <Image style={styles.image} source={Google} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center"
  },
  image: {
    width: 50,
    height: 50
  }
})

export default GoogleLogin
