import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import React from 'react';
import Header from '../../Components/Header';
import {Color} from '../../Constants';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';

const TransactionDetails = ({navigation, route}: any) => {
  const data: any = route.params;
  // console.log('data ===>', data);

  const activationDate: Date = new Date(data.activation_date);
  const expiryDate: Date = new Date(data.expiry_date);

  const differenceInTime: number =
    expiryDate.getTime() - activationDate.getTime();
  const differenceInDays: number = Math.ceil(
    differenceInTime / (1000 * 3600 * 24),
  );
  const companyName: any = useSelector(companyName => companyName);
  // console.log('data.expiry_date', data.expiry_date);
  const dateString = data.expiry_date;
  const dateStringactivation_date = data.activation_date;
  const dateRegex = /^(\d+)(st|nd|rd|th)\s(\w+)(\s\d{4})$/;
  const [, dayString, , monthString, yearString] = dateString.match(dateRegex) || [];
  const [, dayStringa, , monthStringa, yearStringa] = dateStringactivation_date.match(dateRegex) || [];
  const day = parseInt(dayString);
  const monthAbbreviations: { [key: string]: string } = {
    January: 'Jan',
    February: 'Feb',
    March: 'Mar',
    April: 'Apr',
    May: 'May',
    June: 'Jun',
    July: 'Jul',
    August: 'Aug',
    September: 'Sep',
    October: 'Oct',
    November: 'Nov',
    December: 'Dec'
  };
  const month = monthAbbreviations[monthString];
  const year = parseInt(yearString);
  const montha = monthAbbreviations[monthStringa];
  const yeara = parseInt(yearStringa);
  
  const expiry_date = `${dayString} ${month} ${year}`;
  const activation_date = `${dayString} ${montha} ${yeara}`;
  console.log(expiry_date);

  return (
    <ScrollView
      style={{paddingTop: 0, paddingHorizontal: 0}}
      showsVerticalScrollIndicator={false}>
      <View
        style={{
          backgroundColor: Color.mainColor,
          paddingBottom: 60,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}>
        <View style={{paddingHorizontal: 12}}>
          <Header navigation={navigation} backBtn noLogo backBtnColor="white" />
        </View>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 18,
            marginVertical: 10,
            color: Color.white,
            fontWeight: 'bold',
          }}>
          Invoice Details
        </Text>
        <View style={{alignItems: 'center'}}>
          {data.payment_method == 'Pay Later' || null ? (
            <Entypo name="circle-with-cross" size={55} color={'white'} />
          ) : (
            <MaterialCommunityIcons
              name="check-decagram"
              size={45}
              color={'white'}
            />
          )}

          <Text style={{color: 'white', marginTop: 10}}>
            {data?.inovoice_number}
          </Text>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              marginTop: 20,
            }}>
            {data.payment_method == 'Pay Later' || null ? (
              <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>
                UnPaid
              </Text>
            ) : (
              <>
                <Text
                  style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>
                  Paid
                </Text>
                <Text style={{color: 'white', fontWeight: '700', fontSize: 12}}>
                  by
                </Text>

                <Image
                  source={require('../../Images/payment-method.png')}
                  style={{width: 30, height: 25}}
                  resizeMode="contain"
                />
              </>
            )}
          </View>
          <Text style={{color: 'white', fontSize: 14, top: 5}}>
            {data.created_at}
          </Text>
        </View>
      </View>
      <View
        style={{
          backgroundColor: 'white',
          elevation: 5,
          width: '90%',
          marginHorizontal: 20,
          marginTop: -45,
          borderRadius: 10,
          paddingHorizontal: 12,
          paddingVertical: 12,
        }}>
        <Text
          style={{
            color: 'black',
            alignSelf: 'center',
            fontSize: 18,
            paddingVertical: 10,
            fontWeight: '700',
          }}>
          {companyName?.user?.companyData?.com_name}
        </Text>
        {/* Customer ID */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            justifyContent: 'space-between',
            borderBottomWidth: 1,
            borderColor: '#eee',
            paddingVertical: 10,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <FontAwesome name="circle" size={8} color={Color.mainColor} />
            <Text style={{color: 'grey', fontSize: 14, fontWeight: '600'}}>
              Customer ID :
            </Text>
          </View>
          <Text style={{color: 'black', fontSize: 14, fontWeight: '600'}}>
            {data.customer_id}
          </Text>
        </View>

        {/* Name */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            justifyContent: 'space-between',
            borderBottomWidth: 1,
            borderColor: '#eee',
            paddingVertical: 10,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <FontAwesome name="circle" size={8} color={Color.mainColor} />
            <Text style={{color: 'grey', fontSize: 14, fontWeight: '600'}}>
              Customer Name :
            </Text>
          </View>
          <Text style={{color: 'black', fontSize: 14, fontWeight: '600'}}>
            {data.customer_name}
          </Text>
        </View>
        {/* Address */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            justifyContent: 'space-between',
            borderBottomWidth: 1,
            borderColor: '#eee',
            paddingVertical: 10,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <FontAwesome name="circle" size={8} color={Color.mainColor} />
            <Text style={{color: 'grey', fontSize: 14, fontWeight: '600'}}>
              Address :
            </Text>
          </View>
          <Text style={{color: 'black', fontSize: 14, fontWeight: '600'}}>
            {data?.customer_address.length > 25
              ? `${data?.customer_address.slice(0, 25)} ...`
              : data?.customer_address}
          </Text>
        </View>
        {/* forperiod */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            justifyContent: 'space-between',
            borderBottomWidth: 1,
            borderColor: '#eee',
            paddingVertical: 10,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <FontAwesome name="circle" size={8} color={Color.mainColor} />
            <Text style={{color: 'grey', fontSize: 14, fontWeight: '600'}}>
              For Period :
            </Text>
          </View>
          <Text style={{color: 'black', fontSize: 14, fontWeight: '600'}}>
            {/* {differenceInDays ? differenceInDays : 'NaN'} */}
            {`${data.activation_date} to ${data.expiry_date}`}
          </Text>
        </View>
        {/* Due Date */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            justifyContent: 'space-between',
            borderBottomWidth: 1,
            borderColor: '#eee',
            paddingVertical: 10,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <FontAwesome name="circle" size={8} color={Color.mainColor} />
            <Text style={{color: 'grey', fontSize: 14, fontWeight: '600'}}>
              Due Date :
            </Text>
          </View>
          <Text style={{color: 'black', fontSize: 14, fontWeight: '600'}}>
            {data.expiry_date}
          </Text>
        </View>
        {/* Package Name */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            justifyContent: 'space-between',
            borderBottomWidth: 1,
            borderColor: '#eee',
            paddingVertical: 10,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <FontAwesome name="circle" size={8} color={Color.mainColor} />
            <Text style={{color: 'grey', fontSize: 14, fontWeight: '600'}}>
              Package Name :
            </Text>
          </View>
          <Text style={{color: 'black', fontSize: 14, fontWeight: '600'}}>
            {data.package_name}
          </Text>
        </View>
        {/* package Price */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            justifyContent: 'space-between',
            borderBottomWidth: 1,
            borderColor: '#eee',
            paddingVertical: 10,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <FontAwesome name="circle" size={8} color={Color.mainColor} />
            <Text style={{color: 'grey', fontSize: 14, fontWeight: '600'}}>
              Package Price :
            </Text>
          </View>
          <Text style={{color: 'black', fontSize: 14, fontWeight: '600'}}>
            {data.package_price}
          </Text>
        </View>
        {/* Balance */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            justifyContent: 'space-between',
            // borderBottomWidth: 1,
            borderColor: '#eee',
            paddingVertical: 10,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <FontAwesome name="circle" size={8} color={Color.mainColor} />
            <Text style={{color: 'grey', fontSize: 14, fontWeight: '600'}}>
              Balance :
            </Text>
          </View>
          <Text style={{color: 'black', fontSize: 14, fontWeight: '600'}}>
            {data.oldamount}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 6,
            width: '100%',
            overflow: 'hidden',
          }}>
          <Entypo name="dot-single" size={12} color={'grey'} />
          <Entypo name="dot-single" size={12} color={'grey'} />
          <Entypo name="dot-single" size={12} color={'grey'} />
          <Entypo name="dot-single" size={12} color={'grey'} />
          <Entypo name="dot-single" size={12} color={'grey'} />
          <Entypo name="dot-single" size={12} color={'grey'} />
          <Entypo name="dot-single" size={12} color={'grey'} />
          <Entypo name="dot-single" size={12} color={'grey'} />
          <Entypo name="dot-single" size={12} color={'grey'} />
          <Entypo name="dot-single" size={12} color={'grey'} />
          <Entypo name="dot-single" size={12} color={'grey'} />
          <Entypo name="dot-single" size={12} color={'grey'} />
          <Entypo name="dot-single" size={12} color={'grey'} />
          <Entypo name="dot-single" size={12} color={'grey'} />
          <Entypo name="dot-single" size={12} color={'grey'} />
          <Entypo name="dot-single" size={12} color={'grey'} />
          <Entypo name="dot-single" size={12} color={'grey'} />
          <Entypo name="dot-single" size={12} color={'grey'} />
          <Entypo name="dot-single" size={12} color={'grey'} />
          <Entypo name="dot-single" size={12} color={'grey'} />
          <Entypo name="dot-single" size={12} color={'grey'} />
          <Entypo name="dot-single" size={12} color={'grey'} />
          <Entypo name="dot-single" size={12} color={'grey'} />
          <Entypo name="dot-single" size={12} color={'grey'} />
          <Entypo name="dot-single" size={12} color={'grey'} />
          <Entypo name="dot-single" size={12} color={'grey'} />
          <Entypo name="dot-single" size={12} color={'grey'} />
          <Entypo name="dot-single" size={12} color={'grey'} />
          <Entypo name="dot-single" size={12} color={'grey'} />
          <Entypo name="dot-single" size={12} color={'grey'} />
          <Entypo name="dot-single" size={12} color={'grey'} />
          <Entypo name="dot-single" size={12} color={'grey'} />
          <Entypo name="dot-single" size={12} color={'grey'} />

          <Entypo name="dot-single" size={12} color={'grey'} />
          <Entypo name="dot-single" size={12} color={'grey'} />
          <Entypo name="dot-single" size={12} color={'grey'} />
          <Entypo name="dot-single" size={12} color={'grey'} />
          <Entypo name="dot-single" size={12} color={'grey'} />
          <Entypo name="dot-single" size={12} color={'grey'} />
          <Entypo name="dot-single" size={12} color={'grey'} />
          <Entypo name="dot-single" size={12} color={'grey'} />
        </View>
        {/* Total Amount */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            justifyContent: 'space-between',
            paddingVertical: 10,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <Text
              style={{color: Color.mainColor, fontSize: 18, fontWeight: '600'}}>
              Total Amount :
            </Text>
          </View>
          <Text
            style={{color: Color.mainColor, fontSize: 18, fontWeight: '600'}}>
            Rs.{data.total_amount}/-
          </Text>
        </View>
      </View>
      <View style={{alignItems: 'center', marginVertical: 10}}>
        <Image
          source={require('../../Images/ISP.png')}
          style={{width: 80, height: 80}}
          resizeMode="contain"
        />
      </View>
    </ScrollView>
  );
};

export default TransactionDetails;

const styles = StyleSheet.create({});
