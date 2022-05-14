import { Dimensions, Text, Image, View, StyleSheet, TouchableOpacity } from 'react-native';
import {Foundation, Ionicons} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import useAuth from '../hooks/useAuth';



const TopBar = ({title, titleComponent, options}) => {
    const navigation = useNavigation();
    const {user, logout} = useAuth();
    return (
        <View style={{alignItems:'center', flex:1, width:Dimensions.get('window').width}}>
        <TouchableOpacity 
            style={{position:'absolute', left:0, top:0}} 
            onPress={logout}
        >
            {titleComponent ? titleComponent : <Text style={{fontSize:25, fontWeight:'bold', top:5}}>{title}</Text>}
        </TouchableOpacity>

        {options ? options : (
            <>
                <TouchableOpacity 
                    style={{position:'absolute', right:30, top:5}} 
                    onPress={()=>navigation.navigate('Modal')}
                >
                    <Ionicons name="options-outline" size={30} color='#f73a00'/>
                </TouchableOpacity>


                {/* <TouchableOpacity 
                    style={{position:'absolute', right:30, top:5}} 
                    onPress={()=>navigation.navigate('Chat')}
                >
                    <Ionicons name="chatbubble-outline" size={30} color='#f73a00'/>
                </TouchableOpacity> */}
            </>
        )}
    </View>
    );
};

export default TopBar;