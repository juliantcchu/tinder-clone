import { Text, View, StyleSheet, TouchableWithoutFeedback, Image } from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';




const InterestButton = ({interestName, icon, selected, selectFunc}) => {

    selected = selected || false;
    interestName = interestName || 'None'
    
    

    return (
        <View style={[styles.interestButton, selected ? {backgroundColor:'#dddddd'} : {backgroundColor:'#ffffff'}]}>
            <TouchableWithoutFeedback onPress={()=>selectFunc}>
                <Text>{interestName}</Text>
            </TouchableWithoutFeedback>
        </View>
    )
};

export default InterestButton;

const styles = StyleSheet.create({
    interestButton:{
        borderWidth:0.5, 
        borderRadius:100, 
        borderColor:'gray', 
        padding:5, 
        paddingLeft:10, 
        paddingRight:10,
        alignSelf: 'flex-start', 
        marginRight:5,
        marginTop:5,
    }
})