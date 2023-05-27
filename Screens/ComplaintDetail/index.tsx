import { StyleSheet, Text, View ,ScrollView, Image} from 'react-native'
import React from 'react'
import { Color } from '../../Constants';
import Header from '../../Components/Header';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';

const ComplaintDetail = ({route, navigation}:any) => {
    const data = route.params
    console.log('daat========>',data);
    
    return (
        <ScrollView
      style={{paddingTop: 0, paddingHorizontal: 0 ,}}
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
        <Header navigation={navigation} backBtn noLogo backBtnColor={'white'} />
          </View>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 22,
            marginVertical: 10,
            color: Color.white,
            fontWeight: 'bold',
          }}>
          Complaint Details
        </Text>
        <View style={{alignItems: 'center'}}>
          <MaterialIcons
            name="pending-actions"
            size={55}
            color={'white'}
          />
          {/* <Feather name='check-circle' size={55} color={'white'}/> */}
          <Text style={{color: 'white', marginTop: 10}}>Ticket No: {data.ID} </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              marginTop: 20,
            }}>
            <Text style={{color: 'white', fontSize: 30, fontWeight: 'bold'}}>
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
            {data.address}
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
            <FontAwesome name="circle" size={10} color={Color.mainColor} />
            <Text style={{color: 'black', fontSize: 16, fontWeight: '600'}}>
              Creation Date
            </Text>
          </View>
          <Text style={{color: 'black', fontSize: 16, fontWeight: '600'}}>
            12 May 2022 | 20:56
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
            <FontAwesome name="circle" size={10} color={Color.mainColor} />
            <Text style={{color: 'black', fontSize: 16, fontWeight: '600'}}>
              Created By :
            </Text>
          </View>
          <Text style={{color: 'black', fontSize: 16, fontWeight: '600'}}>
            {data.created_by_name} me
          </Text>
        </View>
        <View style={{flexDirection:"row", marginTop:6, width:'100%', overflow:'hidden'}}>
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
        {/* Resolved By */}
        <View
          style={{
            // flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            justifyContent:'center',
            paddingVertical: 10,
          }}>
          <Text style={{color: Color.mainColor, fontSize: 22, fontWeight: '600'}}>
            {data.complain_name}
          </Text>
          <Text style={{color: 'black', fontSize: 16, }}>
            {data.description}
          </Text>
          <Text style={{color: 'black', fontSize: 14, fontWeight: '600', }}>
            {/* {data.resolvedby_name} */}
            Resolved By : Sufiyan
          </Text>
          <Text style={{color: 'black', fontSize: 14, fontWeight: '600',marginTop:-10 }}>
            {/* {data.resolvedby_name} */}
             20 may 2023 | 25:65
          </Text>
        </View>
      </View>
      <View style={{marginBottom:20}}></View>
    </ScrollView>
  )
}

export default ComplaintDetail

const styles = StyleSheet.create({})