import { SafeAreaView, StyleSheet, Button, Text, View } from 'react-native';
import Header from '../components/Header';
import ChatList from '../components/ChatList';
import { useEffect, useState } from 'react';import db from '../firebase'
import useAuth from '../hooks/useAuth';
import ModalScreen from './ModalScreen';
import EditProfile from '../components/EditProfile';
import { useNavigation } from '@react-navigation/native';

const EditProfileScreen = ({route}) => {
  const {currProfile} = route.params || {};
  const navigation = useNavigation()


  return (
    <SafeAreaView style={{backgroundColor:'white'}}>
      <View style={{flexDirection:'row'}}>
        {currProfile ? <Button title='< Back' onPress={()=>navigation.goBack()} /> : <></>}
        <Text style={{fontSize:20, top:6, fontWeight:'normal'}}> {' '} Edit Profile</Text>
      </View>
      <EditProfile currProfile={currProfile}/>
    </SafeAreaView>
  );
};

export default EditProfileScreen;