import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import Button from "../../Components/forms/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

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
    if (!meal)
      return (
        <View style={styles.containerMeal}>
          <Text>No hay datos</Text>
        </View>
      );
    return (
      <View style={styles.containerMeal}>
        <Image
          style={styles.imageMeal}
          source={{ uri: meal.imagenes[0].imagen }}
        />
        <View style={styles.mealText}>
          <Text style={styles.mealName} numberOfLines={1}>
            {meal.nombre_receta}
          </Text>
          <Text style={styles.mealDetail}>Calorías: {meal.calorias}</Text>
          <Text style={styles.mealDetail}>
            Tiempo: {meal.tiempo_preparacion}
          </Text>
          <Text style={styles.mealDetail}>Dificultad: {meal.dificultad}</Text>
        </View>
      </View>
    );
  };

  const renderDay = ({ item }) => {
    return (
      <View style={styles.dayContainer}>
        <View style={styles.header}>
          <Ionicons name="calendar" size={50} color="#B0AFAF" />
          <Text style={styles.dayTitle}>{item.dayName}</Text>
        </View>
        <View style={styles.line} />
        <Text style={styles.textPlan}>Desayuno:</Text>
        <View style={styles.line}>{renderMeal(item.plan.desayuno)}</View>
        <Text style={styles.textPlan}>Colacion:</Text>
        <View style={styles.line}>{renderMeal(item.plan.colacion)}</View>
        <Text style={styles.textPlan}>Comida:</Text>
        <View style={styles.line}>{renderMeal(item.plan.comida)}</View>
        <Text style={styles.textPlan}>Colacion 2:</Text>
        <View style={styles.line}>{renderMeal(item.plan.colacion2)}</View>
        <Text style={styles.textPlan}>Cena:</Text>
        <View style={styles.line}>{renderMeal(item.plan.cena)}</View>
      </View>
    );
  };

  const getPlanningData = () => {
    const days = [
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
      "Domingo",
    ];
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
            onPress={() =>
              navigation.navigate("createweek", { token, userData })
            }
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
    padding: 10,
  },
  dayContainer: {
    marginVertical: 10,
    padding: 10,
    borderRadius: 5,
  },
  dayTitle: {
    fontSize: 38,
    fontWeight: "bold",
    marginLeft: 25,
  },
  mealName: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
  },
  mealDetail: {
    fontSize: 14,
  },
  header: {
    flexDirection: "row",
  },
  textPlan: {
    color: "#858484",
    fontSize: 20,
  },
  line: {
    marginLeft: 20,
    marginVertical: 15,
    borderLeftWidth: 5,
    borderColor: "#858484",
    padding: 10,
  },
  containerMeal: {
    backgroundColor: "#F0E8DD",
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  imageMeal: {
    width: "50%",
    height: 120,
    borderRadius: 5,
  },
  mealText: {
    marginLeft: 10,
    width: "50%",
  },
});
