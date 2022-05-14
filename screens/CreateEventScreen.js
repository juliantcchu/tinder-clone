import { SafeAreaView, StyleSheet, Button, Text, View } from 'react-native';
import Header from '../components/Header';
import ChatList from '../components/ChatList';
import { useEffect, useState } from 'react';import db from '../firebase'
import useAuth from '../hooks/useAuth';

const ChatScreen = () => {

  return (
    <SafeAreaView style={{backgroundColor:'white'}}>
      <Text>Create Event Page</Text>
    </SafeAreaView>
  );
};

export default ChatScreen;