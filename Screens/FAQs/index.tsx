import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../../Components/Header'
import { Color } from '../../Constants'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const FAQs = ({navigation}:any) => {
  return (
    <View style={{paddingHorizontal:15}}>
        
        <Header navigation={navigation} backBtn noLogo />
        <Text
          style={{
            textAlign: 'center',
            fontSize: 22,
            marginVertical: 10,
            color: Color.mainColor,
            fontWeight: 'bold',
          }}>
          FAQs
        </Text>
        <View style={{flexDirection:'row', alignItems:'center', gap:10}}>
        <FontAwesome name="circle" size={10} color={Color.mainColor} />
        <Text style={{color:'black', fontSize:20, fontWeight:'600'}}>Hello World ksdbfkjbdsf idsbf sd f sdbfk sdf sdkf sd f</Text>
        </View>
    </View>
  )
}

export default FAQs

const styles = StyleSheet.create({})