import {StyleSheet, Text, View,Image,ScrollView} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Header from '../../Components/Header';
import {Color} from '../../Constants';
import LinearGradient from 'react-native-linear-gradient';

const TransactionDetails = ({navigation, route}: any) => {
  const data: any = route.params;
  console.log('data===>', data);

  return (
    <ScrollView style={{paddingTop: 10, paddingHorizontal: 15}} showsVerticalScrollIndicator={false}>
      <Header navigation={navigation} backBtn noLogo />

      <View style={{marginTop: 10}}>
        <View
          style={{
            display: 'flex',
            elevation: 5,
            flexDirection: 'column',
            borderRadius: 10,
          }}>
          <LinearGradient
            colors={['#FFC0CB', '#ADD8E6']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            locations={[0.25, 0.75]}
            angle={45}
            style={{
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              paddingVertical: 10,
              paddingHorizontal: 20,
            }}>
            <View style={{flexDirection: 'column', paddingVertical: 5}}>
              <Text
                style={{
                  fontSize: 22,
                  marginVertical: 0,
                  color: Color.textColor,
                  fontWeight: 'bold',
                }}>
                Transaction Details
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: Color.textColor,
                  fontWeight: 'bold',
                }}>
                3202302020
              </Text>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text
                  style={{
                    fontSize: 14,
                    color: Color.textColor,
                    fontWeight: 'bold',
                  }}>
                  12/1515/121
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: Color.textColor,
                    fontWeight: 'bold',
                  }}>
                  23:200
                </Text>
              </View>
            </View>
          </LinearGradient>
          {/* </View> */}
          <View
            style={{
              backgroundColor: 'white',
              padding: 10,
              borderBottomLeftRadius: 10,
              borderBottomEndRadius: 10,
            }}>
            {/* customer Id */}
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 5,
                alignItems: 'center',
                borderBottomWidth: 1,
                borderColor: '#eee',
                paddingBottom: 10,
                // justifyContent:'space-between'
              }}>
              <Text style={{fontSize: 18, color: 'black', fontWeight: '700'}}>
                Customer ID :
              </Text>
              <Text style={{fontSize: 16, color: 'black'}}>
                {data?.user_id}
              </Text>
            </View>
            {/* customer name */}
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 5,
                alignItems: 'center',
                borderBottomWidth: 1,
                borderColor: '#eee',
                paddingVertical: 10,
              }}>
              <Text style={{fontSize: 18, color: 'black', fontWeight: '700'}}>
                Customer Name :
              </Text>
              <Text style={{fontSize: 16, color: 'black'}}>
                {data?.user_name}
              </Text>
            </View>
            {/* package */}
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 5,
                alignItems: 'center',
                borderBottomWidth: 1,
                borderColor: '#eee',
                paddingVertical: 10,
              }}>
              <Text style={{fontSize: 18, color: 'black', fontWeight: '700'}}>
                Package :
              </Text>
              <Text style={{fontSize: 16, color: 'black'}}>
                {data?.package_name}
              </Text>
            </View>
            {/* for period */}
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 5,
                alignItems: 'center',
                borderBottomWidth: 1,
                borderColor: '#eee',
                paddingVertical: 10,
              }}>
              <Text style={{fontSize: 18, color: 'black', fontWeight: '700'}}>
                For Period :
              </Text>
              <Text style={{fontSize: 16, color: 'black'}}>21</Text>
            </View>
            {/* status */}
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 5,
                alignItems: 'center',
                borderBottomWidth: 1,
                borderColor: '#eee',
                paddingVertical: 10,
              }}>
              <Text style={{fontSize: 18, color: 'black', fontWeight: '700'}}>
                Status :
              </Text>
              <Text style={{fontSize: 16, color: 'black'}}>add</Text>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          backgroundColor: 'white',
          padding: 10,
          borderRadius: 10,
          marginTop:15,
          elevation: 5,
          // borderBottomLeftRadius: 10,
          // borderBottomEndRadius: 10,
        }}>
        {/* Days */}
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 5,
            alignItems: 'center',
            borderBottomWidth: 1,
            borderColor: '#eee',
            paddingBottom: 10,
            // justifyContent:'space-between'
          }}>
          <Text style={{fontSize: 18, color: 'black', fontWeight: '700'}}>
            Days :
          </Text>
          <Text style={{fontSize: 16, color: 'black'}}>{data?.user_id}</Text>
        </View>
        {/* Balance Amount */}
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 5,
            alignItems: 'center',
            borderBottomWidth: 1,
            borderColor: '#eee',
            paddingVertical: 10,
          }}>
          <Text style={{fontSize: 18, color: 'black', fontWeight: '700'}}>
            Balance Amount :
          </Text>
          <Text style={{fontSize: 16, color: 'black'}}>{data?.user_name}</Text>
        </View>
        {/* Total Amount */}
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 5,
            alignItems: 'center',
            borderBottomWidth: 1,
            borderColor: '#eee',
            paddingVertical: 10,
          }}>
          <Text style={{fontSize: 18, color: 'black', fontWeight: '700'}}>
            Total Amount :
          </Text>
          <Text style={{fontSize: 16, color: 'black'}}>
            {data?.package_name}
          </Text>
        </View>
      </View>
      <View
        style={{
          backgroundColor: 'white',
          padding: 10,
          borderRadius: 10,
          marginTop:15,
          elevation: 5,
          // borderBottomLeftRadius: 10,
          // borderBottomEndRadius: 10,
        }}>
        {/* Payment Method */}
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 5,
            alignItems: 'center',
            borderBottomWidth: 1,
            borderColor: '#eee',
            paddingBottom: 10,
            
          }}>
          <Text style={{fontSize: 18, color: 'black', fontWeight: '700'}}>
            Payment Method :
          </Text>
          <Text style={{fontSize: 16, color: 'black'}}>{data?.user_id}</Text>
        </View>
        {/* Recived By */}
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 5,
            alignItems: 'center',
            borderBottomWidth: 1,
            borderColor: '#eee',
            paddingVertical: 10,
          }}>
          <Text style={{fontSize: 18, color: 'black', fontWeight: '700'}}>
            Recived By :
          </Text>
          <Text style={{fontSize: 16, color: 'black'}}>{data?.user_name}</Text>
        </View>
        {/*  Amount Recived */}
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 5,
            alignItems: 'center',
            borderBottomWidth: 1,
            borderColor: '#eee',
            paddingVertical: 10,
          }}>
          <Text style={{fontSize: 18, color: 'black', fontWeight: '700'}}>
            Amount Recived :
          </Text>
          <Text style={{fontSize: 16, color: 'black'}}>
            {data?.package_name}
          </Text>
        </View>
      </View>
      <View style={{alignItems:'center', marginVertical:40}}>
          <Image source={require('../../Images/ISP.png')} style={{width:80, height:60}} />
      </View>
    </ScrollView>
  );
};

export default TransactionDetails;

const styles = StyleSheet.create({});
