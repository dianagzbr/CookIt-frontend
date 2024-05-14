import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Input from "../../Components/forms/Input";
import Button from "../../Components/forms/Button";
import GoogleLogin from "../../Components/forms/GoogleLogin";
import ImageForm from "../../Components/forms/ImageForm";
import Colors from "../../Utils/Colors";
import ModalMessage from "../../Components/ModalMessage";

export default function Signup({ navigation }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    re_password: "",
  });
  const [modalData, setModalData] = useState({
    title: "",
    content: "",
  });

  const handleChange = (field, value) => {
    setData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://192.168.1.11:8000/auth/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.status === 400) {
        setModalData({
          title: "Ha ocurrido un error",
          content: `${Object.keys(result)[0]}: ${Object.values(result)[0]}`,
        });
        setIsModalOpen(true);
      }

    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <ScrollView style={{ backgroundColor: Colors.PRIMARY }}>
      <View style={{ alignItems: "center" }}>
        <ImageForm />
      </View>
      <ModalMessage
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        title={modalData.title}
      >
        {modalData.content}
      </ModalMessage>
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
    width: "120%",
    height: 300,
    borderRadius: 180,
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
