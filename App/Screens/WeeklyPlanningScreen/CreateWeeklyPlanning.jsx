import { useState } from "react"
import { Text, View, StyleSheet } from "react-native"
import ShowRecipes from "../../Components/ShowRecipes"

const CreateWeeklyPlanning = () => {
  const [isModalOpen, setIsModalOpen] = useState(true)

  return (
    <View style={styles.container}>
      <ShowRecipes isModalOpen={isModalOpen}></ShowRecipes>
      <Text>Creacion de planeacion</Text>
      <Text>Dia 1:</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBDCC9",
  },
})

export default CreateWeeklyPlanning
