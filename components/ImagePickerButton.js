import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';




const ImagePickerButton = ({setImageUri}) => {
    const [image, setImage] = useState(null);

    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!result.cancelled) {
        setImage(result.uri);
        setImageUri( Platform.OS === 'ios' ? result.uri.replace('file://', '') : result.uri);
      }
    };

    return (
        <View style={{width:100, height:100, padding:10}}>
            <TouchableOpacity onPress={pickImage}>
                {image ? 
                    <Image source={{ uri: image }} style={styles.pickedImage} />
                    :
                    <View style={styles.ImagePickerButton}>
                        <Ionicons name='add-outline' color='#777777' size={50}/>
                    </View>
                }

            </TouchableOpacity>
        </View>
    )
};

export default ImagePickerButton;

const styles = StyleSheet.create({
    ImagePickerButton:{
        borderRadius:10, 
        borderWidth:3, 
        borderColor:'#777777', 
        justifyContent:'center', 
        alignItems:'center', 
        width:'100%', 
        height:'100%'
    }, 
    pickedImage:{
        borderRadius:10, 
        width:'100%', 
        height:'100%'
    }
})