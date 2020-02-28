import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-community/async-storage';

export default class SplashScreen extends Component {
    performTimeConsumingTask = async () => {
        return new Promise((resolve) =>
            setTimeout(
                () => { resolve('result') },
                2000
            )
        )
    }

    async componentDidMount() {
        const data = await this.performTimeConsumingTask();

        if (data !== null) {
            this._bootstrapAsync();
        }
    }
    _bootstrapAsync = async () => {
        const userData = await AsyncStorage.getItem('userData');
        console.log('userData: ', userData);
        this.props.navigation.navigate(userData ? 'Home' : 'Auth');
    };
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>Assignment</Text>
            </SafeAreaView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 26,
        color: "#F56367",
        paddingVertical: 5
    }
});