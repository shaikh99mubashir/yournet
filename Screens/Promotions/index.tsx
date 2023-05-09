import { StyleSheet, Text, View ,FlatList, TouchableOpacity,Image } from 'react-native'
import React from 'react'
import Header from '../../Components/Header'
import { Color } from '../../Constants';

const Promotions = ({navigation}:any) => {
  const data = [
    {
      id: 1,
      image: require('../../Images/slider1.jpg'),
      txt:'Hello World kdksdn kdsj  skd fs dks dfksd fksd f sdk fsdk f sdfk sdf ksd fk dsfksd fkjsd f sdkf sddkjf sddk fskdj fksd fkjsd fkjjd sf'
    },
    {
      id: 2,
      image: require('../../Images/slider2.jpg'),
      txt:'Hello World kdksdn kdsj  skd fs dks dfksd fksd f sdk fsdk f sdfk sdf ksd fk dsfksd fkjsd f sdkf sddkjf sddk fskdj fksd fkjsd fkjjd sf'
    },
    {
      id: 3,
      image: require('../../Images/slider3.jpg'),
      txt:'Hello World kdksdn kdsj  skd fs dks dfksd fksd f sdk fsdk f sdfk sdf ksd fk dsfksd fkjsd f sdkf sddkjf sddk fskdj fksd fkjsd fkjjd sf'
    },
    {
      id: 4,
      image: require('../../Images/slider1.jpg'),
      txt:'Hello World kdksdn kdsj  skd fs dks dfksd fksd f sdk fsdk f sdfk sdf ksd fk dsfksd fkjsd f sdkf sddkjf sddk fskdj fksd fkjsd fkjjd sf'
    },
  ];
  return (
    <View style={{backgroundColor:Color.white, marginBottom:200}}>
      <Header/>
      <Text style={{textAlign:'center', fontSize:22, marginVertical:10, color:Color.mainColor, fontWeight:'bold'}}>Promotions</Text>
     <View style={{marginHorizontal:10, marginTop:10}}>
      <FlatList
              data={data}
              nestedScrollEnabled
              showsVerticalScrollIndicator={false}
              renderItem={({item, index}: any) => {
                return (
                  <TouchableOpacity
                    onPress={()=> navigation.navigate('PromotionsDetails', item)}
                    activeOpacity={0.8}
                    style={{alignItems:'center', backgroundColor:'#eee',marginBottom:20, borderRadius:10, paddingVertical:10,elevation:10,shadowRadius:10 }}>
                    <Image
                      source={item.image}
                      style={{width: '95%', height: 200, borderRadius: 10, marginBottom:5}}
                    />
                    <Text>{item.txt.slice(0,50)}...</Text>
                  </TouchableOpacity>
                );
              }}
            />
      </View>
    </View>
  )
}

export default Promotions

const styles = StyleSheet.create({})