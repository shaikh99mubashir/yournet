import {Linking, StyleSheet, Text, View, TouchableOpacity, Image,ScrollView, ToastAndroid,Platform, Alert} from 'react-native';
import React, { useEffect, useState } from 'react';
import {Color} from '../../Constants';
import Header from '../../Components/Header';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import { BaseUrl } from '../../Constants/BaseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

const Contact = ({navigation}:any) => {
  const mobileNumber = [
    {
      id: 1,
      number: '03353375813',
    },
    {
      id: 2,
      number: '03353375813',
    },
  ];

  const [number, setNumber] = useState([])
  console.log('number',number);
  
  const [userData, setUserData ] :any = useState()
  const focus = useIsFocused()
  const gettingUserDatatoken = () => {
    AsyncStorage.getItem('userData')
      .then(value => {
        if (value !== null) {
          setUserData(JSON.parse(value));
        } else {
          console.log('No login fields found');
        }
      })
      .catch(error => console.log('Error retrieving login fields: ', error));
  };
  
  useEffect(() => {
    gettingUserDatatoken();
  }, [focus]);
  
  const getData = () => {
    const formData = new FormData();
    formData.append('company_id', userData?.company_id);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    axios
      .post(`${BaseUrl}getContactNumbersByCompanyId`, formData, config)
      .then((res: any) => {
        setNumber(res?.data?.companycontacts);
      })
      .catch(error => {
        ToastAndroid.show('Internal Server Error', ToastAndroid.BOTTOM);
      });
    };
    useEffect(()=>{
      getData()
    },[focus,userData?.company_id])
  // const handleMobileNumberPress = (mobileNumber: number) => {
  //   const phoneUrl = `tel:${mobileNumber}`;
  //   Linking.openURL(phoneUrl);
  // };

  // const MobileNumberWhatsapp = (mobileNumber: number) => {
  //   const whatsappUrl = `whatsapp://send?phone=${mobileNumber}`;
  //   Linking.openURL(whatsappUrl);
  // };

  const handleMobileNumberPress = (inputObj: { number: string }) => {
    const item :any = number.find((item:any) => item.number === inputObj.number);

    if (item) {
      if (item?.call === "yes" && item?.whatsapp === "yes") {
        Alert.alert(
          'Choose an option',
          'Select the option you want to use:',
          [
            {
              text: 'Phone Call',
              onPress: () => Linking.openURL(`tel:${item.number}`),
              style: 'default',
            },
            {
              text: 'WhatsApp',
              onPress: () => Linking.openURL(`whatsapp://send?phone=${item.number}`),
              style: 'default',
            },
            {
              text: 'Cancel',
              style: 'cancel',
            },
          ],
        );
      } else if (item.call === "yes") {
        Linking.openURL(`tel:${item.number}`);
      } else if (item.whatsapp === "yes") {
        Linking.openURL(`whatsapp://send?phone=${item.number}`);
      } else {
        console.log("No available options for this item");
      }
    } else {
      console.log("Item not found");
    }
  };
  return (
    <View
      style={{
        backgroundColor: Color.white,
        height: '100%',
        paddingHorizontal: 10,
      }}>
        <ScrollView>
      <Header backBtn navigation={navigation} noLogo />
      <Text
          style={{
            textAlign: 'center',
            fontSize: 22,
            marginVertical: 10,
            color: Color.mainColor,
            fontWeight: 'bold',
          }}>
          Contact Us
        </Text>
        <View style={{alignItems:'center'}}>
        <Image source={require('../../Images/cus.jpg')} style={{width:150, height:150}} resizeMode='contain'/>
        </View>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 16,
          marginVertical: 10,
          color: Color.textColor,
          fontWeight: 'bold',
        }}>
        For Support you can Contact us Option Below
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
        }}>
        <MaterialIcons name="local-phone" size={30} color={Color.mainColor} />
        <Text
          style={{
            textAlign: 'center',
            fontSize: 18,
            marginVertical: 10,
            color: Color.textColor,
            fontWeight: 'bold',
          }}>
          For Calls
        </Text>
      </View>
      {number &&
        number.map((e: any, i: number) => (
          <TouchableOpacity
            style={{
              borderWidth: 1,
              alignItems: 'center',
              padding: 10,
              borderRadius: 20,
              marginBottom: 10,
              borderColor:Color.mainColor
            }}
            key={i}
            onPress={() => handleMobileNumberPress(e)}>
            <Text style={{color: 'black', fontSize: 16, fontWeight: 'bold'}}>
              Call {e.number}
            </Text>
          </TouchableOpacity>
        ))}
        </ScrollView>
    </View>
  );
};

export default Contact;

const styles = StyleSheet.create({});
