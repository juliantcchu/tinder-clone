import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import {Foundation, Ionicons} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


const Header = ({title, callEnabled}) => {
    const navigation = useNavigation();
    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={()=>navigation.goBack()} style={styles.backButton}>
                <Ionicons name='chevron-back-outline' size={30} color='#FF5864'/>
            </TouchableOpacity>
            <Text style={styles.title}>{title}</Text>
            {/* <TouchableOpacity style={styles.callButton}>
                <Foundation name='telephone' size={30} color='#777777'/>
            </TouchableOpacity> */}
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    backButton:{
        position:'absolute', 
        left:10,
        top:2,
    },
    header: {
        padding:2, 
        flexDirection:'row', 
        justifyContent: 'center',
        borderColor:'#cccccc', 
        borderBottomWidth:1,
    },
    title:{
        fontWeight:'bold',
        fontSize:20, 
        padding:5,
    }, 
    callButton:{
        paddingRight:20,
    }
})