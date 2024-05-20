import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import React from "react";
import Colors from "../Utils/Colors";
import { recipeData } from "../Utils/Constants";

const OriginFilter = ({ selectedOrigin, onSelectOrigin }) => {
    const handleOriginPress = (origin) => {
        if (selectedOrigin === origin) {
            onSelectOrigin(null); // Deselect if already selected
        } else {
            onSelectOrigin(origin); // Select new origin
        }
    };

    const origins = Array.from(new Set(recipeData.map(recipe => recipe.origen_receta)));

    return (
        <View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <Pressable 
                    onPress={() => handleOriginPress(null)} 
                    style={{ 
                        ...styles.originButton, 
                        backgroundColor: selectedOrigin === null ? Colors.SECONDARY : Colors.PRIMARY 
                    }}
                >
                    <Text style={{ 
                        color: selectedOrigin === null ? Colors.WHITE : Colors.BLACK, 
                        fontSize: 18, 
                        fontWeight: 'bold' 
                    }}>
                        Todos
                    </Text>
                </Pressable>
                {origins.map((origin, index) => (
                    <Pressable 
                        key={index} 
                        onPress={() => handleOriginPress(origin)}
                        style={{ 
                            ...styles.originButton, 
                            backgroundColor: selectedOrigin === origin ? Colors.SECONDARY : Colors.PRIMARY 
                        }}
                    >
                        <Text style={{ 
                            color: selectedOrigin === origin ? Colors.WHITE : Colors.BLACK, 
                            fontSize: 18, 
                            fontWeight: 'normal' 
                        }}>
                            {origin}
                        </Text>
                    </Pressable>
                ))}
            </ScrollView>
        </View>
    );
};

export default OriginFilter;

const styles = StyleSheet.create({
    originButton: {
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
