import { Dimensions, FlatList, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { onSnapshot, collection, where, query} from 'firebase/firestore';
import useAuth from '../hooks/useAuth';
import { useEffect, useState } from 'react';
import {db} from '../firebase';
import ChatRow from '../components/ChatRow';



const ChatList = ({title, callEnabled}) => {
    const {user} = useAuth();
    const [matches, setMatches] = useState([]);

    useEffect(()=>onSnapshot(
        query(
            collection(db, 'matches'), 
            where('usersMatched', 'array-contains', user.uid)
        ), (snapshot)=>setMatches(snapshot.docs.map((doc)=>({
            id: doc.id, 
            ...doc.data(), 
          })))
    ), [user]);

    return matches.length > 0 ? (
        <FlatList 
            style={{height:'100%', width:'100%', }}
            data={matches} 
            keyExtractor = {(item)=>item.id}
            renderItem = {({item})=> (<ChatRow matchDetails={item}/>)} 
        />
   
    ) : (
        <Text>No Matches Yet</Text>
    );
};

export default ChatList;

const styles = StyleSheet.create({
    
})