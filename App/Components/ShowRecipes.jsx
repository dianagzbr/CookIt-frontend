import { useEffect, useState } from "react";
import { Modal, View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";

const ShowRecipes = ({ children, ...props }) => {
  const [recipes, setRecipes] = useState(null);

  const getRecipes = async () => {
    const url = "https://cookit-j5x3.onrender.com/recetas/";
    const response = await fetch(url);

    const data = await response.json()

    setRecipes(data);
  };

  useEffect(() => {
    getRecipes();
  }, []);

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
              <TouchableOpacity style={styles.button}>
                <Text>{item.nombre_receta}</Text>
              </TouchableOpacity>
            )}
            numColumns={2}
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
  },
  button: {
    backgroundColor: "#EBDCC9",
    padding: 10,
    borderRadius: 5
  }
});

export default ShowRecipes;
