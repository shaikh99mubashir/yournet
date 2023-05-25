import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Header from '../../Components/Header';
import {Color} from '../../Constants';
import LinearGradient from 'react-native-linear-gradient';

const TransactionDetails = ({navigation, route}: any) => {
  const data: any = route.params;
  console.log('data===>', data);

  return (
    <View style={{paddingTop: 10, paddingHorizontal: 15}}>
      <Header navigation={navigation} backBtn noLogo />

      <View style={{marginTop: 10}}>
        <View
          style={{
            display: 'flex',
            elevation: 20,
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
              {/* <MaterialIcons name="support-agent" size={22} color="#fff" /> */}
              {/* <Text style={{fontSize: 18, color: 'black', fontWeight: '700'}}>
            {data?.user_name}
          </Text> */}
              {/* <Text style={{color: 'gray', fontSize: 14}}>{data?.user_id}</Text> */}
            </View>
          </LinearGradient>
          {/* </View> */}
          <View
            style={{
              backgroundColor: 'white',
              padding: 10,
              borderBottomLeftRadius: 30,
              borderBottomEndRadius: 30,
            }}>
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
              <Text style={{fontSize: 20, color: 'black', fontWeight: '700'}}>
                Customer ID :
              </Text>
              <Text style={{fontSize: 16, color: 'black'}}>
                {data?.user_id}
              </Text>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 5,
                alignItems: 'center',
                borderBottomWidth: 1,
                borderColor: '#eee',
                paddingVertical: 10,
                // justifyContent:'space-between'
              }}>
              <Text style={{fontSize: 20, color: 'black', fontWeight: '700'}}>
                Customer Name :
              </Text>
              <Text style={{fontSize: 16, color: 'black'}}>
                {data?.user_name}
              </Text>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 5,
                alignItems: 'center',
                borderBottomWidth: 1,
                borderColor: '#eee',
                paddingVertical: 10,
                // justifyContent:'space-between'
              }}>
              <Text style={{fontSize: 20, color: 'black', fontWeight: '700'}}>
                Package :
              </Text>
              <Text style={{fontSize: 16, color: 'black'}}>
                {data?.package_name}
              </Text>
            </View>
            
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 5,
                alignItems: 'center',
                borderBottomWidth: 1,
                borderColor: '#eee',
                paddingVertical: 10,
                // justifyContent:'space-between'
              }}>
              <Text style={{fontSize: 20, color: 'black', fontWeight: '700'}}>
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
                // justifyContent:'space-between'
              }}>
              <Text style={{fontSize: 20, color: 'black', fontWeight: '700'}}>
                Status :
              </Text>
              <Text style={{fontSize: 16, color: 'black'}}>add</Text>
            </View>
          </View>
        </View>
      </View>
      {/* invoice  dis */}
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 5,
          alignItems: 'center',
          borderBottomWidth: 1,
          borderColor: '#eee',
          paddingVertical: 10,
          // justifyContent:'space-between'
        }}>
        <Text style={{fontSize: 20, color: 'black', fontWeight: '700'}}>
          Total Amount :
        </Text>
        <Text style={{fontSize: 16, color: 'black'}}>
          {data?.invoice_discount}
        </Text>
      </View>
      {/* days */}
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 5,
          alignItems: 'center',
          borderBottomWidth: 1,
          borderColor: '#eee',
          paddingVertical: 10,
          // justifyContent:'space-between'
        }}>
        <Text style={{fontSize: 20, color: 'black', fontWeight: '700'}}>
          Days :
        </Text>
        <Text style={{fontSize: 16, color: 'black'}}>{data?.total_days}</Text>
      </View>
      

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 5,
          alignItems: 'center',
          borderBottomWidth: 1,
          borderColor: '#eee',
          paddingVertical: 10,
          // justifyContent:'space-between'
        }}>
        <Text style={{fontSize: 20, color: 'black', fontWeight: '700'}}>
          Payment Method :
        </Text>
        <Text style={{fontSize: 16, color: 'black'}}>dfdsf</Text>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 5,
          alignItems: 'center',
          borderBottomWidth: 1,
          borderColor: '#eee',
          paddingVertical: 10,
          // justifyContent:'space-between'
        }}>
        <Text style={{fontSize: 20, color: 'black', fontWeight: '700'}}>
          Recive By :
        </Text>
        <Text style={{fontSize: 16, color: 'black'}}>name</Text>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 5,
          alignItems: 'center',
          borderBottomWidth: 1,
          borderColor: '#eee',
          paddingVertical: 10,
          // justifyContent:'space-between'
        }}>
        <Text style={{fontSize: 20, color: 'black', fontWeight: '700'}}>
          Balance :
        </Text>
        <Text style={{fontSize: 16, color: 'black'}}>6262</Text>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 5,
          alignItems: 'center',
          borderBottomWidth: 1,
          borderColor: '#eee',
          paddingVertical: 10,
          // justifyContent:'space-between'
        }}>
        <Text style={{fontSize: 20, color: 'black', fontWeight: '700'}}>
          Recipt :
        </Text>
        <Text style={{fontSize: 16, color: 'black'}}>6262611</Text>
      </View>
    </View>
  );
};

export default TransactionDetails;

const styles = StyleSheet.create({});
