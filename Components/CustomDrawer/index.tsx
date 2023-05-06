import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {Color} from '../../Constants';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
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
        'Deserunt ea sint magna dolor incididunt sit culpa id laborum cupidatat commodo do sint.',
      url: 'https://mubashir.co.in',
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
              <Text
                style={[
                  styles.closeButton,
                  {fontWeight: 'bold', fontSize: 18},
                ]}>
                X
              </Text>
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
                onPress={() => navigateToScreen('Settings')}
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
                  onPress={() => navigateToScreen('CustomerSupport')}
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
                  <Text> Customer {'\n'} Support</Text>
                </TouchableOpacity>
              </View>
              <View style={{justifyContent: 'center'}}>
                <TouchableOpacity
                  onPress={() => navigateToScreen('FeeDetails')}
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
                  <AntDesign name="carryout" color="black" size={25} />
                  <Text> Fee Details</Text>
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
                  onPress={() => navigateToScreen('FAQs')}
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
                  <Feather name="help-circle" color="black" size={25} />
                  <Text> FAQs</Text>
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
                  <AntDesign name="sharealt" color="black" size={25} />
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
                  onPress={() => navigateToScreen('TransactionHistory')}
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
                  <MaterialIcons name="history" color="black" size={35} />
                  <Text> Transaction {'\n'} History</Text>
                </TouchableOpacity>
              </View>
              <View style={{justifyContent: 'center'}}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => navigateToScreen('PackagesPlans')}
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
                  <Text> Packages {'\n'} Plans</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{flexDirection:'row', justifyContent:'center'}}>
          <Text style={{textAlign:'center'}}>ISP Billing Version 1.001 </Text>
          <TouchableOpacity onPress={() => navigateToScreen('TermsCondition')}><Text style={{color:'blue'}}>Terms & Condition</Text></TouchableOpacity>
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

// import {
//     StyleSheet,
//     Text,
//     View,
//     ImageBackground,
//     Image,
//     Dimensions,
//     TouchableOpacity,
//     Modal,
//   } from 'react-native';
//   import React, {useCallback, useState} from 'react';
//   import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
//   import {
//     DrawerContentScrollView,
//     DrawerItemList,
//   } from '@react-navigation/drawer';
//   import Color from '../../Constants/Color';
//   import Icon from 'react-native-vector-icons/Ionicons';
// //

//   const CustomDrawer = (props: any) => {
//     const height = Dimensions.get('window').height;
//     const width = Dimensions.get('window').width;
//
//     const [modalVisible, setModalVisible] = useState(false);
//     const handleFilterPress = () => {
//       setModalVisible(true);
//     };
//     const handleCloseModal = () => {
//       setModalVisible(false);
//     };

//     const [apply, setApply] = useState(false);
//     const [cancel, setCancel] = useState(false);

//     const ApplyButton = () => {
//       handleCloseModal();
//     };
//     const CancelButton = () => {
//       handleCloseModal();
//     };
//     return (
//       <View style={{flex: 1}}>
//         <DrawerContentScrollView
//           contentContainerStyle={{
//             backgroundColor: Color.mainColor,
//             height:'100%'
//           }}>
//           <View style={{alignItems: 'center', marginTop: 10}}>
//             <Image
//               source={require('../../Images/avatar.png')}
//               style={{height: 80, width: 80, borderRadius: 5, marginBottom: 15}}
//             />
//             <Text
//               style={{
//                 color: '#fff',
//                 fontSize: 18,
//                 fontFamily: 'Roboto-Medium',
//                 marginBottom: 5,
//               }}>
//               Mubashir
//             </Text>
//           </View>

