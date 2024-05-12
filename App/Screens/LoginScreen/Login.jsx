import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import Colors from "../../Utils/Colors";
import Input from "../../Components/forms/Input";
import Button from "../../Components/forms/Button";
import GoogleLogin from "../../Components/forms/GoogleLogin";

export default function Login({ navigation }) {
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  return (
    <View style={{ alignItems: "center", backgroundColor: Colors.PRIMARY }}>
      <StatusBar translucent backgroundColor="transparent" />
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
          Log in
        </Text>

        <Input
          placeholder="Nombre de Usuario"
          keyboardType="default"
          autoCapitalize="none"
        />

        <Input
          placeholder="Contraseña"
          secureTextEntry={true}
          autoCapitalize="none"
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={toggleCheckbox}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <View
              style={[styles.checkbox, isChecked ? styles.checked : null]}
            />
            <Text style={{ fontSize: 15, color: Colors.GREY, marginLeft: 8 }}>
              Recuérdame
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("rstpass")}>
            <Text
              style={{
                fontSize: 15,
                color: Colors.GREY,
                textAlign: "right",
                padding: 20,
              }}
            >
              Restaurar contraseña
            </Text>
          </TouchableOpacity>
        </View>

        <Button onPress={() => console.log("button clicked")}>
          Iniciar sesión
        </Button>
        <Text style={styles.text}>O continua con</Text>
        <GoogleLogin />
        <TouchableOpacity onPress={() => navigation.navigate("signup")}>
          <Text style={styles.text}>
            ¿No tienes una cuenta? Registrate
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("home")}>
          <Text style={styles.text}>
            Omitir Inicio de sesión
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
  text: {
    padding: 8,
    textAlign: "center",
    color: "#7F7979"
  },
  checked: {
    backgroundColor: Colors.GREEN,
    borderColor: Colors.GREEN,
  },
});
