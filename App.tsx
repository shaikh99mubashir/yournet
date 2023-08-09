import { StyleSheet, Text, View ,PermissionsAndroid, Platform,Alert ,Linking } from 'react-native'
import React, { useEffect,useRef ,useState } from 'react'
import MyStack from './Routing/MyStack'
import { OrientationLocker } from 'react-native-orientation-locker';
import {Provider} from 'react-redux';
import store from './Redux/store';
import { requestUserPermission,notificationListeners } from './Components/utils/notificationServices';
import messaging from '@react-native-firebase/messaging';
import { AppState,AppStateStatus  } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
const App = ({navigation}:any) => {
  
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  // useEffect(() => {
  //   const subscription = AppState.addEventListener('change', nextAppState => {
  //     if (
  //       appState.current.match(/inactive|background/) &&
  //       nextAppState === 'active'
  //     ) {
  //       console.log('App has come to the foreground!');
  //       // navigation.navigate('SplashScreen')
  //     }
  //     if (appState.current === 'background') {
  //       navigation.navigate('SplashScreen'); 
  //       return;
  //     }

  //     appState.current = nextAppState;
  //     setAppStateVisible(appState.current);
  //     console.log('AppState', appState.current);
  //   });

  //   return () => {
  //     subscription.remove();
  //   };
  // }, []);
  // console.log('navigation:===>',navigation);
  
  
  return (
    
    <Provider store={store}>
      <MyStack/>
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})