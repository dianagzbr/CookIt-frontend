import { TextInput, StyleSheet } from "react-native"
import Colors from "../../Utils/Colors"

const Input = (props) => {
  return (
    <TextInput style={[styles.input, styles.shadow]} {...props} />
  )
}

const styles = StyleSheet.create({
  input: {
    padding: 15,
    width: '90%',
    backgroundColor: Colors.WHITE,
    borderRadius: 50,
    marginTop: 25,
    textAlign: 'left',
    alignSelf: 'center',
    fontSize: 17,
  },
  shadow: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 20,
  }
})

export default Input