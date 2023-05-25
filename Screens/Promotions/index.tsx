import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../Components/Header';
import {Color} from '../../Constants';
import axios from 'axios';
import {BaseUrl} from '../../Constants/BaseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
const Promotions = ({navigation}: any) => {

  const [user_id, setUser_id] = useState('');
  const focus = useIsFocused()
  const gettingUserDatatoken = () => {
    AsyncStorage.getItem('user_id')
      .then(value => {
        if (value !== null) {
          setUser_id(JSON.parse(value));
        } else {
          console.log('No login fields found');
        }
      })
      .catch(error => console.log('Error retrieving login fields: ', error));
  };
  
  useEffect(() => {
    gettingUserDatatoken();
  }, [focus]);

  const [promotionData, setPromotionData] = useState([]);
  const getPromoData = () => {
    const config = {
      headers: {
        user_id: user_id,
      },
    };

    axios
      .post(
        `${BaseUrl}getAllData`,
        null, // pass null as the data parameter since you're making a POST request without any payload
        config, // pass the config object as the third parameter
      )
      .then((res: any) => {
        setPromotionData(res.data.promotions);
      })
      .catch(error => {
        console.log('error==>', error);
        ToastAndroid.show('Internal Server Error', ToastAndroid.BOTTOM);
      });
  };

  useEffect(() => {
    getPromoData();
  }, [user_id]);

  return (
    <View style={{backgroundColor: Color.white, marginBottom: 200, paddingHorizontal:10, height:'100%'}}>
      <Header />
      <Text
        style={{
          textAlign: 'center',
          fontSize: 22,
          marginVertical: 10,
          color: Color.textColor,
          fontWeight: 'bold',
        }}>
        Promotions
      </Text>
      <View style={{marginHorizontal: 10, marginTop: 10}}>
        <FlatList
          data={promotionData ?? []}
          nestedScrollEnabled
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}: any) => {
            return (
              <>
                <TouchableOpacity
                  onPress={() => navigation.navigate('PromotionsDetails', item)}
                  activeOpacity={0.8}
                  style={{
                    alignItems: 'center',
                    backgroundColor: '#eee',
                    marginBottom: 20,
                    borderRadius: 10,
                    paddingVertical: 10,
                    elevation: 3,
                    shadowRadius: 10,
                  }}>
                  <Image
                    source={{uri: item?.image}}
                    style={{
                      width: '95%',
                      height: 200,
                      borderRadius: 10,
                      marginBottom: 5,
                    }}
                  />
                  <View
                    style={{alignSelf: 'flex-start', paddingHorizontal: 10}}>
                    <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                      {item?.title.length > 50
                        ? `${item?.title.slice(0, 50)}...`
                        : item?.title}
                    </Text>
                  </View>
                </TouchableOpacity>
              </>
            );
          }}
        />
      </View>
    </View>
  );
};

export default Promotions;

const styles = StyleSheet.create({});
