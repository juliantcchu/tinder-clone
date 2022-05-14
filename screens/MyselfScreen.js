import { SafeAreaView, StyleSheet, Button, Text, View } from 'react-native';
import Header from '../components/Header';
import ChatList from '../components/ChatList';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import useAuth from '../hooks/useAuth';
import ModalScreen from './ModalScreen';
import Card from '../components/Card';
import {db} from '../firebase'
import { query, where, onSnapshot, doc, collection, setDoc, getDocs, getDoc, serverTimestamp } from 'firebase/firestore';

const MyselfScreen = () => {
  const {user, logout} = useAuth();
  const [myprofile, setMyprofile] = useState({})
  const navigation = useNavigation()



  // get information about my profile
  useEffect(()=>{
    getDoc(doc(db, 'users', user.uid)).then((snapshot)=>{setMyprofile(snapshot.data())});
  }, [user])


  return (
    <View style={styles.container}>
      <View style={{paddingTop:30, padding:20, paddingBottom:0, flex:6}}>
        <Card cardInfo={myprofile}/>
      </View>
      <Button title='edit profile' color='#f73a00' onPress={()=>{
        return navigation.navigate('EditProfile', {currProfile:myprofile});
      }}/>
    </View>
  );
};

export default MyselfScreen;

const styles = StyleSheet.create({
  container:{
    backgroundColor:'white', 
    flex:1,

  }
})