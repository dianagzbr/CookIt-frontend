import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Colors from '../../Utils/Colors';

const MyRecipesScreen = () => {
    // Aquí deberías tener un estado que contenga las recetas del usuario
    const userRecipes = [
        {
            id: 1,
            name: 'Pasta Alfredo',
            image:require('./../../../assets/Hamburguesa.jpg'), // ejemplo de importación de imagen local
            category: 'Comida',
            difficulty: 'Intermedia',
        },
        {
            id: 2,
            name: 'Ensalada César',
            image:require("./../../../assets/ensalada_cesar.jpg"), // ejemplo de imagen remota
            category: 'Entrada',
            difficulty: 'Fácil',
        },
        // Agrega más recetas según sea necesario
    ];

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {userRecipes.map((recipe) => (
                <TouchableOpacity key={recipe.id} style={styles.recipeContainer}>
                    <Image source={recipe.image} style={styles.recipeImage} />
                    <View style={styles.recipeDetails}>
                        <Text style={styles.recipeName}>{recipe.name}</Text>
                        <Text style={styles.recipeInfo}>{recipe.category} - {recipe.difficulty}</Text>
                    </View>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: Colors.PRIMARY,
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    recipeContainer: {
        flexDirection: 'row',
        backgroundColor: Colors.SECONDARY,
        borderRadius: 10,
        marginBottom: 15,
        overflow: 'hidden',
    },
    recipeImage: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
    },
    recipeDetails: {
        flex: 1,
        padding: 10,
    },
    recipeName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.WHITE,
        marginBottom: 5,
    },
    recipeInfo: {
        fontSize: 14,
        color: Colors.WHITE,
    },
});

export default MyRecipesScreen;
