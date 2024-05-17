import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './App/Screens/LoginScreen/Login';
import Colors from './App/Utils/Colors';
import Signup from './App/Screens/SignupScreen/Signup';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './App/Navigations/StackNavigation';
import DrawerNavigation from './App/Navigations/DrawerNavigation';



export default function App() {

  console.log('Hola perro')
  return (
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:Colors.PRIMARY,
    paddingTop:50
  },
});
