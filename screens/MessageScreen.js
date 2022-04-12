import {FlatList, TextInput, KeyboardAvoidingView, SafeAreaView, StyleSheet, Button, Text, View, Platform, TurboModuleRegistry } from 'react-native';
import Header from '../components/Header';
import ChatList from '../components/ChatList';
import { useEffect, useState } from 'react';import db from '../firebase'
import useAuth from '../hooks/useAuth';
import { useRoute } from '@react-navigation/native';

const DUMMY_DATA = [{id:1, msg:'hello!!'}]//, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}, {id:1, msg:'hello!!'}]
const MessageScreen = () => {

    const {params} = useRoute();

  return (
    <SafeAreaView style={{backgroundColor:'white', flex:1}}>
      <Header title={params.matchedUser.displayName} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex:1}} 
        keyboardVerticalOffset={10}
      >
          <FlatList 
            data = {DUMMY_DATA} 
            renderItem = {({item}) => (<><Text>{item.msg}</Text></>)}
            keyExtractor = {item=>item.id} 
            inverted={TurboModuleRegistry}
          />
          <View style={styles.sendArea}>
              <TextInput style={styles.textInputArea} placeholder='Send a message ...'/>
              <Button color='#FF5864' title='Send'/>
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
})