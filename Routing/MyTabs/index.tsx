import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Color} from '../../Constants';
import Home from '../../Screens/Home';
import Payment from '../../Screens/Payment';
import Complaint from '../../Screens/Complaint';
import Profile from '../../Screens/Profile';
import Promotions from '../../Screens/Promotions';
import MyAccounts from '../../Screens/MyAccounts';

const Tab = createBottomTabNavigator();

const MyTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        // tabBarShowLabel: false,
        tabBarInactiveTintColor: 'black',
        tabBarStyle: styles.tabBarStyle,
        tabBarActiveTintColor: 'red',
      })}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused, color}) => (
            <View>
              {focused == true ? (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    padding: 5,
                    borderRadius: 5,
                  }}>
                  <Image
                    source={require('../../Images/home.png')}
                    resizeMode="contain"
                    style={{
                      height: 35,
                      width: 35,
                      tintColor: focused ? Color.mainColor : Color.textColor,
                    }}
                  />
                </View>
              ) : (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                  }}>
                  <Image
                    source={require('../../Images/home.png')}
                    resizeMode="contain"
                    style={{
                      height: 30,
                      width: 30,
                      tintColor: focused ? Color.mainColor : Color.textColor,
                    }}
                  />
                </View>
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Payment"
        component={Payment}
        options={{
          tabBarIcon: ({focused, color}) => (
            <View>
              {focused == true ? (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    padding: 5,
                    borderRadius: 5,
                  }}>
                  <Image
                    source={require('../../Images/payment.png')}
                    resizeMode="contain"
                    style={{
                      height: 35,
                      width: 35,
                      tintColor: focused ? Color.mainColor : Color.textColor,
                    }}
                  />
                </View>
              ) : (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                  }}>
                  <Image
                    source={require('../../Images/payment.png')}
                    resizeMode="contain"
                    style={{
                      height: 30,
                      width: 30,
                      tintColor: focused ? Color.mainColor : Color.textColor,
                    }}
                  />
                </View>
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Promotions"
        component={Promotions}
        options={{
          tabBarIcon: ({focused, color}) => (
            <View>
              {focused == true ? (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    padding: 5,
                    borderRadius: 5,
                  }}>
                  <Image
                    source={require('../../Images/promotions.png')}
                    resizeMode="contain"
                    style={{
                      height: 40,
                      width: 40,
                      tintColor: focused ? Color.mainColor : Color.textColor,
                    }}
                  />
                </View>
              ) : (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                  }}>
                  <Image
                    source={require('../../Images/promotions.png')}
                    resizeMode="contain"
                    style={{
                      height: 35,
                      width: 35,
                      tintColor: focused ? Color.mainColor : Color.textColor,
                    }}
                  />
                </View>
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="My Account"
        component={MyAccounts}
        options={{
          tabBarIcon: ({focused, color}) => (
            <View>
              {focused == true ? (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    padding: 5,
                    borderRadius: 5,
                  }}>
                  <Image
                    source={require('../../Images/myacount.png')}
                    resizeMode="contain"
                    style={{
                      height: 35,
                      width: 35,
                      tintColor: focused ? Color.mainColor : Color.textColor,
                    }}
                  />
                </View>
              ) : (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                  }}>
                  <Image
                    source={require('../../Images/myacount.png')}
                    resizeMode="contain"
                    style={{
                      height: 30,
                      width: 30,
                      tintColor: focused ? Color.mainColor : Color.textColor,
                    }}
                  />
                </View>
              )}
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MyTabs;

const styles = StyleSheet.create({
  tabBarStyle: {
    // position: 'absolute',
    borderTopWidth: 0,
    height: 60,
    // borderTopEndRadius: 30,
    // borderTopStartRadius: 30,
  },
});
