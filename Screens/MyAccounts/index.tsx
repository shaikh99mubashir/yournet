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

const MyAccounts = () => {
  const [editNickName, setEditNickName] = useState<boolean>(false);
  const [nickName, setNickName] = useState<any>('');
  const [userId, setUserId] = useState<any>('');
  const [getUserData, setUserData] = useState<any>([]);
  console.log('nickName', nickName);

  AsyncStorage.setItem('nickName', JSON.stringify(nickName))
    .then(() => console.log('nickName fields saved'))
    .catch(error => console.log('Error saving nickName fields: ', error));

  console.log('getUserData', getUserData);
  // console.log('userId',userId.customer_id);

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
  const getData = () => {
    const formData = new FormData();
    formData.append('customer_id', userId?.customer_id);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    axios
      .post(`${BaseUrl}getdata`, formData, config)
      .then((res: any) => {
        // console.log('res',res.data);
        setUserData(res.data.customer);
      })
      .catch(error => {
        console.log('error==>', error);
        ToastAndroid.show('Internal Server Error', ToastAndroid.BOTTOM);
      });
  };

  useEffect(() => {
    getData();
  }, [userId?.customer_id]);
  return (
    <View       style={{paddingHorizontal: 15}}>
    <ScrollView
      showsVerticalScrollIndicator={false}>
      <Header />
      <Text
        style={{
          fontSize: 26,
          fontWeight: 'bold',
          marginTop: 15,
          color: Color.mainColor,
          textAlign: 'center',
        }}>
        My Account
      </Text>
      <Text style={{fontSize: 16, marginTop: 15, color: Color.textColor}}>
        Personal Details
      </Text>
      {/* Nick Name */}
      <View
        style={{
          backgroundColor: Color.white,
          elevation: 2,
          padding: 10,
          borderRadius: 10,
          marginVertical: 15,
        }}>
        <Text
          style={{color: Color.textColor, fontWeight: 'bold', fontSize: 16}}>
          Nick Name
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 10,
          }}>
          {editNickName ? (
            <TextInput
              placeholder="Edit Your Nick Name"
              onChangeText={e => setNickName(e)}
              placeholderTextColor={Color.textColor}
              style={{color: Color.textColor}}
            />
          ) : (
            <Text
              style={{
                color: Color.textColor,
                fontWeight: 'bold',
                fontSize: 24,
              }}>
              {nickName ? nickName : getUserData?.first_name}
            </Text>
          )}
          <TouchableOpacity onPress={() => setEditNickName(!editNickName)}>
            <FontAwesome
              name={editNickName ? 'save' : 'edit'}
              size={25}
              color={Color.textColor}
            />
          </TouchableOpacity>
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
        }}>
        <Text
          style={{color: Color.textColor, fontWeight: 'bold', fontSize: 16}}>
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
              fontSize: 24,
            }}>
            {getUserData?.first_name}
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
          style={{color: Color.textColor, fontWeight: 'bold', fontSize: 16}}>
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
              fontSize: 20,
            }}>
            {getUserData?.mobile_number}
          </Text>
        </View>
      </View>
      {/* E-mail */}
      <View
        style={{
          backgroundColor: Color.white,
          elevation: 2,
          padding: 10,
          borderRadius: 10,
          marginBottom: 15,
        }}>
        <Text
          style={{color: Color.textColor, fontWeight: 'bold', fontSize: 16}}>
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
              fontSize: 20,
            }}>
            {getUserData?.email_address}
          </Text>
        </View>
      </View>
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
          style={{color: Color.textColor, fontWeight: 'bold', fontSize: 16}}>
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
              fontSize: 20,
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
          style={{color: Color.textColor, fontWeight: 'bold', fontSize: 16}}>
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
              fontSize: 20,
            }}>
            Yournet
          </Text>
        </View>
      </View>
    </ScrollView>
    </View>
  );
};

export default MyAccounts;

const styles = StyleSheet.create({});
