import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../../Utils/Colors';

const RecipeScreen = () => {
  const [comments, setComments] = useState([
    { id: 1, comment: '¡Deliciosa receta!', rating: 5 },
    { id: 2, comment: 'Fácil de preparar.', rating: 4 },
    { id: 3, comment: 'No me gustó mucho.', rating: 3 },
    { id: 4, comment: 'Increíble sabor.', rating: 5 },
  ]);
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState('');

  const handleAddComment = () => {
    if (newComment && newRating) {
      const id = comments.length + 1;
      const commentObject = { id: id, comment: newComment, rating: parseInt(newRating) };
      setComments([...comments, commentObject]);
      setNewComment('');
      setNewRating('');
    }
  };

  const renderStarRating = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Icon
          key={i}
          name={i <= rating ? 'star' : 'star-o'}
          size={20}
          color={i <= rating ? '#FFD700' : '#D3D3D3'}
        />
      );
    }
    return stars;
  };

  const renderItem = ({ item }) => (
    <View style={styles.commentContainer}>
      <Text style={styles.commentText}>{item.comment}</Text>
      <View style={styles.ratingContainer}>{renderStarRating(item.rating)}</View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Comentarios y Calificaciones de la Receta</Text>
      <FlatList
        data={comments}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newComment}
          onChangeText={(text) => setNewComment(text)}
          placeholder="Añadir comentario"
        />
        <TextInput
          style={styles.input}
          value={newRating}
          onChangeText={(text) => setNewRating(text)}
          placeholder="Calificación"
          keyboardType="numeric"
        />
        <Button title="Añadir Comentario" onPress={handleAddComment} />
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  commentContainer: {
    marginBottom: 15,
  },
  commentText: {
    fontSize: 18,
  },
  ratingContainer: {
    flexDirection: 'row',
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
    borderRadius: 20
  },
});

export default RecipeScreen;
