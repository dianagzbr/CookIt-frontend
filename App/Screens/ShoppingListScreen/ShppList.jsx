import React, { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Colors from "../../Utils/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Select from "react-native-picker-select"

const ShoppingList = () => {
  const [shoppingList, setShoppingList] = useState([
    { name: "Leche", quantity: 1, unit: "litro", bought: false },
    { name: "Huevos", quantity: 6, unit: "unidades", bought: false },
    { name: "Pan", quantity: 1, unit: "barra", bought: false },
    { name: "Manzanas", quantity: 3, unit: "unidades", bought: false },
    { name: "Arroz", quantity: 500, unit: "gramos", bought: false },
    { name: "Pollo", quantity: 800, unit: "gramos", bought: false },
  ]);
  const [userToken, setUserToken] = useState(null);
  const [userData, setUserData] = useState({});

  const toggleBought = (ingredientName) => {
    setShoppingList((prevShoppingList) =>
      prevShoppingList.map((ingredient) => {
        if (ingredient.name === ingredientName) {
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
      const data = await response.json();

      console.log(data.info.lista_compras)
      setUserData(data.info.lista_compras);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getUserData();
    }, [])
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.listItem}>
      <View style={styles.itemContent}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemQuantity}>
          {item.quantity} {item.unit}
        </Text>
        <TouchableOpacity
          onPress={() => toggleBought(item.name)}
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
        <View>
          <Text style={styles.title}>Lista de compras</Text>
          <Select
            onValueChange={(value) => console.log(value)}
            items={[{ label: "pepe", value: 1 }]}
          />
          <FlatList
            data={shoppingList}
            renderItem={renderItem}
            keyExtractor={(item) => item.name}
            style={styles.list}
            showsVerticalScrollIndicator={false}
          />
        </View>
      ) : (
        <Text>No has iniciado sesion</Text>
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
});
