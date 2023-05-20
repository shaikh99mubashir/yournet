import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Modal,
  Animated,
  Easing,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Color from '../../Constants/Color';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {BaseUrl} from '../../Constants/BaseUrl';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import successGIF from '../../Images/successGIF.gif';

const Login = ({navigation}: any) => {
  const [passwordEye, setPasswordEye] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);
  const [loginFields, setLoginFields] = useState<any>({
    customer_id: '',
    password: null,
  });

  // To store the loginFields
  AsyncStorage.setItem('loginFields', JSON.stringify(loginFields))
    .then(() => console.log('Login fields saved'))
    .catch(error => console.log('Error saving login fields: ', error));
  // const [isLoginFieldsAvaiable, setIsLoginFieldsAvaiable] = useState<any>([]);
  // console.log('getUserData', isLoginFieldsAvaiable);
  // console.log('userId',userId.customer_id);
  // const gettingUserData = () => {
  //   AsyncStorage.getItem('loginFields')
  //     .then(value => {
  //       if (value !== null) {
  //         setIsLoginFieldsAvaiable(JSON.parse(value));
  //       } else {
  //         console.log('No login fields found');
  //       }
  //     })
  //     .catch(error => console.log('Error retrieving login fields: ', error));
  // };
  // useEffect(() => {
  //   gettingUserData();
  // }, []);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const LoginFunction = () => {
    let flag = Object.values(loginFields);

    let flag2 = flag.some((e, i) => e == '');

    if (flag2) {
      ToastAndroid.show('Required fields are missing', ToastAndroid.BOTTOM);
      return;
    }
    setLoading(true);
    setSuccess(true);
    const {customer_id, password} = loginFields;

    const formData = new FormData();
    formData.append('customer_id', customer_id);
    formData.append('password', password);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    axios
      .post(`${BaseUrl}login`, formData, config)
      .then((res: any) => {
        setLoading(false);
        setSuccess(false);
        console.log('res===>', res.data.token);

        // To store the loginFields
        AsyncStorage.setItem('token', JSON.stringify(res.data.token))
          .then(() => console.log('Token Saved'))
          .catch(error => console.log('Error saving login fields: ', error));

        if (res.data.status == 'success') {
          navigation.replace('Home');
          ToastAndroid.show(`${res.data.message}`, ToastAndroid.BOTTOM);
        } else {
          ToastAndroid.show(`${res.data.message}`, ToastAndroid.BOTTOM);
        }
      })
      .catch(error => {
        ToastAndroid.show('Internal Server Error', ToastAndroid.BOTTOM);
        setSuccess(false);
        setLoading(false);
      });
  };

  const rotationValue = useRef(new Animated.Value(0)).current;

  const rotateAnimation = () => {
    Animated.loop(
      Animated.timing(rotationValue, {
        toValue: 1,
        duration: 800,
        easing: Easing.circle,
        useNativeDriver: true,
      }),
    ).start();
  };

  rotateAnimation();

  const interpolatedRotateAnimation = rotationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['45deg', '360deg'],
  });

  return (
    <LinearGradient
      colors={['#FFC0CB', '#ADD8E6']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      locations={[0.25, 0.75]}
      angle={45}
      style={{
        alignItems: 'center',
        height: '100%',
      }}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}>
          <View style={{alignItems: 'center', marginTop: 60, marginBottom: 10}}>
            <Image
              source={require('../../Images/Logo.png')}
              resizeMode="contain"
              style={styles.logo}
            />
          </View>
          <View style={{alignItems: 'center'}}>
            <Text
              style={{
                color: Color.textColor,
                fontSize: 30,
                fontFamily: 'Poppins-SemiBold',
              }}>
              Log
              <Text
                style={{
                  color: Color.mainColor,
                  fontSize: 30,
                  fontFamily: 'Poppins-SemiBold',
                }}>
                in
              </Text>
            </Text>
          </View>
          {/* customer_id */}
          <View
            style={{
              width: Dimensions.get('window').width / 1.1,
              borderRadius: 30,
              backgroundColor: '#e6d2db',
              marginTop: 15,
            }}>
            <TextInput
              placeholder="Username"
              placeholderTextColor="black"
              onChangeText={e =>
                setLoginFields({...loginFields, customer_id: e})
              }
              style={{
                width: Dimensions.get('window').width / 1.21,
                paddingHorizontal: 20,
                color: 'black',
              }}
            />
          </View>
          {/* Password */}
          <View
            style={{
              width: Dimensions.get('window').width / 1.1,
              borderRadius: 30,
              backgroundColor: '#e6d2db',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 15,
            }}>
            <TextInput
              placeholder="Password"
              placeholderTextColor="black"
              secureTextEntry={passwordEye ? true : false}
              onChangeText={e => setLoginFields({...loginFields, password: e})}
              style={{
                width: Dimensions.get('window').width / 1.21,
                padding: 12,
                color: 'black',
              }}
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
          {/* remember me and forgot */}
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 10,
              marginVertical: 10,
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 6,
              }}>
              <TouchableOpacity
                style={{width: 14, height: 14, borderWidth: 1, borderRadius: 5}}
                onPress={() => setRememberMe(!rememberMe)}>
                {rememberMe ? (
                  <Icon
                    name="md-checkmark-sharp"
                    size={11}
                    color="white"
                    style={{backgroundColor: Color.mainColor}}
                  />
                ) : (
                  ''
                )}
              </TouchableOpacity>
              <Text
                style={{
                  color: Color.mainColor,
                  fontFamily: 'Poppins-SemiBold',
                }}>
                Remember
              </Text>
            </View>
            <View>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('ForgotPassword')}>
                <Text
                  style={{
                    color: Color.mainColor,
                    fontFamily: 'Poppins-SemiBold',
                  }}>
                  Forgot Password
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* Login Button */}
          <View style={{flex: 1}}>
            <Modal
              visible={success}
              animationType="fade"
              transparent={true}
              onRequestClose={() => setSuccess(false)}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Animated.Image
                  source={require('../../Images/ISP.png')}
                  style={{
                    transform: [{rotate: interpolatedRotateAnimation}],
                    width: 200,
                    height: 200,
                  }}
                />
              </View>
            </Modal>

            <View
              style={{
                flex: 1,
                justifyContent: 'flex-end',
                width: Dimensions.get('window').width / 1.1,
                borderRadius: 30,
                marginVertical: 15,
              }}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={LoginFunction}
                disabled={loading}
                style={{
                  alignItems: 'center',
                  padding: 12,
                  backgroundColor: 'black',
                  borderRadius: 30,
                }}>
                {loading ? (
                  <ActivityIndicator color="#fff" size={'small'} />
                ) : (
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 22,
                      fontFamily: 'Poppins',
                    }}>
                    Login
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default Login;

const styles = StyleSheet.create({
  logo: {
    height: Dimensions.get('window').height / 6,
    width: Dimensions.get('window').width / 1.4,
  },
});
