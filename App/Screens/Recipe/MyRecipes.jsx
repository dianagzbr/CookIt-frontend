import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, RefreshControl, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../../Utils/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';

const MyRecipesScreen = ({ navigation }) => {
    const [userRecipes, setUserRecipes] = useState([]);
    const [token, setToken] = useState("");
    const [userData, setUserData] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

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

    const onRefresh = async () => {
        setRefreshing(true);
        try {
            const response = await fetch('https://cookit-j5x3.onrender.com/recetas/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Fetched recipes on refresh:", data);
                const filteredRecipes = data.filter(recipe => recipe.usuario.id === userData.id);
                console.log("Filtered recipes on refresh:", filteredRecipes);
                setUserRecipes(filteredRecipes);
            } else {
                console.error('Error fetching recipes on refresh:', response.statusText);
            }
        } catch (error) {
            console.error("Error fetching user recipes on refresh:", error);
        } finally {
            setRefreshing(false);
        }
    };

    const handleDelete = async (recipeId) => {
        Alert.alert(
            'Eliminar receta',
            '¿Estás seguro de que quieres eliminar esta receta?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Eliminar',
                    onPress: async () => {
                        try {
                            const response = await fetch(`https://cookit-j5x3.onrender.com/recetas/${recipeId}/`, {
                                method: 'DELETE',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': 'JWT ' + token,
                                },
                            });

                            if (response.ok) {
                                setUserRecipes(userRecipes.filter(recipe => recipe.id !== recipeId));
                                Alert.alert('¡Éxito!', 'Receta eliminada correctamente.');
                            } else {
                                Alert.alert('Error', 'Hubo un error al eliminar la receta.');
                            }
                        } catch (error) {
                            console.error("Error deleting recipe:", error);
                            Alert.alert('Error', 'Hubo un error al eliminar la receta.');
                        }
                    },
                },
            ],
            { cancelable: false }
        );
    };

    return (
        <ScrollView
            contentContainerStyle={styles.container}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            {userRecipes.map((recipe) => (
                <View key={recipe.id} style={styles.recipeContainer}>
                    <TouchableOpacity 
                        style={styles.recipeInfo}
                        onPress={() => navigation.navigate('recipe', { item: recipe })}
                    >
                        {recipe.imagenes.length > 0 && (
                            <Image source={{ uri: recipe.imagenes[0].imagen }} style={styles.recipeImage} />
                        )}
                        <View style={styles.recipeDetails}>
                            <Text style={styles.recipeName}>{recipe.nombre_receta}</Text>
                            <Text style={styles.recipeInfoText}>{recipe.tipo_comida} - {recipe.dificultad}</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.iconContainer}>
                        <TouchableOpacity onPress={() => navigation.navigate('editRecipe', { item: recipe })}>
                            <Icon name="edit" size={24} color={Colors.WHITE} style={styles.icon} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleDelete(recipe.id)}>
                            <Icon name="trash" size={24} color={Colors.WHITE} style={styles.icon} />
                        </TouchableOpacity>
                    </View>
                </View>
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
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    recipeInfo: {
        flexDirection: 'row',
        flex: 1,
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
    recipeInfoText: {
        fontSize: 14,
        color: Colors.WHITE,
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    icon: {
        marginHorizontal: 10,
    },
});

export default MyRecipesScreen;
