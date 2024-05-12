import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Input from "../../Components/forms/Input";
import Button from "../../Components/forms/Button";
import GoogleLogin from "../../Components/forms/GoogleLogin";
import Colors from "../../Utils/Colors";
import Google from "../../../assets/google.png"

export default function Signup({ navigation }) {
  return (
    <View style={{ alignItems: "center", backgroundColor: Colors.PRIMARY }}>
      <Image
        source={require("./../../../assets/comida3.jpg")}
        style={styles.loginImage}
      />
      <View style={styles.subContainer}>
        <Text
          style={{
            fontSize: 30,
            color: Colors.BLACK,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Registro
        </Text>
        <Input
          placeholder="Correo electronico"
          keyboardType="default"
          autoCapitalize="none"
        />
        <Input
          placeholder="Contraseña"
          secureTextEntry={true}
          autoCapitalize="none"
        />
        <Input
          placeholder="Confirmar contraseña"
          secureTextEntry={true}
          autoCapitalize="none"
        />
        <Button
          onPress={() => navigation.navigate("activation")}
        >
          Registrarse
        </Button>
        <Text style={styles.text}>O continua con</Text>
        <GoogleLogin />
        <TouchableOpacity onPress={() => navigation.navigate("login")}>
          <Text style={styles.text}>
            ¿Ya tienes una cuenta? Inicia sesión
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("home")}>
          <Text style={styles.text}>
            Omitir Registro
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loginImage: {
    width: 430,
    height: 300,
    borderBottomLeftRadius: 180,
    borderBottomRightRadius: 180,
  },
  text: {
    textAlign: "center",
    color: "#7F7979",
    padding: 8
  },
  subContainer: {
    width: "100%",
    height: "70%",
    backgroundColor: Colors.PRIMARY,
    padding: 20,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: Colors.GREY,
    justifyContent: "center",
    alignItems: "center",
  },
  checked: {
    backgroundColor: Colors.GREEN,
    borderColor: Colors.GREEN,
  }
});
