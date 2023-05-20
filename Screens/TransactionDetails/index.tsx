import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Header from '../../Components/Header';
import { Color } from '../../Constants';

const TransactionDetails = ({navigation, route}:any) => {
    const data :any = route.params
    console.log('data',data);
    
    return (
        <View style={{paddingTop: 10, paddingHorizontal: 10}}>
        
          <Header navigation={navigation} backBtn />
          <Text
            style={{
              textAlign: 'center',
              fontSize: 22,
              marginVertical: 10,
              color: Color.textColor,
              fontWeight: 'bold',
            }}>
            Transaction Details
          </Text>
      <View style={{marginTop: 10}}>
        <View
          style={{
            display: 'flex',
            elevation: 20,
            flexDirection: 'column',
            borderRadius: 30,
          }}>
          <View
            style={{
              backgroundColor: '#c7c7c7',
              padding: 10,
              borderTopLeftRadius: 30,
              borderTopEndRadius: 30,
            }}>
            <View style={{flexDirection: 'column'}}>
              <MaterialIcons name="support-agent" size={22} color="#fff" />
              <Text style={{fontSize: 18, color: 'black', fontWeight: '700'}}>
            {data?.user_name}
              </Text>
              <Text style={{color: 'gray', fontSize: 14}}>{data?.user_id}</Text>
            </View>
          </View>
          <View
            style={{
              backgroundColor: 'white',
              padding: 10,
              borderBottomLeftRadius: 30,
              borderBottomEndRadius: 30,
            }}>
            <View style={{gap: 10}}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 5,
                  alignItems: 'center',
                }}>
                <View>
                  <MaterialIcons name="support-agent" size={22} color="black" />
                </View>
                <View>
                  <Text style={{fontSize: 14, color: 'gray'}}>
                    Cheque Status
                  </Text>
                  <Text
                    style={{fontSize: 20, fontWeight: '700', color: 'black'}}>
                    Cleared
                  </Text>
                </View>
              </View>

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 5,
                  alignItems: 'center',
                }}>
                <View>
                  <MaterialIcons name="support-agent" size={22} color="black" />
                </View>
                <View>
                  <Text style={{fontSize: 14, color: 'gray'}}>
                    Cheque Number
                  </Text>
                  <Text
                    style={{fontSize: 20, fontWeight: '700', color: 'black'}}>
                    79297
                  </Text>
                </View>
              </View>

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 5,
                  alignItems: 'center',
                }}>
                <View>
                  <MaterialIcons name="support-agent" size={22} color="black" />
                </View>
                <View>
                  <Text style={{fontSize: 14, color: 'gray'}}>date</Text>
                  <Text
                    style={{fontSize: 20, fontWeight: '700', color: 'black'}}>
                    May 02, 2023
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        </View>
    </View>
  )
}

export default TransactionDetails

const styles = StyleSheet.create({})