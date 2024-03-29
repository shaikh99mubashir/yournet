import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
  Image,
  Modal,
  Dimensions,
  ScrollView,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {Color} from '../../Constants';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Ionicons';
import Share from 'react-native-share';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BaseUrl} from '../../Constants/BaseUrl';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart, logout} from '../../Redux/Reducer/Reducers';
import HTML from 'react-native-render-html';
import messaging from '@react-native-firebase/messaging';
function CustomDrawerContent(props: any) {
  const dispatch = useDispatch();

  const navigateToScreen = (screenName: any) => {
    props.navigation.navigate(screenName);
  };
  const focus = useIsFocused();
  const [openWWRModal, setOpenWWRModal] = useState(false);
  const [openPPModal, setOpenPPModal] = useState(false);

  // get User DATA
  const [getUserData, setUserData] = useState<any>([]);
  const cartData: any = useSelector(cartData => cartData);

  useEffect(() => {
    setUserData(cartData?.user?.cart?.customer);
  }, [cartData, focus]);

  // const getData = () => {
  //   const config = {
  //     headers: {
  //       User_ID: user_id,
  //     },
  //   };
  //   axios
  //     .post(`${BaseUrl}getAllData`, null, config)
  //     .then((res: any) => {
  //       setUserData(res.data.customer);
  //     })
  //     .catch(error => {
  //       ToastAndroid.show('Internal Server Error', ToastAndroid.BOTTOM);
  //     });
  // };

  // useEffect(() => {
  //   getData();
  // }, [user_id, focus]);
  // props.navigation.addListener('state', () => {
  //   getData()
  // });

  const share = async () => {
    const options = {
      message: 'ISP Billing Cloud-based Billing & Data Management Platform For ISP’s (Internet Service Providers)',
      url: 'https://ispbilling.com.pk/APP/ISPBILLINGAPP.apk',
      // email: 'mubashir@gmail.com',
      // subject: 'Eiusmod esse veniam esse.',
      // recipient: '919988998899',
    };

    try {
      const res = await Share.open(options);
    } catch (err) {
      console.log(err);
    }
  };
  const ShowMessage = () => {
    ToastAndroid.show('This Feature will Soon Avaiable !', ToastAndroid.SHORT);
  };

  const logoutFun = () => {
    props.navigation.replace('Login');
    AsyncStorage.removeItem('user_id');
    AsyncStorage.removeItem('loginFields');
    AsyncStorage.removeItem('nickName');
    dispatch(logout());

    messaging()
      .getToken()
      .then(device_token => {
        const formData = new FormData();
        formData.append('device_token', device_token);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    axios
      .post(`${BaseUrl}deleteDeviceToken`, formData, config)
      .then(({data}: any) => {
        ToastAndroid.show(
          'Logout Successfully',
          ToastAndroid.BOTTOM,
        );
      })
      .catch(error => {
        console.log('error', error);
      });
      });

  };

  const userNickName: any = useSelector(userNickName => userNickName);
  const nickname = userNickName?.user?.userNickName;
  const getWhoWeAre = cartData?.user?.cart?.whoweare;
  const PackagesPlans: any = useSelector(PackagesPlans => PackagesPlans);
  const getPackagesPlans = cartData?.user?.cart?.package_image;

  const availOffer = () => {
    setOpenPPModal(false);
    props.navigation.navigate('Contact');
  };

  const firstname = getUserData?.first_name;

  let initial = '';

  if (typeof nickname === 'string' && nickname.length > 0) {
    initial = nickname.charAt(0);
  } else if (typeof firstname === 'string' && firstname.length > 0) {
    initial = firstname.charAt(0);
  }

  return (
    <View
      style={{flex: 1, backgroundColor: Color.white, paddingHorizontal: 10}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.drawerContent}
        showsVerticalScrollIndicator={false}>
        <View>
          {/* Your custom drawer content here */}
          {/* Logout And Close Button */}
          <View style={[styles.closeButtonContainer, {marginTop: 20}]}>
            <TouchableOpacity
              onPress={() => logoutFun()}
              style={{
                backgroundColor: '#eee',
                paddingVertical: 5,
                paddingHorizontal: 10,
                borderRadius: 10,
              }}>
              <Text style={[styles.closeButton, {fontWeight: '400'}]}>
                Log Out
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
              <Icon
                name="ios-arrow-back-circle-outline"
                size={27}
                color={Color.mainColor}
              />
            </TouchableOpacity>
          </View>
          {/* Name Profile And setting */}
          <LinearGradient
            colors={['#FFC0CB', '#ADD8E6']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            locations={[0.25, 0.75]}
            angle={45}
            style={{
              marginHorizontal: 10,
              // padding: 10,
              borderRadius: 20,
              alignItems: 'center',
              marginVertical: 20,
            }}>
            <View
              style={{
                backgroundColor: Color.white,
                paddingVertical: 0,
                width: 40,
                height: 40,
                borderRadius: 50,
                marginVertical: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: 20,
                  color: Color.textColor,
                  padding: 0,
                  margin: 0,
                }}>
                {/* {userNickName?.user?.userNickName
                  ? userNickName?.user?.userNickName?.charAt(0)
                  : getUserData?.first_name
                  ? getUserData?.first_name?.charAt(0)
                  : 'I'} */}
                {initial}
              </Text>
            </View>
            <Text style={{fontSize: 18, color: Color.textColor}}>
              {userNickName.user.userNickName
                ? userNickName.user.userNickName
                : getUserData?.first_name}
            </Text>
            {/* <Text style={{fontSize: 20, color: Color.textColor}}>{getUserData?.customer_id}</Text> */}
            <View style={{flexDirection: 'row', gap: 20, marginVertical: 10}}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigateToScreen('Profile')}
                style={{
                  backgroundColor: Color.white,
                  borderRadius: 10,
                  flexDirection: 'row',
                  gap: 5,
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '30%',
                  paddingVertical: 5,
                }}>
                <Image
                  source={require('../../Images/myacount.png')}
                  style={{width: 14, height: 14}}
                  resizeMode="contain"
                />
                <Text
                  style={{
                    fontSize: 14,
                    color: Color.textColor,
                    fontWeight: '500',
                  }}>
                  Profile
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigateToScreen('Settings')}
                style={{
                  backgroundColor: Color.white,
                  borderRadius: 10,
                  flexDirection: 'row',
                  gap: 5,
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '30%',
                  paddingVertical: 5,
                }}>
                <Image
                  source={require('../../Images/settings.png')}
                  style={{width: 14, height: 14}}
                  resizeMode="contain"
                />
                <Text
                  style={{
                    fontSize: 14,
                    color: Color.textColor,
                    fontWeight: '500',
                  }}>
                  Settings
                </Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
          {/* Customer Support Fee Detail sharq FAQS */}
          <View
            style={{
              marginHorizontal: 10,
              paddingHorizontal: 10,
              paddingVertical: 20,
              borderRadius: 10,
              marginBottom: 10,
              backgroundColor: '#eee',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}>
              <View style={{}}>
                <TouchableOpacity
                  onPress={() => navigateToScreen('Help')}
                  style={{
                    backgroundColor: Color.white,
                    padding: 10,
                    borderRadius: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                    width: 140,
                    height: 55,
                  }}>
                  <AntDesign name="customerservice" color="black" size={25} />
                  <Text style={{color: Color.textColor, fontSize: 14}}>
                    {' '}
                    Customer {'\n'} Support
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{justifyContent: 'center'}}>
                <TouchableOpacity
                  onPress={() => setOpenWWRModal(!openWWRModal)}
                  style={{
                    backgroundColor: Color.white,
                    padding: 10,
                    borderRadius: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                    width: 140,
                    height: 55,
                  }}>
                  <Image
                    source={require('../../Images/fees.png')}
                    style={{width: 25, height: 25}}
                    resizeMode="contain"
                  />
                  <Text style={{color: Color.textColor, fontSize: 14}}>
                    {' '}
                    Who We Are
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <View style={{}}>
                <TouchableOpacity
                  onPress={() => navigateToScreen('FAQs')}
                  style={{
                    backgroundColor: Color.white,
                    padding: 10,
                    borderRadius: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                    width: 140,
                    height: 55,
                  }}>
                  <Image
                    source={require('../../Images/faq.png')}
                    style={{width: 25, height: 25}}
                    resizeMode="contain"
                  />
                  <Text style={{color: Color.textColor}}> FAQs</Text>
                </TouchableOpacity>
              </View>
              <View style={{justifyContent: 'center'}}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => share()}
                  style={{
                    backgroundColor: Color.white,
                    padding: 10,
                    borderRadius: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                    width: 140,
                    height: 55,
                  }}>
                  <Image
                    source={require('../../Images/share.png')}
                    style={{width: 25, height: 25}}
                    resizeMode="contain"
                  />
                  <Text style={{color: Color.textColor}}> Share</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Transaction History And Package plans */}
          <View
            style={{
              marginHorizontal: 10,
              paddingHorizontal: 10,
              paddingVertical: 20,
              borderRadius: 10,
              marginBottom: 10,
              backgroundColor: '#eee',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <View style={{}}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => navigateToScreen('TransactionHistory')}
                  style={{
                    backgroundColor: Color.white,
                    padding: 10,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 10,
                    width: 140,
                    height: 120,
                  }}>
                  <Image
                    source={require('../../Images/transactionhistory.png')}
                    style={{width: 35, height: 35}}
                    resizeMode="contain"
                  />
                  <Text style={{color: Color.textColor}}> Invoice</Text>
                </TouchableOpacity>
              </View>
              <View style={{justifyContent: 'center'}}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  // onPress={() => navigateToScreen('PackagesPlans')}
                  onPress={() => setOpenPPModal(!openPPModal)}
                  // onPress={ShowMessage}
                  style={{
                    backgroundColor: Color.white,
                    padding: 10,
                    borderRadius: 10,
                    justifyContent: 'center',

                    alignItems: 'center',
                    gap: 10,
                    width: 140,
                    height: 120,
                  }}>
                  {/* <MaterialIcons name="next-plan" color="black" size={35} /> */}
                  <Image
                    source={require('../../Images/packagesandplan.png')}
                    style={{width: 40, height: 40}}
                  />
                  <Text style={{color: Color.textColor}}>
                    {' '}
                    Packages {'\n'} & Plans
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginVertical: 20,
            }}>
            <Text style={{textAlign: 'center', color: Color.textColor}}>
              ISP Billing Version 1.001{' '}
            </Text>
            <TouchableOpacity
              // onPress={ShowMessage}
              onPress={() => navigateToScreen('TermsCondition')}>
              <Text style={{color: 'blue'}}>Terms & Condition</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Who We Are Modal */}
        <View style={{flex: 1}}>
          <Modal
            visible={openWWRModal}
            animationType="fade"
            transparent={true}
            onRequestClose={() => setOpenWWRModal(false)}>
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
                  padding: 15,
                  borderRadius: 10,
                  marginHorizontal: 20,height:'90%'
                }}>
                <TouchableOpacity onPress={() => setOpenWWRModal(false)}>
                  <View style={{alignItems: 'flex-end'}}>
                    <AntDesign
                      name="closecircleo"
                      size={20}
                      color={Color.mainColor}
                    />
                  </View>
                </TouchableOpacity>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 18,
                    fontWeight: '700',
                    color: Color.mainColor,
                  }}>
                  Who We Are?
                </Text>

                <ScrollView showsVerticalScrollIndicator={false}>
                  <HTML
                    source={{html: getWhoWeAre}}
                    ignoredDomTags={['o:p']}
                    contentWidth={300} // Set the content width as per your design
                    baseStyle={
                      {
                        // textAlign: 'justify',
                        // fontSize: 14,
                        // color: Color.textColor,
                        color: 'black',
                      }
                    }
                  />
                </ScrollView>
              </View>
            </View>
          </Modal>
        </View>

        {/* Packages And Plans */}
        <View style={{flex: 1}}>
          <Modal
            visible={openPPModal}
            animationType="fade"
            transparent={true}
            onRequestClose={() => setOpenPPModal(false)}>
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
                  // padding: 15,
                  borderRadius: 5,
                  marginHorizontal: 20,
                }}>
                <TouchableOpacity onPress={() => setOpenPPModal(false)}>
                  <View
                    style={{
                      alignItems: 'flex-end',
                      paddingVertical: 10,
                      paddingRight: 15,
                    }}>
                    <AntDesign
                      name="closecircleo"
                      size={20}
                      color={Color.mainColor}
                    />
                  </View>
                </TouchableOpacity>
                <Image
                  source={{uri: getPackagesPlans?.image_url}}
                  style={{
                    width: Dimensions.get('screen').width / 1.1,
                    height: '80%',
                  }}
                  resizeMode="contain"
                />

                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={availOffer}
                  style={{
                    backgroundColor: Color.mainColor,
                    marginHorizontal: 10,
                    paddingVertical: 10,
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
                    Contact us
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </DrawerContentScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  drawer: {
    width: '100%',
  },
  drawerContent: {
    // flex: 1,
    justifyContent: 'space-between',
  },
  closeButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  closeButton: {
    color: 'black',
    fontSize: 14,
  },
});
export default CustomDrawerContent;
