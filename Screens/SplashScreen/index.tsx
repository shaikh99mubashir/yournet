import { StyleSheet, Text, View ,Image,Dimensions,ToastAndroid} from 'react-native'
import React, { useEffect } from 'react'
import { Color } from '../../Constants'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BaseUrl } from '../../Constants/BaseUrl';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart, companyName} from '../../Redux/Reducer/Reducers';
const SplashScreen = ({navigation}:any) => {
  // const navigateToHomeScreen = () => {
  //   const dispatch = useDispatch()
  //   AsyncStorage.getItem('user_id').then((val: any) => {
  //     let date1 = JSON.parse(val);
  //     console.log('daata1',date1);
      
  //     if (date1) {
  //       setTimeout(() => {
  //         navigation.replace('Home');
  //       }, 3000);
  //       const config = {
  //         headers: {
  //           User_ID: date1,
  //         },
  //       };
  //       axios
  //     .post(`${BaseUrl}getAllData`, null, config)
  //     .then((res: any) => {
  //       if (res.data && res.data.customer) {
  //         dispatch(addToCart(res.data));
  //       }
  //     })
  //     .catch(error => {
  //       console.log('error,==>', error);
        
  //       ToastAndroid.show(`Internal Server Error ${error}`, ToastAndroid.LONG);
  //     });
  //     } else {
  //       setTimeout(() => {
  //         navigation.replace('Login');
  //       }, 3000);
  //     }
  //   });
  // };
  
  // useEffect(() => {
  //   navigateToHomeScreen();
  // }, []);
  const dispatch = useDispatch();
  const navigateToHomeScreen = () => {

  AsyncStorage.getItem('user_id').then((val: any) => {
    let date1 = JSON.parse(val);
    // console.log('data1', date1);
    if (date1) {
      setTimeout(() => {
        navigation.replace('Home');
      }, 3000);

      const config = {
        headers: {
          User_ID: date1,
        },
      };

      axios
        .post(`${BaseUrl}getAllData`, null, config)
        .then((res: any) => {
          if (res.data && res.data.customer) {
            console.log('res.data',res.data);
            console.log('res.data.company===>',res.data.company);
            
            dispatch(addToCart(res.data));
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
}, []);

  return (
    <View style={{backgroundColor:Color.mainColor,height:'100%', width:'100%', alignItems:'center', justifyContent:'center'}}>
      <Image source={require('../../Images/ISPIconwhite.png')} resizeMode='contain' style={{ height: Dimensions.get('window').height/5,
    width: Dimensions.get('window').width/1.1,}}/>
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({})