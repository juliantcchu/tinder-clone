import { useNavigation } from '@react-navigation/native';
import useAuth from '../hooks/useAuth';
import {Dimensions, StyleSheet, Image, Button, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { useEffect, useLayoutEffect, useRef, useState} from 'react';
import {Ionicons, Entypo, AntDesign} from '@expo/vector-icons';
import { query, where, onSnapshot, doc, collection, setDoc, getDocs, getDoc, serverTimestamp } from 'firebase/firestore';
import {db} from '../firebase'
import generateId from '../lib/generateId'
import TopBar from '../components/TopBar';
import CardSwiper from '../components/CardSwiper';




const HomeScreen = () => {
    const navigation = useNavigation();
    const {user, logout} = useAuth();
    

    useLayoutEffect(()=>
        onSnapshot(doc(db, 'users', user.uid), snapshot=>{
                if (!snapshot.exists()) {
                    navigation.navigate('EditProfile');
                }
            }
        ),[])


    return (
        <View style={styles.screen}>
            <CardSwiper style={{flex:1}}/>
        </View>
    );
};


const styles = StyleSheet.create({
    screen:{
        backgroundColor:'white', 
        height:'100%', 
        width:'100%',
    }
})

export default HomeScreen; 