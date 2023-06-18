import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Color from '../../Constants/Color';
import { useSelector } from 'react-redux';
export type Props = {
  navigation: any;
};

const Header = (Props: any) => {
  let {
    navigation,
    user,
    Drawer,
    backBtn,
    backBtnColor,
    Notification,
    title,
    noSignUp,
    noLogo,
    myStyle,
  } = Props;

  // const [userNotificarion, setUserNotificarion] = useState<any>([]);
  const noti: any = useSelector(notification => notification);
  const newNotificationCount = noti.user.notification.filter((notification:any) => notification.status == 'New').length;
  // useEffect(() => {
  //   setUserNotificarion(noti.user.notification);
  // }, []);
  console.log('newNotificationCount',newNotificationCount);
  console.log('userNotificarion',noti.user.notification.length);
  
  return (
    <View
      style={{
        backgroundColor: 'rgba(52, 52, 52, 0.0)',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
        marginTop: 10,
      }}>
      <>
        {Drawer ? (
          <TouchableOpacity
            style={{
              flex: 1,
            }}
            activeOpacity={0.8}
            onPress={() => navigation.openDrawer()}>
            <Text>
              <Icon name="reorder-three" size={25} color="black" />
            </Text>
          </TouchableOpacity>
        ) : (
          <View
            style={{
              flex: 1,
            }}></View>
        )}

        {title ? (
          <View style={{flex: 2, alignItems: 'center'}}>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: 16,
                color: Color.mainColor,
                marginVertical: 15,
                fontWeight: 'bold',
              }}>
              {title}
            </Text>
          </View>
        ) : noLogo ? (
          <View style={{flex: 2}}></View>
        ) : (
          <View style={{flex: 2}}>
            <Image
              source={require('../../Images/Logo.png')}
              resizeMode="contain"
              style={styles.logo}
            />
          </View>
        )}
        {Notification ? (
          <View style={{flex: 1}}>
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('Notification')}>
              <FontAwesome name="bell" size={22} color="black" />
              <View style={{backgroundColor:Color.mainColor,paddingHorizontal:3,borderRadius:10,left:70,top:30 ,position:'absolute'}}>
              {newNotificationCount > 0 &&
              <Text style={{fontSize:10, color:'white'}}>{newNotificationCount}</Text>
              }
              </View>
            </TouchableOpacity>
          </View>
        ) : backBtn ? (
          <View
            style={{
              flex: 1,
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
            }}>
            <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
              <Icon name="ios-arrow-back-circle-outline" size={30} color={backBtnColor ? backBtnColor : Color.mainColor} />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{flex: 1}}>
            <Text></Text>
          </View>
        )}
      </>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  button: {
    height: Dimensions.get('window').height / 12,
    width: Dimensions.get('window').width / 5,
  },
  icon: {
    height: Dimensions.get('window').height / 16,
    width: Dimensions.get('window').width / 16,
  },
  logo: {
    // height: Dimensions.get('window').height / 12,
    // width: Dimensions.get('window').width / 2,
    width: 140,
    height: 60,
    alignSelf: 'center',
  },
});
