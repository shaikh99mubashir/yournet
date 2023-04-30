import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Color} from '../../Constants';
import Home from '../../Screens/Home';
import Payment from '../../Screens/Payment';
import Complaint from '../../Screens/Complaint';
import Profile from '../../Screens/Profile';

const Tab = createBottomTabNavigator();

const MyTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarInactiveTintColor: 'black',
        tabBarStyle: styles.tabBarStyle,
        tabBarActiveTintColor: 'red',
      })}>
      <Tab.Screen
        name="HomeScreen"
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
                      height: 30,
                      width: 30,
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
                      height: 30,
                      width: 30,
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
        name="Complaint"
        component={Complaint}
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
                    source={require('../../Images/feedback.png')}
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
                    source={require('../../Images/feedback.png')}
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
        name="Profile"
        component={Profile}
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
                    source={require('../../Images/avatar.png')}
                    resizeMode="contain"
                    style={{
                      height: 30,
                      width: 30,
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
                    source={require('../../Images/avatar.png')}
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
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
  },
});
