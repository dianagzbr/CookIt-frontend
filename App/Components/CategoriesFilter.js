import { StyleSheet, Text, View, ScrollView } from "react-native";
import react from "react";
import { categories } from "../Utils/Constants";
import Colors from "../Utils/Colors";

const CategoriesFile = () => {
    return (
        <View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {categories.map((category, index)=>{
                    return (
                        <View style={{backgroundColor: index === 0 ? Colors.SECONDARY: Colors.PRIMARY,
                                    marginRight: 27,
                                    borderRadius:25,
                                    paddingHorizontal: 16,
                                    paddingVertical: 16,
                                    shadowColor: "#000",
                                    shadowOffset: {width:0, height: 4},
                                    shadowOpacity: 0.1,
                                    shadowRadius: 7,
                                    marginVertical:15
                                    }}>
                            <Text style={{color: index === 0 && Colors.WHITE, fontSize: 18, fontWeight: index === 0 ?'bold': 'normal'}}>
                                {category.category}
                            </Text>
                        </View>
                    );
                })}
            </ScrollView>
        </View>
    );
};

export default CategoriesFile;

const styles = StyleSheet.create({});
