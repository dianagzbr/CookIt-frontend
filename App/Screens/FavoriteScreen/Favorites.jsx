import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import Colors from "../../Utils/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Favorites({ navigation }) {
  const [userData, setUserData] = useState({});
  const [userToken, setUserToken] = useState(null);

  const getUserData = async () => {
    const token = await AsyncStorage.getItem("accessToken");

    if (token) {
      setUserToken(token);

      const url = "https://cookit-j5x3.onrender.com/auth/users/me/";
      const response = await fetch(url, {
        headers: {
          Authorization: "JWT " + token,
        },
      });
      const data = await response.json();
      setUserData(data.info.recetas_favoritas);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getUserData();
    }, [])
  );

  return (
    <View style={{ flex: 1 }}>
      {userToken ? (
        <View>
          <Image
            source={require("./../../../assets/comida3.jpg")}
            style={styles.favImage}
          />
          <View style={styles.subContainer}>
            <Text
              style={{
                fontSize: 30,
                color: Colors.BLACK,
                fontWeight: "bold",
                textAlign: "justify",
              }}
            >
              Favoritos
            </Text>
            <FlatList
              contentContainerStyle={styles.flatContainer}
              data={userData}
              renderItem={({ item }) => (
                <View style={styles.mealContainer}>
                  <Image
                    style={styles.image}
                    source={{ uri: item.imagenes[0].imagen }}
                  />
                  <Text style={styles.title} numberOfLines={1}>
                    {item.nombre_receta}
                  </Text>
                  <View style={styles.contentText}>
                    <Text style={styles.text2}>{item.calorias} Kcal</Text>
                    <Text style={styles.text2}>{item.tiempo_preparacion}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("recipe", { item })}
                  >
                    <Text style={styles.text}>Ver receta</Text>
                  </TouchableOpacity>
                </View>
              )}
              numColumns={2}
            />
          </View>
        </View>
      ) : (
        <Text>No has iniciado sesion</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  favImage: {
    position: "relative",
    width: 430,
    height: 230,
  },
  subContainer: {
    width: "100%",
    height: "70%",
    backgroundColor: Colors.PRIMARY,
    padding: 20,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  mealContainer: {
    backgroundColor: "#F0E8DD",
    width: 150,
    padding: 20,
    borderRadius: 15,
    marginHorizontal: 10,
  },
  flatContainer: {
    flex: 1,
  },
  image: {
    width: "90%",
    height: 90,
    borderRadius: 300,
    alignSelf: "center",
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 14,
    marginVertical: 20,
  },
  button: {
    backgroundColor: "#B29784",
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  text: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 15,
  },
  text2: {
    fontSize: 11,
  },
  contentText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
