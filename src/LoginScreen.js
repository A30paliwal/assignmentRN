import React, { Component } from 'react'
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, Dimensions, Button } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
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

    loginValidation = () => {
        const { user, pass } = this.state;
        if (user == '') {
            Alert.alert('Please enter username.')
        }
        else if (pass == '') {
            Alert.alert('Please enter password.')
        }
        else {
            this.props.navigation.navigate('Home');
        }
    }
    apiValidation = () => {
        const { email } = this.state;
        const { pass } = this.state;
    }
    storeData = async (data) => {
        try {
            await AsyncStorage.setItem('userData', JSON.stringify(data))
            console.log("DATA SAVED")
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
                    <View style={styles.container1}>
                        <Text style={styles.textFirst}>
                            LOGIN.
                        </Text>
                    </View>
                    <View style={styles.container2}>
                        <View style={styles.searchSection}>
                            <TextInput style={styles.textarea}
                                onChangeText={email => this.setState({ email })}
                                placeholder='Email Address'
                                placeholderTextColor='#333'
                                returnKeyType='next'
                                autoCorrect={false}
                            />
                            <Ionicons style={styles.searchIcon} name="ios-lock" size={25} color="#000" />
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
                            <Ionicons style={styles.searchIcon} name="ios-lock" size={25} color="#000" />
                        </View>
                        <TouchableOpacity style={styles.buttonContainer} activeOpacity={0.8} onPress={this.loginValidation}>
                            <Text style={styles.buttonText} >Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonContainer2} activeOpacity={0.8}>
                            <Text style={styles.buttonText2}>Create Account</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonContainer2} activeOpacity={0.8}>
                            <Text style={styles.buttonText2}>Forgot password?</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: "#999",
    },
    container1: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 20
    },
    container2: {
        flex: 1,
        justifyContent: 'center',
    },
    container3: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 30
    },
    searchSection: {
        flexDirection: 'row',
    },
    searchIcon: {
        paddingVertical: 4,
        position: 'absolute',
        marginHorizontal: 30,
        right: 0
    },
    textFirst: {
        fontSize: 45,
        color: '#000',
        marginHorizontal: 30,
        marginBottom: 5
    },
    textarea: {
        flex: 1,
        color: '#000',
        fontSize: 20,
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
        marginBottom: 70,
        shadowOffset: { height: 1, width: 1 },
        shadowColor: 'black',
        shadowRadius: 6

    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 22,
        padding: 10,
    },
    buttonContainer2: {
        marginHorizontal: 30,
    },
    buttonText2: {
        color: '#0066FF',
        fontSize: 18,
        padding: 10,
        fontWeight: '600'
    },
});