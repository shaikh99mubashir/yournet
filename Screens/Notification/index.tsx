import {
    Dimensions,
    FlatList,
    Image,
    StyleSheet,
    Text,
    View,
  } from 'react-native';
  import React, {useState} from 'react';
  import Header from '../../Components/Header';
  import Color from '../../Constants/Color';
  import AntDesign from 'react-native-vector-icons/AntDesign';
  import FontAwesome from 'react-native-vector-icons/FontAwesome';
  const Notification = ({navigation}: any) => {
    const [user, setUser] = useState(true);
    const width = Dimensions.get('screen').width;
    const height = Dimensions.get('screen').height;
    const userNotificarion = [
      {
        id: 1,
        name: 'zaza',
        date: '02/03/2023',
        message: 'jhvjhsvd j dsj f',
      },
      {
        id: 2,
        name: 'sxx',
        date: '02/03/2023',
        message: 'jhvjhsvd j dsj f',
      },
      {
        id: 3,
        name: 'cdxc',
        date: '02/03/2023',
        message: 'jhvjhsvd j dsj f',
      },
    ];
    const renderNotificationItems = ({item}: any): any => {
      return (
        <View
          style={{
            width: width / 1.06,
            backgroundColor: 'white',
            shadowColor: Color.textColor,
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.29,
            shadowRadius: 4.65,
            borderRadius: 10,
            elevation: 8,
            marginBottom: 10,
          }}>
          <View style={{flexDirection: 'row', padding: 8, gap: 10}}>
            <View style={{backgroundColor: Color.mainColor, padding:10, borderRadius:10}}>
              <FontAwesome name="bell" size={30} color="white" />
            </View>
            <View style={{justifyContent: 'space-around'}}>
              <View style={{flexDirection: 'row',}}>
                <Text
                  style={{
                    color: Color.mainColor,
                    fontSize: 16,
                    fontWeight: 'bold',
                  }}>
                  {item.name}
                </Text>
              </View>
              <Text
                style={{
                  color: Color.textColor,
                  fontSize: 16,
                }}>
                {item.message}
              </Text>
            </View>
          </View>
        </View>
      );
    };
    return (
      <View>
        <View
          style={{
            backgroundColor: Color.white,
            height: Dimensions.get('screen').height,
            paddingHorizontal: 10,
          }}>
          <Header
            navigation={navigation}
            title="Notification"
            user={user}
            backBtn
          />
          {userNotificarion.length > 0 ? (
            <FlatList
              data={userNotificarion}
              renderItem={renderNotificationItems}
              keyExtractor={(item: any) => item.id}
              showsHorizontalScrollIndicator={false}
            />
          ) : (
            <View
              style={{
                flexDirection: 'row',
                gap: 5,
                justifyContent: 'center',
                alignItems: 'center',
                height: height / 1.5,
              }}>
              <AntDesign name="copy1" size={20} color={Color.textColor} />
              <Text style={{color: Color.textColor}}>
                There are no Notifications
              </Text>
            </View>
          )}
        </View>
      </View>
    );
  };
  
  export default Notification;
  
  const styles = StyleSheet.create({});