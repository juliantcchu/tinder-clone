import { SafeAreaView, StyleSheet, Button, Text, View } from 'react-native';

const Message = ({sentByMe, content}) => {

  return (
      <View style={[styles.messageContainer, sentByMe===true? {justifyContent:'flex-end'} : {justifyContent:'flex-start'}]}>
        <View style={[styles.message, sentByMe === true ? styles.senderMessage : styles.receiverMessage]}> 
            <Text style={[styles.messageText, sentByMe===true ? {color:'white'} : {color:'#222222'}]}>{content}</Text>
        </View>
      </View>
  );
};

export default Message;

const styles = StyleSheet.create({
    messageContainer:{
        flexDirection:'row', 
        width:'100%', 
        padding:2
    },
    message: {
        borderRadius:10, 
        padding:5,
        paddingLeft: 10, 
        paddingRight: 10,
    },
    senderMessage:{
        backgroundColor:'#ff5e8f',
        borderTopRightRadius: 0, 
    }, 
    receiverMessage:{
        backgroundColor:'#cccccc',
        borderTopLeftRadius: 0, 
    }, 
    messageText:{
        fontSize:18, 
        fontWeight:'400',
    }
})