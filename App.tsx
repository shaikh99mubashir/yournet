import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import MyStack from './Routing/MyStack'
import { OrientationLocker } from 'react-native-orientation-locker';

const App = () => {
  // useEffect(() => {
  //   const locker :any = OrientationLocker;
  //   locker.lockToPortrait();
  //   return () => {
  //     locker.unlockAllOrientations();
  //   };
  // }, []);
  return (
    <>
      <MyStack/>
    </>
  )
}

export default App

const styles = StyleSheet.create({})