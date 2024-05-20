import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import Colors from "../../Utils/Colors";
import Input from "../../Components/forms/Input";
import Button from "../../Components/forms/Button";
import ModalMessage from "../../Components/ModalMessage";
import GoogleLogin from "../../Components/forms/GoogleLogin";
import ImageForm from "../../Components/forms/ImageForm";
import { CommonActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login({ navigation }) {
  const [isChecked, setIsChecked] = useState(false);
  const [formData, setFormData] = useState({})
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    getSessionData()
  }, [])

  const getSessionData = async () => {
    const accessToken = await AsyncStorage.getItem("accessToken")
    const refreshToken = await AsyncStorage.getItem("refeshToken")

    if (accessToken !== null) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "home" }]
        })
      )
    }
  }

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  const handleChange = (field, value) =>  {
    setFormData({...formData, [field]: value})
  }

  const handlesubmit = async () => {
    const url = "https://cookit-j5x3.onrender.com/auth/jwt/create/"
    const body = {
      email: formData.email,
      password: formData.password
    }

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      }
    })

    if (response.status === 200) {
      const data = await response.json()

      await AsyncStorage.setItem("accessToken", data.access)
      await AsyncStorage.setItem("refreshToken", data.refresh)

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "home" }]
        })
      )
    } else {
      result = await response.json()
      setModalData({
        title: "Ha ocurrido un error",
        content: `${Object.keys(result)[0]}: ${Object.values(result)[0]}`,
      });
      setIsModalOpen(true);
    }

  }

  return (
    <View style={{ alignItems: "center", backgroundColor: Colors.PRIMARY }}>
      <StatusBar translucent backgroundColor="transparent" />
      <ModalMessage
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        title={modalData.title}
      >
        {modalData.content}
      </ModalMessage>
      <ImageForm />
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
          placeholder="Correo electronico"
          keyboardType="default"
          autoCapitalize="none"
          onChangeText={(value) => handleChange("email", value)}
          value={formData.email}
        />

        <Input
          placeholder="Contraseña"
          secureTextEntry={true}
          autoCapitalize="none"
          onChangeText={(value) => handleChange("password", value)}
          value={formData.password}
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

        <Button onPress={handlesubmit}>
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
