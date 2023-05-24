import { BackHandler, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import WebView from 'react-native-webview'

const CheckWebView = ({route, navigation}:any) => {
    const link = route.params
    console.log('link', link);
    

    
  return (
    <WebView
    allowsFullscreenVideo={true}
    source={{uri: link.selectedLink}} 
    startInLoadingState={true}
    style={{flex: 1}}
  />
  )
}

export default CheckWebView

const styles = StyleSheet.create({})