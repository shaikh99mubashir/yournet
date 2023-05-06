import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import Header from '../../Components/Header';
import {Color} from '../../Constants';

const PromotionsDetails = ({navigation, route}: any) => {
  const data = route.params;
  console.log('data==>', data);

  return (
    <View style={{backgroundColor: Color.white, height: '100%'}}>
      <Header navigation={navigation} backBtn />
      <Text
        style={{
          textAlign: 'center',
          fontSize: 22,
          marginVertical: 10,
          color: Color.mainColor,
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
          elevation: 10,
          shadowRadius: 10,
        }}>
        <Image
          source={require('../../Images/slider1.jpg')}
          style={{width: '95%', height: 200, borderRadius: 10, marginBottom: 5}}
        />
        <Text>{data?.txt}</Text>
      </View>
    </View>
  );
};

export default PromotionsDetails;

const styles = StyleSheet.create({});
