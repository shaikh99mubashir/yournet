import {StyleSheet, Text, View,TouchableOpacity} from 'react-native';
import React from 'react';
import {Color} from '../../Constants';
import Header from '../../Components/Header';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const Language = ({navigation}: any) => {
  return (
    <View
      style={{
        backgroundColor: Color.white,
        height: '100%',
        paddingHorizontal: 15,
      }}>
      <Header navigation={navigation} backBtn noLogo />
      <Text
        style={{
          textAlign: 'center',
          fontSize: 22,
          marginVertical: 10,
          color: Color.mainColor,
          fontWeight: 'bold',
        }}>
        Language
      </Text>
      <TouchableOpacity
      activeOpacity={0.8}
        style={{
          backgroundColor: 'white',
          elevation: 5,
          paddingHorizontal: 10,
          paddingVertical: 20,
          borderRadius: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text style={{color: 'black', fontSize: 20, fontWeight: 'bold'}}>
          English
        </Text>
        <FontAwesome name='dot-circle-o' size={24} color={Color.mainColor}/>
      </TouchableOpacity>
    </View>
  );
};

export default Language;

const styles = StyleSheet.create({});
