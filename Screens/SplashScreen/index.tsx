import { StyleSheet, Text, View ,Image,Dimensions,ToastAndroid} from 'react-native'
import React, { useEffect } from 'react'
import { Color } from '../../Constants'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BaseUrl } from '../../Constants/BaseUrl';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart, companyName, logout, nickname} from '../../Redux/Reducer/Reducers';
import { useIsFocused } from '@react-navigation/native';
const SplashScreen = ({navigation}:any) => {
  const dispatch = useDispatch();
  const focus = useIsFocused();
  AsyncStorage.getItem('nickName')
  .then(value => {
    if (value !== null) {
     let myNickName = JSON.parse(value);
     dispatch(nickname(myNickName));
    } else {
      console.log('No user_id found');
    }
  })
  .catch(error => console.log('Error retrieving login fields: ', error));
  const navigateToHomeScreen = () => {
  AsyncStorage.getItem('user_id').then((val: any) => {
    let date1 = JSON.parse(val);
    if (date1) {
      const config = {
        headers: {
          User_ID: date1,
        },
      };

      axios
        .post(`${BaseUrl}getAllData`, null, config)
        .then((res: any) => {
          if (res.data && res.data.customer) {
              AsyncStorage.getItem('loginFields')
                .then(value => {
                  if (value !== null) {
                   let Loginfields =  JSON.parse(value)
                   if(Loginfields.password === res.data.customer.password){
                    dispatch(addToCart(res.data));
                    navigation.replace('Home');
                   }
                   else{
                    navigation.replace('Login');
                    AsyncStorage.removeItem('user_id');
                    AsyncStorage.removeItem('loginFields');
                    AsyncStorage.removeItem('nickName');
                    dispatch(logout());
                    ToastAndroid.show('Password Change Update Your Password', ToastAndroid.LONG);
                   }
                   
                  } else {
                    console.log('No user_id found');
                  }
                })
                .catch(error => console.log('Error retrieving login fields: ', error));
          }
        })
        .catch(error => {
          console.log('error,==>', error);
          ToastAndroid.show(`Internal Server Error ${error}`, ToastAndroid.LONG);
        });
    } else {
      setTimeout(() => {
        navigation.replace('Login');
      }, 3000);
    }
  });
};

useEffect(() => {
  navigateToHomeScreen();
}, [focus]);

  return (
    <View style={{backgroundColor:Color.mainColor,height:'100%', width:'100%', alignItems:'center', justifyContent:'center'}}>
      <Image source={require('../../Images/ISPIconwhite.png')} resizeMode='contain' style={{ height: Dimensions.get('window').height/5,
    width: Dimensions.get('window').width/1.1,}}/>
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({})