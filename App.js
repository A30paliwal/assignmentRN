import React from 'react';
import AppContainer from './src/Navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default class App extends React.Component {
  render() {
    return (
      <SafeAreaProvider>
        <AppContainer />
      </SafeAreaProvider>
    );
  };
}