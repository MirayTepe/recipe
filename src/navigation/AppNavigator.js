import * as React from'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'; 
import { createStackNavigator } from '@react-navigation/stack';
// import HomeScreen from '../screens/HomeScreen'
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

const Stack = createStackNavigator();

const AppNavigator=()=>{
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Welcome' screenOptions={{headerShoen:false}}>
                {/* <Stack.Screen name="Home" component={HomeScreen}/> */}
                <Stack.Screen name="Welcome" component={WelcomeScreen}/>
                <Stack.Screen name="Login" component={LoginScreen}/>
                <Stack.Screen name="Register" component={RegisterScreen}/>
            </Stack.Navigator>
        </NavigationContainer>

    );
}
export default AppNavigator;
const styles=StyleSheet.create({});