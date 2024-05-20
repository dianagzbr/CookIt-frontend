import { View, Text, StyleSheet } from "react-native";
import { useState } from "react";
import Button from "../../Components/forms/Button";

export default function WeekPlanning({ navigation }) {
  const [isWeeklyPlanning, setIsWeekliyPlanning] = useState(false);

  return (
    <View style={styles.container}>
      {!isWeeklyPlanning ? (
        <View style={styles.content}>
          <Text>No hay ninguna planeacion semanal</Text>
          <Button onPress={() => navigation.navigate("createweek")}>
            Agregar una planeacion
          </Button>
        </View>
      ) : (
        <Text>Planeación Semanal</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBDCC9",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
