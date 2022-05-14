import { Dimensions, Text, Image, View, StyleSheet, TouchableOpacity } from 'react-native';
import {Foundation, Ionicons} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import useAuth from '../hooks/useAuth';


const PersonCard = ({cardInfo}) => {
    return (
        <View key={cardInfo.id}> 
        
        </View>
    );
};

export default PersonCard;


const styles = StyleSheet.create({
    card: {
        backgroundColor:'white', 
        height:Dimensions.get('window').height * 0.70 ,
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
})
