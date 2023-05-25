import {
  StyleSheet,
  Text,
  View,
  ToastAndroid,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../Components/Header';
import {Color} from '../../Constants';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BaseUrl} from '../../Constants/BaseUrl';

const TransactionHistory = ({navigation}: any) => {
  const [userToken, setUserToken] = useState('');
  const gettingUserDatatoken = () => {
    AsyncStorage.getItem('token')
      .then(value => {
        if (value !== null) {
          setUserToken(JSON.parse(value));
        } else {
          console.log('No login fields found');
        }
      })
      .catch(error => console.log('Error retrieving login fields: ', error));
  };

  useEffect(() => {
    gettingUserDatatoken();
  }, []);

  console.log('user Token', userToken);
  const [receipts, setReceipts] = useState([]);
  const getTransData = () => {
    const config = {
      headers: {
        Authorization: userToken,
      },
    };

    axios
      .post(
        `${BaseUrl}getAllData`,
        null, // pass null as the data parameter since you're making a POST request without any payload
        config, // pass the config object as the third parameter
      )
      .then((res: any) => {
        console.log('res data', res.data.receipts);
        setReceipts(res?.data?.receipts);
      })
      .catch(error => {
        console.log('error==>', error);
        ToastAndroid.show('Internal Server Error', ToastAndroid.BOTTOM);
      });
  };

  useEffect(() => {
    getTransData();
  }, [userToken]);

  return (
    <View style={{paddingTop: 10, paddingHorizontal: 15, backgroundColor:Color.white, height:'100%'}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header backBtn navigation={navigation} noLogo />
        <Text
          style={{
            textAlign: 'center',
            fontSize: 22,
            marginVertical: 10,
            color: Color.mainColor,
            fontWeight: 'bold',
          }}>
          Transaction History
        </Text>
        {receipts &&
          receipts.map((e: any, i: number) => {
            const date = new Date(e?.receipt_date);
            const year = date.getFullYear();
            const month = date.getMonth(); // Months are zero-based, so 5 represents June
            const day = date.getDate();
            console.log('e==>', e);

            return (
              <TouchableOpacity
                onPress={() => navigation.navigate('TransactionDetails', e)}
                activeOpacity={0.8}
                key={i}
                style={[styles.mainBox, {marginTop: 10, marginBottom: 5}]}>
                <View style={[styles.box]}>
                  <View style={[styles.innerBox, {alignItems: 'center'}]}>
                    <View>
                      <Text
                        style={{
                          fontSize: 12,
                          top:10,
                          color: 'black',
                          alignSelf: 'center',
                          paddingBottom:2,
                        }}>
                        {month}
                        {/* jan */}
                      </Text>
                      <Text
                        style={{
                          fontSize: 23,
                          top:5,
                          paddingBottom: 3,
                          color: 'black',
                          fontWeight: '700',
                          alignSelf: 'center',
                        }}>
                        {day}
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontSize: 12,
                        padding: 3,
                        color: 'black',
                        width: 60,
                        borderBottomLeftRadius: 20,
                        borderBottomRightRadius: 20,
                        fontWeight: '700',
                        marginTop:2,
                        textAlign: 'center',
                        // backgroundColor: '#e8e9eb',
                        backgroundColor: '#e2e5de',
                      }}>
                      {year}
                    </Text>
                    <View
                      style={{
                        backgroundColor: '#22b14c',
                        // backgroundColor: '#e60000',
                        width: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 6,
                        paddingVertical: 2,
                        borderRadius: 50,
                      }}>
                      <Text style={{textAlign: 'center', color:'white'}}>Paid</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.boxOne}>
                <View>
                    <Text style={{fontSize: 15, color: 'gray'}}>
                      Transaction ID
                    </Text>
                    <Text
                      style={{fontSize: 14,  color: 'black'}}>
                      100000
                    </Text>
                  </View>
                  <View>
                    <Text style={{fontSize: 16, color: 'gray'}}>Amount</Text>
                    <Text
                      style={{fontSize: 20, fontWeight: '700', color: 'black'}}>
                     Rs.{e.package_price}/-
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        <View style={{marginBottom: 20}}></View>
      </ScrollView>
    </View>
  );
};

export default TransactionHistory;

const styles = StyleSheet.create({
  mainBox: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    
  },
  box: {
    display: 'flex',
    backgroundColor: '#f5f5f5',
    paddingHorizontal:20,
    paddingVertical:10,
    elevation: 5,
    // borderColor: 'black',
    // borderWidth: 10,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    flexDirection: 'row',
    width: '30%',

  },
  boxOne: {
    backgroundColor: 'white',
    // width: Dimensions.get('screen').width / 1.6,
    width: '70%',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    display: 'flex',
    padding: 10,
    elevation: 5,
    gap: 7,
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  innerBox: {
    justifyContent: 'center',
    textAlign: 'center',
    width: 60,
    height: 100,
    backgroundColor: '#eee',
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'column',
  },
  fields: {
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 12,
    padding: 10,
  },
  button: {
    alignSelf: 'flex-end',
    textAlign: 'center',
    alignItems: 'center',
    width: '40%',
    borderRadius: 100,
    marginTop: 20,
    paddingVertical: 10,
    backgroundColor: 'red',
  },
});
