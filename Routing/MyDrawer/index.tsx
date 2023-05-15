import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Home from '../../Screens/Home';
import CustomDrawerContent from '../../Components/CustomDrawer';
import Payment from '../../Screens/Payment';
import Complaint from '../../Screens/Complaint';
import Notification from '../../Screens/Notification';
import {StyleSheet, Dimensions} from 'react-native';
import Profile from '../../Screens/Profile';
import Settings from '../../Screens/Settings';
import CustomerSupport from '../../Screens/CustomerSupport';
import FeeDetails from '../../Screens/FeeDetails';
import Help from '../../Screens/Help';
import FAQs from '../../Screens/FAQs';
import PackagesPlans from '../../Screens/PackagesPlans';
import TransactionHistory from '../../Screens/TransactionHistory';
import TermsCondition from '../../Screens/TermsCondition';
import MyTabs from '../MyTabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSafeAreaFrame} from 'react-native-safe-area-context';
import {useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import MyAccounts from '../../Screens/MyAccounts';

const width = Dimensions.get('screen').width;
const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={({...props}) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#fff',
        drawerLabelStyle: {
          marginLeft: 0,
          fontFamily: 'Poppins-Regular',
          fontSize: 15,
        },
        drawerStyle: {
          width: '100%',
        },
      }}>
      <Drawer.Screen name="Hom" component={MyTabs} />
      <Drawer.Screen name="Payment" component={Payment} />
      <Drawer.Screen name="Settings" component={Settings} />
      <Drawer.Screen name="Complaint" component={Complaint} />
      <Drawer.Screen name="Notification" component={Notification} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="MyAccounts" component={MyAccounts} />
      <Drawer.Screen name="CustomerSupport" component={CustomerSupport} />
      <Drawer.Screen name="FeeDetails" component={FeeDetails} />
      <Drawer.Screen name="FAQs" component={FAQs} />
      <Drawer.Screen name="TransactionHistory" component={TransactionHistory} />
      <Drawer.Screen name="PackagesPlans" component={PackagesPlans} />
      <Drawer.Screen name="TermsCondition" component={TermsCondition} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  closeButtonContainer: {
    alignSelf: 'flex-end',
    marginRight: 10,
    marginTop: 10,
  },
  closeButton: {
    color: '#fff',
    fontSize: 16,
  },
});
export default MyDrawer;

// import { createDrawerNavigator } from '@react-navigation/drawer';
// import Home from '../../Screens/Home';
// import MyTabs from '../MyTabs';
// import CustomDrawer from '../../Components/CustomDrawer';
// import Payment from '../../Screens/Payment';
// import Complaint from '../../Screens/Complaint';
// import Notification from '../../Screens/Notification';

// const Drawer = createDrawerNavigator();

// function MyDrawer() {
//   return (
//     <Drawer.Navigator
//     drawerContent={props => <CustomDrawer {...props} />}
//     screenOptions={{
//       headerShown: false,
//       // drawerActiveBackgroundColor: '#aa18ea',
//       drawerActiveTintColor: '#fff',
//       drawerInactiveTintColor: '#fff',
//       drawerLabelStyle: {
//         marginLeft: 0,
//         fontFamily: 'Poppins-Regular',
//         fontSize: 15,
//       },
//     }}>
//       <Drawer.Screen name="HomeScreen" component={MyTabs} />
//     </Drawer.Navigator>
//   );
// }
// export default MyDrawer
