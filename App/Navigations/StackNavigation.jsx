import { createStackNavigator } from "@react-navigation/stack";
import Login from "../Screens/LoginScreen/Login";
import Signup from "../Screens/SignupScreen/Signup";
import HomeScreen from "../Screens/HomeScreen/HomeScreen"

const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator>
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
        component={HomeScreen}
      />
    </Stack.Navigator>
  );
};

export default StackNavigation;
