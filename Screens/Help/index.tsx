import {StyleSheet, Text, View,TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';
import {Color} from '../../Constants';
import Header from '../../Components/Header';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const Help = ({navigation}: any) => {
  return (
    <ScrollView
      style={{
        backgroundColor: Color.white,
        height: '100%',
        paddingHorizontal: 15,
      }}>
      <Header navigation={navigation} backBtn />
      <View
        style={{
          alignItems:"center"
        }}>
        <MaterialIcons name="support-agent" size={150} color="black" />
      </View>
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
          marginVertical:15
        }}>
        <Text style={{color: 'black', fontSize: 20, fontWeight: 'bold'}}>
          Quick Help
        </Text>
        <AntDesign name='right' size={20} color='black'/>
      </TouchableOpacity>
      <TouchableOpacity
      onPress={()=> navigation.navigate('Complaint')}
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
          marginVertical:15
        }}>
        <Text style={{color: 'black', fontSize: 20, fontWeight: 'bold'}}>
          Register New Complaint
        </Text>
        <AntDesign name='right' size={20} color='black'/>
      </TouchableOpacity>
      <TouchableOpacity
      onPress={()=> navigation.navigate('TrackYourComplaint')}
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
          marginVertical:15
        }}>
        <Text style={{color: 'black', fontSize: 20, fontWeight: 'bold'}}>
          Track Your Complaint
        </Text>
        <AntDesign name='right' size={20} color='black'/>
      </TouchableOpacity>
      <TouchableOpacity
      onPress={()=>navigation.navigate('Contact')}
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
          marginVertical:15
        }}>
        <Text style={{color: 'black', fontSize: 20, fontWeight: 'bold'}}>
          Contact
        </Text>
        <AntDesign name='right' size={20} color='black'/>
      </TouchableOpacity>
      
    </ScrollView>
  );
};

export default Help

const styles = StyleSheet.create({})