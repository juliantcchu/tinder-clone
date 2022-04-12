
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { TouchableWithoutFeedback, SafeAreaView, StyleSheet, Image, Text, View, TextInput, TouchableOpacity, Keyboard} from 'react-native';
import useAuth from '../hooks/useAuth';
import { doc, setDoc, serverTimestamp } from '@firebase/firestore'
import {db} from '../firebase'

const ModalScreen = () => {

  const {user} = useAuth();
  const navigation = useNavigation();

  const [ppUrl, setPpUrl] = useState(null) //user.photoURL
  const [occupation, setOccupation] = useState(null)
  const [age, setAge] = useState(null)

  const incompleForm = !ppUrl | !occupation | !age;

  const updateUserProfile = () => {
    setDoc(doc(db, 'users', user.uid), {
      id: user.uid, 
      displayName: user.displayName, 
      photoURL: ppUrl, 
      occupation: occupation, 
      age: age, 
      timeStamp: serverTimestamp(),
    }).then(()=>navigation.navigate('Home')).catch((error)=>alert(error.message))
  }

  return (
    <SafeAreaView style={styles.modal}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <>    
          <View style={styles.headerSection}>
            <Image 
              style={styles.logo}
              resizeMode='contain'
              source={require('../media/tinder_logo_2.png')}
            />
          </View>


          <View style={styles.instructions}>
            <Text style={styles.welcomeText}>
                Welcome, {user.displayName}!
            </Text>
            <Text style={styles.instructionText}>
              Step 1: the Profile Picture
            </Text>
            <TextInput 
              style={styles.inputPlaceholderText} 
              onChangeText={(text)=>setPpUrl(text)}
              placeholder='Enter a profile picture URL ...' 
              value={ppUrl}
            >
            </TextInput>

            <Text style={styles.instructionText}>
              Step 2: Your Job
            </Text>
            <TextInput 
              style={styles.inputPlaceholderText} 
              onChangeText={(text)=>setOccupation(text)}
              value={occupation}
              placeholder='Enter your occupation ...'
            >
            </TextInput>

            <Text style={styles.instructionText}>
              Step 3: Your Age
            </Text>
            <TextInput 
              style={styles.inputPlaceholderText} 
              onChangeText={(text)=>setAge(text)}
              value={age}
              placeholder='Enter your age ...'
              keyboardType='numeric'
              maxLength={3}
            >
            </TextInput>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.updateButton, 
              incompleForm ? {backgroundColor:'grey'} : {backgroundColor:'#ff624d'}]} 
              disabled={incompleForm}
              onPress={()=>updateUserProfile()}
            >
              <Text style={{color:'white', fontWeight:'bold'}}>Update Profile</Text>
            </TouchableOpacity>
          </View>
        </>
      </TouchableWithoutFeedback>
 
    </SafeAreaView>
  );
};

export default ModalScreen;

const styles = StyleSheet.create({
  modal:{
    flex:1, 
    alignItems:'center', 
    paddingTop:10,
  }, 
  headerSection:{
    flex:1
  },
  logo:{
    height:70,
  } ,
  instructions:{
    flex:8,
    alignItems:'center', 
  },
  welcomeText:{
    fontSize:20, 
    fontWeight:'bold', 
    color:'#6e6e6e',
    paddingBottom:20,
  }, 
  instructionText:{
    padding:20, 
    fontWeight:'bold',
    color:'#ff1249'
  }, 
  inputPlaceholderText:{
    fontSize:15, 
    paddingBottom:10, 
  }, 
  buttonContainer:{
    flex:1.5
  },
  updateButton:{
    width:200, 
    height:50,
    borderRadius:1000,  
    padding:10,
    // backgroundColore:'#ff624d',
    justifyContent:'center', 
    alignItems:'center',
  }
})