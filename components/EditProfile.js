
import { useState, useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
import { TouchableWithoutFeedback, ScrollView, StyleSheet, Image, Text, View, TextInput, Button, TouchableOpacity, Keyboard} from 'react-native';
import useAuth from '../hooks/useAuth';
import { doc, setDoc, serverTimestamp } from '@firebase/firestore'
import {db, storage} from '../firebase'
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes } from "firebase/storage";
import uploadImage from '../lib/uploadImage';
import ImagePickerButton from './ImagePickerButton';
import InterestButton from './InterestButton';




const EditProfile = ({currProfile}) => {

  const {user} = useAuth();
  const navigation = useNavigation();
  const firstTime = currProfile ? true : false


  const [name, setName] = useState(currProfile ? currProfile.displayName : null)
  const [ppUrl, setPpUrl] = useState(currProfile ? currProfile.photoURL : null)
  const [bio, setBio] = useState(currProfile ? currProfile.bio : null)
  const [age, setAge] = useState(currProfile ? currProfile.age : null)

  const [images, setImages] = useState(['', '', '', '', '', '']); // 6 pictures
  const setImageUriFunction = (uri, index)=>{
    let newImages = images;
    newImages[index] = uri;
    setImages(newImages);
  }

  // const interests = ['coffee', 'burgers', 'sushi'];
  // const [interestsComponents, setInterestsComponents] = useState([]);
  // useEffect(()=>{
  //   let temp = [];
  //   for (let i = 0; i < interests.length; i++){
  //     temp[i] = <InterestButton interestName={interests[i]}/>
  //   }
  //   setInterestsComponents(temp);
  // }, [interests])

  const updateUserProfile = () => {

    // uploadImage(ppUrl, setPpUrl)
    setDoc(doc(db, 'users', user.uid), {
      id: user.uid, 
      displayName: name,  
      photoURL: ppUrl,
      bio: bio, 
      age: age, 
      timeStamp: serverTimestamp(),
    }).then(()=>navigation.goBack()).catch((error)=>alert(error.message))
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>    
            <View>

            <Text style={styles.instruction}>
                Your Name
              </Text>
              <TextInput 
                style={styles.input} 
                onChangeText={(text)=>setName(text)}
                value={name}
                placeholder='Enter your name ...'
              >
              </TextInput>
              <Text style={styles.instruction}>
                Pictures
              </Text>
              <View style={styles.addImageArea}>
              <ImagePickerButton setImageUri={(uri)=>setImageUriFunction(uri, 0)}/>
              <ImagePickerButton setImageUri={(uri)=>setImageUriFunction(uri, 1)}/>
              <ImagePickerButton setImageUri={(uri)=>setImageUriFunction(uri, 2)}/>
              <ImagePickerButton setImageUri={(uri)=>setImageUriFunction(uri, 3)}/>
              <ImagePickerButton setImageUri={(uri)=>setImageUriFunction(uri, 4)}/>
              <ImagePickerButton setImageUri={(uri)=>setImageUriFunction(uri, 5)}/>
              </View>

              <Text style={styles.instruction}>
                Bio
              </Text>
              <TextInput 
                style={[styles.input, {fontSize:15, height:100}]} 
                onChangeText={(text)=>setBio(text)}
                multiline={true}
                numberOfLines={4}
                value={bio}
                placeholder='Enter your bio ...'
              >
              </TextInput>

              <Text style={styles.instruction}>
                age
              </Text>
              <TextInput 
                style={styles.input} 
                onChangeText={(text)=>setAge(text)}
                value={age}
                placeholder='Enter your age ...'
                keyboardType='numeric'
                maxLength={3}
              >
              </TextInput>

              <Text style={styles.instruction}>
                Interests
              </Text>

              {/* <View style={styles.interestArea}>
                {interestsComponents}
              </View> */}

              <Button 
                title={firstTime ? 'Update Profile' : 'Set Profile'}
                disabled={false}
                onPress={()=>updateUserProfile()}
              />
            </View>
        </TouchableWithoutFeedback>
  
      </View>
    </ScrollView>
  );
};

export default EditProfile;




const styles = StyleSheet.create({
    container:{
      padding:20,
      height:'100%', 
      alignItems:'center',
    },
    input:{
        fontSize:20,
        color:'#555555',
        borderWidth:1, 
        borderColor:'#f73a00', 
        borderRadius:10, 
        borderWidth:2,
        padding:10
        
    },
    instruction:{
        paddingTop:10,
        fontWeight:'bold',
        fontSize:20, 
        color:'#f73a00',
    }, 
    addImageArea:{
      flexDirection:'row', 
      flexWrap:'wrap',
      justifyContent:'space-around',
      width:'100%'
    }, 
    interestArea:{
      flexDirection:'row', 
      flexWrap:'wrap',
      justifyContent:'flex-start',
      width:'100%'
    }
})