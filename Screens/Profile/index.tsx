import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../Components/Header';
import {Color} from '../../Constants';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BaseUrl} from '../../Constants/BaseUrl';
import {useDispatch, useSelector} from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
const Profile = ({navigation}:any) => {
  const [editNickName, setEditNickName] = useState<boolean>(false);
  const [nickName, setNickName] = useState<any>('');
  const [userId, setUserId] = useState<any>('');
  const [getUserData, setUserData] = useState<any>([]);
  const [companyName, setCompanyName] = useState<any>('')  
  const focus = useIsFocused()
  const cartData: any = useSelector(cartData => cartData);
  useEffect(()=>{
    setUserData(cartData?.user?.cart?.customer);
    setCompanyName(cartData?.user?.cart?.company?.com_name)
  },[cartData,focus])

  AsyncStorage.setItem('nickName', JSON.stringify(nickName))
    .then(() => console.log('nickName fields saved'))
    .catch(error => console.log('Error saving nickName fields: ', error));

    
    // const getCompanyName = () => {
    //   const formData = new FormData();
    //   formData.append('customer_id', getUserData?.customer_id);
    //   const config = {
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   };
    //   axios
    //     .post(`${BaseUrl}getCompanyData`, formData, config)
    //     .then(({data}: any) => {
    //       console.log('datat',data?.company?.com_name);
    //       setCompanyName(data?.company?.com_name)
    //       // dispatch(companyName(companyName))
    //     })
    //     .catch(error => {
    //       // console.log('rerror',error.message);
    //       ToastAndroid.show(
    //         `Internal Server Error in getCompanyName ${error}`,
    //         ToastAndroid.BOTTOM,
    //       );
    //     });
    // };
  
    // useEffect(() => {
    //   getCompanyName();
    // }, [getUserData?.customer_id,focus]);

  return (
    <View       style={{paddingHorizontal: 15}}>
    <ScrollView
      showsVerticalScrollIndicator={false}>
      <Header navigation={navigation}  backBtn noLogo/>
      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          marginTop: 15,
          color: Color.mainColor,
          textAlign: 'center',
        }}>
        Profile
      </Text>
      <Text style={{fontSize: 14, marginTop: 15, color: Color.textColor}}>
        Personal Details
      </Text>
      
      {/* userName */}
      <View
        style={{
          backgroundColor: Color.white,
          elevation: 2,
          padding: 10,
          borderRadius: 10,
          marginBottom: 15,
          marginTop:10
        }}>
        <Text
          style={{color: Color.textColor, fontWeight: 'bold', fontSize: 14}}>
          User Name
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <Text
            style={{
              color: Color.textColor,
              fontWeight: 'bold',
              fontSize: 16,
            }}>
            {getUserData?.first_name}
          </Text>
        </View>
      </View>
      {/* userName */}
      <View
        style={{
          backgroundColor: Color.white,
          elevation: 2,
          padding: 10,
          borderRadius: 10,
          marginBottom: 15,
          marginTop:10
        }}>
        <Text
          style={{color: Color.textColor, fontWeight: 'bold', fontSize: 14}}>
          Login | Customer ID
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <Text
            style={{
              color: Color.textColor,
              fontWeight: 'bold',
              fontSize: 16,
            }}>
            {getUserData?.customer_id}
          </Text>
        </View>
      </View>
      {/* Mobile No */}
      <View
        style={{
          backgroundColor: Color.white,
          elevation: 2,
          padding: 10,
          borderRadius: 10,
          marginBottom: 15,
        }}>
        <Text
          style={{color: Color.textColor, fontWeight: 'bold', fontSize: 14}}>
          Mobile Number
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <Text
            style={{
              color: Color.textColor,
              fontWeight: 'bold',
              fontSize: 16,
            }}>
            {getUserData?.mobile_number}
          </Text>
        </View>
      </View>
      {/* Address */}
      
      <View
        style={{
          backgroundColor: Color.white,
          elevation: 2,
          padding: 10,
          borderRadius: 10,
          marginBottom: 15,
        }}>
        <Text
          style={{color: Color.textColor, fontWeight: 'bold', fontSize: 14}}>
          Address
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <Text
            style={{
              color: Color.textColor,
              fontWeight: 'bold',
              fontSize: 16,
            }}>
            {getUserData?.FullAddress}
          </Text>
        </View>
      </View>
      {/* E-mail */}
      {getUserData?.email_address &&
      <View
        style={{
          backgroundColor: Color.white,
          elevation: 2,
          padding: 10,
          borderRadius: 10,
          marginBottom: 15,
        }}>
        <Text
          style={{color: Color.textColor, fontWeight: 'bold', fontSize: 14}}>
          E-mail
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <Text
            style={{
              color: Color.textColor,
              fontWeight: 'bold',
              fontSize: 16,
            }}>
            {getUserData?.email_address}
          </Text>
        </View>
      </View>
      }
      {/* Account Opening Date */}
      <View
        style={{
          backgroundColor: Color.white,
          elevation: 2,
          padding: 10,
          borderRadius: 10,
          marginBottom: 15,
        }}>
        <Text
          style={{color: Color.textColor, fontWeight: 'bold', fontSize: 14}}>
          Account Opening Date
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <Text
            style={{
              color: Color.textColor,
              fontWeight: 'bold',
              fontSize: 16,
            }}>
            {getUserData?.created_at}
          </Text>
        </View>
      </View>
      {/* Service Provider */}
      <View
        style={{
          backgroundColor: Color.white,
          elevation: 2,
          padding: 10,
          borderRadius: 10,
          marginBottom: 15,
        }}>
        <Text
          style={{color: Color.textColor, fontWeight: 'bold', fontSize: 14}}>
          Service Provider
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <Text
            style={{
              color: Color.textColor,
              fontWeight: 'bold',
              fontSize: 16,
            }}>
            {companyName}
          </Text>
        </View>
      </View>
    </ScrollView>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});

