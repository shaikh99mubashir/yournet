import {StyleSheet, Text, View, Image,ScrollView} from 'react-native';
import React from 'react';
import Header from '../../Components/Header';
import {Color} from '../../Constants';
import {  } from 'react-native-gesture-handler';

const PromotionsDetails = ({navigation, route}: any) => {
  const data = route.params;

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
    <View
      style={{
        backgroundColor: Color.white,
        height: '100%',
        paddingHorizontal: 10,
        marginBottom:20
      }}>
      <Header navigation={navigation} backBtn />
      <Text
        style={{
          textAlign: 'center',
          fontSize: 22,
          marginVertical: 10,
          color: Color.textColor,
          fontWeight: 'bold',
        }}>
        Promotions Details
      </Text>
      <View
        style={{
          alignItems: 'center',
          backgroundColor: '#eee',
          marginHorizontal: 10,
          borderRadius: 10,
          paddingVertical: 10,
          elevation: 2,
          shadowRadius: 10,
        }}>
        <Image
          source={{uri: data?.image}}
          style={{width: '95%', height: 200, borderRadius: 10, marginBottom: 5}}
        />
        <View style={{alignItems: 'flex-start', paddingHorizontal: 12}}>
          <Text style={{fontSize: 15, fontWeight: 'bold'}}>{data?.title}</Text>
          <Text style={{fontSize: 15}}>{data?.description}</Text>
        </View>
      </View>
    </View>
      </ScrollView>
  );
};

export default PromotionsDetails;

const styles = StyleSheet.create({});
