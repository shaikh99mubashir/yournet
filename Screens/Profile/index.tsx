import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../Components/Header';
import {Color} from '../../Constants';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BaseUrl} from '../../Constants/BaseUrl';
import {useDispatch, useSelector} from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { nickname } from '../../Redux/Reducer/Reducers';
const Profile = ({navigation}:any) => {
  const [editNickName, setEditNickName] = useState<boolean>(false);
  const [nickName, setNickName] = useState<any>('');
  const [getUserData, setUserData] = useState<any>([]);
  const [companyName, setCompanyName] = useState<any>('')  
  const focus = useIsFocused()
  const cartData: any = useSelector(cartData => cartData);
  const dispatch = useDispatch()
  useEffect(()=>{
    setUserData(cartData?.user?.cart?.customer);
    setCompanyName(cartData?.user?.cart?.company?.com_name)
  },[cartData,focus])

  const handelNickName = () =>{
    setEditNickName(!editNickName)
    AsyncStorage.setItem('nickName', JSON.stringify(nickName))
    .then(() => 
    console.log('nickName fields saved')
    )
    .catch(error => console.log('Error saving nickName fields: ', error));
  }

    const userNickName: any = useSelector(userNickName => userNickName);
    AsyncStorage.getItem('nickName')
    .then(value => {
      if (value !== null) {
       let myNickName = JSON.parse(value);
       console.log('myNickName',myNickName);
       
       dispatch(nickname(myNickName));
      } else {
        console.log('No user_id found');
      }
    })
    .catch(error => console.log('Error retrieving login fields: ', error));

  return (
    <View style={{paddingHorizontal: 15}}>
    <ScrollView
      showsVerticalScrollIndicator={false}>
      <Header navigation={navigation}  backBtn noLogo/>
      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          marginTop: 15,
          color: Color.mainColor,
          textAlign: 'center',
        }}>
        Profile
      </Text>
      <Text style={{fontSize: 14, marginTop: 15, color: Color.textColor}}>
      Profile Details
      </Text>
      
      {/* userName */}
      {/* <View
        style={{
          backgroundColor: Color.white,
          elevation: 2,
          padding: 10,
          borderRadius: 10,
          marginBottom: 15,
          marginTop:10
        }}>
        <Text
          style={{color: Color.textColor, fontWeight: 'bold', fontSize: 14}}>
          User Name
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <Text
            style={{
              color: Color.textColor,
              fontWeight: 'bold',
              fontSize: 16,
            }}>
            {getUserData?.first_name}
          </Text>
        </View>
      </View> */}
            
      {/*  Nick Name*/}
      <View
          style={{
            backgroundColor: Color.white,
            elevation: 2,
            padding: 10,
            borderRadius: 10,
            marginVertical: 15,
          }}>
          <Text
            style={{color: Color.textColor, fontWeight: 'bold', fontSize: 14}}>
            Nick Name
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 10,
            }}>
            {editNickName ? (
              <TextInput
                placeholder="Edit Your Nick Name"
                onChangeText={e => setNickName(e)}
                placeholderTextColor={Color.textColor}
                style={{color: Color.textColor, width: '60%'}}
              />
            ) : (
              <Text
                style={{
                  color: Color.textColor,
                  fontWeight: 'bold',
                  fontSize: 16,
                  width: '80%',
                }}>
                {userNickName?.user?.userNickName ? userNickName?.user?.userNickName : getUserData?.first_name}
              </Text>
            )}
            <TouchableOpacity onPress={() => handelNickName()} style={{width:'20%',paddingVertical:5, alignItems:"flex-end"}}>
              <FontAwesome
                name={editNickName ? 'save' : 'edit'}
                size={20}
                color={Color.textColor}
              />
            </TouchableOpacity>
          </View>
        </View>
      {/* Login | Customer ID */}
      <View
        style={{
          backgroundColor: Color.white,
          elevation: 2,
          padding: 10,
          borderRadius: 10,
          marginBottom: 15,
          // marginTop:10
        }}>
        <Text
          style={{color: Color.textColor, fontWeight: 'bold', fontSize: 14}}>
          Login | Customer ID
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <Text
            style={{
              color: Color.textColor,
              fontWeight: 'bold',
              fontSize: 16,
            }}>
            {getUserData?.customer_id}
          </Text>
        </View>
      </View>
      {/* Mobile No */}
      <View
        style={{
          backgroundColor: Color.white,
          elevation: 2,
          padding: 10,
          borderRadius: 10,
          marginBottom: 15,
        }}>
        <Text
          style={{color: Color.textColor, fontWeight: 'bold', fontSize: 14}}>
          Mobile Number
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <Text
            style={{
              color: Color.textColor,
              fontWeight: 'bold',
              fontSize: 16,
            }}>
            {getUserData?.mobile_number}
          </Text>
        </View>
      </View>


 {/* E-mail */}
 {getUserData?.email_address &&
      <View
        style={{
          backgroundColor: Color.white,
          elevation: 2,
          padding: 10,
          borderRadius: 10,
          marginBottom: 15,
        }}>
        <Text
          style={{color: Color.textColor, fontWeight: 'bold', fontSize: 14}}>
          Email
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <Text
            style={{
              color: Color.textColor,
              fontWeight: 'bold',
              fontSize: 16,
            }}>
            {getUserData?.email_address}
          </Text>
        </View>
      </View>
      }
      {/* Address */}
      
      <View
        style={{
          backgroundColor: Color.white,
          elevation: 2,
          padding: 10,
          borderRadius: 10,
          marginBottom: 15,
        }}>
        <Text
          style={{color: Color.textColor, fontWeight: 'bold', fontSize: 14}}>
          Address
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <Text
            style={{
              color: Color.textColor,
              fontWeight: 'bold',
              fontSize: 16,
            }}>
            {getUserData?.FullAddress}
          </Text>
        </View>
      </View>
     
      {/* Account Opening Date */}
      {/* <View
        style={{
          backgroundColor: Color.white,
          elevation: 2,
          padding: 10,
          borderRadius: 10,
          marginBottom: 15,
        }}>
        <Text
          style={{color: Color.textColor, fontWeight: 'bold', fontSize: 14}}>
          Account Opening Date
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <Text
            style={{
              color: Color.textColor,
              fontWeight: 'bold',
              fontSize: 16,
            }}>
            {getUserData?.created_at}
          </Text>
        </View>
      </View> */}
      {/* Service Provider */}
      {/* <View
        style={{
          backgroundColor: Color.white,
          elevation: 2,
          padding: 10,
          borderRadius: 10,
          marginBottom: 15,
        }}>
        <Text
          style={{color: Color.textColor, fontWeight: 'bold', fontSize: 14}}>
          Service Provider
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <Text
            style={{
              color: Color.textColor,
              fontWeight: 'bold',
              fontSize: 16,
            }}>
            {companyName}
          </Text>
        </View>
      </View> */}
    </ScrollView>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});

