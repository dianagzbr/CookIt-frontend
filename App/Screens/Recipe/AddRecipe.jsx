import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Colors from "../../Utils/Colors";
import { Picker } from "@react-native-picker/picker";

export default function AddRecipeScreen() {
    const [recipeName, setRecipeName] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [instructions, setInstructions] = useState("");
    const [image, setImage] = useState(null);
    const [calories, setCalories] = useState("");
    const [prepTime, setPrepTime] = useState("");
    const [origin, setOrigin] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [category, setCategory] = useState("");

    const handleAddRecipe = () => {
        // Validación para asegurarse de que ningún campo esté vacío
        if (
            !recipeName ||
            !ingredients ||
            !instructions ||
            !calories ||
            !prepTime ||
            !origin ||
            !difficulty ||
            !category ||
            !image
        ) {
            Alert.alert("Error", "Por favor completa todos los campos.");
            return;
        }

        // Aquí puedes agregar la lógica para guardar la receta en tu base de datos o realizar cualquier acción necesaria
        setRecipeName("");
        setIngredients("");
        setInstructions("");
        setImage(null);
        setCalories("");
        setPrepTime("");
        setOrigin("");
        setDifficulty("");
        setCategory("");

        console.log("Receta añadida:", { recipeName, ingredients, instructions, image });
        Alert.alert("Receta añadida", 'Se ha añadido la receta con éxito');
    };

    const pickImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            console.log("Resultado de la selección de imagen:", result);

            if (!result.canceled) {
                console.log("URI de la imagen seleccionada:", result.uri);
                setImage(result.assets[0].uri);
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
            <TextInput
                style={styles.input}
                placeholder="Calorías"
                value={calories}
                onChangeText={setCalories}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Tiempo de preparación"
                value={prepTime}
                onChangeText={setPrepTime}
            />
            <TextInput
                style={styles.input}
                placeholder="Origen del platillo"
                value={origin}
                onChangeText={setOrigin}
            />
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={difficulty}
                    onValueChange={(itemValue) => setDifficulty(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Selecciona la dificultad" value="" />
                    <Picker.Item label="Fácil" value="Fácil" />
                    <Picker.Item label="Intermedia" value="Intermedia" />
                    <Picker.Item label="Difícil" value="Difícil" />
                </Picker>
            </View>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={category}
                    onValueChange={(itemValue) => setCategory(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Selecciona una categoría" value="" />
                    <Picker.Item label="categoria 1" value="categoria 1" />
                    <Picker.Item label="categoria 2" value="categoria 2" />
                    <Picker.Item label="categoria 3" value="categoria 3" />
                    {/*<Picker.Item label="Desayuno" value="Desayuno" />
                    <Picker.Item label="Comida" value="Comida" />
                    <Picker.Item label="Cena" value="Cena" />
                    <Picker.Item label="Merienda" value="Merienda" />
                    <Picker.Item label="Postre" value="Postre" />
                    <Picker.Item label="Entrada" value="Entrada" />
                    <Picker.Item label="Bebida" value="Bebida" />
                    <Picker.Item label="Otro" value="Otro" />*/}
                </Picker>
            </View>
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
    pickerContainer: {
        backgroundColor: Colors.WHITE,
        borderRadius: 10,
        marginBottom: 20,
    },
    picker: {
        height: 50,
        width: '100%',
    }
});
