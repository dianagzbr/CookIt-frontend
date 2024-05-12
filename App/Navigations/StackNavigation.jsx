import { createStackNavigator } from "@react-navigation/stack";
import Login from "../Screens/LoginScreen/Login";
import Signup from "../Screens/SignupScreen/Signup";
import HomeScreen from "../Screens/HomeScreen/HomeScreen";
import RstPassword from "../Screens/RestorePasswordScreen/RstPassword";
import RecipeDetails from "../Screens/Recipe/RecipeDetails";
import Colors from "../Utils/Colors";
import Favorites from "../Screens/FavoriteScreen/Favorites";
import AccountActivation from "../Screens/AccountActivation/AccountActivation";

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
        name="home"
        component={HomeScreen}
        options={{ headerTitle: null }}
      />
      <Stack.Screen
        name="rstpass"
        component={RstPassword}
        options={{ headerTitle: null }}
      />
      <Stack.Screen
        name="recipe"
        component={RecipeDetails}
        options={{ headerTitle: null }}
      />
      <Stack.Screen
        name="favorites"
        component={Favorites}
        options={{ headerTitle: null }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigation;
