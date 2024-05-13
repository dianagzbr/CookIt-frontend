import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import Input from "../../Components/forms/Input";
import Button from "../../Components/forms/Button";
import GoogleLogin from "../../Components/forms/GoogleLogin";
import Colors from "../../Utils/Colors";

export default function Signup({ navigation }) {
  const [data, setData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    re_password: "" 
  });

  const handleChange = (field, value) => {
    setData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleSubmit = async () => {
    console.log(data);

    try {
      const response = await fetch("http://192.168.1.11:8000/auth/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })

      const result = await response.json()

      console.log(result)
    } catch (error) {
      console.log("Error: ", error)
    }
  };

  return (
    <ScrollView style={{ backgroundColor: Colors.PRIMARY }}>
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
          name="username"
          placeholder="Nombre de usuario"
          keyboardType="default"
          autoCapitalize="none"
          onChangeText={(value) => handleChange("username", value)}
          value={data.username}
        />
        <Input
          name="first_name"
          placeholder="Nombre"
          keyboardType="default"
          autoCapitalize="none"
          onChangeText={(value) => handleChange("first_name", value)}
          value={data.first_name}
        />
        <Input
          name="last_name"
          placeholder="Apellidos"
          keyboardType="default"
          autoCapitalize="none"
          onChangeText={(value) => handleChange("last_name", value)}
          value={data.last_name}
        />
        <Input
          name="email"
          placeholder="Correo electronico"
          keyboardType="default"
          autoCapitalize="none"
          onChangeText={(value) => handleChange("email", value)}
          value={data.email}
        />
        <Input
          name="password"
          placeholder="Contraseña"
          secureTextEntry={true}
          autoCapitalize="none"
          onChangeText={(value) => handleChange("password", value)}
          value={data.password}
        />
        <Input
          name="repassword"
          placeholder="Confirmar contraseña"
          secureTextEntry={true}
          autoCapitalize="none"
          onChangeText={(value) => handleChange("re_password", value)}
          value={data.re_password}
        />
        <Button onPress={handleSubmit}>Registrarse</Button>
        <Text style={styles.text}>O continua con</Text>
        <GoogleLogin />
        <TouchableOpacity onPress={() => navigation.navigate("login")}>
          <Text style={styles.text}>¿Ya tienes una cuenta? Inicia sesión</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("home")}>
          <Text style={styles.text}>Omitir Registro</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
    padding: 8,
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
  },
});
