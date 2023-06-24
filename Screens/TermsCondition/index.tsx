import { StyleSheet, Text, View,ScrollView } from 'react-native'
import React from 'react'
import Header from '../../Components/Header'
import { Color } from '../../Constants'
import { useSelector } from 'react-redux'

const TermsCondition = ({navigation}:any) => {
  const termAndCondition: any = useSelector(termAndCondition => termAndCondition);
  const gettermAndCondition = termAndCondition?.user?.termAndCondition;
  console.log('gettermAndCondition',gettermAndCondition);
  return (
    <View
    style={{
      backgroundColor: Color.white,
      height: '100%',
      paddingHorizontal: 15,
    }}>
      <ScrollView>
    <Header backBtn navigation={navigation} noLogo />
    <Text
        style={{
          textAlign: 'center',
          fontSize: 22,
          marginVertical: 10,
          color: Color.mainColor,
          fontWeight: 'bold',
        }}>
        Terms Condition
      </Text>
      <Text style={{color:'black', fontSize:14,textAlign:'justify'}}>
        {gettermAndCondition}
      </Text>
      </ScrollView>
    </View>
  )
}

export default TermsCondition

const styles = StyleSheet.create({})