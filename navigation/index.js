import React from 'react';
import { AuthContextProvider } from '../context/AuthContext'
import RootNavigator from './RootNavigator';

/**
 * Wrap all providers here
 */

export default function Routes() {
  return (
    <AuthContextProvider>
      <RootNavigator />
    </AuthContextProvider>
  );
}