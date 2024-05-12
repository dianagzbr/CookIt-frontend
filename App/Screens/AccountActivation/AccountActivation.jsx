import { View, Text, StyleSheet, StatusBar, Image } from "react-native"
import Input from "../../Components/forms/Input"
import Button from "../../Components/forms/Button"
import Colors from "../../Utils/Colors"
import Meow from "../../../assets/meow.jpg"

const AccountActivation = () => {
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="#f3e4d1"
        barStyle="dark-content"
      />
      <View style={styles.content}>
        <Image
          style={styles.image}
          source={Meow}
        />
        <Text style={styles.text}>Estas a un paso para activar tu cuenta</Text>
        <Text style={styles.text2}>
          Ingresa el codigo que te llego al correo para activar la cuente
        </Text>
        <Input placeholder="Token de activacion" />
        <Button>Activar cuenta</Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PRIMARY,
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 500
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    marginTop: 20
  },
  text2: {
    fontWeight: "400",
    fontSize: 18,
    textAlign: "center",
    marginVertical: 10
  },
  content: {
    alignItems: "center",
    marginTop: 30
  },
})

export default AccountActivation