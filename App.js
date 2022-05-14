import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './StackNavigator';
import React from 'react';
import useAuth, {AuthProvider} from './hooks/useAuth'


import {LogBox} from 'react-native';
LogBox.ignoreAllLogs();

export default function App() {
  return (
      <NavigationContainer>
        <AuthProvider>
          <StackNavigator />
        </AuthProvider>
      </NavigationContainer>
  );
}
