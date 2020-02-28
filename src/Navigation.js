import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from './LoginScreen';
import Home from './HomeScreen';
import DetailScreen from './DetailScreen';
import SplashScreen from './SplashScreen';

const AuthNavigator = createStackNavigator(
    {
        login: {
            screen: Login,
            navigationOptions: {
                headerShown: false,
            }
        },
    },
    {
        initialRouteName: 'login',
    }
);
const HomeStackNavigator = createStackNavigator(
    {
        home: {
            screen: Home,
            navigationOptions: {
                title: "HOME",
                headerShown: false,
                headerTintColor: "#fff",
                headerStyle: {
                    backgroundColor: '#fff',
                },
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    fontSize: 22
                },
            }
        },
        details: {
            screen: DetailScreen,
            navigationOptions: {
                title: "Detail",
                headerShown: true,
                headerTintColor: "#000",
                headerStyle: {
                    backgroundColor: '#fff',
                },
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    fontSize: 22
                },
            }
        },
    },
);
const InitialNavigator = createSwitchNavigator({
    Splash: SplashScreen,
    Home: HomeStackNavigator,
    Auth: AuthNavigator
});

const AppContainer = createAppContainer(InitialNavigator);

export default AppContainer