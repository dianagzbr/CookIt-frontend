import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import Colors from "../../Utils/Colors";

export default function RstPassword(){
    return (
        <View style={{flex: 1, backgroundColor: Colors.PRIMARY, alignItems: 'center'}}>
            <View style={styles.circularImageContainer}>
                <Image source={require('./../../../assets/Sadmouse.jpg')} style={styles.circularImage}/>
            </View>
            <Text style={{fontSize: 28, 
                        color: Colors.BLACK, 
                        fontWeight: 'bold', 
                        textAlign: 'center',
                        padding: 23 
                        }}
                >
                    ¿Olvidaste tu contraseña?
            </Text>
            <Text style={{fontSize: 20, 
                        color: Colors.BLACK, 
                        fontWeight: 'normal', 
                        textAlign: 'center',
                        padding: 5,
                        justifyContent: 'center'
                        }}
                >
                    Ingresa tu correo electrónico
                    para restablecer tu contraseña
            </Text>
            <TextInput placeholder="Correo electrónico" 
                           style={styles.input} 
                           keyboardType="default" 
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
                        Enviar
                    </Text>
                </TouchableOpacity>
            
        </View>
    );
};

const styles = StyleSheet.create({
    circularImageContainer: {
        width: 300, 
        height: 300, 
        borderRadius: 150, // Mitad del ancho/alto para hacer un círculo
        overflow: 'hidden', // Recorta la imagen en forma de círculo
        marginTop: 40
    },
    circularImage: {
        width: '100%', 
        height: '100%', 
        resizeMode: 'cover', 
    },
    input: {
        padding: 15,
        width: '80%',
        backgroundColor: Colors.WHITE,
        borderRadius: 50,
        marginTop: 25,
        textAlign: 'left',
        alignSelf: 'center'
    },
    button: {
        padding: 15,
        width: '75%',
        backgroundColor: Colors.SECONDARY,
        borderRadius: 50,
        marginTop: 30,
        alignSelf: 'center'
    },
})