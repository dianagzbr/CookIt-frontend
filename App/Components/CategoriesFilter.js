import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import React from "react";
import { categories } from "../Utils/Constants";
import Colors from "../Utils/Colors";

const CategoriesFilter = ({ selectedCategory, onSelectCategory }) => {
    const handleCategoryPress = (category) => {
        if (selectedCategory === category) {
            onSelectCategory(null); // Deselect if already selected
        } else {
            onSelectCategory(category); // Select new category
        }
    };

    return (
        <View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <Pressable 
                    onPress={() => handleCategoryPress(null)} 
                    style={{ 
                        ...styles.categoryButton, 
                        backgroundColor: selectedCategory === null ? Colors.SECONDARY : Colors.PRIMARY 
                    }}
                >
                    <Text style={{ 
                        color: selectedCategory === null ? Colors.WHITE : Colors.BLACK, 
                        fontSize: 18, 
                        fontWeight: 'bold' 
                    }}>
                        Todos
                    </Text>
                </Pressable>
                {categories.map((category, index) => (
                    <Pressable 
                        key={index} 
                        onPress={() => handleCategoryPress(category.category)}
                        style={{ 
                            ...styles.categoryButton, 
                            backgroundColor: selectedCategory === category.category ? Colors.SECONDARY : Colors.PRIMARY 
                        }}
                    >
                        <Text style={{ 
                            color: selectedCategory === category.category ? Colors.WHITE : Colors.BLACK, 
                            fontSize: 18, 
                            fontWeight: 'normal' 
                        }}>
                            {category.category}
                        </Text>
                    </Pressable>
                ))}
            </ScrollView>
        </View>
    );
};

export default CategoriesFilter;

const styles = StyleSheet.create({
    categoryButton: {
        marginRight: 27,
        borderRadius: 25,
        paddingHorizontal: 16,
        paddingVertical: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 7,
        marginVertical: 15,
    }
});
