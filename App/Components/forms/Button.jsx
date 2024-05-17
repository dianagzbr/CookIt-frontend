import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import Colors from "../../Utils/Colors";

const Button = ({ children, ...props }) => {
  return (
    <View style={[styles.button, styles.shadow]}>
      <TouchableOpacity {...props}>
        <Text style={styles.textButton}>{children}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 15,
    width: "75%",
    backgroundColor: Colors.SECONDARY,
    borderRadius: 50,
    marginTop: 30,
    alignSelf: "center",
  },
  textButton: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.WHITE,
  },
  shadow: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 20,
  },
});

export default Button;
