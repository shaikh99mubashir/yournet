import { StyleSheet, Text, View ,PermissionsAndroid, Platform,Alert ,Linking } from 'react-native'
import React, { useEffect } from 'react'
import MyStack from './Routing/MyStack'
import { OrientationLocker } from 'react-native-orientation-locker';
import {Provider} from 'react-redux';
import store from './Redux/store';
import { requestUserPermission,notificationListeners } from './Components/utils/notificationServices';
import messaging from '@react-native-firebase/messaging';
const App = ({navigation}:any) => {
  // useEffect(() => {
  //   const locker :any = OrientationLocker;
  //   locker.lockToPortrait();
  //   return () => {
  //     locker.unlockAllOrientations();
  //   };
  // }, []);

  // const getFCMToken = () => {
  //   messaging()
  //     .getToken()
  //     .then(token => {
  //       console.log('token=>>>', token);
  //     });
  // };

//   messaging().setBackgroundMessageHandler(async remoteMessage => {
//     console.log('remoteMessage=====>',remoteMessage);
    
//     navigation.navigate('Notification'); //navigate to notification screen
// });
  // useEffect(()=>{
  //   getFCMToken()
  //   messaging().onNotificationOpenedApp(remoteMessage => {
  //     console.log(
  //       'Notification caused app to open from background state:',
  //       remoteMessage.notification,
  //     );
  //     console.log(
  //       'remoteMessage==============>:',
  //       remoteMessage,
  //     );
  //     navigation.navigate('Home');
  //   });

  //   messaging()
  //     .getInitialNotification()
  //     .then(remoteMessage => {
  //       if (remoteMessage) {
  //         console.log(
  //           'Notification caused app to open from quit state:',
  //           remoteMessage.notification,
  //         );
  //         // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
  //         navigation.navigate('Home');
  //       }
        
  //     });
  // },[])

  // useEffect(()=>{

  //   notificationListeners()
  //   if(Platform.OS == 'android'){
  //     PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS).then((res)=>{
  //         console.log("res+++++",res)
  //         if(!!res && res == 'granted'){
  //           requestUserPermission()
  //         }
  //     }).catch(error=>{
  //       console.log('something wrong')
  //     })
  //   }else{
  
  //   }
  
  // },[])
  
  return (
    <Provider store={store}>
      <MyStack/>
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})