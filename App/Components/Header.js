import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import react from "react";
import {FontAwesome} from "@expo/vector-icons";
import Colors from "../Utils/Colors";
import { useNavigation } from "@react-navigation/native";


const Header = ({headerText, headerIcon}) => {
    const navigation = useNavigation();
    return(
        <View style={{flexDirection:"row"}}>
            <Text style={{ textAlign: 'center', flex:1, fontSize:30, fontWeight:"700"}}>
                {headerText}
            </Text>
            <FontAwesome name={headerIcon} size={24} color={Colors.BLACK} />
        
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({});