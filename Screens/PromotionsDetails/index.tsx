import {StyleSheet, Text, View, Image,ScrollView} from 'react-native';
import React from 'react';
import Header from '../../Components/Header';
import {Color} from '../../Constants';

const PromotionsDetails = ({navigation, route}: any) => {
  const data = route.params;

  return (
    <View
      style={{
        backgroundColor: Color.white,
        height: '100%',
        paddingHorizontal: 10,
        marginBottom:20
      }}>
        <ScrollView showsVerticalScrollIndicator={false}>
      <Header navigation={navigation} backBtn />
      <View
        style={{
          paddingHorizontal:10,
          backgroundColor: '#eee',
          marginHorizontal: 10,
          borderRadius: 10,
          paddingVertical: 10,
          elevation: 2,
          shadowRadius: 10,
          marginTop:10
        }}>
        <Image
          source={{uri: data?.image}}
          resizeMode='contain'
          style={{width: '100%', height: 200, borderRadius: 10, marginBottom: 5}}
        />
        <View style={{ paddingHorizontal: 0, }}>
          <Text style={{fontSize: 14, fontWeight: 'bold', color:'black'}}>{data?.title}</Text>
          <Text style={{fontSize: 12,textAlign:'justify',color:Color.textColor}}>{data?.description}</Text>
        </View>
      </View>
      </ScrollView>
    </View>
  );
};

export default PromotionsDetails;

const styles = StyleSheet.create({});
