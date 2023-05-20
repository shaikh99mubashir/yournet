import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import WebView from 'react-native-webview'

const CheckWebView = (props:any) => {
    const {selectedLink} = props
    console.log('selectedLink',selectedLink);
    
  return (
    <View>
      {/* <Text>CheckWebView</Text> */}
      <WebView scrollView={true} source={{ uri: selectedLink }} />
    </View>
  )
}

export default CheckWebView

const styles = StyleSheet.create({})