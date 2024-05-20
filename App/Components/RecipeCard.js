import { FlatList, StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../Utils/Colors";
import { useNavigation } from "@react-navigation/native";

const RecipeCard = ({ recipes }) => {
    const navigation = useNavigation();
    
    return (
        <View>
            <FlatList 
                data={recipes} 
                renderItem={({ item }) => (
                    <Pressable 
                        onPress={() => navigation.navigate("recipe", { item: item })}
                        style={styles.card}
                    >
                        <Image 
                            source={{ uri: item.imagenes[1].imagen }} 
                            style={styles.imageHS}
                        />
                        <Text style={{ fontWeight: 'bold', marginTop: 2 }}>
                            {item.nombre_receta}
                        </Text>
                        <View style={{ flexDirection: "row", marginTop: 5 }}>
                            <Text>{item.calorias} cal</Text>
                            <Text> | </Text>
                            <View style={{ flexDirection: "row", paddingHorizontal: 2 }}>
                                <Text>{item.tiempo_preparacion} | {item.calificacion}</Text>
                                <View style={{ flexDirection: "row", marginHorizontal: 2, marginTop: 3.7 }}>
                                    <FontAwesome name="star" size={13} color={Colors.YELLOW} />
                                </View>
                            </View>
                        </View>
                    </Pressable>
                )}
                numColumns={2}
                columnWrapperStyle={{
                    justifyContent: 'space-around'
                }}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

export default RecipeCard;

const styles = StyleSheet.create({
    imageHS: {
        width: 150, 
        height: 150, 
        borderRadius: 30,
    },
    card: {
        backgroundColor: Colors.LIGHT,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 7,
        borderRadius: 16,
        elevation: 5,
        marginVertical: 16,
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 26,
        justifyContent: 'center',
    }
});

