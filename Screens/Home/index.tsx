import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react'

const Home = ({navigation}:any) => {
  return (
    <View>
      <Text style={{color:'black'}}>Home</Text>
      <TouchableOpacity onPress={()=> navigation.navigate('SplashScreen')}><Text style={{fontFamily:'Poppins-Medium',fontSize:15}}>Go To Splash</Text></TouchableOpacity>
      <FontAwesome name="pagelines" size={30} color="black" />
      <Icon name="md-chevron-back" size={30} color="black" />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})