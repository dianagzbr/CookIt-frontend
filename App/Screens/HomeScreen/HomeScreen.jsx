import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Image,
  Modal,
  TextInput,
  TouchableOpacity,
} from "react-native";
import ScrollableHeader from "react-native-scrollable-header";
import Header from "../../Components/Header";
import SearchFilter from "../../Components/SearchFilter";
import CategoriesFilter from "../../Components/CategoriesFilter";
import Colors from "../../Utils/Colors";
import RecipeCard from "../../Components/RecipeCard";
import { ActivityIndicator } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";

const HomeScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filterValues, setFilterValues] = useState({
    time: "",
    origin: "",
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const url = "https://cookit-j5x3.onrender.com/recetas/";
        const response = await fetch(url);
        const result = await response.json();

        if (response.ok) {
          console.log("Datos recibidos: ", result);
          setRecipes(result);
        } else {
          console.error("Error fetching recipes: ", result);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }

      if (await AsyncStorage.getItem("accessToken")) {
        setIsAuthenticated(true);
      }
    };
    fetchRecipes();
  }, []);

  const logout = async () => {
    await AsyncStorage.clear();

    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "login" }],
      })
    );
  };

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesCategory = selectedCategory
      ? recipe.categorias.some((categoria) => categoria.id === selectedCategory)
      : true;
    const matchesSearchText = recipe.nombre_receta
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const matchesTime = filterValues.time
      ? recipe.tiempo_preparacion === filterValues.time
      : true;
    const matchesOrigin = filterValues.origin
      ? recipe.origen_receta.toLowerCase() === filterValues.origin.toLowerCase()
      : true;
    return matchesCategory && matchesSearchText && matchesTime && matchesOrigin;
  });

  const handleFilterPress = () => {
    setShowFilters(true);
  };

  const applyFilters = () => {
    setShowFilters(false);
  };

  return (
    <SafeAreaView
      style={{ flex: 1, padding: 15, backgroundColor: Colors.PRIMARY }}
    >
      <Header headerText={"CookIt!"} headerIcon={"bell-o"} />
      {isAuthenticated && (
        <TouchableOpacity onPress={logout}>
          <Text>Cerrar sesion</Text>
        </TouchableOpacity>
      )}
      <SearchFilter
        icon="search"
        placeholder={"Buscar receta"}
        filterIcon={"list-ul"}
        onSearch={setSearchText}
        onFilterPress={handleFilterPress}
      />
      <Image
        source={require("./../../../assets/Lasaña1.jpg")}
        style={styles.homeImage}
      />

      <View>
        <CategoriesFilter onCategorySelect={setSelectedCategory} />
      </View>
      <View style={{ marginTop: 15, flex: 1 }}>
        {loading ? (
          <ActivityIndicator size={"large"} color={Colors.PRIMARY} />
        ) : (
          <RecipeCard recipes={filteredRecipes} />
        )}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showFilters}
        onRequestClose={() => setShowFilters(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filtros de Búsqueda</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Tiempo (minutos)"
              onChangeText={(value) =>
                setFilterValues((prevState) => ({ ...prevState, time: value }))
              }
              value={filterValues.time}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Origen de la Receta (país)"
              onChangeText={(value) =>
                setFilterValues((prevState) => ({
                  ...prevState,
                  origin: value,
                }))
              }
              value={filterValues.origin}
            />
            <TouchableOpacity style={styles.button} onPress={applyFilters}>
              <Text style={styles.buttonText}>Aplicar filtros</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  homeImage: {
    width: "100%",
    height: 143,
    borderRadius: 30,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: Colors.WHITE,
    borderRadius: 20,
    padding: 20,
    width: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: Colors.GREY,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: Colors.SECONDARY,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: Colors.WHITE,
    fontSize: 15,
    fontWeight: "bold",
  },
});
