import { createStackNavigator } from "@react-navigation/stack";
import Login from "../Screens/LoginScreen/Login";
import Signup from "../Screens/SignupScreen/Signup";
import RstPassword from "../Screens/RestorePasswordScreen/RstPassword";
import RecipeDetails from "../Screens/Recipe/RecipeDetails";
import Colors from "../Utils/Colors";
import DrawerNavigation from "./DrawerNavigation";
import Comments from "../Screens/CommentsScreen/Comments";
import Profile from "../Screens/ProfileScreen/Profile";

const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerStyle:{backgroundColor: Colors.PRIMARY} }}>
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
    </Stack.Navigator>
  );
};


export default StackNavigation;
