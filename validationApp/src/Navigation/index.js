import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

import RegistrationPage from '../Container/Registration';
import LoginPage from '../Container/LoginPage';
import DashBoard from '../Container/Dashboard';
import OtpPage from '../Container/OtpPage';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer initialRouteName="Registration">
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Registration" component={RegistrationPage} />
        <Stack.Screen name="Otp" component={OtpPage} />
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="DashBoard" component={DashBoard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
