import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ToastAndroid
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {Color} from '../../Constants';
import Header from '../../Components/Header';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {contactData,trackComplaint} from '../../Redux/Reducer/Reducers';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { BaseUrl } from '../../Constants/BaseUrl';

const Help = ({navigation}: any) => {
  const focus = useIsFocused()
  const dispatch = useDispatch();
  const [company_id,setCompany_id] = useState([])
  const [customer_id,setCustomer_id] = useState([])
  
  const cartData: any = useSelector(cartData => cartData);
  // console.log(company_id,'company_id===>');
  // console.log(customer_id,'customer_id===>');
  
  
  useEffect(() => {
    setCompany_id(cartData?.user?.cart?.customer?.company_id);
    setCustomer_id(cartData?.user?.cart?.customer?.customer_id);
  }, [cartData, focus]);



    const trackYourComplaint = () => {
      const formData = new FormData();
    formData.append('customer_id', customer_id);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    axios
      .post(`${BaseUrl}getAllComplain`, formData, config)
      .then(({data}: any) => {
        // console.log('data',data);
        
        dispatch(trackComplaint(data.complaints))  
      })
      .catch(error => {
        console.error('Error in Track Complaint:', error);
        ToastAndroid.show('Internal Server Error in Track Complaint', ToastAndroid.BOTTOM);
      });
    }
 
    useEffect(()=>{
      trackYourComplaint()
    },[focus,customer_id])

    // const getContacts = () => {
    //   const formData = new FormData();
    //   formData.append('company_id', company_id);
    //   const config = {
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   };
    //   axios
    //   .post(`${BaseUrl}getContactNumbersByCompanyId`, formData, config)
    //   .then(({data}: any) => {
    //     dispatch(contactData(data.companycontacts));
    //     })
    //     .catch(error => {
    //       ToastAndroid.show('Internal Server Error', ToastAndroid.BOTTOM);
    //     });
    //   };   // useEffect(()=>{
        //   getContacts()
        // },[focus,company_id])
  return (
    <ScrollView
    showsVerticalScrollIndicator={true}
      style={{
        backgroundColor: Color.white,
        height: '100%',
        paddingHorizontal: 15,
      }}>
      <Header navigation={navigation} backBtn noLogo />
      <Text
          style={{
            textAlign: 'center',
            fontSize: 18,
            marginVertical: 10,
            color: Color.mainColor,
            fontWeight: 'bold',
          }}>
          Help & Customer Support
        </Text>
      <View
        style={{
          alignItems: 'center',
          marginTop: 20,
        }}>
        <AntDesign name="customerservice" size={60} color={Color.mainColor} />
      </View>

      <View style={{alignItems: 'center', marginTop: 40}}>
        <Text style={{color: Color.textColor, fontSize: 20, fontWeight: '600'}}>
          How Can We Help You?
        </Text>
        <Text
          style={{color: Color.textColor, fontWeight: '300', marginTop: 10,fontSize: 14,}}>
          Kindly choose one from the options below.
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('Complaint')}
        activeOpacity={0.8}
        style={{
          marginTop: 30,
          borderBottomWidth: 1,
          borderColor: Color.textColor,
          paddingHorizontal: 10,
          paddingVertical: 20,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            flexDirection: 'row',
            gap: 15,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Ionicons name="add-circle" size={20} color={Color.mainColor} />
          <Text style={{color: 'black', fontSize: 14, fontWeight: '500'}}>
            Register New Complaint
          </Text>
        </View>
        <View style={{marginTop:3}}>
        <AntDesign name="right" size={15} color={Color.textColor} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('TrackYourComplaint')}
        activeOpacity={0.8}
        style={{
          marginTop: 15,
          borderBottomWidth: 1,
          borderColor: Color.textColor,
          paddingHorizontal: 10,
          paddingVertical: 20,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <View
          style={{
            flexDirection: 'row',
            gap: 15,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <MaterialCommunityIcons name="timeline-clock" size={20} color={Color.mainColor} />
          <Text style={{color: 'black', fontSize: 14, fontWeight: '500'}}>
          Track Your Complaint
          </Text>
        </View>
        <View style={{marginTop:3}}>
        <AntDesign name="right" size={15} color={Color.textColor} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Contact')}
        activeOpacity={0.8}
        style={{
          marginTop: 15,
          borderBottomWidth: 1,
          borderColor: Color.textColor,
          paddingHorizontal: 10,
          paddingVertical: 20,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            flexDirection: 'row',
            gap: 15,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <FontAwesome name="phone" size={20} color={Color.mainColor} />
          <Text style={{color: 'black', fontSize: 14, fontWeight: '500'}}>
          Contact Your ISP
          </Text>
        </View>
        <View style={{marginTop:3}}>
        <AntDesign name="right" size={15} color={Color.textColor} />
        </View>
      </TouchableOpacity>
      <View style={{marginBottom:50}}></View>
    </ScrollView>
  );
};

export default Help;

const styles = StyleSheet.create({});
