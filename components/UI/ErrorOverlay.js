import Button from './Button';
import {View,StyleSheet,Text} from 'react-native';

function ErrorOverlay({message,onConfirm}){
    return (
        <View style ={styles.container}>
           <Text style = {[styles.text,styles.title]}>An error occured!</Text>
           <Text style= {styles.text}>{message}</Text>
          <Button onPress= {onConfirm}>Okay</Button>
        </View>
    )
}

export default ErrorOverlay;


const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        padding:25,
        backgroundColor:'black'
    },
    text:{
        color:'white',
        textAlign:'center',
        marginBottom:8
    },
    title:{
        fontSize:20,
        fontWeight:'bold'
    },
   
})