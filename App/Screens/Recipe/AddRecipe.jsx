import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Colors from "../../Utils/Colors";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AddRecipeScreen() {
    const [nombreReceta, setNombreReceta] = useState("");
    const [ingredientes, setIngredientes] = useState("");
    const [instrucciones, setInstrucciones] = useState("");
    const [imagen, setImagen] = useState(null);
    const [calorias, setCalorias] = useState("");
    const [tiempoPreparacion, setTiempoPreparacion] = useState("");
    const [origen, setOrigen] = useState("");
    const [dificultad, setDificultad] = useState("");
    const [categoria, setCategoria] = useState("");

    const handleAddRecipe = async () => {
        // Validación para asegurarse de que ningún campo esté vacío
        if (!nombreReceta) {
            Alert.alert("Error", "Por favor, completa el nombre de la receta.");
            return;
        }
        if (!ingredientes) {
            Alert.alert("Error", "Por favor, completa los ingredientes.");
            return;
        }
        if (!instrucciones) {
            Alert.alert("Error", "Por favor, completa las instrucciones.");
            return;
        }
        if (!calorias) {
            Alert.alert("Error", "Por favor, completa las calorías.");
            return;
        }
        if (!tiempoPreparacion) {
            Alert.alert("Error", "Por favor, completa el tiempo de preparación.");
            return;
        }
        if (!origen) {
            Alert.alert("Error", "Por favor, completa el origen del platillo.");
            return;
        }
        if (!dificultad) {
            Alert.alert("Error", "Por favor, selecciona la dificultad.");
            return;
        }
        if (!categoria) {
            Alert.alert("Error", "Por favor, selecciona una categoría.");
            return;
        }
        if (!imagen) {
            Alert.alert("Error", "Por favor, selecciona una imagen.");
            return;
        }

        // Obtener el token del usuario
        const token = await AsyncStorage.getItem("accessToken");
        if (!token) {
            Alert.alert("Error", "No se ha encontrado el token de usuario. Por favor, inicia sesión.");
            return;
        }

        // Preparar los datos de la receta en un FormData
        const formData = new FormData();
        formData.append('nombre_receta', nombreReceta);
        formData.append('ingredientes', ingredientes);
        formData.append('instrucciones', instrucciones);
        formData.append('calorias', calorias);
        formData.append('tiempo_preparacion', tiempoPreparacion);
        formData.append('origen', origen);
        formData.append('dificultad', dificultad);
        formData.append('categoria', categoria);

        // Añadir la imagen al FormData
        const uriParts = imagen.split('.');
        const fileType = uriParts[uriParts.length - 1];
        formData.append('imagen', {
            uri: imagen,
            name: `photo.${fileType}`,
            type: `image/${fileType}`,
        });

        try {
            // Enviar la receta a la API
            const response = await fetch('https://cookit-j5x3.onrender.com/recetas/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `JWT ${token}`
                },
                body: formData
            });

            if (response.ok) {
                Alert.alert("Receta añadida", 'Se ha añadido la receta con éxito');
                setNombreReceta("");
                setIngredientes("");
                setInstrucciones("");
                setImagen(null);
                setCalorias("");
                setTiempoPreparacion("");
                setOrigen("");
                setDificultad("");
                setCategoria("");
                console.log("Receta añadida:", formData);
            } else {
                const errorData = await response.json();
                console.error("Error al añadir receta:", errorData);
                Alert.alert("Error", 'Hubo un problema al añadir la receta.');
            }
        } catch (error) {
            console.error("Error al enviar la receta:", error);
            Alert.alert("Error", "Hubo un error al enviar la receta. Por favor, inténtalo de nuevo.");
        }
    };

    const pickImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (!result.canceled) {
                setImagen(result.uri);
            }
        } catch (error) {
            console.error("Error al seleccionar la imagen:", error);
            Alert.alert("Error", "Hubo un error al seleccionar la imagen. Por favor, inténtalo de nuevo.");
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Añadir Receta</Text>
            {imagen && <Image source={{ uri: imagen }} style={styles.image} />}
            <TouchableOpacity style={styles.pickImageButton} onPress={pickImage}>
                <Text style={styles.pickImageText}>Seleccionar Imagen</Text>
            </TouchableOpacity>
            <TextInput
                style={styles.input}
                placeholder="Nombre de la receta"
                value={nombreReceta}
                onChangeText={setNombreReceta}
            />
            <TextInput
                style={[styles.input, { height: 100 }]}
                placeholder="Ingredientes"
                multiline
                value={ingredientes}
                onChangeText={setIngredientes}
            />
            <TextInput
                style={[styles.input, { height: 200 }]}
                placeholder="Instrucciones de preparación"
                multiline
                value={instrucciones}
                onChangeText={setInstrucciones}
            />
            <TextInput
                style={styles.input}
                placeholder="Calorías"
                value={calorias}
                onChangeText={setCalorias}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Tiempo de preparación"
                value={tiempoPreparacion}
                onChangeText={setTiempoPreparacion}
            />
            <TextInput
                style={styles.input}
                placeholder="Origen del platillo"
                value={origen}
                onChangeText={setOrigen}
            />
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={dificultad}
                    onValueChange={(itemValue) => setDificultad(itemValue)}
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
                    selectedValue={categoria}
                    onValueChange={(itemValue) => setCategoria(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Selecciona una categoría" value="" />
                    <Picker.Item label="categoria 1" value="categoria 1" />
                    <Picker.Item label="categoria 2" value="categoria 2" />
                    <Picker.Item label="categoria 3" value="categoria 3" />
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
        backgroundColor: Colors.WHITE,}
})
