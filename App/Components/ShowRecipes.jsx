import { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";

const ShowRecipes = ({ ...props }) => {
  const [recipes, setRecipes] = useState(null);

  const getRecipes = async () => {
    const url = "https://cookit-j5x3.onrender.com/recetas/";
    const response = await fetch(url);

    const data = await response.json();

    setRecipes(data);
  };

  useEffect(() => {
    getRecipes();
  }, []);

  const dataRecipes = (id, name) => {
    props.setIsModalOpen(false);
    props.dataRecipes(id, name);
  };

  return (
    <Modal visible={props.isModalOpen} transparent={true} animationType="slide">
      <View style={styles.container}>
        <Text style={styles.title}>Selecciona una receta</Text>
        {recipes === null ? (
          <Text>Cargando...</Text>
        ) : (
          <FlatList
            data={recipes}
            renderItem={({ item }) => (
              <View style={styles.content}>
                <TouchableOpacity
                  onPress={() => dataRecipes(item.id, item.nombre_receta)}
                >
                  <Image
                    style={styles.image}
                    source={{ uri: item.imagenes[0].imagen }}
                  />
                  <Text style={styles.title2}>{item.nombre_receta}</Text>
                </TouchableOpacity>
              </View>
            )}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: "space-evenly" }}
          />
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F0E8DD",
    flex: 1,
    borderTopEndRadius: 50,
    borderTopStartRadius: 50,
    marginTop: 90,
    padding: 20,
  },
  title: {
    fontSize: 25,
    textAlign: "center",
    marginBottom: 15,
  },
  content: {
    backgroundColor: "#EBDCC9",
    padding: 10,
    borderRadius: 5,
    width: 150,
    marginVertical: 10,
  },
  image: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
    borderRadius: 5,
  },
  title2: {
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 15,
  },
});

export default ShowRecipes;
