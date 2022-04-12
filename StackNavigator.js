import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, Text, View } from 'react-native';
import tw from 'tailwind-rn';

import useAuth from './hooks/useAuth'

import ChatScreen from './screens/ChatScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import ModalScreen from './screens/ModalScreen';
import MessageScreen from './screens/MessageScreen';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {

    const {user} = useAuth()
  return (
    <Stack.Navigator
        screenOptions={{
            headerShown:false,
        }}
    >
        {user ? (
            <>
                <Stack.Group>
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="Chat" component={ChatScreen} />
                    <Stack.Screen name="Message" component={MessageScreen} />
                </Stack.Group>
                <Stack.Group screenOptions={{presentation:'modal'}}>
                    <Stack.Screen name="Modal" component={ModalScreen} />
                </Stack.Group>
            </>
        ) : (
            <Stack.Screen name="Login" component={LoginScreen} />
        )}
    </Stack.Navigator>
  );
}

export default StackNavigator;