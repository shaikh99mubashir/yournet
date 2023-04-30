import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../../Screens/SplashScreen';
import MyDrawer from '../MyDrawer';
import Login from '../../Screens/Login';
import ForgotPassword from '../../Screens/ForgotPassword';
import Verification from '../../Screens/Verification';
import NewPassword from '../../Screens/NewPassword';

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="ForgotPassword" component={ForgotPassword}/>
        <Stack.Screen name="Verification" component={Verification}/>
        <Stack.Screen name="NewPassword" component={NewPassword}/>
        <Stack.Screen name="Home" component={MyDrawer}/>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack