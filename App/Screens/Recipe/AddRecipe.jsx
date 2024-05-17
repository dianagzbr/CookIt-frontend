import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Colors from "../../Utils/Colors";

export default function AddRecipeScreen() {
    const [recipeName, setRecipeName] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [instructions, setInstructions] = useState("");
    const [image, setImage] = useState(null);

    const handleAddRecipe = () => {
        // Aquí puedes agregar la lógica para guardar la receta en tu base de datos o realizar cualquier acción necesaria
        console.log("Receta añadida:", { recipeName, ingredients, instructions, image });
    };

    const pickImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (!result.cancelled) {
                setImage(result.uri);
            }
        } catch (error) {
            console.error("Error al seleccionar la imagen:", error);
            Alert.alert("Error", "Hubo un error al seleccionar la imagen. Por favor, inténtalo de nuevo.");
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Añadir Receta</Text>
            {image && <Image source={{ uri: image }} style={styles.image} />}
            <TouchableOpacity style={styles.pickImageButton} onPress={pickImage}>
                <Text style={styles.pickImageText}>Seleccionar Imagen</Text>
            </TouchableOpacity>
            <TextInput
                style={styles.input}
                placeholder="Nombre de la receta"
                value={recipeName}
                onChangeText={setRecipeName}
            />
            <TextInput
                style={[styles.input, { height: 100 }]}
                placeholder="Ingredientes"
                multiline
                value={ingredients}
                onChangeText={setIngredients}
            />
            <TextInput
                style={[styles.input, { height: 200 }]}
                placeholder="Instrucciones de preparación"
                multiline
                value={instructions}
                onChangeText={setInstructions}
            />
            <TouchableOpacity style={styles.button} onPress={handleAddRecipe}>
                <Text style={styles.buttonText}>Añadir Receta</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: Colors.PRIMARY,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    input: {
        backgroundColor: Colors.WHITE,
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
    },
    button: {
        backgroundColor: Colors.SECONDARY,
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
    },
    buttonText: {
        color: Colors.WHITE,
        fontSize: 18,
        fontWeight: "bold",
    },
    pickImageButton: {
        backgroundColor: Colors.SECONDARY,
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginBottom: 20,
    },
    pickImageText: {
        color: Colors.WHITE,
        fontSize: 18,
        fontWeight: "bold",
    },
    image: {
        width: "100%",
        height: 200,
        marginBottom: 20,
        borderRadius: 10,
    },
});
