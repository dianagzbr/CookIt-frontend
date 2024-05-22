import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Colors from "../../Utils/Colors";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import ModalMessage from "../../Components/ModalMessage";

export default function AddRecipeScreen() {
  const [formData, setFormData] = useState({
    recipeName: "",
    ingredients: [],
    instructions: "",
    image: null,
    calories: "",
    prepTime: "",
    origin: "",
    difficulty: "",
    category: "",
    mealType: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    title: "",
    content: "",
  });

  const [userData, setUserData] = useState({
    userToken: null,
    userId: null,
  });

  const [ingredientList, setIngredientList] = useState([]);

  const handleChange = (name, value) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    const {
      recipeName,
      instructions,
      calories,
      origin,
      mealType,
      difficulty,
      category,
      image,
      ingredients,
      prepTime,
    } = formData;

    const { userId, userToken } = userData;

    const form = new FormData();
    form.append("nombre_receta", recipeName);
    form.append("pasos", instructions);
    form.append("calorias", parseInt(calories));
    form.append("origen_receta", origin);
    form.append("tipo_comida", mealType);
    form.append("dificultad", difficulty);

    const newIngredients = ingredients;

    for (var i = 0; i < newIngredients.length; i++) {
      form.append("ingredientes_post", newIngredients[i].id);
    }
    form.append("categorias_post", parseInt(category));
    form.append("usuario_id", userId);
    form.append("tiempo_preparacion", prepTime);

    const localUri = image;
    const filename = localUri.split("/").pop();
    const match = /\.(\w+)$/.exec(filename);
    const fileType = match ? `image/${match[1]}` : `image`;

    form.append("imagenes_subidas", {
      uri: localUri,
      name: filename,
      type: fileType,
    });

    try {
      const response = await fetch(
        "https://cookit-j5x3.onrender.com/recetas/",
        {
          method: "POST",
          body: form,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "JWT " + userToken,
          },
        }
      );

      if (response.status === 201) {
        setModalData({ content: "Receta subida con exito", title: "Exito" });
        setIsModalOpen(true);
      }
    } catch (error) {
      Alert.alert("Error", "Hubo un error al enviar la receta.");
    }
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        handleChange("image", result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert(
        "Error",
        "Hubo un error al seleccionar la imagen. Por favor, inténtalo de nuevo."
      );
    }
  };

  const handleAddRecipe = () => {
    const {
      recipeName,
      ingredients,
      instructions,
      calories,
      prepTime,
      origin,
      difficulty,
      category,
      image,
    } = formData;

    if (
      !recipeName ||
      ingredients.length === 0 ||
      !instructions ||
      !calories ||
      !prepTime ||
      !origin ||
      !difficulty ||
      !category ||
      !image
    ) {
      setModalData({ content: "Completa todos los datos", title: "Error" });
      setIsModalOpen(true);
      return;
    } else {
      handleSubmit();
    }
  };

  const getData = async () => {
    try {
      const token = await AsyncStorage.getItem("accessToken");

      if (token) {
        setUserData((prevData) => ({ ...prevData, userToken: token }));

        const userResponse = await fetch(
          "https://cookit-j5x3.onrender.com/auth/users/me/",
          {
            headers: {
              Authorization: "JWT " + token,
            },
          }
        );
        const userData = await userResponse.json();

        const ingredientsResponse = await fetch(
          "https://cookit-j5x3.onrender.com/ingrediente/"
        );
        const ingredientsData = await ingredientsResponse.json();

        setIngredientList(ingredientsData);
        setUserData((prevData) => ({ ...prevData, userId: userData.id }));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [])
  );

  const handleIngredientChange = (itemValue) => {
    const selectedIngredient = ingredientList.find(
      (ingredient) => ingredient.id === itemValue
    );
    setFormData((prevData) => ({
      ...prevData,
      ingredients: [...prevData.ingredients, selectedIngredient],
    }));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {userData.userToken ? (
        <View>
          <ModalMessage
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            title={modalData.title}
          >
            {modalData.content}
          </ModalMessage>
          <Text style={styles.title}>Añadir Receta</Text>
          {formData.image && (
            <Image source={{ uri: formData.image }} style={styles.image} />
          )}
          <TouchableOpacity style={styles.pickImageButton} onPress={pickImage}>
            <Text style={styles.pickImageText}>Seleccionar Imagen</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Nombre de la receta"
            value={formData.recipeName}
            onChangeText={(value) => handleChange("recipeName", value)}
          />
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue=""
              onValueChange={handleIngredientChange}
              style={styles.picker}
            >
              <Picker.Item label="Selecciona un ingrediente" value="" />
              {ingredientList.map((ingredient) => (
                <Picker.Item
                  key={ingredient.id}
                  label={ingredient.nombre_ingrediente}
                  value={ingredient.id}
                />
              ))}
            </Picker>
          </View>
          {formData.ingredients.length > 0 && (
            <View style={styles.selectedIngredientsContainer}>
              {formData.ingredients.map((ingredient, index) => (
                <Text key={index} style={styles.selectedIngredient}>
                  {ingredient.nombre_ingrediente}
                </Text>
              ))}
            </View>
          )}
          <TextInput
            style={[styles.input, { height: 200 }]}
            placeholder="Instrucciones de preparación"
            multiline
            value={formData.instructions}
            onChangeText={(value) => handleChange("instructions", value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Calorías"
            value={formData.calories}
            onChangeText={(value) => handleChange("calories", value)}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Tiempo de preparación"
            value={formData.prepTime}
            onChangeText={(value) => handleChange("prepTime", value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Origen del platillo"
            value={formData.origin}
            onChangeText={(value) => handleChange("origin", value)}
          />
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={formData.mealType}
              onValueChange={(value) => handleChange("mealType", value)}
              style={styles.picker}
            >
              <Picker.Item label="Desayuno" value="Desayuno" />
              <Picker.Item label="Comida" value="Comida" />
              <Picker.Item label="Cena" value="Cena" />
              <Picker.Item label="Merienda" value="Merienda" />
              <Picker.Item label="Postre" value="Postre" />
              <Picker.Item label="Entrada" value="Entrada" />
              <Picker.Item label="Bebida" value="Bebida" />
              <Picker.Item label="Otro" value="Otro" />
            </Picker>
          </View>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={formData.difficulty}
              onValueChange={(value) => handleChange("difficulty", value)}
              style={styles.picker}
            >
              <Picker.Item label="Selecciona la dificultad" value="" />
              <Picker.Item label="Fácil" value="Fácil" />
              <Picker.Item label="Intermedia" value="Intermedia" />
              <Picker.Item label="Difícil" value="Difícil" />
            </Picker>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleAddRecipe}>
            <Text style={styles.buttonText}>Añadir Receta</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text>Tienes que iniciar sesion</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: Colors.PRIMARY,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: Colors.SECONDARY,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: Colors.WHITE,
    fontSize: 18,
    fontWeight: "bold",
  },
  pickImageButton: {
    backgroundColor: Colors.SECONDARY,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  pickImageText: {
    color: Colors.WHITE,
    fontSize: 18,
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
  },
  pickerContainer: {
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: "100%",
  },
  selectedIngredientsContainer: {
    marginBottom: 20,
  },
  selectedIngredient: {
    fontSize: 16,
    padding: 5,
    backgroundColor: Colors.SECONDARY,
    borderRadius: 5,
    color: Colors.WHITE,
    marginBottom: 5,
  },
});
