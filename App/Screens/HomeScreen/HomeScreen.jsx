import { StyleSheet, SafeAreaView, View, Text, Image } from "react-native";
import React, { useState } from "react";
import Header from "../../Components/Header";
import SearchFilter from "../../Components/SearchFilter";
import CategoriesFilter from "../../Components/CategoriesFilter";
import OriginFilter from "../../Components/OriginFilter";
import Colors from "../../Utils/Colors";
import RecipeCard from "../../Components/RecipeCard";

const HomeScreen = () => {
    const [searchText, setSearchText] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null); // Initialize with null
    const [selectedOrigin, setSelectedOrigin] = useState(null); // Initialize with null

    return (
        <SafeAreaView style={{flex:1, padding:15, backgroundColor: Colors.PRIMARY}}>
            <Header headerText={"CookIt!"} headerIcon={"bell-o"} />
            <SearchFilter 
                icon="search" 
                placeholder={"Buscar receta"} 
                filterIcon={"list-ul"}
                onSearch={setSearchText}
            />
            <Image source={require('./../../../assets/Lasaña1.jpg')} style={styles.homeImage}/>

            <View>
                <CategoriesFilter 
                    selectedCategory={selectedCategory} 
                    onSelectCategory={setSelectedCategory} 
                />
            </View>
            <View style={{ marginTop: 15 }}>
                <OriginFilter 
                    selectedOrigin={selectedOrigin} 
                    onSelectOrigin={setSelectedOrigin} 
                />
            </View>
            <View style={{marginTop: 15, flex:1}}>
                <RecipeCard 
                    searchText={searchText} 
                    selectedCategory={selectedCategory} 
                    selectedOrigin={selectedOrigin} 
                />
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
