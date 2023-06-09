import React,{useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet,ToastAndroid,Image,Modal} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {Color} from '../../Constants';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Share from 'react-native-share';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BaseUrl } from '../../Constants/BaseUrl';
import { useIsFocused } from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart, logout} from '../../Redux/Reducer/Reducers';
function CustomDrawerContent(props: any) {
  const dispatch = useDispatch();

  
  const navigateToScreen = (screenName: any) => {
    props.navigation.navigate(screenName);
  };
  const focus = useIsFocused()
  const [user_id, setUser_id] = useState('');
  const [openWWRModal, setOpenWWRModal] = useState(false)
  const gettingUserDatatoken = () => {
    AsyncStorage.getItem('user_id')
      .then(value => {
        if (value !== null) {
          setUser_id(JSON.parse(value));
        } else {
          console.log('No login fields found');
        }
      })
      .catch(error => console.log('Error retrieving login fields: ', error));
  };

  useEffect(() => {
    gettingUserDatatoken();
  }, [focus]);
 
  // get User DATA
  const [getUserData, setUserData] = useState<any>([]);
  const cartData: any = useSelector(cartData => cartData);
  // console.log('cartData?.user?.cart?.customer', cartData?.user?.cart?.customer);

  useEffect(() => {
    setUserData(cartData?.user?.cart?.customer);
  }, [cartData, focus]);
  const getData = () => {
    const config = {
      headers: {
        User_ID: user_id,
      },
    };
    axios
      .post(`${BaseUrl}getAllData`, null, config)
      .then((res: any) => {
        setUserData(res.data.customer);
      })
      .catch(error => {
        ToastAndroid.show('Internal Server Error', ToastAndroid.BOTTOM);
      });
  };

  // useEffect(() => {
  //   getData();
  // }, [user_id, focus]);  
  // props.navigation.addListener('state', () => {
  //   getData()
  // });
  const share = async () => {

    const options = {
      message:
        'Internet service Provider',
      url: 'https://yournet.com',
      email: 'mubashir@gmail.com',
      subject: 'Eiusmod esse veniam esse.',
      recipient: '919988998899',
    };

    try {
      const res = await Share.open(options);
      // console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  const ShowMessage = () => {
    ToastAndroid.show('This Feature will Soon Avaiable !', ToastAndroid.SHORT);
  }
  // const [nickName, setNickName] = useState<any>('');
  // props.navigation.addListener('state', () => {
  //   // getData();
  //   gettingUserNickName();
  // });
  // const gettingUserNickName = async () => {
  //   let value = await AsyncStorage.getItem('nickName');
  //   if (value !== null) {
  //     // console.log(value, 'value');
  //     setNickName(JSON.parse(value));
  //   }
  // };
  // useEffect(() => {
  //   gettingUserNickName();
  // }, [focus]);
  const logoutFun = () =>{
    props.navigation.replace('Login')
    AsyncStorage.removeItem('user_id')
    AsyncStorage.removeItem('loginFields')
    dispatch(logout());
  }
  const userNickName: any = useSelector(userNickName => userNickName);
  console.log('userNickName',userNickName.user.userNickName);
  return (
    <View style={{flex: 1, backgroundColor:Color.white,paddingHorizontal:10}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.drawerContent} showsVerticalScrollIndicator={false}>
        <View>
          {/* Your custom drawer content here */}
          {/* Logout And Close Button */}
          <View style={[styles.closeButtonContainer,{marginTop:20}]}>
            <TouchableOpacity
            onPress={()=>logoutFun()}
              style={{
                backgroundColor: '#eee',
                paddingVertical: 5,
                paddingHorizontal: 10,
                borderRadius: 10,
              }}>
              <Text style={[styles.closeButton,{fontWeight:'400'}]}>Log Out</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
              <Icon name="ios-arrow-back-circle-outline" size={27} color={Color.mainColor} />
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
                width:40,
                height:40,
                borderRadius: 50,
                marginVertical: 10,
                alignItems:'center',
                justifyContent:'center'
              }}>
              <Text style={{fontSize: 20, color: Color.textColor, padding:0, margin:0}}>{userNickName.user.userNickName ? userNickName.user.userNickName?.charAt(0) :getUserData?.first_name?.charAt(0)}</Text>
            </View>
            <Text style={{fontSize: 18, color: Color.textColor}}>
            {userNickName.user.userNickName ? userNickName.user.userNickName : getUserData?.first_name}
            </Text>
            {/* <Text style={{fontSize: 20, color: Color.textColor}}>{getUserData?.customer_id}</Text> */}
            <View style={{flexDirection: 'row', gap: 20, marginVertical: 10}}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigateToScreen('Profile')}
                style={{
                  backgroundColor: Color.white,
                  borderRadius: 10,
                  flexDirection:'row',
                  gap:5,
                  alignItems:'center',
                  justifyContent:'center',
                  width:'30%',
                  paddingVertical:5
                }}>
                  <Image source={require('../../Images/myacount.png')} style={{width:14, height:14}} resizeMode='contain'/>
                <Text style={{fontSize: 14, color: Color.textColor,fontWeight:'500'}}>
                  Profile
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
              activeOpacity={0.8}
                onPress={() => navigateToScreen('Settings')}
                style={{
                  backgroundColor: Color.white,
                  borderRadius: 10,
                  flexDirection:'row',
                  gap:5,
                  alignItems:'center',
                  justifyContent:'center',
                  width:'30%',
                  paddingVertical:5
                }}>
                <Image source={require('../../Images/settings.png')} style={{width:14, height:14}} resizeMode='contain'/>
                <Text style={{fontSize: 14, color: Color.textColor, fontWeight:'500'}}>
                  Settings
                </Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
          {/* Customer Support Fee Detail sharq FAQS */}
          <View
            style={{
              marginHorizontal: 10,
              paddingHorizontal:10,
              paddingVertical:20,
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
                  <Text style={{color: Color.textColor, fontSize:14}}> Customer {'\n'} Support</Text>
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
                    gap: 10,width: 140,
                    height: 55,
                  }}>
                  <Image source={require('../../Images/fees.png')} style={{width:25, height:25}} resizeMode='contain'/>
                  <Text style={{color:Color.textColor,fontSize:14}}> Who We Are</Text>
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
                  <Image source={require('../../Images/faq.png')} style={{width:25, height:25}} resizeMode='contain'/>
                  <Text style={{color:Color.textColor}}> FAQs</Text>
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
                  <Image source={require('../../Images/share.png')} style={{width:25, height:25}} resizeMode='contain'/>
                  <Text style={{color:Color.textColor}}> Share</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Transaction History And Package plans */}
          <View
            style={{
              marginHorizontal: 10,
              paddingHorizontal:10,
              paddingVertical:20,
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
                    alignItems:'center',
                    gap: 10,
                    width: 140,
                    height: 120,
                  }}>
                  <Image source={require('../../Images/transactionhistory.png')} style={{width:35, height:35}} resizeMode='contain'/>
                  <Text style={{color:Color.textColor}}> Invoice</Text>
                </TouchableOpacity>
              </View>
              <View style={{justifyContent: 'center'}}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  // onPress={() => navigateToScreen('PackagesPlans')}
                  onPress={ShowMessage}
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
                  <Image source={require('../../Images/packagesandplan.png')} style={{width:40, height:40}}/>
                  <Text style={{color:Color.textColor}}> Packages {'\n'} & Plans</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{flexDirection:'row', justifyContent:'center',marginVertical:20}}>
          <Text style={{textAlign:'center', color:Color.textColor}}>ISP Billing Version 1.001 </Text>
          <TouchableOpacity 
          onPress={ShowMessage}
          // onPress={() => navigateToScreen('TermsCondition')}
          ><Text style={{color:'blue'}}>Terms & Condition</Text></TouchableOpacity>
          </View>
        </View>
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
                <View style={{backgroundColor:'white', padding:15, borderRadius:10, marginHorizontal:20}}>
                  <TouchableOpacity onPress={()=> setOpenWWRModal(false)}>
                  {/* <Text style={{textAlign:'right', fontSize:16, fontWeight:'700', color:Color.mainColor}}>X</Text> */}
                  <View style={{alignItems:'flex-end'}}>
                  <AntDesign name='closecircleo' size={20} color={Color.mainColor}/>
                  </View>
                  </TouchableOpacity>
                  <Text style={{textAlign:'center',fontSize:18, fontWeight:'700', color:Color.mainColor}}>Who We Are?</Text>
                  <Text style={{textAlign:'justify',fontSize:14,color:Color.textColor,}}>Filler text is text that shares some characteristics of a real written text, but is random or otherwise generated. It may be used to display a sample of fonts, generate text for testing, or to spoof an e-mail spam filter.</Text>
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