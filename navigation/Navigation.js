import  React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './Screens/Login'
import Signup from './Screens/Signup'
import Employee from './Screens/Employee';
import { StyleSheet } from 'react-native';
import AnimatedView from './Screens/AnimatedView';
import RealSignup from './Screens/RealSignup';
import RealLogin from './Screens/RealLogin';
import RealEmployee from './Screens/RealEmployee';

const Stack = createNativeStackNavigator();
export default function Navigation()
{
    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown:false, headerBackButtonMenuEnabled:false}}>
                <Stack.Screen name='signup' component={RealSignup} options={()=>{
                    
                }}/>
                <Stack.Screen name='login' component={RealLogin}/>
                <Stack.Screen name="employee" component={RealEmployee}/>
                
            </Stack.Navigator>
        </NavigationContainer>
    )
}