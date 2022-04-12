import {FlatList, TextInput, KeyboardAvoidingView, SafeAreaView, StyleSheet, Button, Text, View, Platform, TurboModuleRegistry } from 'react-native';
import Header from '../components/Header';
import ChatList from '../components/ChatList';
import { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import { useRoute } from '@react-navigation/native';
import Message from '../components/Message';
import { query, addDoc, collection, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import {db} from '../firebase';

const DUMMY_DATA = [{id:1, msg:'last message!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'first messgae!!'}]
const MessageScreen = () => {

    const {params} = useRoute();
    const [messages, setMessages] = useState([]);
    const [currMessage, setCurrMessage] = useState('');
    const {user} = useAuth();

    useEffect(()=>onSnapshot(
        query(
            collection(db, 'matches', params.matchDetails.id, 'messages'), 
            orderBy('timeStamp', 'desc')
        ), 
        (snapshot)=>
            setMessages(snapshot.docs.map(doc=>({
                id: doc.id, 
                ...doc.data(),
            })))
    ), [params.matchDetails, db])

    const sendMessage = () => {
        addDoc(collection(db, 'matches', params.matchDetails.id, 'messages'), {
            timeStamp: serverTimestamp(), 
            senderId: user.uid, 
            content: currMessage,
        })
        setCurrMessage('');
    }

    console.log('messages', messages)

  return (
    <SafeAreaView style={{backgroundColor:'white', flex:1}}>
      <Header title={params.matchedUser.displayName} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex:1}} 
        keyboardVerticalOffset={10}
      >
          <FlatList 
            data = {messages} 
            renderItem = {({item}) => 
                (<Message 
                    sentByMe={item.senderId === user.uid ? true : false} 
                    content={item.content} 
                />)}
            keyExtractor = {item=>item.id} 
            inverted={true}
            style={styles.messageList}
          />
          <View style={styles.sendArea}>
              <TextInput 
                style={styles.textInputArea} value={currMessage} 
                onChangeText={text=>setCurrMessage(text)} onSubmitEditing={sendMessage}
                placeholder='Send a message ...'
                />
              <Button color='#FF5864' title='Send' onPress={sendMessage} />
          </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default MessageScreen;

const styles = StyleSheet.create({
    sendArea: {
        flexDirection:'row', 
        justifyContent: 'space-between', 
        width:'100%', 
        alignItems:'center',
        padding:10,
    }, 
    textInputArea: {
        borderRadius:1000, 
        borderWidth:1, 
        borderColor: '#cccccc',
        height:40, 
        fontSize:20, 
        paddingLeft:10,
        flex:1,
    },
    messageList:{
        paddingLeft:10,
        paddingRight:10,
    }
})