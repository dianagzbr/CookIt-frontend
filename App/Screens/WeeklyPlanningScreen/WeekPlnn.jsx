import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { useFocusEffect } from '@react-navigation/native';
import Button from "../../Components/forms/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function WeekPlanning({ navigation }) {
  const [isWeeklyPlanning, setIsWeekliyPlanning] = useState(false);
  const [token, setToken] = useState("");
  const [userData, setUserData] = useState({});

  const getUserToken = async () => {
    const userToken = await AsyncStorage.getItem("accessToken");
    const url = "https://cookit-j5x3.onrender.com/auth/users/me/";

    const response = await fetch(url, {
      headers: {
        Authorization: "JWT " + userToken,
      },
    });

    const data = await response.json();

    setUserData(data);
    setToken(userToken);

    if (data.planeacion) {
      setIsWeekliyPlanning(true);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getUserToken();
    }, [])
  );

  return (
    <View style={styles.container}>
      {!isWeeklyPlanning ? (
        <View style={styles.content}>
          <Text>No hay ninguna planeacion semanal</Text>
          <Button
            onPress={() =>
              navigation.navigate("createweek", { token, userData })
            }
          >
            Agregar una planeacion
          </Button>
        </View>
      ) : (
        <Button
          onPress={() => navigation.navigate("createweek", { token, userData })}
        >
          Eliminar y agregar una nueva
        </Button>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBDCC9",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
