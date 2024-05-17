import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../../Utils/Colors';

const ShoppingList = ({ recipes }) => {
  const [shoppingList, setShoppingList] = useState([]);

  const generateShoppingList = () => {
    const ingredientsList = {};

    recipes.forEach((recipe) => {
      recipe.ingredients.forEach((ingredient) => {
        if (ingredientsList[ingredient.name]) {
          ingredientsList[ingredient.name].quantity += ingredient.quantity;
        } else {
          ingredientsList[ingredient.name] = { ...ingredient };
        }
      });
    });

    const shoppingListArray = Object.values(ingredientsList);

    setShoppingList(shoppingListArray);
  };

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

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.listItem}>
      <View style={styles.itemContent}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemQuantity}>{item.quantity} {item.unit}</Text>
        <TouchableOpacity
          onPress={() => toggleBought(item.name)}
          style={styles.toggleButton}
        >
          <Text style={styles.toggleButtonText}>
            {item.bought ? 'Marcar como no comprado' : 'Marcar como comprado'}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de compras</Text>
      <FlatList
        data={shoppingList}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        style={styles.list}
      />
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
    fontWeight: 'bold',
    color: Colors.WHITE,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.BLACK,
  },
  itemQuantity: {
    fontSize: 16,
    color: Colors.GREY,
  },
})