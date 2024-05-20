import { View, Text, Image, StyleSheet} from "react-native";
import react from "react";
import Colors from "../../Utils/Colors";
import RecipeCard from "../../Components/RecipeCard";

export default function Favorites() {
    return (
        <View style={{flex: 1}}>
            <Image source={require("./../../../assets/comida3.jpg")} style={styles.favImage}/>
            <View style={styles.subContainer}>
                <Text style={{
                    fontSize: 30, 
                    color: Colors.BLACK, 
                    fontWeight: 'bold', 
                    textAlign: 'justify' 
                }}>
                    Favoritos
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    favImage: {
        position: 'relative',
        width: 430,
        height: 230,
    },

    subContainer: {
        width: '100%',
        height: '70%',
        backgroundColor: Colors.PRIMARY,
        padding: 20,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
    },
});
