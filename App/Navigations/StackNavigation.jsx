import { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../Screens/LoginScreen/Login";
import Signup from "../Screens/SignupScreen/Signup";
import HomeScreen from "../Screens/HomeScreen/HomeScreen";
import RstPassword from "../Screens/RestorePasswordScreen/RstPassword";
import RecipeDetails from "../Screens/Recipe/RecipeDetails";
import Colors from "../Utils/Colors";
import DrawerNavigation from "./DrawerNavigation";
import Comments from "../Screens/CommentsScreen/Comments";
import Profile from "../Screens/ProfileScreen/Profile";
import AccountActivation from "../Screens/AccountActivation/AccountActivation";
import EditRecipeScreen from "../Screens/Recipe/EditRecipe";
import CreateWeeklyPlanning from "../Screens/WeeklyPlanningScreen/CreateWeeklyPlanning";

const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerStyle: { backgroundColor: Colors.PRIMARY } }}
    >
      <Stack.Screen
        name="login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="signup"
        component={Signup}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="activation"
        component={AccountActivation}
        options={{
          headerStyle: { backgroundColor: "#f3e4d1" },
          headerTitleAlign: "center",
          title: "Activar Cuenta",
          headerBackVisible: false
        }}
      />
      <Stack.Screen
        name="createweek"
        component={CreateWeeklyPlanning}
        options={{
          headerStyle: { backgroundColor: "#f3e4d1" },
          headerTitleAlign: "center",
          title: "Crear planeacion semanal",
          headerBackVisible: false
        }}
      />
      <Stack.Screen
        name="home"
        component={DrawerNavigation}
        options={{  headerShown: false}}
      />
      <Stack.Screen
        name="rstpass"
        component={RstPassword}
        options={{ title:' ' }}
      />
      <Stack.Screen
        name="recipe"
        component={RecipeDetails}
        options={{ title:' ' }}
      />
      <Stack.Screen
        name="comments"
        component={Comments}
        options={{title:'Comentarios y calificación'}}
      />
      <Stack.Screen
        name="profile"
        component={Profile}
        options={{title:'Perfil de usuario'}}
      />
      <Stack.Screen
        name="editRecipe"
        component={EditRecipeScreen}
        options={{title:'Editar Receta'}}
      />
    </Stack.Navigator>
  );
};

export default StackNavigation;
