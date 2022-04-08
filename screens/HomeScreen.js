import { useNavigation } from '@react-navigation/native';
import useAuth from '../hooks/useAuth';
import { StyleSheet, Button, Text, View } from 'react-native';



const HomeScreen = () => {
    const navigation = useNavigation();
    const {logout} = useAuth();
    // console.log('1')
    // console.log(logout)
    // console.log('2')
    return (
        <View >
            <Text>HomeScreen</Text>
            <Button title='goto chat' onPress={() => {navigation.navigate('Chat')}}/>
            <Button title='logout' onPress={logout}/>
        </View>
    );
};

export default HomeScreen;