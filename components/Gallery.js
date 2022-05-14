import { Dimensions, Text, Image, View, StyleSheet, TouchableHighlight, ImageBackground } from 'react-native';
import {Foundation, Ionicons} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import useAuth from '../hooks/useAuth';
import {useState} from 'react';



const Gallery = ({imageList, startIndex}) => {
    const [ind, setInd] = useState(startIndex || 0);
    
    return (
        <ImageBackground source={{uri:imageList[ind].uri}} resizeMode="cover" style={styles.ImageBackground} imageStyle={{ borderRadius: 10}}>
            <TouchableHighlight activeOpacity={0.1} underlayColor="#55555550" onPress={() => setInd(Math.max(0, ind - 1))}
                        style={{height:'100%', width:'50%', justifyContent:'center', alignItems:'flex-start'}}>
                <Ionicons style={{padding:5}} name='chevron-back-circle' size={25} />
            </TouchableHighlight>
            <TouchableHighlight activeOpacity={0.1} underlayColor="#55555550" onPress={() =>  setInd(Math.min(imageList.length - 1, ind + 1))}
                        style={{height:'100%', width:'50%', justifyContent:'center', alignItems:'flex-end'}}>
                <Ionicons style={{padding:5}} name='chevron-forward-circle' size={25}/>
            </TouchableHighlight>
        </ImageBackground>
    );
};

export default Gallery;


const styles = StyleSheet.create({
    ImageBackground:{
        flexDirection:'row', 
        justifyContent:'space-between',
        height:'100%', width:'100%', 
    }, 
})
