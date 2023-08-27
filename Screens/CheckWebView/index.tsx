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
import  {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import {
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';

const SIZE = 90;
const CIRCLE_RADIUS = SIZE * 2;

type ContextType = {
  translateX: number;
  translateY: number;
};
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
    if(link.selectedLink == currentUrl){
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
          backToHomePage()
          return true;
        } else {
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
    const message = event.nativeEvent.data;
      
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

   // State and animated values
   const translateX = useSharedValue(0);
   const translateY = useSharedValue(0);
 
   // Gesture handler event
   const panGestureEvent = useAnimatedGestureHandler<
  PanGestureHandlerGestureEvent,
  ContextType>({
  onStart: (event, context) => {
    context.translateX = translateX.value;
    context.translateY = translateY.value;
  },
  onActive: (event, context) => {
    'worklet';
    translateX.value = event.translationX + context.translateX;
    translateY.value = event.translationY + context.translateY;
  },
  onEnd: () => {
    'worklet';
    const distance = Math.sqrt(
      translateX.value ** 2 + translateY.value ** 2
    );

    if (distance < CIRCLE_RADIUS + SIZE / 2) {
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
    }
  },
});
 


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
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  square: {
    width: SIZE,
    height: SIZE,
    backgroundColor: 'rgba(0, 0, 256, 0.5)',
    borderRadius: 20,
  },
  circle: {
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: CIRCLE_RADIUS,
    borderWidth: 5,
    borderColor: 'rgba(0, 0, 256, 0.5)',
  },
});

