import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ToastAndroid,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../Components/Header';
import {Color} from '../../Constants';
import axios from 'axios';
import {BaseUrl} from '../../Constants/BaseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
const Promotions = ({navigation}: any) => {
  const [loading, setLoading] = useState(false);
  const [user_id, setUser_id] = useState('');
  const focus = useIsFocused();
  const [noInternet, setNoInternet] = useState(false);
  const gettingUserDatatoken = () => {
    try {
      AsyncStorage.getItem('user_id')
        .then(value => {
          if (value !== null) {
            setUser_id(JSON.parse(value));
          } else {
            console.log('No login fields found');
          }
        })
        .catch(error => console.log('Error retrieving login fields: ', error));
    } catch (error) {
      console.log('Error retrieving login fields: ', error);
    }
  };

  useEffect(() => {
    gettingUserDatatoken();
  }, [focus]);

  const [promotionData, setPromotionData] = useState([]);
  // console.log('promotionData', promotionData);

  const getPromoData = () => {
    setLoading(true);
    const config = {
      headers: {
        user_id: user_id,
      },
    };

    axios
      .post(`${BaseUrl}getAllData`, null, config)
      .then((res: any) => {
        setPromotionData(res.data.promotions);
        setLoading(false);
      })
      .catch(error => {
        if (axios.isAxiosError(error)) {
          ToastAndroid.show('You Are Offline', ToastAndroid.LONG);
          setNoInternet(true);
          return;
        }
        ToastAndroid.show('Internal Server Error', ToastAndroid.BOTTOM);
        setLoading(false);
      });
  };

  const cartData: any = useSelector(cartData => cartData);
  useEffect(()=>{
    setPromotionData(cartData?.user?.cart?.promotions)
  },[cartData,focus])

  return (
    <View
      style={{
        backgroundColor: Color.white,
        paddingHorizontal: 15,
        height: '100%',
      }}>
      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: Color.white,
            opacity: 0.9,
          }}>
          <ActivityIndicator color="black" size={'large'} />
          {noInternet ? (
            <Text style={{textAlign: 'center', marginTop: 50, color: 'black'}}>
              Currently You Are Offline
            </Text>
          ) : (
            ''
          )}
        </View>
      ) : (
        <View style={{flex:1}}>
          <Header />
          <Text
            style={{
              textAlign: 'center',
              fontSize: 18,
              marginVertical: 10,
              color: Color.mainColor,
              fontWeight: 'bold',
            }}>
            Promotions
          </Text>
          <View style={{marginHorizontal: 0, marginTop: 10, marginBottom: 40,flex:1}}>
            <FlatList
              data={promotionData ?? []}
              nestedScrollEnabled={true}
              showsVerticalScrollIndicator={false}
              renderItem={({item, index}: any) => {
                return (
                  <>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('PromotionsDetails', item)
                      }
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
                        resizeMode='contain'
                      />
                      <View
                        style={{
                          alignSelf: 'flex-start',
                          paddingHorizontal: 10,
                        }}>
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: 'bold',
                            color: 'black',
                          }}>
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
      )}
    </View>
  );
};

export default Promotions;

const styles = StyleSheet.create({});
