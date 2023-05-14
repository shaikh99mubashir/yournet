import { StyleSheet, Text, View ,FlatList, TouchableOpacity,Image,ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../Components/Header'
import { Color } from '../../Constants';
import axios from 'axios';
import { BaseUrl } from '../../Constants/BaseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  const [companyId, setCompanyId] = useState('')
  const gettingUserData = () => {
    AsyncStorage.getItem('company_id')
      .then(value => {
        if (value !== null) {
          setCompanyId(JSON.parse(value));
        } else {
          console.log('No promotionData found');
        }
      })
      .catch(error => console.log('Error retrieving promotionData: ', error));
  };
  console.log('companyIdby promotion page',companyId);
  
  useEffect(() => {
    gettingUserData();
  }, []);
  const [promotionData, setPromotionData] = useState([]);
  const getPromotionData = () => {
    const formData = new FormData();
    formData.append('company_id', companyId);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    axios
      .post(`${BaseUrl}getPromotionsByCompanyId`, formData, config)
      .then((res: any) => {
        setPromotionData(res.data.promotions);
      })
      .catch(error => {
        console.log('error==>', error);
        ToastAndroid.show('Internal Server Error', ToastAndroid.BOTTOM);
      });
  };

  useEffect(() => {
    getPromotionData();
  }, [companyId]);
  return (
    <View style={{backgroundColor:Color.white, marginBottom:200}}>
      <Header/>
      <Text style={{textAlign:'center', fontSize:22, marginVertical:10, color:Color.mainColor, fontWeight:'bold'}}>Promotions</Text>
     <View style={{marginHorizontal:10, marginTop:10}}>
      <FlatList
              data={promotionData ?? []}
              nestedScrollEnabled
              showsVerticalScrollIndicator={false}
              renderItem={({item, index}: any) => {
                return (
                  <>
                  <TouchableOpacity
                    onPress={()=> navigation.navigate('PromotionsDetails', item)}
                    activeOpacity={0.8}
                    style={{alignItems:'center', backgroundColor:'#eee',marginBottom:20, borderRadius:10, paddingVertical:10,elevation:10,shadowRadius:10 }}>
                    <Image
                      source={{ uri: item?.image }}
                      style={{width: '95%', height: 200, borderRadius: 10, marginBottom:5}}
                    />
                    <View style={{alignSelf:'flex-start', paddingHorizontal:10}}>
                    <Text style={{fontSize:15, fontWeight:'bold'}}>{item?.title.length>50 ?`${item?.title.slice(0,50)}...` : item?.title}</Text>
                    </View>
                  </TouchableOpacity>
                  </>
                );
              }}
            />
      </View>
    </View>
  )
}

export default Promotions

const styles = StyleSheet.create({})