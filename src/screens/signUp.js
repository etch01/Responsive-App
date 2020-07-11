import React,{useEffect} from 'react';
import {Text, View, StyleSheet,Button,ScrollView,Dimensions,Alert,TouchableOpacity,I18nManager} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol,
} from 'react-native-responsive-screen';
import strings from '../language/index';
import TextInput from '../components/textInput';
import  {validationSchema} from '../constants/signUpValidationSchema';
import { Formik } from 'formik';
import ErrorText from '../components/errorText';
import NetInfo from "@react-native-community/netinfo";
import {languageSwitcher} from '../language/Language';
const {isRTL} = I18nManager;
const {width,height} = Dimensions.get('window');

const signUp = ({params}) => {
    const [ state, setstate ] = React.useState(null);
    const [ language, setLanguage ] = React.useState('english');
    const [online, setOnline] = React.useState(true);

    //Check internet
    const checkConnectivity=()=>{
        checkConnection = NetInfo.addEventListener(state => {
          if(state.isConnected == true && state.isInternetReachable == true)
          {
            setOnline(true);
          }else{
            setOnline(false);
          }
        });
      }

    //Switch Language
    const switchLanguage=async()=>{
        const langCode = await languageSwitcher.getCurrentLanguageCode();
        if (langCode=='en'){
          await languageSwitcher.switchTo(langCode);
          setLanguage('english')
        }else{
          await languageSwitcher.switchTo(langCode);
          setLanguage('arabic')
        }
    }

    const languageSwitchHandler = () =>{
        if (language=='english'){
            setLanguage('arabic')
        languageSwitcher.switchTo('ar');
        }else{
            setLanguage('english')
            languageSwitcher.switchTo('en');
        }
    }

    useEffect(()=>{
        checkConnectivity();
        lor(setstate);
        switchLanguage();
        return rol();
    },[])
    
    const styles = StyleSheet.create({
        container: {
          flex: 1,
        },
        header: {
          alignItems: 'center',
          height:hp('15%'),
          justifyContent: 'center',
        },
        headerText: {
          fontSize: 24,
          fontWeight: 'bold',
        },
        formGroup:{
          width:wp('90%'),
          alignSelf:'center',
          alignContent:'flex-start',
          //height:hp('13%'),
          marginBottom:hp('3%')
        },
        inputText:{
            fontSize:18
        }
      });

  return (
    <ScrollView style={{flex: 1}}>
      <View style={styles.container}>
        <TouchableOpacity onPress={languageSwitchHandler} style={{marginRight:!isRTL?0:wp('5%'),marginLeft:isRTL?0:wp('5%'),marginTop:hp('5%')}}>
         <Text style={{textAlign:isRTL?'right':'left'}}>{language=='english'?'العربيه':'English'}</Text>
        </TouchableOpacity>
        <View style={styles.header}>
          <Text style={styles.headerText}>{strings.signUp}</Text>
        </View>
        <Formik
          validationSchema={validationSchema}
          initialValues={{email: '',name:'',password:'',confirmPassword:''}}
          onSubmit={(values) =>{
              if (online){
                Alert.alert(strings.success);
              }else{
                Alert.alert(strings.noInternet,strings.noInternetError);
              }
          }}>
          {({handleChange, handleBlur, handleSubmit, values,errors}) => (
            <View style={{flex: 3}}>
              <View style={styles.formGroup}>
                <Text style={styles.inputText}>{strings.fullName}</Text>
                <TextInput placeholder={strings.fullName} onChangeText={handleChange('name')}/>
                <ErrorText text={errors.name}/>
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.inputText}>{strings.email}</Text>
                <TextInput onChangeText={handleChange('email')} placeholder={strings.email} />
                <ErrorText text={errors.email}/>
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.inputText}>{strings.password}</Text>
                <TextInput
                  placeholder={strings.password}
                  secureTextEntry={true}
                  onChangeText={handleChange('password')}
                />
                <ErrorText text={errors.password}/>
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.inputText}>{strings.confirmPassword}</Text>
                <TextInput
                  placeholder={strings.confirmPassword}
                  secureTextEntry={true}
                  onChangeText={handleChange('confirmPassword')}
                />
                <ErrorText text={errors.confirmPassword}/>
              </View>
              <View style={{width: wp('90%'), alignSelf: 'center'}}>
                <Button title={strings.signUp} onPress={handleSubmit}/>
              </View>
              <View style={{height: height > width ? height * 0.05 : 0}}></View>
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};


export default signUp;
