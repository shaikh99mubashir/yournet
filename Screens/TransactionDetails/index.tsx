import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Header from '../../Components/Header';
import {Color} from '../../Constants';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const TransactionDetails = ({navigation, route}: any) => {
  const data: any = route.params;
  console.log('data===>', data);

  return (
    <ScrollView
      style={{paddingTop: 0, paddingHorizontal: 0}}
      showsVerticalScrollIndicator={false}>
      <View
        style={{
          backgroundColor: Color.mainColor,
          // height: '60%',
          paddingBottom: 60,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}>
          <View style={{paddingHorizontal:15}}>
        <Header navigation={navigation} backBtn noLogo />
          </View>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 22,
            marginVertical: 10,
            color: Color.white,
            fontWeight: 'bold',
          }}>
          Transaction Details
        </Text>
        <View style={{alignItems: 'center'}}>
          <MaterialCommunityIcons
            name="check-decagram"
            size={55}
            color={'white'}
          />
          {/* <Entypo name='circle-with-cross' size={55} color={'white'}/> */}
          <Text style={{color: 'white', marginTop: 10}}>51116156165</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              marginTop: 20,
            }}>
            <Text style={{color: 'white', fontSize: 30, fontWeight: 'bold'}}>
              Paid
            </Text>
            <Text style={{color: 'white', fontWeight: '700'}}>by</Text>

            <Image
              source={require('../../Images/payment-method.png')}
              style={{width: 40, height: 35}}
              resizeMode="contain"
            />
          </View>
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
          paddingHorizontal: 15,
          paddingVertical: 15,
        }}>
          {/* Customer ID */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            justifyContent: 'space-between',
            borderBottomWidth: 1,
            borderColor: '#eee',
            paddingBottom: 10,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <FontAwesome name="circle" size={10} color={Color.mainColor} />
            <Text style={{color: 'black', fontSize: 16, fontWeight: '600'}}>
              Customer ID :
            </Text>
          </View>
          <Text style={{color: 'black', fontSize: 16, fontWeight: '600'}}>
            {data.user_id}
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
            <FontAwesome name="circle" size={10} color={Color.mainColor} />
            <Text style={{color: 'black', fontSize: 16, fontWeight: '600'}}>
            Customer Name :
            </Text>
          </View>
          <Text style={{color: 'black', fontSize: 16, fontWeight: '600'}}>
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
            <FontAwesome name="circle" size={10} color={Color.mainColor} />
            <Text style={{color: 'black', fontSize: 16, fontWeight: '600'}}>
              Address :
            </Text>
          </View>
          <Text style={{color: 'black', fontSize: 16, fontWeight: '600'}}>
            {data.customer_address}
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
            <FontAwesome name="circle" size={10} color={Color.mainColor} />
            <Text style={{color: 'black', fontSize: 16, fontWeight: '600'}}>
              For Period :
            </Text>
          </View>
          <Text style={{color: 'black', fontSize: 16, fontWeight: '600'}}>
            12
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
            <FontAwesome name="circle" size={10} color={Color.mainColor} />
            <Text style={{color: 'black', fontSize: 16, fontWeight: '600'}}>
              Balance :
            </Text>
          </View>
          <Text style={{color: 'black', fontSize: 16, fontWeight: '600'}}>
            {data.oldamount}
          </Text>
        </View>
        <View style={{flexDirection:"row", marginTop:6}}>
        <Entypo
            name="dot-single"
            size={15}
            color={'grey'}
          />
        <Entypo
            name="dot-single"
            size={15}
            color={'grey'}
          />
        <Entypo
            name="dot-single"
            size={15}
            color={'grey'}
          />
        <Entypo
            name="dot-single"
            size={15}
            color={'grey'}
          />
        <Entypo
            name="dot-single"
            size={15}
            color={'grey'}
          />
        <Entypo
            name="dot-single"
            size={15}
            color={'grey'}
          />
        <Entypo
            name="dot-single"
            size={15}
            color={'grey'}
          />
        <Entypo
            name="dot-single"
            size={15}
            color={'grey'}
          />
        <Entypo
            name="dot-single"
            size={15}
            color={'grey'}
          />
        <Entypo
            name="dot-single"
            size={15}
            color={'grey'}
          />
        <Entypo
            name="dot-single"
            size={15}
            color={'grey'}
          />
        <Entypo
            name="dot-single"
            size={15}
            color={'grey'}
          />
        <Entypo
            name="dot-single"
            size={15}
            color={'grey'}
          />
        
        <Entypo
            name="dot-single"
            size={15}
            color={'grey'}
          />
        <Entypo
            name="dot-single"
            size={15}
            color={'grey'}
          />
        <Entypo
            name="dot-single"
            size={15}
            color={'grey'}
          />
        <Entypo
            name="dot-single"
            size={15}
            color={'grey'}
          />
        <Entypo
            name="dot-single"
            size={15}
            color={'grey'}
          />
        <Entypo
            name="dot-single"
            size={15}
            color={'grey'}
          />
        <Entypo
            name="dot-single"
            size={15}
            color={'grey'}
          />
        <Entypo
            name="dot-single"
            size={15}
            color={'grey'}
          />
        
        
        
        
          </View>
        {/* Total Amount */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            justifyContent: 'space-between',
            // borderBottomWidth: 1,
            // borderColor: '#eee',
            paddingVertical: 10,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            {/* <FontAwesome name="circle" size={10} color={Color.mainColor} /> */}
            <Text style={{color: Color.mainColor, fontSize: 22, fontWeight: '600'}}>
              Total Amount :
            </Text>
          </View>
          <Text style={{color: Color.mainColor, fontSize: 22, fontWeight: '600'}}>
            Rs.{data.total_amount}/-
          </Text>
        </View>
      </View>
        <View style={{alignItems:'center', marginVertical:40}}>
          <Image source={require('../../Images/ISP.png')} style={{width:130, height:130}} />
      </View>
    </ScrollView>
  );
};

export default TransactionDetails;

const styles = StyleSheet.create({});
