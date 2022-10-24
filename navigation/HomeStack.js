import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import SessionScreen from '../screens/SessionScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import UploadAvatarScreen from '../screens/UploadAvatarScreen';
import EditAccountSettingsScreen from '../screens/EditAccountSettings';
import DeleteAccountScreen from '../screens/DeleteAccountScreen'
import DeleteConfirmScreen from '../screens/DeleteConfirmScreen'
import StatsScreen from '../screens/StatsScreen'


const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator headerMode='none'>
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='Session' component={SessionScreen} />
      <Stack.Screen name='Profile' component={ProfileScreen} />
      <Stack.Screen name='EditProfile' component={EditProfileScreen} />
      <Stack.Screen name='UploadAvatar' component={UploadAvatarScreen} />
      <Stack.Screen name='AccountSettings' component={EditAccountSettingsScreen} />
      <Stack.Screen name='DeleteAccount' component={DeleteAccountScreen} />
      <Stack.Screen name='DeleteConfirm' component={DeleteConfirmScreen} />
      <Stack.Screen name='Stats' component={StatsScreen} />

    </Stack.Navigator>
  );
}