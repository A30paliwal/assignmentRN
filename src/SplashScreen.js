import React, { Component } from 'react';
import {
    Text,
} from 'react-native';
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
        // Preload data from an external API
        // Preload data using AsyncStorage
        const data = await this.performTimeConsumingTask();

        if (data !== null) {
            this._bootstrapAsync();
        }
    }
    _bootstrapAsync = async () => {
        const userData = await AsyncStorage.getItem('userData');
        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
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
const styles = {
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
}