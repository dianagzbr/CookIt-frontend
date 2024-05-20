import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Colors from '../../Utils/Colors';
import { Picker } from '@react-native-picker/picker';

const EditRecipeScreen = ({ route, navigation }) => {
    const { recipe } = route.params;
    const [recipeName, setRecipeName] = useState(recipe.name);
    const [ingredients, setIngredients] = useState(recipe.ingredients || '');
    const [instructions, setInstructions] = useState(recipe.instructions || '');
    const [image, setImage] = useState(recipe.image);
    const [calories, setCalories] = useState(recipe.calories || '');
    const [prepTime, setPrepTime] = useState(recipe.prepTime || '');
    const [origin, setOrigin] = useState(recipe.origin || '');
    const [difficulty, setDifficulty] = useState(recipe.difficulty || '');
    const [category, setCategory] = useState(recipe.category || '');

    const handleSaveRecipe = () => {
        //lógica para actualizar la receta en tu base de datos o realizar cualquier acción necesaria

        Alert.alert('Receta guardada', 'Se ha guardado la receta con éxito.');
        navigation.goBack();
    };

    const pickImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (!result.cancelled) {
                setImage(result.assets[0].uri);
            }
        } catch (error) {
            Alert.alert('Error', 'Hubo un error al seleccionar la imagen. Por favor, inténtalo de nuevo.');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Editar Receta</Text>
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
                    <Picker.Item label="Desayuno" value="Desayuno" />
                    <Picker.Item label="Comida" value="Comida" />
                    <Picker.Item label="Cena" value="Cena" />
                    <Picker.Item label="Merienda" value="Merienda" />
                    <Picker.Item label="Postre" value="Postre" />
                    <Picker.Item label="Entrada" value="Entrada" />
                    <Picker.Item label="Bebida" value="Bebida" />
                    <Picker.Item label="Otro" value="Otro" />
                </Picker>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleSaveRecipe}>
                <Text style={styles.buttonText}>Guardar Receta</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: Colors.PRIMARY,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
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
        alignItems: 'center',
    },
    buttonText: {
        color: Colors.WHITE,
        fontSize: 18,
        fontWeight: 'bold',
    },
    pickImageButton: {
        backgroundColor: Colors.SECONDARY,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20,
    },
    pickImageText: {
        color: Colors.WHITE,
        fontSize: 18,
        fontWeight: 'bold',
    },
    image: {
        width: '100%',
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
    },
});

export default EditRecipeScreen;
