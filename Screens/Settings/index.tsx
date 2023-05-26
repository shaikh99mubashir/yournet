import {StyleSheet, Text, View,TouchableOpacity} from 'react-native';
import React from 'react';
import {Color} from '../../Constants';
import Header from '../../Components/Header';
import AntDesign from 'react-native-vector-icons/AntDesign';
const Settings = ({navigation}: any) => {
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
        Settings
      </Text>
      <TouchableOpacity
      onPress={()=>navigation.navigate('Language')}
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
          Language
        </Text>
        <AntDesign name='right' size={20} color='black'/>
      </TouchableOpacity>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({});
