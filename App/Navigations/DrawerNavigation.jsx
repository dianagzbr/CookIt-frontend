import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Favorites from "../Screens/FavoriteScreen/Favorites";
import HomeScreen from "../Screens/HomeScreen/HomeScreen";
import ShoppingList from "../Screens/ShoppingListScreen/ShppList";
import WeekPlanning from "../Screens/WeeklyPlanningScreen/WeekPlnn";
import Colors from "../Utils/Colors";
import MyRecipes from "../Screens/Recipe/MyRecipes";
import AddRecipe from "../Screens/Recipe/AddRecipe";

const Drawer = createDrawerNavigator();

const fetchUserData = async (token) =>{}

const checkAuthentication = async () => {
  try {
    const isAuthenticated = await AsyncStorage.getItem('isAuthenticated')
    return isAuthenticated === 'true'
  } catch (error) {
    console.error('Error al obtener el estado de autenticación: ', error);
    return false
  }
}

const CustomDrawerContent = ({  ...rest }) => {
    const navigation = useNavigation();

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      const fetchAuthentication = async () => {
        const authenticated = await checkAuthentication();
        setIsAuthenticated(authenticated);
      };
      fetchAuthentication();
    },[])

    return (
      <DrawerContentScrollView {...rest}>
        <View style={{ alignItems: "center", paddingVertical: 20 }}>
          <TouchableOpacity onPress={() => navigation.navigate('profile')}>
            <Image
              source={require('../../assets/Sadmouse.jpg')}
              style={{ width: 100, height: 100, borderRadius: 50 }}
            />
          </TouchableOpacity>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 10 }}>User Name</Text>
        </View>
        <DrawerItemList {...rest} />
      </DrawerContentScrollView>
    );
  };

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
        headerStyle: { backgroundColor: Colors.PRIMARY },
        drawerStyle: { backgroundColor: Colors.PRIMARY, width: '70%', padding: 10 },
        drawerActiveTintColor: Colors.BLACK
      }}
    >
        <Drawer.Screen 
            name="Inicio" 
            component={HomeScreen} 
            options={{
                drawerIcon: ({ focused, size }) => (
                <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={Colors.BLACK} />
                )
            }} 
        />
        <Drawer.Screen 
            name="Mis Recetas" 
            component={MyRecipes} 
            options={{
                drawerIcon: ({ focused, size }) => (
                <Ionicons name={focused ? 'restaurant' : 'restaurant-outline'} size={size} color={Colors.BLACK} />
                )
            }} 
        />
        <Drawer.Screen 
            name="Favoritos" 
            component={Favorites}
            options={{
                drawerIcon: ({ focused, size }) => (
                <Ionicons name={focused ? 'heart' : 'heart-outline'} size={size} color={Colors.BLACK} />
                )
            }} 
        />
        <Drawer.Screen 
            name="Añadir receta" 
            component={AddRecipe}
            options={{
                drawerIcon: ({ focused, size }) => (
                <Ionicons name={focused ? 'add-circle' : 'add-circle-outline'} size={size} color={Colors.BLACK} />
                )
            }} 
        />
        <Drawer.Screen 
            name="Lista de Compras" 
            component={ShoppingList}
            options={{
                drawerIcon: ({ focused, size }) => (
                <Ionicons name={focused ? 'clipboard' : 'clipboard-outline'} size={size} color={Colors.BLACK} />
                )
            }}  
        />
        <Drawer.Screen 
            name="Planeación" 
            component={WeekPlanning}
            options={{
                drawerIcon: ({ focused, size }) => (
                <Ionicons name={focused ? 'calendar' : 'calendar-outline'} size={size} color={Colors.BLACK} />
                )
            }} 
        />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
