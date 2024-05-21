import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import ShowRecipes from "../../Components/ShowRecipes";
import Colors from "../../Utils/Colors";
import ModalMessage from "../../Components/ModalMessage";

const CreateWeeklyPlanning = ({ route }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [meal, setMeal] = useState("");
  const [day, setDay] = useState("");
  const [planningId, setPlanningId] = useState(
    route.params.userData.planeacion ? route.params.userData.planeacion.id : ""
  );
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [modalData, setModalData] = useState({
    title: "",
    content: "",
  });

  const generateMealState = (mealTypes) => {
    const mealState = {};
    const updatedPlanningDay = { ...planningDay };

    mealTypes.forEach((mealType) => {
      mealState[mealType] = {};
      ["dia1", "dia2", "dia3", "dia4", "dia5", "dia6", "dia7"].forEach(
        (day) => {
          const recipe = route.params.userData.planeacion
            ? route.params.userData.planeacion[day]?.[mealType]
            : null;
          const day_id = route.params.userData.planeacion
            ? route.params.userData.planeacion[day]
            : null;

          mealState[mealType][day] = {
            name: recipe ? recipe.nombre_receta : "",
            id: recipe ? recipe.id : "",
          };

          updatedPlanningDay[day] = day_id ? day_id.id : "";
        }
      );
    });

    return { mealState, updatedPlanningDay };
  };

  const mealTypes = ["desayuno", "colacion", "comida", "colacion2", "cena"];
  const [meals, setMeals] = useState(generateMealState(mealTypes).mealState);
  const [planningDay, setPlanningDay] = useState(
    generateMealState(mealTypes).updatedPlanningDay
  );

  const updateMeal = (recipeId, recipeName) => {
    setMeals((prevMeals) => ({
      ...prevMeals,
      [meal]: { ...prevMeals[meal], [day]: { id: recipeId, name: recipeName } },
    }));
  };

  const handleMealSelection = (selectedMeal, selectedDay) => {
    setMeal(selectedMeal);
    setDay(selectedDay);
    setIsModalOpen(true);
  };

  const handleSubmit = async (daySubmit) => {
    const url = "https://cookit-j5x3.onrender.com/sendcomidas/";
    const url2 = "https://cookit-j5x3.onrender.com/sendplaneacion/";

    const body = {
      desayuno: meals.desayuno[daySubmit].id,
      colacion: meals.colacion[daySubmit].id,
      comida: meals.comida[daySubmit].id,
      colacion2: meals.colacion2[daySubmit].id,
      cena: meals.cena[daySubmit].id,
    };

    if (planningId) {
      if (planningDay[daySubmit]) {
        const response = await fetch(`${url}${planningDay[daySubmit]}/`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: "JWT " + route.params.token,
          },
          body: JSON.stringify(body),
        });

        if (response.status === 200) {
          setModalData({
            title: "Actualizado con exito",
            content: `Planeacion semanal actualizada correctamente`,
          });
          setIsModalOpen2(true);
        } else {
          setModalData({
            title: "Error",
            content: "Ocurrio un error, intelelo mas tarde",
          });
          setIsModalOpen2(true);
        }
      } else {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "JWT " + route.params.token,
          },
          body: JSON.stringify(body),
        });
        const data = await response.json();

        const newUrl = `${url2}${route.params.userData.planeacion.id}/`;
        const body2 = {
          [daySubmit]: data.id,
        };

        const response2 = await fetch(newUrl, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: "JWT " + route.params.token,
          },
          body: JSON.stringify(body2),
        });

        if (response2.status === 200) {
          setModalData({
            title: "Actualizado con exito",
            content: `Planeacion semanal actualizada correctamente`,
          });
          setIsModalOpen2(true);
        } else {
          setModalData({
            title: "Error",
            content: "Ocurrio un error, intelelo mas tarde",
          });
          setIsModalOpen2(true);
        }
      }
    } else {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: "JWT " + route.params.token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      setPlanningDay({ ...planningDay, [daySubmit]: data.id });

      const body2 = {
        [daySubmit]: data.id,
        usuario: route.params.userData.id,
      };

      const response2 = await fetch(url2, {
        method: "POST",
        headers: {
          Authorization: "JWT " + route.params.token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body2),
      });

      if (response2.status === 201) {
        setModalData({
          title: "Actualizado con exito",
          content: `Planeacion semanal actualizada correctamente`,
        });
        setIsModalOpen2(true);
      } else {
        setModalData({
          title: "Error",
          content: "Ocurrio un error, intelelo mas tarde",
        });
        setIsModalOpen2(true);
      }
    }
  };

  const renderDayInput = (dayKey, dayName) => {
    const mealNames = [
      "Desayuno",
      "Primera colacion",
      "Comida",
      "Segunda colacion",
      "Cena",
    ];

    return (
      <View key={dayKey}>
        <Text style={styles.day}>{dayName}:</Text>
        {mealNames.map((mealName, index) => (
          <TouchableOpacity
            key={index}
            onPress={() =>
              handleMealSelection(Object.keys(meals)[index], dayKey)
            }
          >
            <TextInput
              style={styles.input}
              readOnly={true}
              placeholder={mealName + ":"}
              value={meals[Object.keys(meals)[index]][dayKey].name}
            />
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleSubmit(dayKey)}
        >
          <Text style={styles.textButton}>
            {"Crear planeacion del dia: " + dayName}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.day}>Planeacion semanal</Text>
      <Text style={styles.day}>Puedes dejar campos en blanco</Text>
      <ShowRecipes
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        dataRecipes={updateMeal}
      />
      <ModalMessage
        isModalOpen={isModalOpen2}
        setIsModalOpen={setIsModalOpen2}
        title={modalData.title}
      >
        {modalData.content}
      </ModalMessage>
      {[...Array(7)].map((_, index) => {
        const dayNumber = index + 1;
        const dayKey = `dia${dayNumber}`;
        const dayName = [
          "Lunes",
          "Martes",
          "Miércoles",
          "Jueves",
          "Viernes",
          "Sábado",
          "Domingo",
        ][index];
        return renderDayInput(dayKey, dayName);
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBDCC9",
    paddingHorizontal: 20,
  },
  day: {
    fontSize: 25,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    color: "#000",
  },
  button: {
    backgroundColor: Colors.SECONDARY,
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
  },
  textButton: {
    color: "#fff",
    textAlign: "center",
  },
});

export default CreateWeeklyPlanning;
