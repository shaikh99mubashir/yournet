import {
  BackHandler,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import WebView from 'react-native-webview';

const CheckWebView = ({route, navigation}: any) => {
  const link = route.params;
  console.log('link', link);
  const webViewRef = useRef<WebView | null>(null);

  // const navigation = useNavigation();

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
        style={{position: 'absolute', zIndex: 1}}>
        <Text style={{color: 'red'}}>Back button</Text>
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
