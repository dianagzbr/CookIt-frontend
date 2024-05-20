import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity, Text, ActivityIndicator } from "react-native";
import Colors from "../Utils/Colors";

const CategoriesFilter = ({ onCategorySelect }) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        const getCategories = async () => {
            try {
                const response = await fetch('https://cookit-j5x3.onrender.com/categorias/');
                const result = await response.json();

                if (response.ok) {
                    console.log('Datos de categorías recibidos:', result);
                    setCategories(result);
                } else {
                    console.error('Error fetching categories:', result);
                }
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };

        getCategories();
    }, []);

    const handleCategoryPress = (categoryId) => {
        const newSelectedCategory = categoryId === selectedCategory ? null : categoryId;
        setSelectedCategory(newSelectedCategory);
        onCategorySelect(newSelectedCategory);
    };

    if (loading) {
        return <ActivityIndicator size="large" color={Colors.PRIMARY} />;
    }

    return (
        <View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {categories.map((category) => (
                    <TouchableOpacity
                        key={category.id}
                        onPress={() => handleCategoryPress(category.id)}
                        style={{
                            backgroundColor: selectedCategory === category.id ? Colors.SECONDARY : Colors.LIGHT,
                            marginRight: 27,
                            borderRadius: 25,
                            paddingHorizontal: 16,
                            paddingVertical: 16,
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: 0.1,
                            shadowRadius: 7,
                            marginVertical: 15,
                            elevation: 5
                        }}
                    >
                        <Text
                            style={{
                                color: selectedCategory === category.id ? Colors.WHITE : Colors.BLACK,
                                fontSize: 18,
                                fontWeight: selectedCategory === category.id ? 'bold' : 'normal'
                            }}
                        >
                            {category.nombre}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

export default CategoriesFilter;
