import { StyleSheet, SafeAreaView, View, Text, Image } from "react-native";
import react from "react";
import ScrollableHeader from 'react-native-scrollable-header';
import Header from "../../Components/Header";
import SearchFilter from "../../Components/SearchFilter";
import CategoriesFilter from "../../Components/CategoriesFilter";
import Colors from "../../Utils/Colors";
import RecipeCard from "../../Components/RecipeCard";


const HomeScreen = () => {
    return(
        <SafeAreaView style={{flex:1, padding:15, backgroundColor: Colors.PRIMARY}}>

            <Header drawerIcon={"navicon"} headerText={"CookIt!"} headerIcon={"bell-o"} />
            <SearchFilter icon="search" placeholder={"Buscar receta"} filterIcon={"list-ul"}/>
            <Image source={require('./../../../assets/Lasaña1.jpg')} style={styles.homeImage}/>

            <View>
                <CategoriesFilter/>
            </View>
            <View style={{marginTop: 15, flex:1}}>
                <RecipeCard/>
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    homeImage: {
        width: 379,
        height: 143,
        borderRadius: 30
    },
});