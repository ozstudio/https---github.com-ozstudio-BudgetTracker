import {View,ActivityIndicator,StyleSheet} from 'react-native';

function LoadinOverlay(){
    return (
        <View style ={styles.container}>
            <ActivityIndicator 
            size='large' 
            color='blue'
           />
        </View>
    )
}

export default LoadinOverlay
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        padding:25,
        backgroundColor:'black'
    }

})