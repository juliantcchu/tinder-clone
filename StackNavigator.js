import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, Text, View, Image } from 'react-native';
import tw from 'tailwind-rn';
import {Ionicons, Entypo, AntDesign} from '@expo/vector-icons';


import useAuth from './hooks/useAuth'

import ChatScreen from './screens/ChatScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import ModalScreen from './screens/ModalScreen';
import MessageScreen from './screens/MessageScreen';
import CreateEventScreen from './screens/CreateEventScreen';
import MyselfScreen from './screens/MyselfScreen';
import TopBar from './components/TopBar';
import EditProfileScreen from './screens/EditProfileScreen';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TapNavigator = () => {
    const {user} = useAuth()
    return (
        <Tab.Navigator screenOptions={{
            tabBarShowLabel: true,
            tabBarStyle: [
              {
                display: "flex"
              },
            ]
          }} initialRouteName='Home'>
            <Tab.Screen name="Myself" component={MyselfScreen} options={{
                tabBarIcon: ({focused})=>(
                    <Ionicons name="person-outline" size={30} color={focused ? '#f73a00': 'gray'}/>
                ), 
                tabBarLabel: ({focused})=>(
                    <Text style={[{fontSize:10}, focused ? {color:'#f73a00'}: {color:'gray'}]}>Myself</Text>
                ), 
                headerTitle: () => <TopBar title={'My Profile'}/>
            }}/>
            <Tab.Screen name="Home" component={HomeScreen} options={{
                tabBarIcon: ({focused})=>(
                    <Ionicons name="home-outline" size={30} color={focused ? '#f73a00': 'gray'}/>
                ), 
                tabBarLabel: ({focused})=>(
                    <Text style={[{fontSize:10}, focused ? {color:'#f73a00'}: {color:'gray'}]}>Home</Text>
                ), 
                headerTitle: () => <TopBar titleComponent={<Image style={{resizeMode:'contain', height:40, width:80}} source={require('./media/foodie_icon.png')} />}/>
            }}/>
            <Tab.Screen name="Chat" component={ChatScreen} options={{
                tabBarIcon: ({focused})=>(
                    <Ionicons name="chatbubble-outline" size={30} color={focused ? '#f73a00': 'gray'}/>
                ), 
                tabBarLabel: ({focused})=>(
                    <Text style={[{fontSize:10}, focused ? {color:'#f73a00'}: {color:'gray'}]}>Chat</Text>
                ), 
                headerTitle: () => <TopBar title={'Messages'}/>
            }}/>
        </Tab.Navigator>
    )
}


const StackNavigator = () => {

    const {user} = useAuth()
  return (
    <Stack.Navigator
        screenOptions={{
            headerShown:false,
        }}
    >
        {user ? (
            <>
                <Stack.Group>
                    <Stack.Screen name="Tabs" component={TapNavigator} />
                    {/* <Stack.Screen name="Chat" component={ChatScreen} /> */}
                    <Stack.Screen name="Message" component={MessageScreen} />
                    <Stack.Screen name="EditProfile" component={EditProfileScreen} />
                </Stack.Group>
                <Stack.Group screenOptions={{presentation:'modal'}}>
                    <Stack.Screen name="Modal" component={ModalScreen} />
                </Stack.Group>
            </>
        ) : (
            <Stack.Screen name="Login" component={LoginScreen} />
        )}
    </Stack.Navigator>
  );
}


export default StackNavigator;