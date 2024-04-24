import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './App/Screens/LoginScreen/Login';
import Colors from './App/Utils/Colors';
import Signup from './App/Screens/SignupScreen/Signup';


export default function App() {

  console.log('Hola perro')
  return (
    <View style={styles.container}>
      <Signup/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:Colors.PRIMARY,
    paddingTop:50
  },
});
