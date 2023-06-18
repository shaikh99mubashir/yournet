import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../../Screens/SplashScreen';
import MyDrawer from '../MyDrawer';
import Login from '../../Screens/Login';
import ForgotPassword from '../../Screens/ForgotPassword';
import Verification from '../../Screens/Verification';
import NewPassword from '../../Screens/NewPassword';
import Payment from '../../Screens/Payment';
import Complaint from '../../Screens/Complaint';
import Notification from '../../Screens/Notification';
import CustomerSupport from '../../Screens/CustomerSupport';
import FeeDetails from '../../Screens/FeeDetails';
import Help from '../../Screens/Help';
import PromotionsDetails from '../../Screens/PromotionsDetails';
import TransactionDetails from '../../Screens/TransactionDetails';
import Language from '../../Screens/Language';
import CheckWebView from '../../Screens/CheckWebView';
import Contact from '../../Screens/Contact';
import TrackYourComplaint from '../../Screens/TrackYourComplaint';
import ComplaintDetail from '../../Screens/ComplaintDetail';
import FAQs from '../../Screens/FAQs';
import TransactionHistory from '../../Screens/TransactionHistory';
import Profile from '../../Screens/Profile';
import Settings from '../../Screens/Settings';
import PackagesPlans from '../../Screens/PackagesPlans';
import TermsCondition from '../../Screens/TermsCondition';

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false, animation: 'slide_from_right'}}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="ForgotPassword" component={ForgotPassword}/>
        <Stack.Screen name="Verification" component={Verification}/>
        <Stack.Screen name="Notification" component={Notification}/>
        <Stack.Screen name="Complaint" component={Complaint}/>
        <Stack.Screen name="NewPassword" component={NewPassword}/>
        <Stack.Screen name="Payment" component={Payment}/>
        <Stack.Screen name="Home" component={MyDrawer}/>
        <Stack.Screen name="Help" component={Help} />
        <Stack.Screen name="PromotionsDetails" component={PromotionsDetails} />
        <Stack.Screen name="TransactionDetails" component={TransactionDetails} />
        <Stack.Screen name="Language" component={Language} />
        <Stack.Screen name="CheckWebView" component={CheckWebView} />
        <Stack.Screen name="Contact" component={Contact} />
        <Stack.Screen name="TrackYourComplaint" component={TrackYourComplaint} />
        <Stack.Screen name="ComplaintDetail" component={ComplaintDetail} />
        <Stack.Screen name="FAQs" component={FAQs} />
        <Stack.Screen name="TransactionHistory" component={TransactionHistory} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="PackagesPlans" component={PackagesPlans} />
        <Stack.Screen name="TermsCondition" component={TermsCondition} />
        <Stack.Screen name="CustomerSupport" component={CustomerSupport} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack