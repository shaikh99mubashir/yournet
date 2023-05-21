import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  ToastAndroid,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../Components/Header';
import {Color} from '../../Constants';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BaseUrl} from '../../Constants/BaseUrl';
import Icon from 'react-native-vector-icons/Ionicons';

const MyAccounts = () => {
  const [editNickName, setEditNickName] = useState<boolean>(false);
  const [nickName, setNickName] = useState<any>('');
  const [getUserData, setUserData] = useState<any>([]);
  console.log('nickName', nickName);

  AsyncStorage.setItem('nickName', JSON.stringify(nickName))
    .then(() => console.log('nickName fields saved'))
    .catch(error => console.log('Error saving nickName fields: ', error));

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
    gettingUserDatatoken();
  }, []);

  console.log('user Token', userToken);
  const getCusData = () => {
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
        setUserData(res.data.customer);
      })
      .catch(error => {
        console.log('error==>', error);
        ToastAndroid.show('Internal Server Error', ToastAndroid.BOTTOM);
      });
  };

  useEffect(() => {
    getCusData();
  }, [userToken]);

  const date = new Date(getUserData?.created_at);
  const created_at = date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  console.log('getUserData', getUserData);

  const [email_address, setEmail_address] = useState('');
  const [updateEmail, setUpdateEmail] = useState(false);
  const [updatePassword, setUpdatePassword] = useState(false);
  const [passwordEye, setPasswordEye] = useState(true);
  const saveEmailAdress = () => {
    console.log('running save email');

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
        Authorization: userToken,
      },
    };

    axios
      .post(`${BaseUrl}editProfile`, formData, config)
      .then((res: any) => {
        ToastAndroid.show(`${res.data.message}`, ToastAndroid.BOTTOM);
        setUpdateEmail(!updateEmail);
        getCusData();
      })
      .catch(error => {
        ToastAndroid.show('Internal Server Error', ToastAndroid.BOTTOM);
      });
  };

    const [passwordFields, setPasswordFields] = useState({
    old_password: '',
    new_password: '',
  });

  const submitUpdatePassword = () => {

    let flag = Object.values(passwordFields);

    let flag2 = flag.some((e, i) => e == '');

    if (flag2) {
      ToastAndroid.show('Required fields are missing', ToastAndroid.BOTTOM);
      return;
    }

    const formData = new FormData();
    formData.append('old_password', passwordFields.old_password);
    formData.append('new_password', passwordFields.new_password);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: userToken,
      },
    };

    axios
      .post(
        `${BaseUrl}changePassword`,
        formData,
        config,
      )
      .then((res: any) => {
        console.log('res data', res.data.message);
        setUpdatePassword(!updatePassword)
        ToastAndroid.show(`${res.data.message}`, ToastAndroid.BOTTOM);
      })
      .catch(error => {
        ToastAndroid.show('Internal Server Error', ToastAndroid.BOTTOM);
      });
  };

  return (
    <View style={{paddingHorizontal: 15}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header />
        <Text
          style={{
            fontSize: 26,
            fontWeight: 'bold',
            marginTop: 15,
            color: Color.textColor,
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
                style={{color: Color.textColor, width: '60%'}}
              />
            ) : (
              <Text
                style={{
                  color: Color.textColor,
                  fontWeight: 'bold',
                  fontSize: 24,
                  width: '80%',
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
            {updateEmail ? (
              <TextInput
                placeholder="Enter Email Address"
                onChangeText={e => setEmail_address(e)}
                placeholderTextColor={Color.textColor}
                style={{color: Color.textColor, width: '80%'}}
              />
            ) : (
              <Text
                style={{
                  color: Color.textColor,
                  fontWeight: 'bold',
                  fontSize: 24,
                  width: '80%',
                }}>
                {getUserData?.email_address
                  ? getUserData?.email_address
                  : 'Update Ypour Email'}
              </Text>
            )}
            <TouchableOpacity onPress={() => setUpdateEmail(!updateEmail)}>
              <FontAwesome
                name={!updateEmail ? 'edit' : 'close'}
                size={25}
                color={Color.textColor}
              />
            </TouchableOpacity>
          </View>
          {updateEmail ? (
            <TouchableOpacity
              onPress={() => saveEmailAdress()}
              activeOpacity={0.8}
              style={{
                backgroundColor: Color.mainColor,
                width: '30%',
                alignItems: 'center',
                marginVertical: 10,
                paddingVertical: 6,
                borderRadius: 30,
              }}>
              <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
                Save
              </Text>
            </TouchableOpacity>
          ) : (
            ''
          )}
        </View>

        {/* Password */}
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
            Password
          </Text>
          <TouchableOpacity
          onPress={()=>setUpdatePassword(!updatePassword)}
            activeOpacity={0.8}
            style={{
              backgroundColor: Color.mainColor,
              width: '50%',
              alignItems: 'center',
              marginVertical: 10,
              paddingVertical: 6,
              borderRadius: 30,
            }}>
            <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
              Update Password
            </Text>
          </TouchableOpacity>
          {updatePassword ?
          <>
          <View
            style={{
              width: '100%',
              borderRadius: 30,
              backgroundColor: '#eee',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 15,
            }}>
            <TextInput
              placeholder="Enter Old Password"
              placeholderTextColor="black"
              secureTextEntry={passwordEye ? true : false}
              style={{
                width: '90%',
                padding: 12,
                color: 'black',
              }}
              onChangeText={e =>
                setPasswordFields({...passwordFields, old_password: e})
              }
            />
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setPasswordEye(!passwordEye)}>
              <Text>
                {passwordEye ? (
                  <Icon name="eye" size={25} color="black" />
                ) : (
                  <Icon name="eye-off" size={25} color="black" />
                )}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: '100%',
              borderRadius: 30,
              backgroundColor: '#eee',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 15,
            }}>
            <TextInput
              placeholder="Enter New Password"
              placeholderTextColor="black"
              secureTextEntry={passwordEye ? true : false}
              style={{
                width: '90%',
                padding: 12,
                color: 'black',
              }}
              onChangeText={e =>
                setPasswordFields({...passwordFields, new_password: e})
              }
            />
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setPasswordEye(!passwordEye)}>
              <Text>
                {passwordEye ? (
                  <Icon name="eye" size={25} color="black" />
                ) : (
                  <Icon name="eye-off" size={25} color="black" />
                )}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
          onPress={submitUpdatePassword}
            activeOpacity={0.8}
            style={{
              backgroundColor: Color.mainColor,
              width: '30%',
              alignItems: 'center',
              marginVertical: 20,
              paddingVertical: 6,
              borderRadius: 30,
              justifyContent:'center',
              alignSelf:'center'
            }}>
            <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
              Update 
            </Text>
          </TouchableOpacity>
          </>
          :''}
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
              {created_at}
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
