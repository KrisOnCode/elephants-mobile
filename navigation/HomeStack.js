import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import SessionScreen from '../screens/SessionScreen';

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator headerMode='none'>
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='Session' component={SessionScreen} />
    </Stack.Navigator>
  );
}