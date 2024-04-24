import { View, Text } from "react-native";
import react from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../Screens/HomeScreen/HomeScreen"; 
import WeekPlanning from "../Screens/WeeklyPlanningScreen/WeekPlnn";
import ShoppingList from "../Screens/ShoppingListScreen/ShppList";

const Tab = createBottomTabNavigator();

export default function TabNavigation(){
    return(
        <Tab.Navigator>
            <Tab.Screen name='Inicio' component={HomeScreen} />
            <Tab.Screen name='Planeación' component={WeekPlanning} />
            <Tab.Screen name='Lista' component={ShoppingList} />
            
        </Tab.Navigator>
    )
}