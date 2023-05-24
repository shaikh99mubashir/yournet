// import {StyleSheet, Text, View, Modal, Dimensions} from 'react-native';
// import React, {useEffect, useState} from 'react';
// import NetInfo from '@react-native-community/netinfo';
// import {Color} from '../../Constants';
// const {height, width} = Dimensions.get('window');
// const ShowWifiStatus = ({modal}: any) => {
//   const [isConnected, setIsConnected] = useState(true);

//   useEffect(() => {
//     // Subscribe to network state changes
//     const unsubscribe = NetInfo.addEventListener((state: any) => {
//       setIsConnected(state.isConnected);
//     });

//     // Clean up the subscription when the component unmounts
//     return () => {
//       unsubscribe();
//     };
//   }, []);

//   return (
//     <View>
//       <Modal animationType="fade" transparent={true} visible={modal}>
//         <View
//           style={{
//             width: width,
//             height: height,
//             alignItems: 'center',
//             justifyContent: 'center',
//             backgroundColor: Color.white,
//             opacity: 0.9,
//           }}>
//           <Text style={{color: 'black'}}>
//             {!isConnected ? 'You are offline' : 'You Are Online'}
//           </Text>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// export default ShowWifiStatus;

// const styles = StyleSheet.create({});