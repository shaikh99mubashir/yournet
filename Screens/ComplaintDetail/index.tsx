import {StyleSheet, Text, View, ScrollView, Image} from 'react-native';
import React, { useEffect, useState } from 'react';
import {Color} from '../../Constants';
import Header from '../../Components/Header';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';

const ComplaintDetail = ({route, navigation}: any) => {
  const data = route.params;
  console.log('data',data);
  

  const [resolvedDateTime, setResolvedDateTime] = useState('')
  const [creationDateTime, setCreationDateTime] = useState('')
const timeAndDate = () => {
if(data?.created_it){
  const dateTimeString: string = data?.created_it;
  const dateTime: Date = new Date(dateTimeString);
  const formattedDate: string = dateTime.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
  const formattedTime: string = dateTime.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
  });
  const creationDateTime: string = `${formattedDate} | ${formattedTime}`;
  setCreationDateTime(creationDateTime)
}

if(data?.resolved_it){
  const resolved_it: string = data?.resolved_it;
  const date: Date = new Date(resolved_it);
  const resolvedformattedDate: string = date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
  const resolvedformattedTime: string = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
  });
  
  const resolvedDateTime: string = `${resolvedformattedDate} | ${resolvedformattedTime}`;
  setResolvedDateTime(resolvedDateTime)
}
}

useEffect(()=>{
  timeAndDate()
},[])
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
        <View style={{paddingHorizontal: 13}}>
          <Header
            navigation={navigation}
            backBtn
            noLogo
            backBtnColor={'white'}
          />
        </View>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 18,
            marginVertical: 10,
            color: Color.white,
            fontWeight: 'bold',
          }}>
          Complaint Details
        </Text>
        <View style={{alignItems: 'center', marginTop:10}}>
          <MaterialIcons name="pending-actions" size={40} color={'white'} />
          {/* <Feather name='check-circle' size={55} color={'white'}/> */}
          <Text style={{color: 'white', marginTop: 10,fontSize:12}}>
            Ticket No: {data.ID}{' '}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              marginTop: 10,
            }}>
            <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>
              {data.Status}
            </Text>
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
          paddingHorizontal: 13,
          paddingVertical: 13,
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
            <FontAwesome name="circle" size={7} color={Color.mainColor} />
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
            <FontAwesome name="circle" size={7} color={Color.mainColor} />
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
            <FontAwesome name="circle" size={7} color={Color.mainColor} />
            <Text style={{color: 'grey', fontSize: 14, fontWeight: '600'}}>
              Address :
            </Text>
          </View>
          <Text style={{color: 'black', fontSize: 14, fontWeight: '600'}}>
            {data?.address.length > 25
                  ? `${data?.address.slice(0, 25)} ...`
                  : data?.address}
          </Text>
        </View>
        {/* Creation Date */}
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
            <FontAwesome name="circle" size={7} color={Color.mainColor} />
            <Text style={{color: 'gray', fontSize: 14, fontWeight: '600'}}>
              Creation Date :
            </Text>
          </View>
          <Text style={{color: 'black', fontSize: 14, fontWeight: '600'}}>
            {data.created_it ? `${data.CreatedDate} | ${data.CreatedTime} ` :''}
          </Text>
        </View>
        {/* Created By */}
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
            <FontAwesome name="circle" size={7} color={Color.mainColor} />
            <Text style={{color: 'gray', fontSize: 14, fontWeight: '600'}}>
              Created By :
            </Text>
          </View>
          <Text style={{color: 'black', fontSize: 14, fontWeight: '600'}}>
            {data.created_by_name ? data.created_by_name : 'Me'}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 6,
            width: '100%',
            overflow: 'hidden',
          }}>
          <Entypo name="dot-single" size={13} color={'grey'} />
          <Entypo name="dot-single" size={13} color={'grey'} />
          <Entypo name="dot-single" size={13} color={'grey'} />
          <Entypo name="dot-single" size={13} color={'grey'} />
          <Entypo name="dot-single" size={13} color={'grey'} />
          <Entypo name="dot-single" size={13} color={'grey'} />
          <Entypo name="dot-single" size={13} color={'grey'} />
          <Entypo name="dot-single" size={13} color={'grey'} />
          <Entypo name="dot-single" size={13} color={'grey'} />
          <Entypo name="dot-single" size={13} color={'grey'} />
          <Entypo name="dot-single" size={13} color={'grey'} />
          <Entypo name="dot-single" size={13} color={'grey'} />
          <Entypo name="dot-single" size={13} color={'grey'} />
          <Entypo name="dot-single" size={13} color={'grey'} />
          <Entypo name="dot-single" size={13} color={'grey'} />
          <Entypo name="dot-single" size={13} color={'grey'} />
          <Entypo name="dot-single" size={13} color={'grey'} />
          <Entypo name="dot-single" size={13} color={'grey'} />
          <Entypo name="dot-single" size={13} color={'grey'} />
          <Entypo name="dot-single" size={13} color={'grey'} />
          <Entypo name="dot-single" size={13} color={'grey'} />
          <Entypo name="dot-single" size={13} color={'grey'} />
          <Entypo name="dot-single" size={13} color={'grey'} />
          <Entypo name="dot-single" size={13} color={'grey'} />
          <Entypo name="dot-single" size={13} color={'grey'} />
          <Entypo name="dot-single" size={13} color={'grey'} />
          <Entypo name="dot-single" size={13} color={'grey'} />
          <Entypo name="dot-single" size={13} color={'grey'} />
        </View>
        {/* Resolved By */}
        <View
          style={{
            // flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            justifyContent: 'center',
            paddingVertical: 10,
          }}>
          <Text
            style={{color: Color.mainColor, fontSize: 16, fontWeight: '600'}}>
            {data.complain_name}
          </Text>
          <Text style={{color: 'black', fontSize: 12}}>{data.description ?data.description.trim():''}</Text>
          {data.Status == 'Resolved' ?
          <>
          <Text style={{color: 'black', fontSize: 14, fontWeight: '600'}}>
          {data.resolved_by_name? `Resolved By : ${data.resolved_by_name}` :'' }
          </Text>
          <Text
            style={{
              color: 'black',
              fontSize: 14,
              fontWeight: '600',
              marginTop: -10,
            }}>
            {data.Status == 'Resolved' ? `${data.ResolvedDate} | ${data.ResolvedTime} ` :''}
          </Text>
          </>
          :''}
        </View>
      </View>
      <View style={{marginBottom: 20}}></View>
    </ScrollView>
  );
};

export default ComplaintDetail;

const styles = StyleSheet.create({});
