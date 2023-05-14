import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import Header from '../../Components/Header';
import {Color} from '../../Constants';

const PromotionsDetails = ({navigation, route}: any) => {
  const data = route.params;

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
          source={{ uri: data?.image }}
          style={{width: '95%', height: 200, borderRadius: 10, marginBottom: 5}}
        />
        <View style={{alignItems:'flex-start', paddingHorizontal:12}}>
        <Text style={{fontSize:15, fontWeight:'bold'}}>{data?.title}</Text>
        <Text style={{fontSize:15,}}>{data?.description}</Text>
        </View>
      </View>
    </View>
  );
};

export default PromotionsDetails;

const styles = StyleSheet.create({});
