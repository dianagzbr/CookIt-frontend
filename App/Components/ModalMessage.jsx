import { View, Text, Modal, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../Utils/Colors";

const ModalMessage = ({ children, ...props }) => {
  return (
    <Modal visible={props.isModalOpen} transparent={true} animationType="slide">
      <View style={styles.container}>
        <View style={[styles.content, styles.shadow]}>
          <View style={[styles.titleContainer, styles.shadow]}>
            <Text style={styles.text}>{props.title}</Text>
          </View>
          <Text style={styles.textContent}>{children}</Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => props.setIsModalOpen(!props.isModalOpen)}
        >
          <Text style={styles.text}>Aceptar</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    backgroundColor: Colors.LIGHT,
    width: 280,
    height: 200,
    borderRadius: 15,
  },
  titleContainer: {
    backgroundColor: "#d2f492",
    borderRadius: 15,
    padding: 8,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 8,
  },
  button: {
    backgroundColor: "#d2f492",
    padding: 10,
    marginTop: 15,
    borderRadius: 15,
    borderWidth: 1.3,
  },
  text: {
    color: "#000",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18
  },
  textContent: {
    textAlign: "center",
    fontSize: 16,
    height: 160,
    textAlignVertical: "center"
  }
});

export default ModalMessage;
