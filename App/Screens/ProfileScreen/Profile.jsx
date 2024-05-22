import React from 'react';
import { View, Text, Button, Alert, Image, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useState, useEffect } from 'react';
import Colors from "../../Utils/Colors";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalMessage from "../../Components/ModalMessage";

const ProfileScreen = ({ navigation }) => {
    //Variable para guardar los datos del usuario
    const [userData, setUserData] = useState({})
    const [token, setToken] = useState()
    //formData contiene los valores de los Inputs de la info. del usuario
    const [formData, setFormData] = useState({})
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState({
      title: "",
      content: "",
    });
    
    const toggleModal = () => {
      setIsModalOpen(!isModalOpen);
    };

    const [image, setImage] = useState(null);

    const getData = async () => {
        const toke = await AsyncStorage.getItem("accessToken");

        if (toke != null){
            console.log(toke);
            setToken(toke);
        }
    }

    const handleChange = (field, value) => {
      setFormData({...formData, [field]: value})
      console.log(formData)

    }

    const getUserData = async () => {
      const url = "https://cookit-j5x3.onrender.com/auth/users/"

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Authorization": "JWT " + token
        }
      })
      if(response.status == 200){
        setUserData(await response.json());
      }
      console.log(userData);
    }

    const updateUserData = async () => {
      const url = "https://cookit-j5x3.onrender.com/auth/users/"

      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Authorization": "JWT " + token, 
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })
      if(response.status == 200){
        setUserData(await response.json());
        toggleModal();
        setModalData({
          title: "Éxito",
          content: "Los datos se actualizaron correctamente.",
        });
      }

      else {
        const errorData = await response.json();
        setModalData({
          title: "Error",
          content: `Ha ocurrido un error: ${errorData.message}`,
        });
        toggleModal();
      }
      console.log(userData);
    }


    useEffect(() => {
      getData();
    }, []);
    
    useEffect(() => {
      getUserData();
    }, [token]);
    
    useEffect(() => {
      console.log("Datos usuario actualizados:", userData);
    
      setFormData({
        first_name: userData.first_name || "",
        last_name: userData.last_name || "",
        email: userData.email || "",
        username: userData.username || "",
      });
    }, [userData]);

    const handleSaveChanges = () => {
        getUserData();
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
                setImage(result.assets[0].uri);
            }
        } catch (error) {
            console.error("Error al seleccionar la imagen:", error);
            Alert.alert("Error", "Hubo un error al seleccionar la imagen. Por favor, inténtalo de nuevo.");
        }
    };
 
    return (
    <ScrollView style={styles.container}>
      <View style={styles.profileImageContainer}>
      <Image source={require('./../../../assets/Sadmouse.jpg')} style={styles.profileImage}/>
      {image && <Image source={{ uri: image }} style={styles.image} />}
            <TouchableOpacity style={styles.pickImageButton} onPress={pickImage}>
                <Text style={styles.pickImageText}>Seleccionar Imagen</Text>
            </TouchableOpacity>
      </View>
      <Text style={styles.userData}>Tus datos </Text>
      <TextInput style={[styles.input, styles.shadow]} placeholder="Nombre(s)" onChangeText={((value) => handleChange("first_name", value))} value={formData.first_name}/>
      <TextInput style={[styles.input, styles.shadow]} placeholder="Apellidos" onChangeText={((value) => handleChange("last_name", value))} value={formData.last_name}/>
      <TextInput style={[styles.inputGray, styles.shadow]} placeholder="Correo electrónico" editable={false} value={formData.email}/>
      <TextInput style={[styles.inputGray, styles.shadow]} placeholder="Nombre de usuario"  editable={false} value={formData.username}/>
      <TextInput style={[styles.inputGray, styles.shadow]} placeholder="Contraseña" editable={false} secureTextEntry={true} value='123456789'/>
      <Text style={styles.link} onPress={() => { navigation.navigate("rstpass")}}>¿Deseas cambiar tu contraseña? Haz click aquí.</Text>



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

  yourAllergies: {
    paddingVertical: 1,
    paddingLeft: 5,
    fontWeight: "bold"
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

  pickImageText: {
    color: Colors.WHITE,
    fontSize: 14,
    fontWeight: "bold",
    padding: 10,
    },

  pickImageButton: {
        backgroundColor: Colors.SECONDARY,
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderRadius: 10,
        alignItems: "center",
        marginBottom: 10,
    },

  inputAllergies: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    padding: 15,
    width: '90%',
    backgroundColor: Colors.WHITE,
    borderRadius: 20,
    marginTop: 10,
    textAlign: 'left',
    alignSelf: 'center',
    fontSize: 17,
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