import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Color from '../../Constants/Color';
export type Props = {
  navigation: any;
};

const Header = (Props: any) => {
  let {
    navigation,
    user,
    Drawer,
    backBtn,
    Notification,
    title,
    noSignUp,
    noLogo,
    myStyle,
  } = Props;

  return (
    <View
      style={{
        backgroundColor: 'rgba(52, 52, 52, 0.0)',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
        marginTop:10
      }}>
        <>
          {Drawer ? (
            <TouchableOpacity
              style={{
                flex: 1,
              }}
              activeOpacity={0.8}
              onPress={() => navigation.openDrawer()}>
              <Text>
                <Icon name="reorder-three" size={30} color="black" />
              </Text>
            </TouchableOpacity>
          ) :  (
            <View
              style={{
                flex: 1,
              }}></View>
          )}

          {title ? (
            <View style={{flex: 2, alignItems: 'center'}}>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontSize: 20,
                  color: Color.mainColor,
                  marginVertical: 15,
                  fontWeight: 'bold',
                }}>
                {title}
              </Text>
            </View>
          ) : noLogo ? (
            <View style={{flex: 2}}></View>
          ) : (
            <View style={{flex: 2}}>
              <Image
                source={require('../../Images/Logo.png')}
                resizeMode="contain"
                style={styles.logo}
              />
            </View>
          )}
          {Notification ? (
            <TouchableOpacity
              style={{flex: 1, alignItems: 'flex-end', ...myStyle}}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('Notification')}>
              <FontAwesome name="bell" size={25} color="black" />
            </TouchableOpacity>
          ) : backBtn ? (
            <TouchableOpacity
              style={{
              }}
              onPress={() => navigation.goBack()}>
              
                <Icon name="ios-arrow-back-sharp" size={27} color="black" />
              
            </TouchableOpacity>
          ) : (
            <View style={{flex: 1}}>
              <Text></Text>
            </View>
          )}
        </>
      
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  button: {
    height: Dimensions.get('window').height / 12,
    width: Dimensions.get('window').width / 5,
  },
  icon: {
    height: Dimensions.get('window').height / 16,
    width: Dimensions.get('window').width / 16,
  },
  logo: {
    // height: Dimensions.get('window').height / 12,
    width: Dimensions.get('window').width / 2,
    height:40
  },
});
