import React, { useState, useEffect } from 'react';
import { View, Text, Alert, Image, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Colors from "../../Utils/Colors";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalMessage from "../../Components/ModalMessage";

const ProfileScreen = ({ navigation }) => {
    const [userData, setUserData] = useState({});
    const [token, setToken] = useState();
    const [formData, setFormData] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState({ title: "", content: "" });
    const [image, setImage] = useState(null);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const getData = async () => {
        const toke = await AsyncStorage.getItem("accessToken");
        if (toke != null){
            console.log(toke);
            setToken(toke);
        }
    };

    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
        console.log(formData);
    };

    const getUserData = async () => {
        const url = "https://cookit-j5x3.onrender.com/auth/users/me/";

        const response = await fetch(url, {
            method: "GET",
            headers: { "Authorization": "JWT " + token }
        });
        if (response.status === 200) {
            const data = await response.json();
            setUserData(data);
            setFormData({
                first_name: data.first_name || "",
                last_name: data.last_name || "",
                email: data.email || "",
                username: data.username || "",
            });
        }
        console.log(userData);
    };

    const getUserImage = async () => {
        const url = "https://cookit-j5x3.onrender.com/userscomp/";

        const response = await fetch(url, {
            method: "GET",
            headers: { "Authorization": "JWT " + token }
        });
        if (response.status === 200) {
            const data = await response.json();
            const user = data.find(u => u.id === userData.id);
            if (user) {
                setImage(user.foto_perfil);
            }
        }
    };

    const updateUserData = async () => {
        const url = "https://cookit-j5x3.onrender.com/auth/users/me/";

        const response = await fetch(url, {
            method: "PATCH",
            headers: {
                "Authorization": "JWT " + token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });
        if (response.status === 200) {
            setUserData(await response.json());
            toggleModal();
            setModalData({ title: "Éxito", content: "Los datos se actualizaron correctamente." });
        } else {
            const errorData = await response.json();
            setModalData({ title: "Error", content: `Ha ocurrido un error: ${errorData.message}` });
            toggleModal();
        }
        console.log(userData);
    };

    const uploadImage = async (imageUri) => {
        const url = "https://cookit-j5x3.onrender.com/userscomp/";

        let filename = imageUri.split('/').pop();
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;

        let formData = new FormData();
        formData.append('foto_perfil', { uri: imageUri, name: filename, type });

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Authorization": "JWT " + token,
                    'Content-Type': 'multipart/form-data',
                },
                body: formData,
            });

            if (response.status === 200 || response.status === 201) {
                const data = await response.json();
                setImage(data.foto_perfil); // Actualiza la imagen en el estado
                setUserData(prevData => ({ ...prevData, foto_perfil: data.foto_perfil }));
                console.log("Imagen actualizada exitosamente:", data);
            } else {
                const errorData = await response.json();
                console.error("Error al actualizar la imagen:", errorData);
                Alert.alert("Error", "Hubo un error al actualizar la imagen. Por favor, inténtalo de nuevo.");
            }
        } catch (error) {
            console.error("Error al actualizar la imagen:", error);
            Alert.alert("Error", "Hubo un error al actualizar la imagen. Por favor, inténtalo de nuevo.");
        }
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
                uploadImage(result.uri);
            }
        } catch (error) {
            console.error("Error al seleccionar la imagen:", error);
            Alert.alert("Error", "Hubo un error al seleccionar la imagen. Por favor, inténtalo de nuevo.");
        }
    };

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        if (token) {
            getUserData();
        }
    }, [token]);

    useEffect(() => {
        if (userData.id) {
            getUserImage();
        }
    }, [userData]);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.profileImageContainer}>
                {image ? (
                    <Image source={{ uri: image }} style={styles.profileImage} />
                ) : (
                    <Image source={require('./../../../assets/Sadmouse.jpg')} style={styles.profileImage} />
                )}
                <TouchableOpacity style={styles.pickImageButton} onPress={pickImage}>
                    <Text style={styles.pickImageText}>Seleccionar Imagen</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.userData}>Tus datos</Text>
            <TextInput
                style={[styles.input, styles.shadow]}
                placeholder="Nombre(s)"
                onChangeText={(value) => handleChange("first_name", value)}
                value={formData.first_name}
            />
            <TextInput
                style={[styles.input, styles.shadow]}
                placeholder="Apellidos"
                onChangeText={(value) => handleChange("last_name", value)}
                value={formData.last_name}
            />
            <TextInput
                style={[styles.inputGray, styles.shadow]}
                placeholder="Correo electrónico"
                editable={false}
                value={formData.email}
            />
            <TextInput
                style={[styles.inputGray, styles.shadow]}
                placeholder="Nombre de usuario"
                editable={false}
                value={formData.username}
            />
            <TextInput
                style={[styles.inputGray, styles.shadow]}
                placeholder="Contraseña"
                editable={false}
                secureTextEntry={true}
                value='123456789'
            />
            <Text style={styles.link} onPress={() => { navigation.navigate("rstpass") }}>
                ¿Deseas cambiar tu contraseña? Haz click aquí.
            </Text>
            <TouchableOpacity style={styles.button} onPress={updateUserData}>
                <Text style={styles.buttonText}>Actualizar datos</Text>
            </TouchableOpacity>
            <ModalMessage
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                title={modalData.title}
            >
                {modalData.content}
            </ModalMessage>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: Colors.PRIMARY,
        flex: 1,
    },
    userData: {
        paddingVertical: 1,
        paddingLeft: 5,
        fontWeight: "bold", 
        fontSize: 24,
        textAlign: "center"
    },
    profileImageContainer: {
        alignItems: 'center',
        marginBottom: 16,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 8,
        padding: 60,
    },
    pickImageButton: {
        backgroundColor: Colors.SECONDARY,
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderRadius: 10,
        alignItems: "center",
        marginBottom: 10,
    },
    pickImageText: {
        color: Colors.WHITE,
        fontSize: 14,
        fontWeight: "bold",
        padding: 10,
    },
    input: {
        padding: 15,
        width: '90%',
        backgroundColor: Colors.WHITE,
        borderRadius: 50,
        marginTop: 25,
        textAlign: 'left',
        alignSelf: 'center',
        fontSize: 17,
    },
    shadow: {
        shadowColor: "#171717",
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 20,
    },
    inputGray: {
        padding: 15,
        width: '90%',
        backgroundColor: "#E6E6E6",
        borderRadius: 50,
        marginTop: 25,
        textAlign: 'left',
        alignSelf: 'center',
        fontSize: 17,
        color: 'gray'
    },
    link: {
        color: 'black',
        marginBottom: 12,
        textDecorationLine: 'underline',
        padding: 10,
        paddingTop: 20
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
        paddingVertical: 10
    },
});

export default ProfileScreen;
