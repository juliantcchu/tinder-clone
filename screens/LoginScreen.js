import { TouchableOpacity, Image, StyleSheet, Button, Text, View } from 'react-native';
import useAuth from '../hooks/useAuth';
import { useNavigation } from '@react-navigation/native';
import { useState, useLayoutEffect, useEffect} from 'react';


const LoginScreen = () => {

    const {loading, signInWithGoogle} = useAuth();
    const navigation = useNavigation();

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerShown: false,
        });
    }, [])

  return (
    <View style={{flex:'1', alignItems:'center', backgroundColor:'white'}}>
        <Image source={require('../media/foodie_icon.png')} style={{width:200, height:100, top:200}}/>
        <TouchableOpacity 
            onPress={signInWithGoogle} 
            style={styles.signInButton}
        >  
                <Image source={require('../media/google_icon.png')} style={{height:20, width:20}}/>
                <Text style={{textAlign:'center', fontWeight:'bold'}}>Sign In with Google</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    signInButton: {
        position:'absolute',
        bottom: '30%',
        backgroundColor:'white', 
        borderWidth:1, 
        borderColor:'gray',
        padding: 10,
        borderRadius: 100 ,
        width:250,
        marginHorizontal:'25%',
        flexDirection:'row',
        justifyContent:'space-around', 
        alignItems:'center'
    },
});

export default LoginScreen;