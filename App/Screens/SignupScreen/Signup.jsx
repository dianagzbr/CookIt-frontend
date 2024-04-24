import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import Colors from "../../Utils/Colors";


export default function Signup({ navigation }){

    return (
        <View style={{ alignItems: 'center' }}>
            <Image source={require('./../../../assets/comida3.jpg')} style={styles.loginImage} 
            />
            <View style={styles.subContainer}>
                <Text style={{fontSize: 30, 
                              color: Colors.BLACK, 
                              fontWeight: 'bold', 
                              textAlign: 'center' }}
                >
                    Registro
                </Text>

                <TextInput placeholder="Correo electronico" 
                           style={styles.input} 
                           keyboardType="default" 
                           autoCapitalize="none" 
                />

                <TextInput placeholder="Contraseña" 
                           style={styles.input} 
                           secureTextEntry={true} 
                           autoCapitalize="none" 
                />

                <TextInput placeholder="Confirmar contraseña" 
                           style={styles.input} 
                           secureTextEntry={true} 
                           autoCapitalize="none" 
                />

                <TouchableOpacity style={styles.button} 
                                  onPress={() => console.log("button clicked")}
                >
                    <Text style={{textAlign: 'center', 
                                  fontSize: 20, 
                                  fontWeight: 'bold', 
                                  color: Colors.WHITE }}
                    >
                       Registrarse
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()  => navigation.navigate("login")}>
                    <Text style={{textAlign:'center', padding:20}}>
                        ¿Ya tienes una cuenta? Inicia sesión
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("home")}>
                    <Text style={{textAlign:'center', padding:10}}>
                        Omitir Registro
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    loginImage: {
        width: 430,
        height: 300,
        borderBottomLeftRadius: 180,
        borderBottomRightRadius: 180
    },

    subContainer: {
        width: '100%',
        height: '70%',
        backgroundColor: Colors.PRIMARY,
        padding: 20
    },

    button: {
        padding: 15,
        width: '75%',
        backgroundColor: Colors.SECONDARY,
        borderRadius: 50,
        marginTop: 30,
        alignSelf: 'center'
    },

    input: {
        padding: 15,
        width: '90%',
        backgroundColor: Colors.WHITE,
        borderRadius: 50,
        marginTop: 25,
        textAlign: 'left',
        alignSelf: 'center'
    },

    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: Colors.GREY,
        justifyContent: 'center',
        alignItems: 'center',
    },

    checked: {
        backgroundColor: Colors.GREEN, 
        borderColor: Colors.GREEN 
    }
});

