import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Header from '../../Components/Header'
import { Color } from '../../Constants'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
const FAQs = ({navigation}:any) => {
  const [open, setOpen] = useState(false)
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
        <TouchableOpacity onPress={()=> setOpen(!open) } style={{flexDirection:'row', alignItems:'center', gap:10, }}>
          <View style={{width:'85%', flexDirection:'row', alignItems:'center', gap:10}}>
        <FontAwesome name="circle" size={10} color={Color.mainColor} />
        <Text style={{color:'black', fontSize:20, fontWeight:'600'}}>Hello World ksdbf kjbds fdfs</Text>
          </View>
          {open ? (
                    <Ionicons name="chevron-up-sharp" size={20} color="black" />
                  ) : (
                    <Ionicons
                      name="chevron-down-sharp"
                      size={20}
                      color="black"
                    />
                  )}
        </TouchableOpacity>
                  {open ? <Text style={{color:'black', fontSize:16}}>sgfdgdfgdfg sf gds sd fsd f sdg sfd g sffg sd f sdg sd g sfg sd f gs dfg sfd g sdfg  sfg df sd f</Text> : ''}
    </View>
  )
}

export default FAQs

const styles = StyleSheet.create({})