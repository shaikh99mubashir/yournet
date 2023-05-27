import {
  BackHandler,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import WebView from 'react-native-webview';
import { Color } from '../../Constants';

const CheckWebView = ({route, navigation}: any) => {
  const link = route.params;
  console.log('link', link);
  const webViewRef = useRef<WebView | null>(null);


  const backAction = () => {
    webViewRef.current?.goBack();
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);
  }, []);

  return (
    <View style={{flex: 1}}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Home')}
        style={{position: 'absolute', zIndex: 1,bottom: 16, right: 16, backgroundColor:Color.mainColor, borderRadius:50, padding:5 }}>
        <Image source={require('../../Images/logoIcon.png')} style={{width:50, height:50}} resizeMode='contain'/>
      </TouchableOpacity>
      <WebView
        ref={webViewRef}
        allowsFullscreenVideo={true}
        source={{uri: link.selectedLink}}
        startInLoadingState={true}
        style={{flex: 1}}
      />
    </View>
  );
};

export default CheckWebView;

const styles = StyleSheet.create({});
