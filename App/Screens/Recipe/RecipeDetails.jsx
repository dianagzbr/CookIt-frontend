import { View, Text, StyleSheet, Image, ScrollView, Alert } from "react-native";
import React, { useState } from "react";
import Colors from "../../Utils/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ModalMessage from "../../Components/ModalMessage";

const RecipeDetails = ({ route }) => {
  const navigation = useNavigation();
  const [isFavorite, setIsFavorite] = useState(false);
  const [userToken, setUserToken] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [modalData, setModalData] = useState({
    title: "",
    content: "",
  });

  // Recupera los datos de la receta pasados desde la pantalla anterior
  const { item } = route.params;

  const handleViewComments = () => {
    //Navegacion a la pantalla de comentarios y calificaciones
    navigation.navigate("comments", { recipeId: item.id });
  };

  const handleFavoritePress = async () => {
    if (!userToken) {
      setModalData({ title: "Error", content: "Tienes que iniciar sesion" });
      setIsModalOpen(true);
    } else {
      setIsFavorite(!isFavorite);
      const url = `https://cookit-j5x3.onrender.com/userscomp/${userData.id}/`;
      const action = isFavorite ? "eliminada de" : "añadida a";

      let newFavorites;

      if (isFavorite) {
        newFavorites = favorites.filter((favoriteId) => favoriteId !== item.id);
      } else {
        newFavorites = [...favorites, item.id];
      }

      const body = {
        recetas_favoritas: newFavorites,
      };

      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "JTW " + userToken
        },
        body: JSON.stringify(body)
      })

      if (response.status === 200) {
        setModalData({ title: "Exito", content: action + " favoritos" })
      } else {
        setModalData({title: "Error", content: "Hhubo un error, intente mas tarde" })
      }

      setIsModalOpen(true)
      setFavorites(newFavorites)
    }
  };

  const getUserData = async () => {
    const token = await AsyncStorage.getItem("accessToken");

    if (token) {
      setUserToken(token);

      const url = "https://cookit-j5x3.onrender.com/auth/users/me/";
      const response = await fetch(url, {
        headers: {
          Authorization: "JWT " + token,
        },
      });
      const data = await response.json();
      setUserData(data.info);

      if (data.info.recetas_favoritas) {
        const fav = [];
        data.info.recetas_favoritas.map((recipe) => {
          fav.push(recipe.id);
        });

        if (fav.includes(item.id)) {
          setIsFavorite(true);
        }

        setFavorites(fav);
      }
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <ScrollView style={{ backgroundColor: Colors.PRIMARY }}>
      <View>
        <ModalMessage
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          title={modalData.title}
        >
          {modalData.content}
        </ModalMessage>
        {/* Muestra la imagen de la receta */}
        <Image
          source={{ uri: item.imagenes[0].imagen }} // Suponemos que solo mostramos la primera imagen
          style={styles.image}
        />
        <View style={styles.favoriteIcon}>
          <TouchableOpacity onPress={handleFavoritePress}>
            <FontAwesome
              name={isFavorite ? "heart" : "heart-o"}
              size={24}
              color={Colors.RED}
            />
          </TouchableOpacity>
        </View>
        {/* Contenedor transparente para el nombre de la receta */}
        <View style={styles.overlay}>
          <Text style={styles.name}>{item.nombre_receta}</Text>
          <View style={{ flexDirection: "row", marginLeft: "auto" }}>
            <Text
              style={{
                color: Colors.WHITE,
                fontSize: 23,
                paddingHorizontal: 5,
              }}
            >
              {item.calificacion}
            </Text>
            <TouchableOpacity onPress={handleViewComments}>
              <FontAwesome name="star" size={30} color={Colors.YELLOW} />
            </TouchableOpacity>
          </View>
        </View>
        <Text
          style={{ color: Colors.GREY, paddingHorizontal: 10, fontSize: 18 }}
        >
          {item.origen_receta}
        </Text>

        <View
          style={{
            paddingHorizontal: 10,
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <View style={styles.info}>
            {/* Icono de calorías */}
            <FontAwesome
              name="fire"
              style={{ margin: 10 }}
              size={25}
              color={Colors.BLACK}
            />
            <Text style={styles.text}>{`${item.calorias} cal`}</Text>
          </View>

          <View style={styles.info}>
            {/* Icono de tiempo */}
            <FontAwesome
              name="clock-o"
              style={{ margin: 10 }}
              size={25}
              color={Colors.BLACK}
            />
            <Text style={styles.text}>{`${item.tiempo_preparacion}`}</Text>
          </View>

          <View style={styles.info}>
            {/* Icono de dificultad */}
            <FontAwesome
              name="check-circle-o"
              style={{ margin: 10 }}
              size={25}
              color={Colors.BLACK}
            />
            <Text style={styles.text}>{`${item.dificultad}`}</Text>
          </View>
        </View>

        <View style={{ paddingHorizontal: 10 }}>
          {/* Muestra los pasos de preparación */}
          <Text style={styles.sectionTitle}>Ingredientes</Text>
          {item.ingredientes.map((ingrediente, index) => (
            <Text key={index} style={styles.ingredientItem}>
              {ingrediente.nombre_ingrediente}
            </Text>
          ))}
          <Text style={styles.sectionTitle}>Pasos de preparación</Text>
          <Text style={styles.stepItem}>{item.pasos}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 250,
    marginBottom: 20,
    resizeMode: "cover",
  },
  overlay: {
    position: "absolute",
    marginTop: 200,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo transparente
    paddingHorizontal: 10,
    paddingVertical: 9,
    width: "100%", // Para que ocupe todo el ancho de la imagen
    justifyContent: "flex-start", // Para alinear el texto a la derecha
    flexDirection: "row",
  },
  info: {
    margin: 15,
    backgroundColor: Colors.SECONDARY,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    color: Colors.WHITE,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.WHITE,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  ingredients: {
    margin: 10,
    padding: 8,
    backgroundColor: Colors.LIGHT,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 7,
    borderRadius: 16,
    elevation: 5,
  },
  steps: {
    margin: 10,
    backgroundColor: Colors.LIGHT,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 7,
    borderRadius: 16,
    elevation: 5,
    fontSize: 16,
    padding: 8,
  },
  favoriteIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});

export default RecipeDetails;
