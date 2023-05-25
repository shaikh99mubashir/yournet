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
import AntDesign from 'react-native-vector-icons/AntDesign';

const TransactionHistory = ({navigation}: any) => {
  const [user_id, setUser_id] = useState('');
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
  }, []);

  const [receipts, setReceipts] = useState([]);
  const getTransData = () => {
    const config = {
      headers: {
        User_ID: user_id,
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
  }, [user_id]);

  return (
    <View
      style={{
        paddingTop: 10,
        paddingHorizontal: 15,
        backgroundColor: Color.white,
        height: '100%',
      }}>
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
                activeOpacity={1}
                key={i}
                style={[styles.mainBox, {marginTop: 10, marginBottom: 5}]}>
                <View style={[styles.box, {}]}>
                  <View style={[styles.innerBox, {alignItems: 'center'}]}>
                    {/* day or month */}
                    <View
                      style={{
                        backgroundColor: '#eee',
                        width: 60,
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                      }}>
                      <Text
                        style={{
                          fontSize: 12,
                          top: 10,
                          color: 'black',
                          alignSelf: 'center',
                          paddingBottom: 2,
                        }}>
                        {month}
                        {/* jan */}
                      </Text>
                      <Text
                        style={{
                          fontSize: 23,
                          top: 5,
                          paddingBottom: 3,
                          color: 'black',
                          fontWeight: '700',
                          alignSelf: 'center',
                        }}>
                        {day}
                      </Text>
                    </View>
                    {/* year */}
                    <Text
                      style={{
                        fontSize: 12,
                        padding: 3,
                        color: 'black',
                        width: 60,
                        borderBottomLeftRadius: 20,
                        borderBottomRightRadius: 20,
                        fontWeight: '700',
                        marginTop: 0,
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
                      <Text style={{textAlign: 'center', color: 'white'}}>
                        Paid
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.box1}>
                  <View style={{gap:10}}>
                    <View>
                      <Text style={{fontSize: 15, color: 'gray'}}>
                        Transaction ID
                      </Text>
                      <Text style={{fontSize: 14, color: 'black'}}>100000</Text>
                    </View>
                    <View>
                      <Text style={{fontSize: 16, color: 'gray'}}>Amount</Text>
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: '700',
                          color: 'black',
                        }}>
                        Rs.{e.package_price}/-
                      </Text>
                    </View>
                  </View>
                  <View>
                    {/* <Text style={{color:Color.mainColor, fontSize:14, fontWeight:'700'}}>View Details</Text> */}
                    <AntDesign name="right" size={15} color={Color.textColor} />
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
    paddingHorizontal: 20,
    paddingVertical: 10,
    elevation: 5,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    flexDirection: 'row',
    width: '30%',
  },
  boxOne: {
   gap:10,
  },
  box1: {
    backgroundColor: 'white',
    width: '69%',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    display: 'flex',
    padding: 10,
    elevation: 5,
    gap: 7,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems:'center'
  },
  innerBox: {
    justifyContent: 'center',
    textAlign: 'center',
    width: 60,
    height: 100,
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
