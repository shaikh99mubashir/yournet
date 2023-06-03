import React, { useEffect, useRef, useState } from 'react';
import {
  BackHandler,
  AppState,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import WebView from 'react-native-webview';
import { useFocusEffect } from '@react-navigation/native';
import { Color } from '../../Constants';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'react-native-fetch-blob';

const CheckWebView = ({ route, navigation }: any) => {
  const link = route.params;
  const webViewRef = useRef<WebView | null>(null);

  const backAction = () => {
    if (webViewRef.current) {
      webViewRef.current.goBack();
      return true;
    }
    return false;
  };

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
          return true;
        } else {
          navigation.navigate('Home');
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
    
    if (message === 'navigateToHome') {
      navigation.navigate('Home');
    } 
  };
  
  // Download 
  // const [downloadUrl, setDownloadUrl] = useState('');
  // const [downloadStart, setDownloadStart] = useState(false);
  // const [showModalLoading, setShowModalLoading] = useState(false);
  // const [showFileExplorer, setShowFileExplorer] = useState(false);
  // const [startFolder, setStartFolder] = useState('');

  // useEffect(() => {
  //   const directoryFile = `${RNFS.ExternalStorageDirectoryPath}/DownloadFile/`;

  //   const handleUrlWithZip = (input:any) => {
  //     // Check if another download is in progress or the URL doesn't contain a .zip file
  //     if (downloadStart || !input.url.toLowerCase().includes('.zip')) {
  //       return;
  //     } else {
  //       setDownloadStart(true);
  //       setShowModalLoading(true);
  //     }

  //     // Delete existing folder and create a new one
  //     if (RNFS.exists(directoryFile)) {
  //       RNFS.unlink(directoryFile)
  //         .then(() => {
  //           console.log('FOLDER/FILE DELETED');
  //         })
  //         .catch((err) => {
  //           console.log('CANT DELETE', err.message);
  //           // Handle error
  //         });

  //       RNFS.mkdir(directoryFile);
  //     }

  //     if (input) {
  //       // Verify if the URL contains a .zip file
  //       if (input.url.toLowerCase().includes('.zip')) {
  //         const urlDownload = input.url;

  //         let fileName;
  //         try {
  //           fileName = urlDownload.substr(urlDownload.lastIndexOf('/')).replace('.zip', '') + '.zip';
  //         } catch (e) {
  //           console.log(e);
  //           fileName = 'example.zip';
  //         }

  //         console.log('URL = ' + urlDownload);

  //         // Download the file to the specified folder
  //         const dirs = `${directoryFile}/${fileName}`;
  //         RNFetchBlob.config({
  //           path: dirs,
  //         })
  //           .fetch('GET', urlDownload, {
  //             // Add necessary headers if required
  //           })
  //           .progress((received, total) => {
  //             console.log('progress', received / total);
  //           })
  //           .then((res) => {
  //             console.log('The file saved to ', res.path());

  //             // Download finished
  //             setDownloadStart(false);
  //             setShowModalLoading(false);
  //             setShowFileExplorer(true);
  //             setStartFolder(directoryFile);
  //           })
  //           .catch((error) => {
  //             console.error('Error downloading file:', error);
  //             // Handle error
  //           });
  //       }
  //     }
  //   };
  //   return () => {
  //     // Perform any necessary cleanup tasks
  //   };
  // }, []);
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
        }}>
        <Image
          source={require('../../Images/logoIcon.png')}
          style={{ width: 50, height: 50 }}
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
        // onNavigationStateChange={(result) => handleUrlWithZip(result)}
      />
    </View>
  );
};

export default CheckWebView;


const styles = StyleSheet.create({});

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
