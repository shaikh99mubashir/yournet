import {Linking, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {Color} from '../../Constants';
import Header from '../../Components/Header';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

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
        <MaterialIcons name="support-agent" size={30} color="black" />
        <Text
          style={{
            textAlign: 'center',
            fontSize: 18,
            marginVertical: 10,
            color: Color.textColor,
            fontWeight: 'bold',
          }}>
          All Network Customer
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
        <MaterialIcons name="support-agent" size={30} color="black" />
        <Text
          style={{
            textAlign: 'center',
            fontSize: 18,
            marginVertical: 10,
            color: Color.textColor,
            fontWeight: 'bold',
            borderColor:Color.mainColor
          }}>
          Information Through Whatsapp
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
