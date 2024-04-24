import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import Colors from "../../Utils/Colors";


export default function Login(){
    const [isChecked, setIsChecked] = useState(false);

    const toggleCheckbox = () => {
        setIsChecked(!isChecked);
    };

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
                    Log in
                </Text>

                <TextInput placeholder="Nombre de Usuario" 
                           style={styles.input} 
                           keyboardType="default" 
                           autoCapitalize="none" 
                />

                <TextInput placeholder="Contraseña" 
                           style={styles.input} 
                           secureTextEntry={true} 
                           autoCapitalize="none" 
                />

                <View style={{flexDirection:'row', 
                             justifyContent:'space-between', 
                             alignItems:'center'}}
                >
                    <TouchableOpacity onPress={toggleCheckbox} 
                                      style={{flexDirection: 'row', 
                                              alignItems: 'center' }}
                    >
                        <View style={[styles.checkbox, 
                                      isChecked ? 
                                      styles.checked : null]} 
                        />
                        <Text style={{fontSize: 15, 
                                      color: Colors.GREY, 
                                      marginLeft: 8 }}
                        >
                            Recuérdame
                        </Text>
                    </TouchableOpacity>

                    <Text style={{fontSize: 15, 
                                  color: Colors.GREY, 
                                  textAlign: 'right', 
                                  padding: 20 }}
                    >
                        Restaurar contraseña
                    </Text>
                </View>

                <TouchableOpacity style={styles.button} 
                                  onPress={() => console.log("button clicked")}
                >
                    <Text style={{textAlign: 'center', 
                                  fontSize: 20, 
                                  fontWeight: 'bold', 
                                  color: Colors.WHITE }}
                    >
                        Iniciar sesión
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

