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
import {useDispatch, useSelector} from 'react-redux';

const Contact = ({navigation}:any) => {
  const [number, setNumber] = useState([])
  const cartData: any = useSelector(cartData => cartData);
  useEffect(()=>{
    setNumber(cartData?.user?.cart?.companycontacts);
  },[])


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
        paddingHorizontal: 15,
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
        <Image source={require('../../Images/cus.png')} style={{width:150, height:150}} resizeMode='contain'/>
        </View>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 16,
          marginVertical: 10,
          color: Color.textColor,
          fontWeight: 'bold',
        }}>
        Talk to our Customer Support Team
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
        }}>
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
              borderColor:'#eee'
            }}
            key={i}
            onPress={() => handleMobileNumberPress(e)}>
            <View style={{flexDirection:'row', alignItems:'center', gap:10}}>
            <Text style={{color: Color.mainColor, fontSize: 16, fontWeight: 'bold'}}>{e.number}</Text>
            </View>
          </TouchableOpacity>
        ))}
        </ScrollView>
    </View>
  );
};

export default Contact;

const styles = StyleSheet.create({});
