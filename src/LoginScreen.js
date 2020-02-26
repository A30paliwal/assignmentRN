import React, { Component } from 'react'
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, Dimensions, Button } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { DATA } from './data'
const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            pass: '',
            dataSource: null,
            isLoading: true
        };
    }
    _storeData = async () => {
        try {
            await AsyncStorage.setItem('testData', JSON.stringify(DATA));
        } catch (error) {
            console.log("Error: ", error)
        }
    };
    loginValidation = () => {
        const { email, pass } = this.state;
        if (email == '') {
            Alert.alert('Please enter email.')
        }
        else if (!email.match(mailformat)) {
            Alert.alert('Please enter valid email.')
        }
        else if (pass == '') {
            Alert.alert('Please enter password.')
        }
        else {
            this.storeLoginData(email);
            this._storeData();
            this.props.navigation.navigate('Home');
        }
    }
    storeLoginData = async (email) => {
        try {
            await AsyncStorage.setItem('userData', JSON.stringify(email))
            console.log("DATA SAVED");
        } catch (e) {
            console.log(`Error ${e}`)
        }
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView contentContainerStyle={styles.container}
                    keyboardShouldPersistTaps='handled'
                    alwaysBounceVertical={false}>
                    <Text style={styles.textFirst}>
                        LOGIN.
                    </Text>
                    <View style={styles.container2}>
                        <View style={styles.searchSection}>
                            <TextInput style={styles.textarea}
                                onChangeText={email => this.setState({ email })}
                                placeholder='Email Address'
                                placeholderTextColor='#333'
                                returnKeyType='next'
                                autoCorrect={false}
                            />
                            <Ionicons style={styles.lockIcon} name="ios-lock" size={25} color="#000" />
                        </View>
                        <View style={styles.searchSection}>
                            <TextInput style={styles.textarea}
                                onChangeText={pass => this.setState({ pass })}
                                placeholder='Password'
                                placeholderTextColor='#333'
                                returnKeyType='go'
                                secureTextEntry
                                autoCorrect={false}
                            />
                            <Ionicons style={styles.lockIcon} name="ios-lock" size={25} color="#000" />
                        </View>
                        <TouchableOpacity style={styles.buttonContainer} activeOpacity={0.8} onPress={this.loginValidation}>
                            <Text style={styles.buttonText} >Login</Text>
                        </TouchableOpacity>
                        <Text style={styles.buttonText2}>Create Account</Text>
                        <Text style={styles.buttonText2}>Forgot password?</Text>

                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: "#ccc",
    },
    container2: {
        flex: 1,
        justifyContent: 'center',
    },
    searchSection: {
        flexDirection: 'row',
        marginTop: 10
    },
    lockIcon: {
        paddingVertical: 4,
        position: 'absolute',
        marginHorizontal: 30,
        right: 0
    },
    textFirst: {
        marginTop: 80,
        fontSize: 45,
        color: '#000',
        marginHorizontal: 30,
        fontWeight: '300'
    },
    textarea: {
        flex: 1,
        color: '#000',
        fontSize: 18,
        marginHorizontal: 30,
        paddingVertical: 5,
        marginBottom: 30,
        alignContent: 'center',
        borderBottomWidth: 1.5,
        borderColor: '#333'
    },
    buttonContainer: {
        backgroundColor: '#6699CC',
        marginHorizontal: 30,
        marginTop: 25,
        marginBottom: 70,
        height: 50,
        shadowOffset: { height: 1, width: 1 },
        shadowColor: 'black',
        shadowRadius: 6,
        justifyContent: 'center'

    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
        padding: 10,
    },
    buttonText2: {
        color: '#0066FF',
        fontSize: 18,
        paddingVertical: 10,
        fontWeight: '600',
        marginHorizontal: 30,
    },
});