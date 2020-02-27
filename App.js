import React from 'react';
import AppContainer from './src/Navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, Text } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      // <View><Text>Hello World!</Text></View>
      <SafeAreaProvider>
        <AppContainer />
      </SafeAreaProvider>
    );
  };
}