import { useNavigation } from '@react-navigation/native';
import useAuth from '../hooks/useAuth';
import {Dimensions, StyleSheet, Image, Button, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { useEffect, useLayoutEffect, useRef, useState} from 'react';
import {Ionicons, Entypo, AntDesign} from '@expo/vector-icons';
import Swiper from 'react-native-deck-swiper';
import { query, where, onSnapshot, doc, collection, setDoc, getDocs, getDoc, serverTimestamp } from 'firebase/firestore';
import {db} from '../firebase'
import generateId from '../lib/generateId'




const DUMMY_DATA = [
    {
        id:1,
        firstName:'Mary', 
        lastName: 'Henling', 
        occupation: 'Developer', 
        photoURL: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80', 
        age:27,
    }, 

    {
        id:2,
        firstName:'Tom', 
        lastName: 'Wayne', 
        occupation: 'Developer', 
        photoURL: 'https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/03/GettyImages-1092658864_thumb-732x549.jpg', 
        age:27,
    },
    {
        id:1,
        firstName:'Mary', 
        lastName: 'Henling', 
        occupation: 'Developer', 
        photoURL: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80', 
        age:27,
    }, 

    {
        id:2,
        firstName:'Tom', 
        lastName: 'Wayne', 
        occupation: 'Developer', 
        photoURL: 'https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/03/GettyImages-1092658864_thumb-732x549.jpg', 
        age:27,
    },
    {
        id:1,
        firstName:'Mary', 
        lastName: 'Henling', 
        occupation: 'Developer', 
        photoURL: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80', 
        age:27,
    }, 

    {
        id:2,
        firstName:'Tom', 
        lastName: 'Wayne', 
        occupation: 'Developer', 
        photoURL: 'https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/03/GettyImages-1092658864_thumb-732x549.jpg', 
        age:27,
    },
    
]





const HomeScreen = () => {
    const navigation = useNavigation();
    const {user, logout} = useAuth();
    
    const swipeRef = useRef(null);
    const [profiles, setProfiles] = useState([]);
    let userProfile = {};
    

    useLayoutEffect(()=>
        onSnapshot(doc(db, 'users', user.uid), snapshot=>{
                if (!snapshot.exists()) {
                    navigation.navigate('Modal');
                }
            }
        ),[])

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
        <SafeAreaView style={{flex:1}}>
            {/* header */}
            <View style={{alignItems:'center', flex:1}}>
                <TouchableOpacity 
                    style={{position:'absolute', left:20, top:10}} 
                    onPress={logout}
                >
                    <Image 
                        style = {{height:40, width:40, borderRadius:100}}
                        source = {{uri: user.photoURL}}
                    />
                </TouchableOpacity>

                <TouchableOpacity style={{position:'relative', top:5}}
                    onPress={()=>navigation.navigate('Modal')}
                >
                    <Image 
                        style = {{height:50, width:50}}
                        source = {require('../media/tinder_logo.png')}
                    />
                </TouchableOpacity>

                <TouchableOpacity 
                    style={{position:'absolute', right:20, top:10}} 
                    onPress={()=>navigation.navigate('Chat')}
                >
                    <Ionicons name="chatbubbles-sharp" size={40} color='#FF5864'/>
                </TouchableOpacity>
            </View>
            
            <View style={{flex:9, marginTop:-30}}>
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
                        <View key={card.id} style={styles.card}> 
                            <Image 
                                style={{position:'absolute', top:0, height:'100%', width:'100%', borderRadius:10}}
                                source={{uri:card.photoURL}}
                            />

                            <View style={{
                                position:'absolute', bottom:0, width:'100%', height:70, 
                                backgroundColor:'white', flexDirection:'row', flex: 1,
                                justifyContent:'space-between', paddingTop:10, paddingLeft:30, paddingRight:30,
                                borderBottomLeftRadius:10, borderBottomRightRadius:10,
                            }}>
                                <View>
                                    <Text style={{fontWeight:'bold', fontSize:20}}>{card.displayName}</Text>
                                    <Text>{card.occupation}</Text>
                                </View>
                                <Text style={{fontWeight:'bold', fontSize:20}}>
                                    {card.age}
                                </Text>
                            </View>
                        </View>
                    ) : (
                        <View style={styles.card}>
                            <Text>No More Profiles</Text>
                        </View>
                    )}
                />
            </View>
            <View style={styles.bottomBar}>
                <TouchableOpacity style={[styles.bottomButtons, {backgroundColor:'#ff9e9e'}]} 
                    onPress={()=>swipeRef.current.swipeLeft()}
                >
                    <Entypo name='cross' size={25} color='red'/>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.bottomButtons, {backgroundColor:'#c8ff9e'}]}
                    onPress={()=>swipeRef.current.swipeRight()}
                >
                    <AntDesign name='heart' size={20} color='green'/>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    card: {
        backgroundColor:'white', 
        height:Dimensions.get('window').height * 0.65 ,
        borderRadius:10,
        alignItems: 'center',

        //shadows
        shadowColor: '#000', 
        shadowOffset:{
            width: 0, 
            height: 1, 
        }, 
        shadowOpacity: 0.2, 
        shadowRadius: 1.41, 
        elevation: 2,
    }, 

    bottomBar:{
        flex:1,
        // position:'absolute', 
        // bottom:Dimensions.get('window').height * 0.05,
        width:Dimensions.get('window').width,
        flexDirection:'row', 
        justifyContent:'space-evenly',
    }, 

    bottomButtons:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:100,
        width:50, 
        height:50,
    }
})

export default HomeScreen; 