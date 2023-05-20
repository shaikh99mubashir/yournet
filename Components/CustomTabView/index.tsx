import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    FlatList,
    Dimensions,
  } from 'react-native';
  import React, {useState, useCallback} from 'react';
  import Color from '../../Constants/Color';
  
  const CustomTabView = (Props: any): any => {
    const {
      firstRoute,
      secondRoute,
      currentTab,
      activateTab,
      firstRouteTitle,
      secondRouteTitle,
      thirdRoute,
      thirdRouteTitle,
    } = Props;
  
    const myFirstRoute = () => {
      firstRoute();
    };
  
    const mySecondRoute = () => {
      secondRoute();
    };
  
    return (
      <View>
        <View style={{marginBottom: 40, alignItems: 'center'}}>
          <View
            style={{
              width: Dimensions.get('window').width / 1.1,
              alignItems: 'center',
              flexDirection: 'row',
              gap:10
            }}>
            <TouchableOpacity
              onPress={() => activateTab(0)}
              style={{
                  width: '30%',
                borderRadius:10,
                paddingVertical: 5,
                borderColor: Color.textColor,
                borderWidth:1,
                backgroundColor:
                  currentTab &&
                  currentTab.some((e: any, i: any) => e.index == 0 && e.selected)
                    ? Color.mainColor
                    : 'white',
              }}>
              <Text
                style={[
                  styles.text,
                  {
                    color:
                      currentTab &&
                      currentTab.some(
                        (e: any, i: any) => e.index == 0 && e.selected,
                      )
                        ? 'white'
                        : Color.textColor,
                  },
                ]}>
                {firstRouteTitle}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => activateTab(1)}
              style={{
                width: '30%',
                borderRadius:10,
                paddingVertical: 5,
                borderWidth:1,
                borderColor: Color.textColor,
                backgroundColor:
                  currentTab &&
                  currentTab.some((e: any, i: any) => e.index == 1 && e.selected)
                    ? Color.mainColor
                    : 'white',
              }}>
              <Text
                style={[
                  styles.text,
                  {
                    color:
                      currentTab &&
                      currentTab.some(
                        (e: any, i: any) => e.index == 1 && e.selected,
                      )
                        ? 'white'
                        : Color.textColor,
                  },
                ]}>
                {secondRouteTitle}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => activateTab(2)}
              style={{
                width: '30%',
                borderRadius:10,
                paddingVertical: 5,
                borderWidth:1,
                borderColor: Color.textColor,
                backgroundColor:
                  currentTab &&
                  currentTab.some((e: any, i: any) => e.index == 2 && e.selected)
                    ? Color.mainColor
                    : 'white',
              }}>
              <Text
                style={[
                  styles.text,
                  {
                    color:
                      currentTab &&
                      currentTab.some(
                        (e: any, i: any) => e.index == 2 && e.selected,
                      )
                        ? 'white'
                        : Color.textColor,
                  },
                ]}>
                {thirdRouteTitle}
              </Text>
            </TouchableOpacity>
          </View>
  
          {currentTab &&
          currentTab.length > 0 &&
          currentTab.some((e: any, i: any) => e.index == 0 && e.selected)
            ? firstRoute()
            : currentTab.length > 0 &&
              currentTab.some((e: any, i: any) => e.index == 1 && e.selected)
            ? secondRoute()
            : thirdRoute()}
        </View>
      </View>
    );
  };
  
  export default CustomTabView;
  
  const styles = StyleSheet.create({
    text: {
      color: Color.textColor,
      fontSize: 16,
      fontWeight: '500',
      textAlign: 'center',
    },
  });