import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet,ToastAndroid,Image} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {Color} from '../../Constants';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Share from 'react-native-share';
function CustomDrawerContent(props: any) {
  const navigateToScreen = (screenName: any) => {
    props.navigation.navigate(screenName);
  };

  const share = async () => {
    console.log('running share');

    const options = {
      message:
        'Internet service Provider',
      url: 'https://yournet.com',
      email: 'mubashir@gmail.com',
      subject: 'Eiusmod esse veniam esse.',
      recipient: '919988998899',
    };

    try {
      const res = await Share.open(options);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  const ShowMessage = () => {
    ToastAndroid.show('This Feature will Soon Avaiable !', ToastAndroid.SHORT);
  }
  return (
    <View style={{flex: 1, backgroundColor: Color.white}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.drawerContent}>
        <View>
          {/* Your custom drawer content here */}
          {/* Logout And Close Button */}
          <View style={styles.closeButtonContainer}>
            <TouchableOpacity
              style={{
                backgroundColor: '#eee',
                paddingVertical: 5,
                paddingHorizontal: 10,
                borderRadius: 10,
              }}>
              <Text style={styles.closeButton}>Log Out</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
              {/* <Text
                style={[
                  styles.closeButton,
                  {fontWeight: 'bold', fontSize: 18},
                ]}>
                X
              </Text> */}
              <Icon name="ios-arrow-back-sharp" size={27} color="black" />
            </TouchableOpacity>
          </View>
          {/* Name Profile And setting */}
          <LinearGradient
            colors={['#FFC0CB', '#ADD8E6']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            locations={[0.25, 0.75]}
            angle={45}
            style={{
              marginHorizontal: 10,
              padding: 10,
              borderRadius: 10,
              alignItems: 'center',
              marginVertical: 20,
            }}>
            <View
              style={{
                backgroundColor: Color.white,
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 50,
                marginVertical: 10,
              }}>
              <Text style={{fontSize: 30, color: Color.textColor}}>S</Text>
            </View>
            <Text style={{fontSize: 20, color: Color.textColor}}>
              Shaikh Mubashir
            </Text>
            <Text style={{fontSize: 20, color: Color.textColor}}>8513131</Text>
            <View style={{flexDirection: 'row', gap: 30, marginVertical: 20}}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigateToScreen('Profile')}
                style={{
                  backgroundColor: Color.white,
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  borderRadius: 10,
                }}>
                <Text style={{fontSize: 15, color: Color.textColor}}>
                  Profile
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
              activeOpacity={0.8}
                // onPress={() => navigateToScreen('Settings')}
                onPress={ShowMessage}
                style={{
                  backgroundColor: Color.white,
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  borderRadius: 10,
                }}>
                <Text style={{fontSize: 15, color: Color.textColor}}>
                  Setting
                </Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
          {/* Customer Support Fee Detail sharq FAQS */}
          <View
            style={{
              marginHorizontal: 10,
              paddingHorizontal:10,
              paddingVertical:20,
              borderRadius: 10,
              marginBottom: 10,
              backgroundColor: '#eee',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}>
              <View style={{}}>
                <TouchableOpacity
                  // onPress={() => navigateToScreen('CustomerSupport')}
                  onPress={ShowMessage}
                  style={{
                    backgroundColor: Color.white,
                    padding: 10,
                    borderRadius: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                    width: 130,
                    height: 60,
                  }}>
                  <AntDesign name="customerservice" color="black" size={25} />
                  <Text style={{color: Color.textColor}}> Customer {'\n'} Support</Text>
                </TouchableOpacity>
              </View>
              <View style={{justifyContent: 'center'}}>
                <TouchableOpacity
                  // onPress={() => navigateToScreen('FeeDetails')}
                  onPress={ShowMessage}
                  style={{
                    backgroundColor: Color.white,
                    padding: 10,
                    borderRadius: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                    width: 130,
                    height: 60,
                  }}>
                  <Image source={require('../../Images/fees.png')} style={{width:25, height:25}} resizeMode='contain'/>
                  <Text style={{color:Color.textColor}}> Fee Details</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <View style={{}}>
                <TouchableOpacity
                  // onPress={() => navigateToScreen('FAQs')}
                  onPress={ShowMessage}
                  style={{
                    backgroundColor: Color.white,
                    padding: 10,
                    borderRadius: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                    width: 130,
                    height: 60,
                  }}>
                  <Image source={require('../../Images/faq.png')} style={{width:25, height:25}} resizeMode='contain'/>
                  <Text style={{color:Color.textColor}}> FAQs</Text>
                </TouchableOpacity>
              </View>
              <View style={{justifyContent: 'center'}}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => share()}
                  style={{
                    backgroundColor: Color.white,
                    padding: 10,
                    borderRadius: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                    width: 130,
                    height: 60,
                  }}>
                  <Image source={require('../../Images/share.png')} style={{width:25, height:25}} resizeMode='contain'/>
                  <Text> Share</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Transaction History And Package plans */}
          <View
            style={{
              marginHorizontal: 10,
              paddingHorizontal:10,
              paddingVertical:20,
              borderRadius: 10,
              marginBottom: 10,
              backgroundColor: '#eee',
            }}>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <View style={{}}>
                <TouchableOpacity
                  // onPress={() => navigateToScreen('TransactionHistory')}
                  onPress={ShowMessage}
                  style={{
                    backgroundColor: Color.white,
                    padding: 10,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems:'center',
                    gap: 10,
                    width: 130,
                    height: 120,
                  }}>
                  <Image source={require('../../Images/transactionhistory.png')} style={{width:35, height:35}} resizeMode='contain'/>
                  <Text style={{color:Color.textColor}}> Transaction {'\n'} History</Text>
                </TouchableOpacity>
              </View>
              <View style={{justifyContent: 'center'}}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  // onPress={() => navigateToScreen('PackagesPlans')}
                  onPress={ShowMessage}
                  style={{
                    backgroundColor: Color.white,
                    padding: 10,
                    borderRadius: 10,
                    justifyContent: 'center',
                    
                    alignItems: 'center',
                    gap: 10,
                    width: 130,
                    height: 120,
                  }}>
                  <MaterialIcons name="next-plan" color="black" size={35} />
                  <Text style={{color:Color.textColor}}> Packages {'\n'} Plans</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{flexDirection:'row', justifyContent:'center'}}>
          <Text style={{textAlign:'center'}}>ISP Billing Version 1.001 </Text>
          <TouchableOpacity 
          onPress={ShowMessage}
          // onPress={() => navigateToScreen('TermsCondition')}
          ><Text style={{color:'blue'}}>Terms & Condition</Text></TouchableOpacity>
          </View>
        </View>

        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  drawer: {
    width: '100%',
  },
  drawerContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  closeButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  closeButton: {
    color: 'black',
    fontSize: 15,
  },
});
export default CustomDrawerContent;
