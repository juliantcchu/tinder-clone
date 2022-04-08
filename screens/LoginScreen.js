import { ImageBackground, StyleSheet, Button, Text, View } from 'react-native';
import useAuth from '../hooks/useAuth';
import { useNavigation } from '@react-navigation/native';
import { useState, useLayoutEffect, useEffect} from 'react';


const LoginScreen = () => {

    const {loading, signInWithGoogle} = useAuth();
    const navigation = useNavigation();

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerShown: false,
        })
    }, [])

  return (
    <View style={{flex:'1'}}>
        <ImageBackground
            resizeMode='cover' 
            style={{flex:'1'}} 
            source={{uri: 'https://images.unsplash.com/photo-1581985673473-0784a7a44e39?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmFja2dyb3VuZCUyMGRlc2lnbnxlbnwwfHwwfHw%3D&w=1000&q=80'}}
        >
            <Text>{loading ? 'loading...' : 'Login to the App'}</Text> 
            <Button title='Sign In with Google' onPress={signInWithGoogle} />
        </ImageBackground>
    </View>
  );
};

export default LoginScreen;