import {
  StyleSheet,
  Text,
  View,
  ToastAndroid,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Image,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Header from '../../Components/Header';
import {Color} from '../../Constants';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BaseUrl} from '../../Constants/BaseUrl';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useIsFocused} from '@react-navigation/native';
import CustomTabView from '../../Components/CustomTabView';
import {useDispatch, useSelector} from 'react-redux';

const TransactionHistory = ({navigation}: any) => {
  const [user_id, setUser_id] = useState('');
  const focus = useIsFocused();
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

  const [receipts, setReceipts] = useState([]);
  const [paidRecipts, setPaidRecipts] = useState([])
  const [unPaidRecipts, setUnPaidRecipts] = useState([])
  const [loading, setLoading] = useState<boolean>(false);
  // // console.log('receipts',receipts);
  // console.log('paidRecipts====>',paidRecipts);
  // console.log('unPaidRecipts====>',unPaidRecipts);
  
  const cartData: any = useSelector(cartData => cartData);
  const receiptsData = () => {
    setReceipts(cartData?.user?.cart?.receipts);
    const paid = receipts?.filter(
      (check: any) => check.payment_method !==  'Pay Later' || null,
    );
    const unpaid = receipts?.filter(
      (check: any) => check.payment_method ==  'Pay Later' || null,
    );
    setPaidRecipts(paid)
    setUnPaidRecipts(unpaid)
  }
  useEffect(()=>{
    receiptsData()
  },[cartData,focus])



  const getTransData = () => {
    setLoading(true);
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
        if (res?.data && res?.data?.receipts) {
          setReceipts(res?.data?.setReceipts);
          const paid = res?.data?.receipts.filter(
            (check: any) => check.payment_method == '1',
          );
          const unpaid = res?.data?.receipts.filter(
            (check: any) => check.payment_method ==  'Pay Later' || null,
          );
          setPaidRecipts(paid)
          setUnPaidRecipts(unpaid)
          setLoading(false);
        }
      })
      .catch(error => {
        ToastAndroid.show('Internal Server Error', ToastAndroid.BOTTOM);
        setLoading(false);
      });
  };

  // useEffect(() => {
  //   getTransData();
  // }, [user_id, focus]);

  const [currentTab, setCurrentTab]: any = useState([
    {
      index: 0,
      name: 'completed',
      selected: true,
    },
    {
      index: 1,
      name: 'cancelled',
      selected: false,
    },
    {
      index: 2,
      name: 'cancelled',
      selected: false,
    },
  ]);

  const activateTab = (index: any) => {
    setCurrentTab(
      currentTab &&
        currentTab.length > 0 &&
        currentTab.map((e: any, i: any) => {
          if (e.index == index) {
            return {
              ...e,
              selected: true,
            };
          } else {
            return {
              ...e,
              selected: false,
            };
          }
        }),
    );
  };

  const renderAllTransation = ({item, index}: any) => {
    // const date = new Date(item?.receipt_date);
    // const year = date.getFullYear();
    // const month = date.getMonth(); // Months are zero-based, so 5 represents June
    // const day = date.getDate();
    // console.log('month',month);

    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    
    const date = new Date(item?.receipt_date);
    const year = date.getFullYear();
    const monthIndex = date.getMonth(); // Months are zero-based
    
    const monthName = monthNames[monthIndex];
    
    // console.log(`${date.getDate()} ${monthName} ${year}`);


// console.log('item?.receipt_date',item?.receipt_date);

    
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('TransactionDetails', item)} 
        activeOpacity={1}
        key={index}
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
                {monthName}
                {/* jan */}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  top: 5,
                  paddingBottom: 3,
                  color: 'black',
                  fontWeight: '700',
                  alignSelf: 'center',
                }}>
                {/* {day} */}
                {date.getDate()}
              </Text>
            </View>
            {/* year */}
            <Text
              style={{
                fontSize: 11,
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
                backgroundColor: item.payment_method ==  'Pay Later' || null ? 'red' :'#22b14c',
                // backgroundColor: '#e60000',
                width: 50,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 6,
                paddingVertical: 2,
                borderRadius: 50,
              }}>
              <Text style={{textAlign: 'center', color: 'white', fontSize: 12, }}>
                {item.payment_method ==  'Pay Later' || null ? 'UnPaid' : 'Paid'}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.box1}>
          <View style={{gap: 10}}>
            <View>
              <Text style={{fontSize: 12, color: 'gray'}}>Transaction ID</Text>
              <Text style={{fontSize: 12, color: 'black'}}>{item?.inovoice_number}</Text>
            </View>
            <View>
              <Text style={{fontSize: 14, color: 'gray'}}>Amount</Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '700',
                  color: 'black',
                }}>
                Rs.{item.package_price}/-
              </Text>
            </View>
          </View>
          <View>
            {/* <Text style={{color:Color.mainColor, fontSize:14, fontWeight:'700'}}>View Details</Text> */}
            <AntDesign name="right" size={12} color={Color.textColor} />
          </View>
        </View>
      </TouchableOpacity>
        
    );
  };
  


  const firstRoute = useCallback(() => {
    return (
      // <View style={{marginVertical: 20, marginBottom: 80, flex:0,flexGrow: 1}}>
      <View style={{marginVertical: 20, marginBottom: 10}}>
        {receipts?.length > 0 ? (
          <FlatList
            data={receipts.length > 0 ? receipts : []}
            renderItem={renderAllTransation}
            scrollEnabled={true}
            nestedScrollEnabled={true}
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
            // keyExtractor={(items: any, index: number): any => index}
            keyExtractor={(item, index) => String(index)}
          />
        ) : (
          // <Text style={{fontWeight: 'bold', fontSize: 14,color:'grey'}}>No data found</Text>
          <Image source={require('../../Images/nodata.png')} resizeMode='contain' style={{height:150}}/>
        )}
      </View>
    );
  }, [receipts]);

  const secondRoute = useCallback(() => {
    return (
      <View style={{marginVertical: 20, marginBottom: 10}}>
        {unPaidRecipts?.length > 0 ? (
          <FlatList
            data={unPaidRecipts.length > 0 ? unPaidRecipts : []}
            renderItem={renderAllTransation}
            scrollEnabled={true}
            nestedScrollEnabled={true}
            // keyExtractor={(items: any, index: number): any => index}
            keyExtractor={(item, index) => String(index)}
          />
        ) : (
          // <Text style={{fontWeight: 'bold', fontSize: 14,color:'grey'}}>No data found</Text>
          <Image source={require('../../Images/nodata.png')} resizeMode='contain' style={{height:150}}/>
        )}
      </View>
    );
  }, [unPaidRecipts]);
  
  const thirdRoute = useCallback(() => {
    return (
      <View style={{marginVertical: 20, marginBottom: 10}}>
        {paidRecipts?.length > 0 ? (
          <FlatList
            data={paidRecipts?.length > 0 ? paidRecipts : []}
            renderItem={renderAllTransation}
            scrollEnabled={true}
            nestedScrollEnabled={true}
            // keyExtractor={(items: any, index: number): any => index}
            keyExtractor={(item, index) => String(index)}
          />
        ) : (
          // <Text style={{fontWeight: 'bold', fontSize: 14, color:'grey'}}>No data found</Text>
          <Image source={require('../../Images/nodata.png')} resizeMode='contain' style={{height:150}}/>
        )}
      </View>
    );
    
  }, [paidRecipts]);

  return (
    <View
      style={{
        paddingTop: 10,
        paddingHorizontal: 15,
        backgroundColor: Color.white,
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
          <ActivityIndicator color={Color.mainColor} size={'large'} />
        </View>
      ) : (
        <>
          <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
            <Header backBtn navigation={navigation} noLogo />
            <Text
              style={{
                textAlign: 'center',
                fontSize: 18,
                marginVertical: 10,
                color: Color.mainColor,
                fontWeight: 'bold',
              }}>
              Invoice
            </Text>

            <View style={{marginTop: 10}}>
              <CustomTabView
                currentTab={currentTab}
                firstRoute={firstRoute}
                secondRoute={secondRoute}
                thirdRoute={thirdRoute}
                activateTab={activateTab}
                firstRouteTitle="All"
                secondRouteTitle="UnPaid"
                thirdRouteTitle="Paid"
              />
            </View>

            {/* <View style={{marginBottom: 200}}></View>  */}
          </ScrollView>
        </>
      )}
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
    // paddingHorizontal: 20,
    // paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    flexDirection: 'row',
    width: '30%',
  },
  boxOne: {
    gap: 10,
  },
  box1: {
    backgroundColor: 'white',
    width: '69%',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    display: 'flex',
    padding: 10,
    elevation: 5,
    gap: 7,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
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
