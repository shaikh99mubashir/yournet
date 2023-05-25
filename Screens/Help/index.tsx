import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import {Color} from '../../Constants';
import Header from '../../Components/Header';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
const Help = ({navigation}: any) => {
  return (
    <ScrollView
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
          Help & Customer Support
        </Text>
      <View
        style={{
          alignItems: 'center',
          marginTop: 20,
        }}>
        <AntDesign name="customerservice" size={110} color={Color.mainColor} />
      </View>

      <View style={{alignItems: 'center', marginTop: 30}}>
        <Text style={{color: Color.textColor, fontSize: 22, fontWeight: '500'}}>
          Tell us how we can help
        </Text>
        <Text
          style={{color: Color.textColor, fontWeight: '500', marginTop: 10}}>
          Please select from one of the option below
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('Complaint')}
        activeOpacity={0.8}
        style={{
          marginTop: 30,
          borderBottomWidth: 1,
          borderColor: Color.textColor,
          paddingHorizontal: 10,
          paddingVertical: 20,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            flexDirection: 'row',
            gap: 15,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Ionicons name="add-circle" size={23} color={Color.mainColor} />
          <Text style={{color: 'black', fontSize: 18, fontWeight: '500'}}>
            Register New Complaint
          </Text>
        </View>
        <View style={{marginTop:3}}>
        <AntDesign name="right" size={15} color={Color.textColor} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('TrackYourComplaint')}
        activeOpacity={0.8}
        style={{
          marginTop: 15,
          borderBottomWidth: 1,
          borderColor: Color.textColor,
          paddingHorizontal: 10,
          paddingVertical: 20,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <View
          style={{
            flexDirection: 'row',
            gap: 15,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <MaterialCommunityIcons name="timeline-clock" size={23} color={Color.mainColor} />
          <Text style={{color: 'black', fontSize: 18, fontWeight: '500'}}>
          Track Your Complaint
          </Text>
        </View>
        <View style={{marginTop:3}}>
        <AntDesign name="right" size={15} color={Color.textColor} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Contact')}
        activeOpacity={0.8}
        style={{
          marginTop: 15,
          borderBottomWidth: 1,
          borderColor: Color.textColor,
          paddingHorizontal: 10,
          paddingVertical: 20,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            flexDirection: 'row',
            gap: 15,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <FontAwesome name="phone" size={23} color={Color.mainColor} />
          <Text style={{color: 'black', fontSize: 18, fontWeight: '500'}}>
          Contact Us
          </Text>
        </View>
        <View style={{marginTop:3}}>
        <AntDesign name="right" size={15} color={Color.textColor} />
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Help;

const styles = StyleSheet.create({});
