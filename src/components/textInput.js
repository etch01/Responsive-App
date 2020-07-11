import React,{useEffect} from 'react';
import { Text, View,TextInput,StyleSheet,Dimensions ,I18nManager} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as lor,
    removeOrientationListener as rol,
  } from 'react-native-responsive-screen';
const {isRTL} = I18nManager;

const {width,height} = Dimensions.get('window');

const customTextInput = ({
    placeholder,
    onChangeText,
    style,
    value,
    keyboardType,editable,onEndEditing,multiline,secureTextEntry
}) => {
const [ state, setstate ] = React.useState(null);

useEffect(()=>{
    lor(setstate);
    return rol();
},[])

const styles = StyleSheet.create({
    inputContainer:{
        flex:1,
        borderWidth:1,
        borderColor:'#a9aba9',
        marginTop:(height>width)?height*0.02:height*0.01,
        minHeight:(height>width)?height*0.05:width*0.1,
        justifyContent:"center",
        borderRadius:6,
        backgroundColor:"white",
        paddingLeft:10,
    },rightTxt:{
        textAlign:"right",
     
    },leftTxt:{
        textAlign:"left",
    },
});
    return(
    <View style={[styles.inputContainer,style]}>
        <TextInput secureTextEntry={secureTextEntry} onEndEditing={onEndEditing} style={{color:"red"}} multiline={multiline} value={value} keyboardType={keyboardType} editable={editable}  onChangeText={onChangeText} style ={isRTL? styles.rightTxt : styles.leftTxt} placeholder={placeholder}/>
    </View>
)};

export default customTextInput;