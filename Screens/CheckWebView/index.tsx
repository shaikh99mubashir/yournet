import React, { useEffect, useRef, useState } from 'react';
import {
  BackHandler,
  AppState,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  PanResponder, Animated,
  Platform 
} from 'react-native';
import WebView from 'react-native-webview';
import { useFocusEffect } from '@react-navigation/native';
import { Color } from '../../Constants';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'react-native-fetch-blob';

const CheckWebView = ({ route, navigation }: any) => {
  const link = route.params;
  const webViewRef = useRef<WebView | null>(null);
  const [currentUrl, setCurrentUrl] = useState('')

  const backAction = () => {
    
    if (webViewRef.current) {
      webViewRef.current.goBack();
      // backToHomePage();
      return true;
    }
    return false;
  };  



  const backToHomePage = () => {
    console.log('working');
    console.log('link.selectedLink',link.selectedLink);
    console.log('link.selectedLink',currentUrl);
    
    if(link.selectedLink == currentUrl){
      console.log('link====>',link.selectedLink);
      console.log('currentUrl====>',currentUrl);
      navigation.navigate('Home')
      return true
    }
  }
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      backToHomePage();
      return true; // Prevent default back button behavior
    });
  
    return () => backHandler.remove(); // Clean up the event listener on unmount
  }, []);


  useEffect(() => {
    const handleAppStateChange = (nextAppState: string) => {
      if (nextAppState === 'active') {
        // App came to the foreground
        // Check if WebView should navigate to the Home screen
        if (webViewRef.current) {
          webViewRef.current.injectJavaScript(`
            window.ReactNativeWebView.canGoBack()
              .then(canGoBack => {
                if (!canGoBack) {
                  window.ReactNativeWebView.postMessage("navigateToHome");
                }
              });
          `);
        }
      }
    };

    AppState.addEventListener('change', handleAppStateChange);
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
    };
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (backAction()) {
          console.log('hi')
          backToHomePage()
          return true;
        } else {
          console.log('hi 2')
          backToHomePage();
          return true;
        }
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, []),
  );
 
  
  const onMessage = async (event: any) => {
    console.log('event', event);
    const message = event.nativeEvent.data;
    console.log('Message',message);
      
    if (message === 'navigateToHome') {
      navigation.navigate('Home');
    } 
  };

  
  const handleNavigationStateChange = (newNavState:any) => {
    const url = newNavState.url;
    if (url.includes(link.selectedLink) && url !== currentUrl) {
      setCurrentUrl(url);
    }
  };

  console.log('current link set hoo gia',currentUrl);
  
  


  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Home')}
        style={{
          position: 'absolute',
          zIndex: 1,
          bottom: 16,
          right: 16,
          backgroundColor: Color.mainColor,
          borderRadius: 50,
          padding: 5,
        }}
        >
        <Image
          source={require('../../Images/ISPIcon.png')}
          style={{ width: 40, height: 40 }}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <WebView
        ref={webViewRef}
        allowsFullscreenVideo={true}
        source={{ uri: link.selectedLink }}
        startInLoadingState={true}
        allowUniversalAccessFromFileURLs={true}
        javaScriptEnabled={true}
        mixedContentMode={'always'}
        style={{ flex: 1 }}
        onMessage={onMessage}
        onNavigationStateChange={handleNavigationStateChange}
      />
    </View>
  );
};

export default CheckWebView;


const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    zIndex: 1,
    bottom: 16,
    right: 16,
    backgroundColor: Color.mainColor,
    borderRadius: 50,
    padding: 5,
  },
  image: {
    width: 50,
    height: 50,
  },
});

// import {
//   BackHandler,
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   Image
// } from 'react-native';
// import React, {useEffect, useRef} from 'react';
// import WebView from 'react-native-webview';
// import { Color } from '../../Constants';

// const CheckWebView = ({route, navigation}: any) => {
//   const link = route.params;
//   const webViewRef = useRef<WebView | null>(null);
//   const backAction = () => {
//     webViewRef.current?.goBack();
//     return true;
//   };

//   useEffect(() => {
//     BackHandler.addEventListener('hardwareBackPress', backAction);
//   }, []);

//   return (
//     <View style={{flex: 1}}>
//       <TouchableOpacity
//         onPress={() => navigation.navigate('Home')}
//         style={{position: 'absolute', zIndex: 1,bottom: 16, right: 16, backgroundColor:Color.mainColor, borderRadius:50, padding:5 }}>
//         <Image source={require('../../Images/logoIcon.png')} style={{width:50, height:50}} resizeMode='contain'/>
//       </TouchableOpacity>
//       <WebView
//         ref={webViewRef}
//         allowsFullscreenVideo={true}
//         source={{uri: link.selectedLink}}
//         startInLoadingState={true}
//         style={{flex: 1}}
//       />
//     </View>
//   );
// };

// export default CheckWebView;

// const styles = StyleSheet.create({});
