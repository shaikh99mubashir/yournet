import { Dimensions, StyleSheet, Text, TextInput, View,TouchableOpacity,ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import Header from '../../Components/Header'
import Color from '../../Constants/Color';
import axios from 'axios';
import { BaseUrl } from '../../Constants/BaseUrl';

const ForgotPassword = ({navigation} :any) => {
    const [user, setUser] = useState(false);
    const [email, setForgotPassword] = useState('')
    
    const SendOtp = () => {
      let flag = Object.values(email);

      let flag2 = flag.some((e, i) => e == '');
  
      if (flag2) {
        ToastAndroid.show('Required fields are missing', ToastAndroid.BOTTOM);
        return;
      }
  
      const formData = new FormData();
      formData.append('email', email);
  
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
  
      axios
        .post(
          `${BaseUrl}forgotPassword`,
          formData,
          config,
        )
        .then((res: any) => {
          // navigation.navigate('Login')
          ToastAndroid.show(`${res.data.message}`, ToastAndroid.BOTTOM);
        })
        .catch(error => {
          ToastAndroid.show('Internal Server Error', ToastAndroid.BOTTOM);
        });
    }
  return (
    <View style={{
        backgroundColor: Color.white,
        height: Dimensions.get('window').height,
        paddingHorizontal: 14
      }}>
        <Header
          navigation={navigation}
          backBtn
          noSignUp
          title='Forgot Password'
        />
      <View style={{marginHorizontal: 5,marginVertical:5}}>
        <Text style={{fontFamily:'Poppins-Regular', color:Color.textColor, fontSize:16,fontWeight:'bold'}}>Enter Email Address</Text>
        </View>
        <View
          style={{
            width: Dimensions.get('window').width / 1.1,
            borderWidth: 1,
            borderRadius: 10,
            marginHorizontal: 5,
          }}>
          <TextInput
            placeholder="Email"
            onChangeText={(e)=> setForgotPassword(e)}
            style={{width: Dimensions.get('window').width / 1.21, padding: 12}}
          />
        </View>
          {/* Send Button */}
        <View style={{
            width: Dimensions.get('window').width / 1.1,
            borderWidth: 1,
            borderRadius: 5,
            marginHorizontal: 5,
            borderColor:Color.mainColor,
            marginVertical:20,

          }}>
            <TouchableOpacity activeOpacity={0.8} onPress={SendOtp} style={{alignItems:'center', padding:10, backgroundColor:Color.mainColor}}>
              <Text style={{color:'white', fontSize:18, fontFamily:'Poppins-Regular'}}>Send</Text>
            </TouchableOpacity>
        </View>

        {/* Don't Have Account */}
        <View style={{alignItems:'center'}}>
          <TouchableOpacity activeOpacity={0.8}>
          <Text style={{color:Color.textColor,fontSize:15, fontFamily:'Poppins-Regular'}}>Don’t have an Account? 
          <Text style={{color:Color.mainColor,fontSize:15, fontFamily:'Poppins-SemiBold'}}> Contact Support</Text>
          </Text>
          </TouchableOpacity>
        </View>
    </View>
  )
}

export default ForgotPassword

const styles = StyleSheet.create({})