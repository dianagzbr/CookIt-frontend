import { FlatList, StyleSheet, Text, View, Image, Pressable} from "react-native";
import react from "react";
import {FontAwesome} from "@expo/vector-icons";
import { recipeData } from "../Utils/Constants";
import Colors from "../Utils/Colors";
import { useNavigation } from "@react-navigation/native";

const RecipeCard = ({}) => {
    const navigation = useNavigation();
    return (
        <View>
            <FlatList 
                data={recipeData} 
                renderItem={({item}) => (
                    <Pressable onPress={()=>navigation.navigate("recipe", { item: item })}
                        style={{
                            backgroundColor: Colors.LIGHT,
                            shadowColor: "#000",
                            shadowOffset: {width:0, height: 4},
                            shadowOpacity: 0.1,
                            shadowRadius: 7,
                            borderRadius: 16,
                            elevation: 5,
                            marginVertical: 16,
                            alignItems: 'center',
                            paddingHorizontal: 8,
                            paddingVertical: 26,
                            justifyContent: 'center',
                        }}
                    >
                        <Image source={item.imagenes[0].imagen} 
                               style={styles.imageHS}
                        />
                        <Text>{item.nombre_receta}</Text>
                        <View style={{flexDirection:"row", marginTop:5}}>
                            <Text>{item.calorias} cal</Text>
                            <Text> | </Text>
                            <View>
                                <Text>{item.tiempo}</Text>
                                <View style={{flexDirection: 'row', }}>
                                    <Text style={{marginRight: 4}}>{item.calificacion}</Text>
                                    <FontAwesome name="star" size={16} color={Colors.BLACK}/>
                                </View>
                            </View>
                        </View>
                    </Pressable>
                )}
                numColumns={2}
                columnWrapperStyle={{
                    justifyContent: 'space-around'
                }}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

export default RecipeCard;

const styles = StyleSheet.create({
    imageHS: {
        width: 150, 
        height:150, 
        borderRadius: 30,
    }
});
