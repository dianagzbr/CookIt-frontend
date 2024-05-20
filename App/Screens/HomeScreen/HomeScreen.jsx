import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, View, Text, Image } from "react-native";
import ScrollableHeader from 'react-native-scrollable-header';
import Header from "../../Components/Header";
import SearchFilter from "../../Components/SearchFilter";
import CategoriesFilter from "../../Components/CategoriesFilter";
import Colors from "../../Utils/Colors";
import RecipeCard from "../../Components/RecipeCard";
import { ActivityIndicator } from "react-native-paper";

const HomeScreen = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState("");
    const [showFilters, setShowFilters] = useState(false);
    const [filterValues, setFilterValues] = useState({
        time: '',
        origin: ''
    });

    useEffect(() => {
        const fetchRecipes = async () => {
            setLoading(true);
            try {
                const url = 'https://cookit-j5x3.onrender.com/recetas/';
                const response = await fetch(url);
                const result = await response.json();

                if (response.ok) {
                    console.log('Datos recibidos: ', result);
                    setRecipes(result);
                } else {
                    console.error('Error fetching recipes: ', result);
                }
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchRecipes();
    }, []);

    const filteredRecipes = recipes.filter(recipe => {
        const matchesCategory = selectedCategory ? recipe.categorias.some(categoria => categoria.id === selectedCategory) : true;
        const matchesSearchText = recipe.nombre_receta.toLowerCase().includes(searchText.toLowerCase());
        return matchesCategory && matchesSearchText;
    });

    return (
        <SafeAreaView style={{ flex: 1, padding: 15, backgroundColor: Colors.PRIMARY }}>
            <Header headerText={"CookIt!"} headerIcon={"bell-o"} />
            <SearchFilter icon="search" placeholder={"Buscar receta"} filterIcon={"list-ul"} onSearch={setSearchText} />
            <Image source={require('./../../../assets/Lasaña1.jpg')} style={styles.homeImage} />

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
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    homeImage: {
        width: 379,
        height: 143,
        borderRadius: 30
    },
});