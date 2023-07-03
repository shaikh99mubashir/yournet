import { StyleSheet, Text, View ,PermissionsAndroid, Platform,Alert ,Linking } from 'react-native'
import React, { useEffect } from 'react'
import MyStack from './Routing/MyStack'
import { OrientationLocker } from 'react-native-orientation-locker';
import {Provider} from 'react-redux';
import store from './Redux/store';
import { requestUserPermission } from './Components/utils/notificationServices';

const App = () => {
  // useEffect(() => {
  //   const locker :any = OrientationLocker;
  //   locker.lockToPortrait();
  //   return () => {
  //     locker.unlockAllOrientations();
  //   };
  // }, []);

  useEffect(()=>{
    if(Platform.OS == 'android'){
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS).then((res)=>{
          console.log("res+++++",res)
          if(!!res && res == 'granted'){
            requestUserPermission()
            // notificationListeners()
          }
      }).catch(error=>{
        console.log('something wrong in App.tsx')
      })
    }else{
    }
  },[])
  
  return (
    <Provider store={store}>
      <MyStack/>
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})