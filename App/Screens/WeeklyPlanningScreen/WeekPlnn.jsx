import { View, Text, StyleSheet, FlatList, Image } from "react-native";
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

  const renderMeal = (meal) => {
    if (!meal) return null;
    return (
      <View>
        <Text style={styles.mealName}>{meal.nombre_receta}</Text>
        <Text style={styles.mealDetail}>Calorías: {meal.calorias}</Text>
        <Text style={styles.mealDetail}>Dificultad: {meal.dificultad}</Text>
      </View>
    );
  };

  const renderDay = ({ item }) => {
    return (
      <View style={styles.dayContainer}>
        <Text style={styles.dayTitle}>{item.dayName}</Text>
        <Text>Desayuno:</Text>
        {renderMeal(item.plan.desayuno)}
        <Text>Colacion:</Text>
        {renderMeal(item.plan.colacion)}
        <Text>Comida:</Text>
        {renderMeal(item.plan.comida)}
        <Text>Colacion 2:</Text>
        {renderMeal(item.plan.colacion2)}
        <Text>Cena:</Text>
        {renderMeal(item.plan.cena)}
      </View>
    );
  };

  const getPlanningData = () => {
    const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
    return days.map((dayName, index) => {
      const dayKey = `dia${index + 1}`;
      return { dayName, plan: userData.planeacion[dayKey] || {} };
    });
  };

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
        <View style={styles.content}>
          <FlatList
            data={getPlanningData()}
            renderItem={renderDay}
            keyExtractor={(item) => item.dayName}
          />
          <Button
            onPress={() => navigation.navigate("createweek", { token, userData })}
          >
            Eliminar y agregar una nueva
          </Button>
        </View>
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
  dayContainer: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  dayTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  mealName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  mealDetail: {
    fontSize: 14,
  },
});
