import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, FlatList, StyleSheet } from "react-native";
import { MaterialIcons } from '@expo/vector-icons'; // Asegúrate de tener este paquete instalado
import Colors from "../../Utils/Colors";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Comments = ({ route }) => {
    const { recipeId } = route.params;
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [token, setToken] = useState("");
    const [userData, setUserData] = useState({});

    useEffect(() => {
        const getUserToken = async () => {
            try {
                const userToken = await AsyncStorage.getItem("accessToken");
                const url = "https://cookit-j5x3.onrender.com/auth/users/me/";

                const response = await fetch(url, {
                    headers: {
                        Authorization: "JWT " + userToken,
                    },
                });

                const data = await response.json();

                setUserData(data);
                setToken(userToken);
            } catch (error) {
                console.error("Error al obtener el token del usuario:", error);
            }
        };

        const fetchComments = async () => {
            try {
                const response = await fetch('https://cookit-j5x3.onrender.com/comentarios/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();
                console.log('Fetched Comments:', data);

                // Filtrar comentarios por recipeId manualmente
                const filteredComments = data.filter(comment => comment.receta === recipeId);
                setComments(filteredComments);
            } catch (error) {
                console.error("Error al obtener los comentarios:", error);
            }
        };

        getUserToken();
        fetchComments();
    }, [recipeId]);

    const handleAddComment = async () => {
        if (!newComment.trim()) {
            Alert.alert('Error', 'Por favor, ingresa un comentario antes de enviar.');
            return;
        }

        try {
            const response = await fetch('https://cookit-j5x3.onrender.com/comentarios/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'JWT ' + token,
                },
                body: JSON.stringify({
                    contenido: newComment,
                    receta: recipeId,
                    usuario_id: userData.id, // Asegúrate de incluir el ID del usuario
                }),
            });

            const responseData = await response.json();

            console.log('Server Response:', responseData);

            if (response.ok) {
                setComments([...comments, responseData]);
                setNewComment('');
                Alert.alert('¡Éxito!', 'Tu comentario se ha enviado correctamente.');
            } else {
                Alert.alert('Error', `Ha ocurrido un error al enviar tu comentario: ${responseData.detail || responseData.message || 'Error desconocido'}`);
            }
        } catch (error) {
            console.error('Error al enviar comentario:', error);
            Alert.alert('Error', 'Ha ocurrido un error al enviar tu comentario. Por favor, inténtalo de nuevo.');
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            const response = await fetch(`https://cookit-j5x3.onrender.com/comentarios/${commentId}/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'JWT ' + token,
                },
            });

            if (response.ok) {
                setComments(comments.filter(comment => comment.id !== commentId));
                Alert.alert('¡Éxito!', 'Tu comentario se ha eliminado correctamente.');
            } else {
                const responseData = await response.json();
                Alert.alert('Error', `Ha ocurrido un error al eliminar tu comentario: ${responseData.detail || responseData.message || 'Error desconocido'}`);
            }
        } catch (error) {
            console.error('Error al eliminar comentario:', error);
            Alert.alert('Error', 'Ha ocurrido un error al eliminar tu comentario. Por favor, inténtalo de nuevo.');
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.commentContainer}>
            <View style={styles.commentHeader}>
                <Text style={styles.commentHeaderTitle}>{item.usuario.username}</Text>
                {item.usuario.id === userData.id && (
                    <TouchableOpacity onPress={() => handleDeleteComment(item.id)}>
                        <MaterialIcons name="delete" size={24} color="black" />
                    </TouchableOpacity>
                )}
            </View>
            <View style={styles.commentContent}>
                <Text style={styles.commentText}>{item.contenido}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={comments}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
            />
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={newComment}
                    onChangeText={(text) => setNewComment(text)}
                    placeholder="Añadir comentario"
                />
                <TouchableOpacity style={styles.button} onPress={handleAddComment}>
                  <Text style={styles.buttonText}>Añadir comentario</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.PRIMARY,
        padding: 20,
    },
    commentContainer: {
        marginBottom: 15,
        backgroundColor: Colors.WHITE,
        borderRadius: 10,
        elevation: 5,
        padding: 15,
        width: '100%',
        alignSelf: 'center',
    },
    commentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    commentHeaderTitle: {
        fontWeight: 'bold',
    },
    commentContent: {},
    commentText: {
        fontSize: 18,
    },
    inputContainer: {
        marginTop: 20,
    },
    input: {
        height: 40,
        borderColor: Colors.WHITE,
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        backgroundColor: Colors.WHITE,
        borderRadius: 20,
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
});

export default Comments;
