import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "../Utils/Colors";
import {FontAwesome } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";

const SearchFilter = ({icon, placeholder, filterIcon}) =>{
    return(
        <View style={{backgroundColor: Colors.WHITE, 
                    flexDirection:"row",
                    paddingVertical: 16,
                    borderBottomLeftRadius: 25,
                    borderBottomRightRadius: 25,
                    borderTopRightRadius: 25,
                    paddingHorizontal: 16,
                    marginVertical: 16,

                    shadowColor: Colors.BLACK,
                    shadowOffset: {width: 0, height: 2},
                    shadowOpacity: 0.3,
                    shadowRadius: 4,
                    elevation: 5
                    }}
                >
            <View style={{ flexDirection: "row", flex: 1, alignItems: "center" }}>
                <FontAwesome name={icon} size={28} color={Colors.BLACK} />
                <TextInput style={{ paddingLeft: 10, fontSize: 16, color: Colors.GREY }} placeholder={placeholder} />
            </View>
            <FontAwesome name={filterIcon} size={26} color={Colors.BLACK} />


        </View>
    );

};

export default SearchFilter;

const styles = StyleSheet.create({});