import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../../Utils/Colors';

const MyRecipesScreen = ({ navigation }) => {
    const [userRecipes, setUserRecipes] = useState([]);
    const [token, setToken] = useState("");
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const getUserToken = async () => {
            try {
                const userToken = await AsyncStorage.getItem("accessToken");
                if (userToken) {
                    const url = "https://cookit-j5x3.onrender.com/auth/users/me/";
                    const response = await fetch(url, {
                        headers: {
                            Authorization: "JWT " + userToken,
                        },
                    });

                    if (response.ok) {
                        const data = await response.json();
                        console.log("Fetched user data:", data);
                        setUserData(data);
                        setToken(userToken);
                    } else {
                        console.error('Error fetching user data:', response.statusText);
                    }
                } else {
                    console.error('No user token found in AsyncStorage');
                }
            } catch (error) {
                console.error("Error fetching user token:", error);
            }
        };

        getUserToken();
    }, []);

    useEffect(() => {
        const fetchUserRecipes = async () => {
            if (userData) {
                try {
                    const response = await fetch('https://cookit-j5x3.onrender.com/recetas/', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    if (response.ok) {
                        const data = await response.json();
                        console.log("Fetched recipes:", data);
                        const filteredRecipes = data.filter(recipe => recipe.usuario.id === userData.id);
                        console.log("Filtered recipes:", filteredRecipes);
                        setUserRecipes(filteredRecipes);
                    } else {
                        console.error('Error fetching recipes:', response.statusText);
                    }
                } catch (error) {
                    console.error("Error fetching user recipes:", error);
                }
            }
        };

        fetchUserRecipes();
    }, [userData]);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {userRecipes.map((recipe) => (
                <TouchableOpacity 
                    key={recipe.id} 
                    style={styles.recipeContainer}
                    onPress={() => navigation.navigate('recipe', { item:recipe })}
                >
                    {recipe.imagenes.length > 0 && (
                        <Image source={{ uri: recipe.imagenes[0].imagen }} style={styles.recipeImage} />
                    )}
                    <View style={styles.recipeDetails}>
                        <Text style={styles.recipeName}>{recipe.nombre_receta}</Text>
                        <Text style={styles.recipeInfo}>{recipe.tipo_comida} - {recipe.dificultad}</Text>
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
