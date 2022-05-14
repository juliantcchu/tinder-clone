import { Dimensions, Text, Image, View, StyleSheet, TouchableOpacity } from 'react-native';
import {Foundation, Ionicons} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import useAuth from '../hooks/useAuth';
import Gallery from './Gallery';
import InterestButton from './InterestButton';

const DUMMY_IMAGE_LIST = [
    {uri: 'https://www.dmarge.com/wp-content/uploads/2021/01/dwayne-the-rock-.jpg'},
    {uri: 'https://engineering.unl.edu/images/staff/Kayla-Person.jpg'},
    {uri: 'https://www.dmarge.com/wp-content/uploads/2021/01/dwayne-the-rock-.jpg'},
    {uri: 'https://engineering.unl.edu/images/staff/Kayla-Person.jpg'},
    {uri: 'https://www.dmarge.com/wp-content/uploads/2021/01/dwayne-the-rock-.jpg'},
    {uri: 'https://engineering.unl.edu/images/staff/Kayla-Person.jpg'},
    {uri: 'https://www.dmarge.com/wp-content/uploads/2021/01/dwayne-the-rock-.jpg'},
    {uri: 'https://engineering.unl.edu/images/staff/Kayla-Person.jpg'},
    {uri: 'https://www.dmarge.com/wp-content/uploads/2021/01/dwayne-the-rock-.jpg'},
    {uri: 'https://engineering.unl.edu/images/staff/Kayla-Person.jpg'},
    {uri: 'https://www.dmarge.com/wp-content/uploads/2021/01/dwayne-the-rock-.jpg'},
    {uri: 'https://engineering.unl.edu/images/staff/Kayla-Person.jpg'},
]


const Card = ({cardInfo}) => {
    return (
        <View key={cardInfo.id} style={styles.card}> 
            {/* <Image 
                style={{position:'absolute', top:0, height:'100%', width:'100%', borderRadius:10}}
                source={{uri:cardInfo.photoURL}}
            /> */}
            <View style={{width:'100%', aspectRatio:1}}>
                <Gallery imageList = {DUMMY_IMAGE_LIST}/>
            </View>

            <View style={{alignItems:'flex-start', justiftyContent:'flex-start', width:'100%', padding:10, paddingLeft:20, paddingRight:20}}>
                <View style={{flexDirection:'row', justifyContent:'space-between', width:'100%'}}>
                    <Text style={{fontWeight:'bold', fontSize:25, color:'#222222'}}>{cardInfo.displayName}</Text>
                    <Text style={{fontWeight:'normal', fontSize:20, color:'#222222'}}>{cardInfo.age}</Text>
                </View>
                <Text style={{fontSize:18}}>{cardInfo.bio}</Text>
                <View style={styles.interestArea}>
                <InterestButton interestName='pastry'/><InterestButton interestName='tacos'/><InterestButton interestName='sushi'/><InterestButton interestName='coffee'/><InterestButton interestName='cocktails'/><InterestButton interestName='burgers'/>
                </View>
            </View>

        </View>
    );
};

export default Card;


const styles = StyleSheet.create({
    card: {
        backgroundColor:'white', 
        // height:Dimensions.get('window').height * 0.70 ,
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
    interestArea:{
        flexDirection:'row', 
        flexWrap:'wrap',
        justifyContent:'flex-start',
        width:'100%'
      }
})
