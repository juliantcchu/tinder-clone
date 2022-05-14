import {Dimensions, StyleSheet, Image, Button, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
// import {Foundation, Ionicons} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Swiper from 'react-native-deck-swiper';
import generateId from '../lib/generateId'
import {db} from '../firebase'

import useAuth from '../hooks/useAuth';
import { useEffect, useLayoutEffect, useRef, useState} from 'react';
import {Ionicons, Entypo, AntDesign} from '@expo/vector-icons';
import { query, where, onSnapshot, doc, collection, setDoc, getDocs, getDoc, serverTimestamp } from 'firebase/firestore';
import Card from './Card';




const CardSwiper = () => {
    const navigation = useNavigation();
    const swipeRef = useRef(null);
    const {user, logout} = useAuth();
    const [profiles, setProfiles] = useState([]);
    let userProfile = {};


    useEffect(()=>{
        let unsub;
        const fetchCards = async () => {

            const passedUserIds = await getDocs(collection(db, 'users', user.uid, 'passes'))
            .then(snapshot=>snapshot.docs.map(doc=>doc.id))
            const swipedUserIds = await getDocs(collection(db, 'users', user.uid, 'swipes'))
            .then(snapshot=>snapshot.docs.map(doc=>doc.id))


            const shownUserIds = [...passedUserIds.length > 0 ? passedUserIds : ['none']
                                , ...swipedUserIds.length > 0 ? swipedUserIds : ['none']]

            unsub = onSnapshot(query(collection(db, 'users'), where('id', 'not-in', [...shownUserIds])), 
            (snapshot) => {

                setProfiles(
                    snapshot.docs.filter(doc=>doc.id !== user.uid).map((doc)=> ({
                        id: doc.id, 
                        ...doc.data(),
                    }))
                )

            })
        }
        fetchCards();
        // return unsub();
    }, [db])


    const swipeLeft = async (cardIndex)=>{
        if (!profiles[cardIndex]) return;
        const userSwiped = profiles[cardIndex];
        console.log('you swiped PASS on ' + userSwiped.displayName);
        setDoc(doc(db, 'users', user.uid, 'passes', userSwiped.id), userSwiped);
    }

    const swipeRight = async (cardIndex)=>{
        if (!profiles[cardIndex]) return;
        const userSwiped = profiles[cardIndex];

        const userProfile = await (
            await getDoc(doc(db, 'users', user.uid))
        ).data();

        // add to my list of swipes
        setDoc(doc(db, 'users', user.uid, 'swipes', userSwiped.id), userSwiped);

        // check if the person I swiped on also swiped on me
        getDoc(doc(db, 'users', userSwiped.id, 'swipes', user.uid)).then(snapshot=>{
            if (snapshot.exists()){
                // if yes, match them
                setDoc(doc(db, 'matches', generateId(user.uid, userSwiped.id)), {
                    users: {
                        [user.uid]: userProfile, 
                        [userSwiped.id]: userSwiped, 
                    },
                    usersMatched: [user.uid, userSwiped.id], 
                    timeStamp: serverTimestamp(), 
                })

                // match screen
                alert('you are MATCHED with ' + userSwiped.displayName);
            }
        })
    }
    

    return (   
        <View style={{flex:1, marginTop:-30}}>
        <Swiper 
            ref={swipeRef}
            containerStyle={{backgroundColor:'transparent'}}
            cards={profiles}
            stackSize={3} 
            cardIndex={0}
            animateCardOpacity 
            verticalSwipe={false} 
            onSwipedLeft={(cardIndex)=>{
                console.log('swiped NOPE')
                swipeLeft(cardIndex);
            }}
            onSwipedRight={(cardIndex)=>{
                console.log('swiped YEP')
                swipeRight(cardIndex);
            }}
            overlayLabels={{
                left:{
                    title:'NOPE', 
                    style:{
                        label:{
                            textAlign:'right', 
                            color:'red'
                        }, 
                    },
                },

                right:{
                    title:'YEP', 
                    style:{
                        label:{
                            textAlign:'left', 
                            color:'lightgreen'
                        }, 
                    },
                },
            }}
            renderCard={(card)=>card ? (
                <Card cardInfo={card} />
            ) : (
                <View>
                    <Text>No More Profiles</Text>
                </View>
            )}
        />

        {/* <TouchableOpacity>
            <I
        </TouchableOpacity> */}
    </View>
    );
};

export default CardSwiper;


const styles = StyleSheet.create({

})