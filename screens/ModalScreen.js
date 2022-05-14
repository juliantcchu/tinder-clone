
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { TouchableWithoutFeedback, SafeAreaView, StyleSheet, Image, Text, View, TextInput, Button, TouchableOpacity, Keyboard} from 'react-native';
import useAuth from '../hooks/useAuth';
import { doc, setDoc, serverTimestamp } from '@firebase/firestore'
import {db} from '../firebase'

const ModalScreen = () => {


  return (
    <View style={{flex:1, alignItems:'center', padding:20}}>
     
     <Text style={{fontSize:20}}>Settings</Text>
 
    </View>
  );
};

export default ModalScreen;

const styles = StyleSheet.create({

})