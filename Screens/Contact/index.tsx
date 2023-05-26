import {Linking, StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {Color} from '../../Constants';
import Header from '../../Components/Header';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
  const handleMobileNumberPress = (mobileNumber: number) => {
    const phoneUrl = `tel:${mobileNumber}`;
    Linking.openURL(phoneUrl);
  };

  const MobileNumberWhatsapp = (mobileNumber: number) => {
    const whatsappUrl = `whatsapp://send?phone=${mobileNumber}`;
    Linking.openURL(whatsappUrl);
  };
  return (
    <View
      style={{
        backgroundColor: Color.white,
        height: '100%',
        paddingHorizontal: 10,
      }}>
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
      {mobileNumber &&
        mobileNumber.map((e: any, i: number) => (
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
            onPress={() => handleMobileNumberPress(e.number)}>
            <Text style={{color: 'black', fontSize: 16, fontWeight: 'bold'}}>
              Call {e.number}
            </Text>
          </TouchableOpacity>
        ))}

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          marginTop: 20,
        }}>
        <MaterialCommunityIcons name="whatsapp" size={30} color={Color.mainColor} />
        <Text
          style={{
            textAlign: 'center',
            fontSize: 18,
            marginVertical: 10,
            color: Color.textColor,
            fontWeight: 'bold',
            borderColor:Color.mainColor
          }}>
          For WhatsApp
        </Text>
      </View>

      {mobileNumber &&
        mobileNumber.map((e: any, i: number) => {
          return (
            <TouchableOpacity
              style={{
                borderWidth: 1,
                alignItems: 'center',
                padding: 10,
                borderRadius: 20,
                marginBottom: 10,
              }}
              key={i}
              onPress={() => MobileNumberWhatsapp(e.number)}>
              <Text style={{color: 'black', fontSize: 16, fontWeight: 'bold'}}>
                Call {e.number}
              </Text>
            </TouchableOpacity>
          );
        })}
    </View>
  );
};

export default Contact;

const styles = StyleSheet.create({});
