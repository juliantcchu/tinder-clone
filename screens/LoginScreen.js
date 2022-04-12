import { TouchableOpacity, ImageBackground, StyleSheet, Button, Text, View } from 'react-native';
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
            <TouchableOpacity 
                onPress={signInWithGoogle} 
                style={styles.signInButton}
            >
                <Text style={{textAlign:'center', fontWeight:'bold'}}>Sign In with Google</Text>
            </TouchableOpacity>
        </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
    signInButton: {
        position:'absolute',
        bottom: '40%',
        backgroundColor:'white', 
        padding: 10,
        borderRadius: 10 ,
        width:'50%',
        marginHorizontal:'25%'
    },
});

export default LoginScreen;