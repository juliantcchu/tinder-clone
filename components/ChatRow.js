import { TouchableOpacity, Dimensions, Image, StyleSheet, Button, Text, View } from 'react-native';
import { useEffect, useState } from 'react';import db from '../firebase'
import useAuth from '../hooks/useAuth';
import { useNavigation } from '@react-navigation/native';

const ChatRow = ({matchDetails}) => {

    const {user} = useAuth();
    const matchedUser = matchDetails.users[matchDetails.usersMatched.filter(Id => Id !== user.uid)]
    const navigation = useNavigation()

  return (
    <TouchableOpacity style={styles.chatCard} onPress={()=>navigation.navigate('Message', {matchDetails, matchedUser})}>
        <Image source={{uri: matchedUser.photoURL}} style={styles.profilePic}/>
        <View style={styles.textColumn}>
            <Text style={styles.profileName}>{matchedUser.displayName}</Text>
            <Text style={styles.lastMessage}>Last message...</Text>
        </View>
    </TouchableOpacity>
  );
};

export default ChatRow;

const styles = StyleSheet.create({
    chatCard: {
        padding:10,
        width: '100%',
        borderColor:'#eeeeee', 
        borderBottomWidth:1,
        flexDirection: 'row',
        backgroundColor:'white',
    }, 
    profilePic: {
        height:50, 
        width:50,
        borderRadius:100,
        paddingRight:20, 
    }, 
    textColumn: {
        paddingLeft:10, 
    },
    profileName:{
        fontWeight:'bold', 
        fontSize: 20,
        color:'#333333',
    }, 
    lastMessage:{
        color:'#999999'
    }
})