//           <View
//             style={{
//               flex: 1,
//               backgroundColor: Color.mainColor,
//               paddingTop: 10,
//               paddingBottom: 20,
//               borderTopWidth: 1,
//               borderTopColor: '#ccc',
//             }}>
//             <DrawerItemList {...props} back />
//             {/* <TouchableOpacity
//               activeOpacity={0.8}
//               onPress={() => share()}
//               style={{
//                 flexDirection: 'row',
//                 gap: 5,
//                 marginLeft: 20,
//                 marginTop: 15,
//               }}>
//               <Icon name="paper-plane" size={22} color="#fff" />
//               <Text
//                 style={{
//                   fontFamily: 'Poppins-Regular',
//                   fontSize: 15,
//                   color: 'white',
//                 }}>
//                 Share
//               </Text>
//             </TouchableOpacity> */}
//           </View>
//         </DrawerContentScrollView>
//         <View
//           style={{
//             padding: 5,
//             paddingLeft: 15,
//             backgroundColor: Color.mainColor,
//             borderTopWidth: 1,
//             borderTopColor: '#ccc',
//           }}>

//           {/* <View>{modalVisible && modal()}</View> */}
//           <TouchableOpacity
//             onPress={handleFilterPress}
//             style={{paddingVertical: 10}}>
//             <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
//               <Icon name="exit-outline" size={22} color="white" />
//               <Text
//                 style={{
//                   fontSize: 15,
//                   fontFamily: 'Roboto-Medium',
//                   marginLeft: 5,
//                   color: 'white',
//                 }}>
//                 Log Out
//               </Text>
//             </View>
//           </TouchableOpacity>
//           <Modal visible={modalVisible} animationType="fade" transparent={true}>
//             <View
//               style={{
//                 flex: 1,
//                 justifyContent: 'center',
//                 marginHorizontal: 60,
//               }}>
//               <View style={[styles.modalContainer, {padding: 30}]}>
//                 <Text
//                   style={{
//                     color: Color.textColor,
//                     fontSize: 16,
//                     fontWeight: 'bold',
//                   }}>
//                   Are you sure you want to Quit ?
//                 </Text>
//                 <View
//                   style={{
//                     display: 'flex',
//                     flexDirection: 'row',
//                     justifyContent: 'center',
//                     gap: 10,
//                     marginTop: 20,
//                     marginBottom: 20,
//                   }}>
//                   <TouchableOpacity
//                     onPressIn={() => setCancel(true)}
//                     onPressOut={() => setCancel(false)}
//                     onPress={CancelButton}
//                     activeOpacity={0.8}
//                     style={{
//                       borderWidth: 1,
//                       paddingVertical: 5,
//                       borderRadius: 50,
//                       borderColor: Color.textColor,
//                       alignItems: 'center',
//                       width: 100,
//                       backgroundColor: cancel ? Color.mainColor : 'white',
//                     }}>
//                     <Text
//                       style={{
//                         fontSize: 16,
//                         fontFamily: 'Poppins-SemiBold',
//                         color: cancel ? 'white' : Color.mainColor,
//                       }}>
//                       No
//                     </Text>
//                   </TouchableOpacity>
//                   <TouchableOpacity
//                     onPressIn={() => setApply(true)}
//                     onPressOut={() => setApply(false)}
//                     onPress={ApplyButton}
//                     activeOpacity={0.8}
//                     style={{
//                       borderWidth: 1,
//                       paddingVertical: 5,
//                       borderRadius: 50,
//                       borderColor: Color.textColor,
//                       alignItems: 'center',
//                       width: 100,
//                       backgroundColor: apply ? 'white' : Color.mainColor,
//                     }}>
//                     <Text
//                       style={{
//                         color: apply ? Color.mainColor : 'white',

//                         fontSize: 16,
//                         fontFamily: 'Poppins-SemiBold',
//                       }}>
//                       Yes
//                     </Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </View>
//           </Modal>

//         </View>
//       </View>
//     );
//   };

//   export default CustomDrawer;

//   const styles = StyleSheet.create({
//     modalContainer: {
//       // flex: 1,
//       alignItems: 'center',
//       // justifyContent: 'center',
//       backgroundColor: '#fff',
//       borderColor: Color.textColor,
//       borderRadius: 10,
//       paddingHorizontal: 10,
//     },
//     modalText: {
//       color: 'black',
//       fontSize: 14,
//       fontFamily: 'Poppins-Regular',
//     },
//     closeButton: {
//       backgroundColor: '#fff',
//       borderRadius: 5,
//     },
//     closeButtonText: {
//       color: Color.mainColor,
//       fontWeight: 'bold',
//       textAlign: 'right',
//       paddingHorizontal: 10,
//     },
//   });
