import { StyleSheet, Text, View ,Image,Dimensions} from 'react-native'
import React, { useEffect } from 'react'
import { Color } from '../../Constants'

const SplashScreen = ({navigation}:any) => {
  const navigateToHomeScreen = () => {
    setTimeout(() => {
      navigation.replace('Login');
    }, 3000);
  };
  useEffect(() => {
    navigateToHomeScreen();
  }, []);
  return (
    <View style={{backgroundColor:Color.white,height:'100%', width:'100%', alignItems:'center', justifyContent:'center'}}>
      <Image source={require('../../Images/Logo.png')} resizeMode='contain' style={{ height: Dimensions.get('window').height/5,
    width: Dimensions.get('window').width/1.1,}}/>
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({})