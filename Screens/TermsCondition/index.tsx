import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import Header from '../../Components/Header';
import {Color} from '../../Constants';
import {useSelector} from 'react-redux';
import HTML from 'react-native-render-html';
const TermsCondition = ({navigation}: any) => {
  // const termAndCondition: any = useSelector(termAndCondition => termAndCondition);
  const cartData: any = useSelector(cartData => cartData);
  const gettermAndCondition = cartData?.user?.cart?.termsandconditions;
  // console.log('gettermAndCondition',cartData?.user?.cart?.termsandconditions);
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
        {/* <Text style={{color:'black', fontSize:14,textAlign:'justify'}}>
        {gettermAndCondition}
      </Text> */}
        <HTML
          source={{html: gettermAndCondition}}
          ignoredDomTags={['o:p']}
          contentWidth={300} // Set the content width as per your design
          baseStyle={{
            // textAlign: 'justify',
            // fontSize: 14,
            // color: Color.textColor,
            color: 'black',
          }}
        />
      </ScrollView>
    </View>
  );
};

export default TermsCondition;

const styles = StyleSheet.create({});
