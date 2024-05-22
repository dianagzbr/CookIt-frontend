import React, { useState, useEffect } from "react";
import {
  View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, TextInput
} from "react-native";
import { Picker } from "@react-native-picker/picker"; // Cambiar la importación del Picker
import Colors from "../../Utils/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ShoppingList = () => {
  const [shoppingList, setShoppingList] = useState([]);
  const [userToken, setUserToken] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");

  const toggleBought = (ingredientName) => {
    setShoppingList((prevShoppingList) =>
      prevShoppingList.map((ingredient) => {
        if (ingredient.nombre_ingrediente === ingredientName) {
          return { ...ingredient, bought: !ingredient.bought };
        }
        return ingredient;
      })
    );
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
      await response.json();
    }
  };

  const getIngredients = async () => {
    if (userToken) {
      const url = "https://cookit-j5x3.onrender.com/ingrediente/";
      const response = await fetch(url, {
        headers: {
          Authorization: "JWT " + userToken,
        },
      });
      const data = await response.json();
      setIngredients(data);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    if (userToken) {
      getIngredients();
    }
  }, [userToken]);

  const handleAddIngredient = () => {
    if (selectedIngredient && quantity && unit) {
      const ingredient = ingredients.find((ing) => ing.id === selectedIngredient);
      setShoppingList((prevShoppingList) => [
        ...prevShoppingList,
        { nombre_ingrediente: ingredient.nombre_ingrediente, quantity, unit, bought: false }
      ]);
      setSelectedIngredient("");
      setQuantity("");
      setUnit("");
    } else {
      Alert.alert("Error", "Por favor, completa todos los campos.");
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.listItem} onPress={() => toggleBought(item.nombre_ingrediente)}>
      <View style={styles.itemContent}>
        <Text style={styles.itemName}>{item.nombre_ingrediente}</Text>
        <Text style={styles.itemQuantity}>
          {item.quantity} {item.unit}
        </Text>
        <TouchableOpacity
          onPress={() => toggleBought(item.nombre_ingrediente)}
          style={[
            styles.toggleButton,
            { backgroundColor: item.bought ? Colors.GREEN : Colors.SECONDARY },
          ]}
        >
          <Text style={styles.toggleButtonText}>
            {item.bought ? "Comprado" : "Marcar como comprado"}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {userToken ? (
        <React.Fragment>
          <Text style={styles.title}>Lista de compras</Text>
          <FlatList
            data={shoppingList}
            renderItem={renderItem}
            keyExtractor={(item) => item.nombre_ingrediente}
            style={styles.list}
            showsVerticalScrollIndicator={false}
          />
          <View style={styles.addIngredientContainer}>
            <Picker
              selectedValue={selectedIngredient}
              style={styles.picker}
              onValueChange={(itemValue) => setSelectedIngredient(itemValue)}
            >
              <Picker.Item label="Selecciona un ingrediente" value="" />
              {ingredients.map((ingredient) => (
                <Picker.Item key={ingredient.id} label={ingredient.nombre_ingrediente} value={ingredient.id} />
              ))}
            </Picker>
            <TextInput
              style={styles.input}
              placeholder="Cantidad"
              value={quantity}
              onChangeText={(text) => setQuantity(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Unidad"
              value={unit}
              onChangeText={(text) => setUnit(text)}
            />
            <TouchableOpacity style={styles.addButton} onPress={handleAddIngredient}>
              <Text style={styles.addButtonText}>Agregar</Text>
            </TouchableOpacity>
          </View>
        </React.Fragment>
      ) : (
        <Text>Necesitas iniciar sesión</Text>
      )}
    </View>
  );
};

export default ShoppingList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PRIMARY,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.BLACK,
    marginBottom: 20,
  },
  list: {
    flex: 1,
  },
  listItem: {
    backgroundColor: Colors.WHITE,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  itemContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.BLACK,
  },
  itemQuantity: {
    fontSize: 16,
    color: Colors.GREY,
  },
  toggleButton: {
    padding: 5,
    borderRadius: 5,
  },
  toggleButtonText: {
    color: Colors.WHITE,
    fontSize: 14,
  },
  addIngredientContainer: {
    marginTop: 20,
  },
  picker: {
    height: 50,
    width: "100%",
    marginBottom: 10,
    backgroundColor: Colors.LIGHT
  },
  input: {
    padding: 10,
    borderColor: Colors.WHITE,
    borderWidth: 1,
    borderRadius: 15,
    marginBottom: 10,
    backgroundColor: Colors.WHITE,
  },
  addButton: {
    backgroundColor: Colors.SECONDARY,
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
  },
  addButtonText: {
    color: Colors.WHITE,
    fontWeight: "bold",
  },
});
