import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../../Utils/Colors';
import Button from '../../Components/forms/Button';

const RecipeScreen = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(0);

  useEffect(() => {
    // Función para obtener los comentarios existentes del backend
    const fetchComments = async () => {
      try {
        const response = await fetch('https://cookit-j5x3.onrender.com/comentarios/');
        if (response.ok) {
          const data = await response.json();
          setComments(data);
        } else {
          Alert.alert('Error', 'Ha ocurrido un error al obtener los comentarios. Por favor, inténtalo de nuevo.');
        }
      } catch (error) {
        console.error('Error al obtener comentarios:', error);
        Alert.alert('Error', 'Ha ocurrido un error al obtener los comentarios. Por favor, inténtalo de nuevo.');
      }
    };

    // Llamada a la función para obtener los comentarios existentes
    fetchComments();
  }, []);

  const handleAddComment = async () => {
    if (newComment && newRating) {
      try {
        const response = await fetch('https://cookit-j5x3.onrender.com/comentarios/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            comentario: newComment,
            calificacion: newRating,
          }),
        });
        
        if (response.ok) {
          const commentObject = { id: comments.length + 1, comment: newComment, rating: newRating };
          setComments([...comments, commentObject]);
          setNewComment('');
          setNewRating(0);
          Alert.alert('¡Éxito!', 'Tu comentario se ha enviado correctamente.');
        } else {
          Alert.alert('Error', 'Ha ocurrido un error al enviar tu comentario. Por favor, inténtalo de nuevo.');
        }
      } catch (error) {
        console.error('Error al enviar comentario:', error);
        Alert.alert('Error', 'Ha ocurrido un error al enviar tu comentario. Por favor, inténtalo de nuevo.');
      }
    } else {
      Alert.alert('Error', 'Por favor, ingresa un comentario y una calificación antes de enviar.');
    }
  };

  const renderStarRating = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity key={i} onPress={() => setNewRating(i)}>
          <Icon
            name={i <= rating ? 'star' : 'star-o'}
            size={20}
            color={i <= rating ? '#FFD700' : '#D3D3D3'}
          />
        </TouchableOpacity>
      );
    }
    return stars;
  };

  const renderItem = ({ item }) => (
    <View style={styles.commentContainer}>
      <View style={styles.commentHeader}>
        <Text style={styles.commentHeaderTitle}>{item.usuario.username}</Text>
      </View>
      <View style={styles.commentContent}>
        <Text style={styles.commentText}>{item.contenido}</Text>
        <View style={styles.ratingContainer}>{renderStarRating(item.calificacion)}</View>
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
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingLabel}>Calificación:</Text>
          {renderStarRating(newRating)}
        </View>
        <Button onPress={handleAddComment}>Añadir</Button>
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
    width: '100%', // Ajustar al 80% del ancho
    alignSelf: 'center', // Centrar horizontalmente
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  commentHeaderTitle: {
    fontWeight: 'bold',
  },
  commentHeaderDate: {
    color: Colors.GREY,
  },
  commentContent: {},
  commentText: {
    fontSize: 18,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingLabel: {
    color: Colors.WHITE,
    marginRight: 10,
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
});

export default RecipeScreen;
