import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  ToastAndroid,
  Linking,
  SafeAreaView,
  ImageBackground,
  BackHandler,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import React, {useState, useRef, useEffect} from 'react';
import Header from '../../Components/Header';
import {Color} from '../../Constants';
import {BaseUrl} from '../../Constants/BaseUrl';
import axios from 'axios';
import {WebView} from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import CheckWebView from '../CheckWebView';
const {height, width} = Dimensions.get('window');
const Home = ({navigation}: any) => {
  // let token: any;
  // console.log('token====>1', token);
  // const [userToken, setUserToken] = useState('');
  // console.log('token ===>2', token);

  // const focus = useIsFocused();
  // AsyncStorage.getItem('token')
  //   .then(value => {
  //     console.log('value', value);

  //     if (value !== null) {
  //       token =JSON.parse(value);
  //     } else {
  //       console.log('No login fields found');
  //     }
  //   })
  //   .catch(error => console.log('Error retrieving login fields: ', error));
  // const navigateToLogin = () => {
  //   // if (!userToken) {
  //   //   console.log('running');
  //   //   // navigation.replace('Login');
  //   //   ToastAndroid.show('Session Expire Login Again', ToastAndroid.SHORT);
  //   //   return;
  //   // }
  // };
  // useEffect(() => {
  //   const check = setInterval(() => {
  //     if (focus) {
  //       console.log('token===>3', token);
  //       navigateToLogin();
  //     }
  //   }, 10000);
  //   return () => clearInterval(check);
  // }, [focus]);

  // AsyncStorage.removeItem('token')

  // To retrieve the loginFields
  const focus = useIsFocused();
  const [nickName, setNickName] = useState<any>('');
  const [userId, setUserId] = useState<any>('');
  const gettingUserData = () => {
    AsyncStorage.getItem('loginFields')
      .then(value => {
        if (value !== null) {
          setUserId(JSON.parse(value));
        } else {
          console.log('No login fields found');
        }
      })
      .catch(error => console.log('Error retrieving login fields: ', error));
  };
  useEffect(() => {
    gettingUserData();
  }, []);
  const [userToken, setUserToken] = useState('');
  const gettingUserDatatoken = () => {
    AsyncStorage.getItem('token')
      .then(value => {
        if (value !== null) {
          setUserToken(JSON.parse(value));
        } else {
          console.log('No login fields found');
        }
      })
      .catch(error => console.log('Error retrieving login fields: ', error));
  };

  useEffect(() => {
    gettingUserData();
    gettingUserDatatoken();
  }, []);
  // get User DATA
  const [getUserData, setUserData] = useState<any>([]);
  const [userPackage, setUserPackage] = useState<any>([]);
  const [promotionData, setPromotionData] = useState([]);
  const [webPortalData, WebPortalData] = useState([]);
  const [loading, setLoading] = useState(false);
  const getData = () => {
    const config = {
      headers: {
        Authorization: userToken,
      },
    };
    axios
      .post(
        `${BaseUrl}getAllData`,
        null, // pass null as the data parameter since you're making a POST request without any payload
        config, // pass the config object as the third parameter
      )
      .then((res: any) => {
        console.log('res data', res.data.receipts);
        setUserData(res.data.customer);
        WebPortalData(res.data.portals);
        setUserPackage(res.data.package);
        setPromotionData(res.data.promotions);
        setLoading(true);
      })
      .catch(error => {
        console.log('error==>', error);
        ToastAndroid.show('Internal Server Error', ToastAndroid.BOTTOM);
      });
  };

  useEffect(() => {
    getData();
  }, [userToken]);

  const [selectedLink, setSelectedLink] = useState('');
  const handelWebView = (link: any) => {
    setSelectedLink(link);
  };

  const [currentIndex, setCurrentIndex] = useState<any>(0);
  const flatListRef = useRef<any>(null);
  // Function to move to next image
  const nextImage = () => {
    if (promotionData && promotionData.length > 0) {
      const nextIndex = (currentIndex + 1) % promotionData.length;
      flatListRef.current?.scrollToIndex({index: nextIndex});
      setCurrentIndex(nextIndex);
    }
  };
  // Use effect to move to next image every 5 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      nextImage();
    }, 5000);

    // Cleanup function to clear interval on unmount
    return () => clearInterval(intervalId);
  }, [currentIndex]);

  //  promotion Work Ended

  const ShowMessage = () => {
    ToastAndroid.show('This Feature will Soon Avaiable !', ToastAndroid.SHORT);
  };

  navigation.addListener('state', () => {
    gettingUserNickName();
  });
  const gettingUserNickName = async () => {
    let value = await AsyncStorage.getItem('nickName');
    if (value !== null) {
      console.log(value, 'value');
      setNickName(JSON.parse(value));
    }
  };
  useEffect(() => {
    gettingUserNickName();
  }, []);

  // console.log(getUserData?.activation_date, 'getUserData?.activation_date');

  const date = new Date(getUserData?.activation_date);
  const date1 = new Date(getUserData?.expiry_date);
  const RenewalDate = date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  const expiryDate = date1.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  // const [backButtonPressedOnceToExit, setBackButtonPressedOnceToExit] =
  //   useState(false);
  // useEffect(() => {
  //   // Add event listener for the hardware back button press
  //   BackHandler.addEventListener('hardwareBackPress', handleBackButtonPress);
  //   // Clean up the event listener when the component is unmounted
  //   return () => {
  //     BackHandler.removeEventListener(
  //       'hardwareBackPress',
  //       handleBackButtonPress,
  //     );
  //   };
  // }, []);
  // const handleBackButtonPress = () => {
  //   if (!backButtonPressedOnceToExit) {
  //     setBackButtonPressedOnceToExit(true);

  //     // Show a confirmation modal
  //     Alert.alert(
  //       'Confirmation',
  //       'Are you sure you want to go back To your Home Screen?',
  //       [
  //         {text: 'No', onPress: () => setBackButtonPressedOnceToExit(false)},
  //         {text: 'Yes', onPress: () => BackHandler.exitApp()},
  //       ],
  //       {cancelable: true},
  //     );

  //     // Return `true` to prevent the default back button behavior
  //     return true;
  //   }
  // };

  // const handleBackPress = (webViewRef: any) => {
  //   if (webViewRef.current) {
  //     webViewRef.current.goBack();
  //     return true;
  //   }
  //   return false;
  // };
  // const webViewRef = React.useRef(null);

  // React.useEffect(() => {
  //   const backHandler = BackHandler.addEventListener('hardwareBackPress', () =>
  //     handleBackPress(webViewRef),
  //   );

  //   return () => backHandler.remove();
  // }, []);

  //   const useCustomBackHandler = () => {
  //   React.useEffect(() => {
  //     const handleBackPress = () => {
  //       // Navigate to the home screen of your mobile application
  //       navigation.navigate('Home');
  //       return true;
  //     };

  //     const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

  //     return () => backHandler.remove();
  //   }, [navigation]);
  // };
  // useCustomBackHandler();

  // const webViewRef = React.useRef(null);

  const webViewRef = React.useRef<WebView | null>(null);

  React.useEffect(() => {
    const handleBackPress = () => {
      if (webViewRef.current) {
        webViewRef.current.goBack(); // Go back one page within the WebView
        return true;
      } else {
        // Navigate to the home screen of your mobile application
        navigation.navigate('Home');
        return true;
      }
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress,
    );

    return () => backHandler.remove();
  }, [navigation]);

  const injectedScript = `
  <script>
    (function() {
      var body = document.body,
        html = document.documentElement;
      var height = Math.max(
        body.scrollHeight,
        html.scrollHeight,
        body.offsetHeight,
        html.offsetHeight,
        body.clientHeight,
        html.clientHeight
      );
      const data = JSON.stringify({ height, type: 'dimensions' });
      window.ReactNativeWebView.postMessage(data);
    })();
  </script>
`;

  const [webViewHeight, setWebViewHeight] = useState(0);

  const handleWebviewMessage = (event: any) => {
    const postMessage = JSON.parse(event?.nativeEvent?.data);
    if (postMessage.type === 'dimensions') {
      const {height} = postMessage;
      setWebViewHeight(height);
    }
  };

  return (
    <View
      style={{
        backgroundColor: Color.white,
        height: '100%',
        paddingHorizontal: 10,
      }}>
      {getUserData &&
      userPackage &&
      promotionData &&
      webPortalData &&
      loading ? (
        <>
          <View style={{marginHorizontal: 10}}>
            <Header navigation={navigation} Drawer Notification />
            {/* User Name Inage And Id */}
            <View style={{flexDirection: 'row', gap: 10, marginTop: 20}}>
              <Image
                source={require('../../Images/avatar.png')}
                style={{width: 45, height: 45, borderRadius: 50}}
                resizeMode="contain"
              />
              <View>
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: 'Poppins-SemiBold',
                    color: Color.textColor,
                  }}>
                  {nickName ? nickName : getUserData?.first_name}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: 'Poppins-Regular',
                    color: Color.textColor,
                  }}>
                  User Id: {getUserData?.customer_id}
                </Text>
              </View>
            </View>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{marginHorizontal: 10}}>
              <Text
                style={{
                  fontSize: 25,
                  fontFamily: 'Poppins-SemiBold',
                  marginLeft: 5,
                  marginTop: 5,
                  color: Color.mainColor,
                }}>
                Welcome Back!
              </Text>
              {/* Account Information */}
              <View style={styles.container}>
                <View style={styles.body}>
                  <View style={{}}>
                    <Text
                      style={[
                        styles.package,
                        {fontSize: 30, textAlign: 'center'},
                      ]}>
                      Account {'\n'} Status{' '}
                    </Text>
                    <View style={{alignItems: 'center'}}>
                      <Text
                        style={[
                          styles.status,
                          {
                            color: Color.white,
                            fontSize: 25,
                            backgroundColor:
                              getUserData?.status == 'Active'
                                ? '#4ecc05'
                                : getUserData?.status == 'Inactive '
                                ? 'red'
                                : getUserData?.status == 'Registered'
                                ? '#eee'
                                : getUserData?.status == 'Terminate'
                                ? 'darkgrey'
                                : 'pink',
                            paddingHorizontal: 10,
                            paddingVertical: 3,
                          },
                        ]}>
                        {getUserData?.status == 'Inactive'
                          ? 'Expire'
                          : getUserData?.status}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 10,
                        marginTop: 10,
                      }}>
                      <Image
                        source={require('../../Images/redIcon.png')}
                        style={{width: 15, height: 15}}
                      />
                      <Text
                        style={[
                          styles.package,
                          {fontWeight: 'bold', fontSize: 18},
                        ]}>
                        Last Renewal Date: {'\n'}
                        <Text style={{color: Color.textColor}}>
                          {RenewalDate}
                        </Text>
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 10,
                        marginVertical: 10,
                      }}>
                      <Image
                        source={require('../../Images/redIcon.png')}
                        style={{width: 15, height: 15}}
                      />
                      <Text
                        style={[
                          styles.package,
                          {fontWeight: 'bold', fontSize: 18},
                        ]}>
                        Last Expiry Date: {'\n'}
                        <Text style={{color: Color.textColor}}>
                          {expiryDate}
                        </Text>
                      </Text>
                    </View>
                  </View>
                  <View style={{}}>
                    {/* <View
                  style={{
                    backgroundColor: Color.mainColor,
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    borderRadius: 10,
                    alignItems: 'center',
                    // height: 150,
                  }}>
                  
                </View> */}
                    <ImageBackground
                      source={require('../../Images/packagebg.png')}
                      style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          color: Color.white,
                          fontSize: 20,
                          fontWeight: 'bold',
                        }}>
                        Package
                      </Text>
                      <Text
                        style={{
                          color: '#f9e208',
                          fontSize: 20,
                          fontWeight: 'bold',
                        }}>
                        {userPackage?.package_mbps == null
                          ? '0'
                          : userPackage.package_mbps}{' '}
                        Mbps
                      </Text>
                      <Text
                        style={{
                          color: Color.white,
                          fontSize: 20,
                          fontWeight: 'bold',
                        }}>
                        unlimited
                      </Text>
                    </ImageBackground>
                    <Image
                      source={require('../../Images/leaf.png')}
                      style={{
                        width: 100,
                        height: 100,
                        marginTop: 25,
                        alignSelf: 'center',
                      }}
                      resizeMode="contain"
                    />
                  </View>
                </View>
              </View>
              {/* Web POrtal */}
              <View style={{marginVertical: 20}}>
                <Text
                  style={{
                    fontSize: 25,
                    fontFamily: 'Poppins-SemiBold',
                    color: Color.mainColor,
                    textAlign: 'center',
                  }}>
                  Web Portals
                </Text>
                <FlatList
                  data={webPortalData ?? []}
                  showsHorizontalScrollIndicator={false}
                  nestedScrollEnabled
                  horizontal
                  renderItem={({item, index}: any) => {
                    return (
                      <TouchableOpacity
                        onPress={() => handelWebView(item?.portal_link)}
                        activeOpacity={0.8}
                        style={{paddingRight: 15}}>
                        <Image
                          source={{uri: item.image}}
                          style={{width: 150, height: 130, borderRadius: 10}}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
            </View>
            {/* {selectedLink && (
          <WebView
            source={{uri: selectedLink}}
            style={{width: '100%', height: 300, flex:1}}
          />
        )} */}

            {/* Slider */}
            <View>
              <View
                style={{
                  height: height / 3,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <FlatList
                  ref={flatListRef}
                  data={promotionData ?? []}
                  showsHorizontalScrollIndicator={false}
                  nestedScrollEnabled={true}
                  pagingEnabled
                  onScroll={e => {
                    const x = e.nativeEvent.contentOffset.x;
                    setCurrentIndex((x / (width - 50)).toFixed(0));
                  }}
                  horizontal
                  renderItem={({item, index}: any) => {
                    return (
                      <View
                        style={{
                          width: width / 1.05,
                          height: height / 3,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Image
                          source={{uri: item.image}}
                          style={{
                            borderRadius: 10,
                            width: '92%',
                            height: '94%',
                          }}
                          resizeMode="contain"
                        />
                      </View>
                    );
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  width: width,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {promotionData &&
                  promotionData.map((item: any, index: number) => {
                    return (
                      <View
                        key={item.ID}
                        style={{
                          width: currentIndex == index ? 20 : 8,
                          height: currentIndex == index ? 10 : 8,
                          borderRadius: currentIndex == index ? 5 : 4,
                          backgroundColor:
                            currentIndex == index ? Color.mainColor : 'gray',
                          marginLeft: 5,
                        }}></View>
                    );
                  })}
              </View>
            </View>

            {/* Help And Support */}
            <View
              style={{
                flexDirection: 'row',
                gap: 10,
                alignItems: 'center',
                backgroundColor: Color.white,
                elevation: 5,
                marginVertical: 20,
                marginHorizontal: 10,
                borderRadius: 10,
                padding: 10,
              }}>
              {/* <Image
            source={require('../../Images/headphone.png')}
            style={{width: 80, height: 80}}
            resizeMode="contain"
          /> */}
              <AntDesign
                name="customerservice"
                color={Color.textColor}
                size={80}
              />
              <View style={{}}>
                <Text
                  style={{fontSize: 16, fontWeight: 'bold', color: 'black'}}>
                  Help & Customer Support
                </Text>
                <Text style={{fontSize: 14, color: Color.textColor}}>
                  Register a complaint or get quick {'\n'} help on quries
                  related to
                  <Text style={{color: Color.mainColor, fontWeight: 'bold'}}>
                    {' '}
                    Yournet
                  </Text>
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Help')}
                  activeOpacity={0.8}
                  style={{
                    borderWidth: 1,
                    width: 120,
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: 8,
                    borderRadius: 50,
                    borderColor: Color.mainColor,
                    marginVertical: 10,
                    flexDirection: 'row',
                    gap: 10,
                  }}>
                  <Text
                    style={{
                      color: Color.textColor,
                      fontWeight: 'bold',
                      fontSize: 16,
                    }}>
                    Get Help
                  </Text>
                  <AntDesign
                    name="arrowright"
                    color={Color.mainColor}
                    size={20}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </>
      ) : (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator color="black" size={'large'} />
        </View>
      )}
      {selectedLink && (
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            // height: '100%',
          }}>
          <WebView
            ref={webViewRef}
            source={{uri: 'http://maxfun.com.pk/'}}
            allowsFullscreenVideo={true}
            startInLoadingState={true}
            overScrollMode="content"
            // androidHardwareAccelerationDisabled={false}
            cacheEnabled={true}
            injectedJavaScript={injectedScript}
            style={{height: webViewHeight, width: '100%'}}
            onMessage={handleWebviewMessage}
            scrollEnabled={true}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.white,
    elevation: 10,
    padding: 10,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  body: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 20,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  status: {
    fontSize: 16,
    color: 'green',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  package: {
    fontSize: 16,
    marginBottom: 5,
    color: Color.mainColor,
    // fontWeight: 'bold',
  },
  renewal: {
    fontSize: 16,
    marginBottom: 5,
  },
  expiry: {
    fontSize: 16,
    marginBottom: 5,
  },
});
