import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import MyStack from './Routing/MyStack'
import { OrientationLocker } from 'react-native-orientation-locker';
import {Provider} from 'react-redux';
import store from './Redux/store';
const App = () => {
  // useEffect(() => {
  //   const locker :any = OrientationLocker;
  //   locker.lockToPortrait();
  //   return () => {
  //     locker.unlockAllOrientations();
  //   };
  // }, []);
  return (
    <Provider store={store}>
      <MyStack/>
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})