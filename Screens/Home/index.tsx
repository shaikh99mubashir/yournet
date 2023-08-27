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
  Alert,
  ActivityIndicator,
  Modal,
  Button,
  BackHandler,
  Platform,
  TextInput,
  RefreshControl,
} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React, {useState, useRef, useEffect} from 'react';
import Header from '../../Components/Header';
import {Color} from '../../Constants';
import {BaseUrl} from '../../Constants/BaseUrl';
import axios from 'axios';
import {WebView} from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import CheckWebView from '../CheckWebView';
import Loader from '../../Components/Loader';
import notifee, {AndroidImportance} from '@notifee/react-native';
import {useDispatch, useSelector} from 'react-redux';
import {AppState, AppStateStatus} from 'react-native';
import {
  addToCart,
  companyName,
  faqsData,
  logout,
  packagesPlans,
  pushNotification,
  termAndCondition,
  whoWeAre,
} from '../../Redux/Reducer/Reducers';
import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';
const {height, width} = Dimensions.get('window');
interface Receipt {
  created_at: string;
}
const Home = ({navigation}: any) => {
  const [getUserData, setUserData] = useState<any>(null);
  const [userPackage, setUserPackage] = useState<any>([]);
  const [promotionData, setPromotionData] = useState<any>([]);
  const [webPortalData, WebPortalData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [noInternet, setNoInternet] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [fcmToken, setFCMToken] = useState('');
  const [companyName, setCompanyName] = useState<any>('');
  const [refreshing, setRefreshing] = React.useState(false);
  const [refresh, setRefresh] = useState(false);
  const [receipts, setReceipts] = useState([]);
  const cartData: any = useSelector(cartData => cartData);
  const [apply, setApply] = useState(false);
  const [cancel, setCancel] = useState(false);
  const [email_address, setEmail_address] = useState('');
  const dispatch = useDispatch();
  //used to focus
  const focus = useIsFocused();
  // user id to get Data
  const [user_id, setUser_id] = useState('');
  // getting user id from acstorage
  const gettingUserDatatoken = () => {
    AsyncStorage.getItem('user_id')
      .then(value => {
        if (value !== null) {
          setUser_id(JSON.parse(value));
        } else {
          console.log('No user_id found');
        }
      })
      .catch(error => console.log('Error retrieving login fields: ', error));
  };

  useEffect(() => {
    gettingUserDatatoken();
  }, [focus]);

  useEffect(() => {
    setUserData(cartData?.user?.cart?.customer);
    WebPortalData(cartData?.user?.cart?.portals);
    setUserPackage(cartData?.user?.cart?.package);
    setPromotionData(cartData?.user?.cart?.promotions);
    setCompanyName(cartData?.user?.cart?.company?.com_name);
    setReceipts(cartData?.user?.cart?.receipts);
  }, [cartData, focus]);


  // get user data
  const getData = () => {
    setLoading(true);
    const config = {
      headers: {
        User_ID: user_id,
      },
    };
    // is if ki condition sa home page ka loader hat jaya ga yeah is liya band ki hai ka data update nahi ho raha hai
    // if (getUserData) {
    //   setLoading(false);
    //   return;
    // }
    axios
      .post(`${BaseUrl}getAllData`, null, config)
      .then((res: any) => {
        if (res.data && res.data.customer) {
          // AsyncStoragesa login fields check kar ka password check kara ga or data dispatch kara ga agar mismatch hoo ga to logout kar deay ga
          AsyncStorage.getItem('loginFields')
            .then(value => {
              if (value !== null) {
                let Loginfields = JSON.parse(value);
                if (Loginfields.password === res?.data?.customer?.password) {
                  dispatch(addToCart(res.data));
                  setUserData(res.data.customer);
                  WebPortalData(res.data.portals);
                  setUserPackage(res.data.package);
                  setPromotionData(res.data.promotions);
                  dispatch(addToCart(res.data));
                  setLoading(false);
                } else {
                  navigation.replace('Login');
                  AsyncStorage.removeItem('user_id');
                  AsyncStorage.removeItem('loginFields');
                  AsyncStorage.removeItem('nickName');
                  dispatch(logout());
                  ToastAndroid.show(
                    'Password Change Update Your Password',
                    ToastAndroid.LONG,
                  );
                }
              } else {
                console.log('No user_id found');
              }
            })
            .catch(error =>
              console.log('Error retrieving login fields: ', error),
            );
        }
      })
      .catch(error => {
        console.log('error,==>', error);
        if (error == 'AxiosError: Network Error') {
          ToastAndroid.show('You Are Offline', ToastAndroid.LONG);
          setNoInternet(true);
          return;
        }
        ToastAndroid.show('Internal Server Error Home check Your Internet Connection', ToastAndroid.LONG);
        setLoading(false);
        setUserData(null);
      });
  };

  useEffect(() => {
    getData();
  }, [user_id, focus, refresh]);
  // 
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      setRefresh(!refresh);
    }, 2000);
  }, [refresh]);

  const appState = useRef(AppState.currentState);
  const backgroundStartTime = useRef<number | null>(null); // Store background start time
  const backgroundTime = useRef(0);
  const maxBackgroundTime = 60 * 60 * 1000; // 1 hour in milliseconds
  // const maxBackgroundTime = 60 * 1000; // 1 minute in milliseconds

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App has come to the foreground!');
        if (backgroundStartTime.current !== null) {
          const currentTime = Date.now();
          const backgroundDuration = currentTime - backgroundStartTime.current;
          backgroundTime.current += backgroundDuration;
          backgroundStartTime.current = null;

          if (backgroundTime.current >= maxBackgroundTime) {
            console.log(
              'Navigating to SplashScreen after 1 minute in background.',
            );
            navigation.navigate('SplashScreen');
          }
        }
      }

      if (appState.current === 'background' && nextAppState === 'active') {
        backgroundStartTime.current = Date.now();
      }

      appState.current = nextAppState;
      console.log('AppState', appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  // Get Notification
  const getNotification = () => {
    const formData = new FormData();
    formData.append('customer_id', getUserData?.customer_id);
    formData.append('device_token', fcmToken);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    axios
      .post(`${BaseUrl}getPushNotifications`, formData, config)
      .then(({data}: any) => {
        dispatch(pushNotification(data.push_notifications));
      })
      .catch(error => {
        console.log('error', error);

        ToastAndroid.show(
          'Internal Server Error in Notification',
          ToastAndroid.BOTTOM,
        );
      });
  };

  useEffect(() => {
    getNotification();
    // Schedule the getNotification function to be called every hour
    const intervalId = setInterval(() => {
      getNotification();
      // }, 60 * 60 * 1000); // 1 hour in milliseconds
    }, 10000);

    // Clean up the interval on component unmount
    return () => {
      clearInterval(intervalId);
    };
  }, [getUserData?.customer_id, fcmToken]);

  useEffect(() => {
    getFCMToken();
    requestPermission();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      DisplayNotification(remoteMessage);
    });
    return unsubscribe;
  }, [focus]);

  const getFCMToken = () => {
    messaging()
      .getToken()
      .then(token => {
        setFCMToken(token);
      });
  };

  const requestPermission = async () => {
    const authStatus = await messaging().requestPermission();
  };

  async function DisplayNotification(remoteMessage: any) {
    // Create a channel
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
    });

    // Display a notification
    await notifee.displayNotification({
      title: remoteMessage.notification.title,
      body: remoteMessage.notification.body,
      android: {
        channelId,
      },
    });
  }

  // email work
  const saveEmailAdress = () => {
    const expression: RegExp = /^[A -Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const userEmail: any = email_address;
    const result: boolean = expression.test(userEmail); // true
    if (!result) {
      ToastAndroid.show('Enter correct email', ToastAndroid.SHORT);
      return;
    }
    const formData = new FormData();
    formData.append('email_address', email_address);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        user_id: user_id,
      },
    };

    axios
      .post(`${BaseUrl}editProfile`, formData, config)
      .then((res: any) => {
        ToastAndroid.show(`${res.data.message}`, ToastAndroid.BOTTOM);
        setModalVisible(false);
      })
      .catch(error => {
        ToastAndroid.show('Internal Server Error', ToastAndroid.BOTTOM);
      });
  };
  useEffect(() => {
    getUserData?.email_address == ''
      ? setModalVisible(true)
      : setModalVisible(false);
  }, [getUserData?.email_address]);

  const handelWebView = (link: string) => {
    if (link) {
      navigation.navigate('CheckWebView', {selectedLink: link});
    } else {
      ToastAndroid.show('contact to admin', ToastAndroid.SHORT);
    }
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
  }, [currentIndex,focus,cartData]);

  const getItemLayout = (_: any, index: number) => ({
    length: width / 1.05, // Replace with the actual width of each item
    offset: (width / 1.05) * index,
    index,
  });

  //  promotion Work Ended

  // // Initialize Firebase app for notification
  const checkPermissionAndToken = async () => {
    messaging()
      .hasPermission()
      .then(enabled => {
        if (enabled) {
          messaging()
            .getToken()
            .then(fcmToken => {
              if (fcmToken) {
                // console.log('fcmToken===============>', fcmToken);
                const formData = new FormData();
                formData.append('customer_id', getUserData?.customer_id);
                formData.append('device_token', fcmToken);

                const config = {
                  headers: {
                    'Content-Type': 'multipart/form-data',
                  },
                };

                axios
                  .post(`${BaseUrl}saveDeviceToken`, formData, config)
                  .then((res: any) => {
                    // ToastAndroid.show(
                    //   `${res.data.message}`,
                    //   ToastAndroid.BOTTOM,
                    // );
                  })
                  .catch(error => {
                    // ToastAndroid.show(
                    //   'Internal Server Error fcmToken',
                    //   ToastAndroid.BOTTOM,
                    // );
                    console.log('Internal Server Error fcmToken');
                  });
              } else {
                console.log("user doesn't have a device token yet");
              }
            });
        }
      })
      .catch(error => {
        console.log('error', error);
      });
  };

  useEffect(() => {
    checkPermissionAndToken();
  }, [getUserData?.customer_id]);
  // nickname
  const userNickName: any = useSelector(userNickName => userNickName);

  // Back Handler
  const [showConfirmation, setShowConfirmation] = useState(false);
  useEffect(() => {
    const backAction = () => {
      if (focus) {
        setShowConfirmation(true);
        return true; // Return true to prevent the default back button action
      }
    };

    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
    };
  }, [focus]);
  const handleGoBack = () => {
    setShowConfirmation(false);
    // navigation.goBack(); // Navigate back using the navigation.goBack() method
    if (Platform.OS === 'android') {
      BackHandler.exitApp(); // Close the app on Android
    } else {
      // Handle app closing for other platforms (e.g., iOS)
      // You can implement your own logic here or use any libraries or modules specific to the platform
    }
  };
  const handleCancel = () => {
    setShowConfirmation(false);
  };

  return (
    <View
      style={{
        backgroundColor: Color.white,
        height: '100%',
        paddingHorizontal: 12,
      }}>
      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: Color.white,
            opacity: 0.9,
          }}>
          <ActivityIndicator color={Color.mainColor} size={'large'} />
        </View>
      ) : (
        <>
          {/* Update Email */}
          <Modal visible={modalVisible} animationType="fade" transparent={true}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'rgba(0,0,0,0.5)',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  backgroundColor: 'white',
                  padding: 20,
                  borderRadius: 10,
                  width: '80%',
                }}>
                <Text style={{fontSize: 15, fontWeight: '500', color: 'black'}}>
                  Update Your Email
                </Text>
                <TextInput
                  placeholder="Enter Email Address"
                  onChangeText={e => setEmail_address(e)}
                  placeholderTextColor={Color.textColor}
                  style={{
                    color: Color.textColor,
                    borderWidth: 1,
                    marginTop: 15,
                    paddingHorizontal: 5,
                    borderRadius: 10,
                    borderColor: '#eee',
                    fontSize: 14,
                  }}
                />
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    gap: 10,
                    marginTop: 20,
                    marginBottom: 0,
                  }}>
                  <TouchableOpacity
                    onPressIn={() => setCancel(true)}
                    onPressOut={() => setCancel(false)}
                    onPress={() => setModalVisible(false)}
                    activeOpacity={0.8}
                    style={{
                      borderWidth: 1,
                      paddingVertical: 5,
                      borderRadius: 50,
                      borderColor: Color.textColor,
                      alignItems: 'center',
                      width: 100,
                      backgroundColor: cancel ? Color.mainColor : 'white',
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: 'Poppins-SemiBold',
                        color: cancel ? 'white' : Color.mainColor,
                      }}>
                      Skip
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPressIn={() => setApply(true)}
                    onPressOut={() => setApply(false)}
                    onPress={() => saveEmailAdress()}
                    activeOpacity={0.8}
                    style={{
                      borderWidth: 1,
                      paddingVertical: 5,
                      borderRadius: 50,
                      borderColor: Color.textColor,
                      alignItems: 'center',
                      width: 100,
                      backgroundColor: apply ? 'white' : Color.mainColor,
                    }}>
                    <Text
                      style={{
                        color: apply ? Color.mainColor : 'white',
                        fontSize: 14,
                        fontFamily: 'Poppins-SemiBold',
                      }}>
                      Update
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

          {/* ask for go back */}
          {focus && showConfirmation && (
            <Modal visible={showConfirmation} transparent>
              <View
                style={{
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    backgroundColor: 'white',
                    padding: 20,
                    borderRadius: 10,
                    width: '80%',
                  }}>
                  <Text
                    style={{fontSize: 15, fontWeight: '500', color: 'black'}}>
                    Are you sure you want to Exit?
                  </Text>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      gap: 10,
                      marginTop: 20,
                      marginBottom: 0,
                    }}>
                    <TouchableOpacity
                      onPressIn={() => setCancel(true)}
                      onPressOut={() => setCancel(false)}
                      onPress={handleCancel}
                      activeOpacity={0.8}
                      style={{
                        borderWidth: 1,
                        paddingVertical: 5,
                        borderRadius: 50,
                        borderColor: Color.textColor,
                        alignItems: 'center',
                        width: 100,
                        backgroundColor: cancel ? Color.mainColor : 'white',
                      }}>
                      <Text
                        style={{
                          fontSize: 14,
                          fontFamily: 'Poppins-SemiBold',
                          color: cancel ? 'white' : Color.mainColor,
                        }}>
                        No
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPressIn={() => setApply(true)}
                      onPressOut={() => setApply(false)}
                      onPress={handleGoBack}
                      activeOpacity={0.8}
                      style={{
                        borderWidth: 1,
                        paddingVertical: 5,
                        borderRadius: 50,
                        borderColor: Color.textColor,
                        alignItems: 'center',
                        width: 100,
                        backgroundColor: apply ? 'white' : Color.mainColor,
                      }}>
                      <Text
                        style={{
                          color: apply ? Color.mainColor : 'white',

                          fontSize: 14,
                          fontFamily: 'Poppins-SemiBold',
                        }}>
                        Yes
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          )}

          <View style={{marginHorizontal: 10}}>
            <Header navigation={navigation} Drawer Notification />
            {/* User Name Inage And Id */}
            <View style={{flexDirection: 'row', gap: 10, marginTop: 20}}>
              <Image
                source={require('../../Images/avatar.png')}
                style={{width: 35, height: 35, borderRadius: 50}}
                resizeMode="contain"
              />
              <View style={{marginBottom: 10}}>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: 'Poppins-SemiBold',
                    color: Color.textColor,
                  }}>
                  {userNickName.user.userNickName
                    ? userNickName.user.userNickName
                    : getUserData?.first_name}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: 'Poppins-Regular',
                    color: Color.textColor,
                    top: -3,
                  }}>
                  Customer ID : {getUserData?.customer_id}
                </Text>
              </View>
            </View>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <View style={{marginHorizontal: 10}}>
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: 'Poppins-SemiBold',
                  marginLeft: 5,
                  marginTop: 5,
                  color: Color.mainColor,
                }}>
                Hi there!
              </Text>
              {/* Account Information */}
              <View
                style={[
                  styles.container,
                  {borderWidth: 0, paddingLeft: 15, paddingTop: 15},
                ]}>
                <View style={[styles.body, {borderWidth: 0}]}>
                  <View style={{}}>
                    <Text
                      style={[
                        styles.package,
                        {
                          fontSize: 20,
                          textAlign: 'center',
                          fontWeight: '600',
                          fontFamily: 'Poppins-SemiBold',
                          top: 12,
                        },
                      ]}>
                      Account Status
                    </Text>
                    <View style={{alignItems: 'center'}}>
                      {getUserData?.status == 'Active' ? (
                        <ImageBackground
                          source={require('../../Images/active.png')}
                          resizeMode="contain"
                          style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: 50,
                            width: 160,
                          }}>
                          <Text style={{color: 'white', fontSize: 20}}>
                            {getUserData?.status}
                          </Text>
                        </ImageBackground>
                      ) : getUserData?.status == 'Manual' ? (
                        <ImageBackground
                          source={require('../../Images/active.png')}
                          resizeMode="contain"
                          style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: 50,
                            width: 160,
                          }}>
                          <Text style={{color: 'white', fontSize: 20}}>
                            {getUserData?.status}
                          </Text>
                        </ImageBackground>
                      ) : getUserData?.status == 'Registered' ? (
                        <ImageBackground
                          source={require('../../Images/register.png')}
                          resizeMode="contain"
                          style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: 50,
                            width: 160,
                          }}>
                          <Text style={{color: 'white', fontSize: 20}}>
                            {getUserData?.status}
                          </Text>
                        </ImageBackground>
                      ) : getUserData?.status == 'InActive' ? (
                        <ImageBackground
                          source={require('../../Images/inactive.png')}
                          resizeMode="contain"
                          style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: 50,
                            width: 160,
                          }}>
                          <Text style={{color: 'white', fontSize: 20}}>
                            {getUserData?.status == 'InActive' ? 'Expired' : ''}
                          </Text>
                        </ImageBackground>
                      ) : getUserData?.status == 'Terminate' ? (
                        <ImageBackground
                          source={require('../../Images/terminate.png')}
                          resizeMode="contain"
                          style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: 50,
                            width: 160,
                          }}>
                          <Text style={{color: 'white', fontSize: 20}}>
                            {getUserData?.status}
                          </Text>
                        </ImageBackground>
                      ) : (
                        ''
                      )}
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        gap: 10,
                        marginTop: 10,
                      }}>
                      <View style={{marginTop: 8}}>
                        <FontAwesome
                          name="circle"
                          size={8}
                          color={Color.mainColor}
                        />
                      </View>
                      <Text
                        style={[
                          styles.package,
                          {fontWeight: 'bold', fontSize: 16},
                        ]}>
                        Last Renewal Date: {'\n'}
                        <Text style={{color: Color.textColor, fontSize: 14}}>
                          {getUserData?.last_renewal_date}
                        </Text>
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        // alignItems: 'center',
                        gap: 10,
                        marginVertical: 10,
                      }}>
                      <View style={{marginTop: 8}}>
                        <FontAwesome
                          name="circle"
                          size={8}
                          color={Color.mainColor}
                        />
                      </View>
                      <Text
                        style={[
                          styles.package,
                          {fontWeight: 'bold', fontSize: 16},
                        ]}>
                        Expiry Date: {'\n'}
                        <Text style={{color: Color.textColor, fontSize: 14}}>
                          {getUserData?.expiry_date}
                        </Text>
                      </Text>
                    </View>
                  </View>
                  <View style={{borderWidth: 0}}>
                    <View style={{left: 0}}>
                      <ImageBackground
                        source={require('../../Images/packagebg.png')}
                        resizeMode="contain"
                        style={{
                          flex: 1,
                          alignItems: 'center',
                          justifyContent: 'center',
                          height: 150,
                          width: 150,
                        }}>
                        <Text
                          style={{
                            color: Color.white,
                            fontSize: 16,
                            fontWeight: 'bold',
                            fontFamily: 'BebasNeue-Regular',
                          }}>
                          Package
                        </Text>
                        <Text
                          style={{
                            color: '#f9e208',
                            fontSize: 18,
                            fontWeight: 'bold',
                            paddingHorizontal: 10,
                            fontFamily: 'BebasNeue-Regular',
                            textAlign: 'center',
                            width: 100,
                          }}>
                          {userPackage?.package_name ? (
                            userPackage?.package_name
                          ) : (
                            <Text>0 Mpps</Text>
                          )}
                        </Text>
                        <Text
                          style={{
                            color: Color.white,
                            fontSize: 16,
                            fontWeight: 'bold',
                            fontFamily: 'BebasNeue-Regular',
                          }}>
                          Unlimited
                        </Text>
                      </ImageBackground>
                    </View>
                    {/* <Image
                      source={require('../../Images/leaf.png')}
                      style={{
                        width: 160,
                        height: 130,
                        marginTop: 25,
                        borderWidth: 1,
                        borderRadius: 10,
                        // alignSelf: 'center',
                      }}
                      resizeMode="cover"
                    /> */}
                  </View>
                </View>
              </View>
              {/* Web POrtal */}
              <View style={{marginVertical: 20}}>
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: 'Poppins-SemiBold',
                    color: Color.mainColor,
                    textAlign: 'center',
                  }}>
                  Entertainment
                </Text>
                <FlatList
                  data={webPortalData ?? []}
                  showsHorizontalScrollIndicator={false}
                  nestedScrollEnabled
                  horizontal
                  keyExtractor={(item, index) => String(index)}
                  renderItem={({item, index}: any) => {
                    return (
                      <TouchableOpacity
                        onPress={() => handelWebView(item?.portal_link)}
                        activeOpacity={0.8}
                        style={{paddingRight: 8}}>
                        <Image
                          source={
                            item.image
                              ? {uri: item.image}
                              : require('../../Images/slider3.jpg')
                          }
                          style={{width: 150, height: 130, borderRadius: 10}}
                          resizeMode="cover"
                        />
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
            </View>

            {/* Slider */}
            <View>
              <View
                style={{
                  height: height / 4,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <FlatList
                  ref={flatListRef}
                  data={promotionData ?? []}
                  showsHorizontalScrollIndicator={false}
                  nestedScrollEnabled={true}
                  keyExtractor={(item, index) => String(index)}
                  pagingEnabled
                  getItemLayout={getItemLayout} // Add getItemLayout prop
                  onScroll={e => {
                    const x = e.nativeEvent.contentOffset.x;
                    setCurrentIndex((x / (width - 50)).toFixed(0));
                  }}
                  horizontal
                  renderItem={({item, index}: any) => {
                    return (
                      <View
                        style={{
                          width: width / 1.055,
                          height: height / 4,
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
                          width: currentIndex == index ? 8 : 6,
                          height: currentIndex == index ? 6 : 6,
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
                width: '100%',
                backgroundColor: 'white',
                elevation: 2,
                shadowRadius: 5,
                marginVertical: 15,
                borderWidth: 1,
                borderColor: '#eee',
                borderRadius: 10,
                paddingVertical: 10,
              }}>
              <View style={{width: '25%', alignItems: 'center', marginTop: 6}}>
                <AntDesign
                  name="customerservice"
                  color={Color.mainColor}
                  size={45}
                />
              </View>
              <View style={{width: '75%'}}>
                <Text
                  style={{fontSize: 14, fontWeight: 'bold', color: 'black'}}>
                  Help & Customer Support
                </Text>
                <Text style={{fontSize: 12, color: Color.textColor}}>
                Register a complaint or seek prompt assistance on enquiries related to
                  <Text
                    style={{
                      color: Color.mainColor,
                      fontWeight: 'bold',
                      fontSize: 12,
                    }}>
                    {' '}
                    {companyName}
                  </Text>
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Help')}
                  activeOpacity={0.8}
                  style={{
                    borderWidth: 1,
                    width: 105,
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: 2,
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
                      fontSize: 12,
                    }}>
                    Get Help
                  </Text>
                  <AntDesign
                    name="arrowright"
                    color={Color.mainColor}
                    size={15}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.white,
    elevation: 2,
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
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  status: {
    fontSize: 14,
    color: 'green',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  package: {
    fontSize: 14,
    marginBottom: 5,
    color: Color.mainColor,
  },
  renewal: {
    fontSize: 14,
    marginBottom: 5,
  },
  expiry: {
    fontSize: 14,
    marginBottom: 5,
  },
});
