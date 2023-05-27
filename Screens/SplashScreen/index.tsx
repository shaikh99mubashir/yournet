import { StyleSheet, Text, View ,Image,Dimensions} from 'react-native'
import React, { useEffect } from 'react'
import { Color } from '../../Constants'
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({navigation}:any) => {
  const navigateToHomeScreen = () => {
    AsyncStorage.getItem('user_id').then((val: any) => {
      let date1 = JSON.parse(val);
      if (date1) {
        setTimeout(() => {
          navigation.replace('Home');
        }, 2000);
      } else {
        setTimeout(() => {
          navigation.replace('Login');
        }, 3000);
      }
    });
  };
  
  useEffect(() => {
    navigateToHomeScreen();
  }, []);
  return (
    <View style={{backgroundColor:Color.mainColor,height:'100%', width:'100%', alignItems:'center', justifyContent:'center'}}>
      <Image source={require('../../Images/ISP.png')} resizeMode='contain' style={{ height: Dimensions.get('window').height/5,
    width: Dimensions.get('window').width/1.1,}}/>
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({})