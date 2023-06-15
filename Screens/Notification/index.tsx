import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  ToastAndroid
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../Components/Header';
import Color from '../../Constants/Color';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import { BaseUrl } from '../../Constants/BaseUrl';
import { logout } from '../../Redux/Reducer/Reducers';
const Notification = ({navigation}: any) => {
  const [userNotificarion, setUserNotificarion] = useState([]);
  const noti: any = useSelector(notification => notification);
  useEffect(() => {
    setUserNotificarion(noti.user.notification);
  }, []);
  const width = Dimensions.get('screen').width;
  const height = Dimensions.get('screen').height;

  const updateNotificationStatus = () => {
    const formData = new FormData();
    userNotificarion && userNotificarion.map((e:any) => {

      formData.append('notification_id', e.id);
    
  
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
  
    axios
      .post(`${BaseUrl}updateNotificationStatus`, formData, config)
      .then(({ data }) => {
        console.log('data', data);
      })
      .catch(error => {
        ToastAndroid.show(
          'Internal Server Error in Notification id',
          ToastAndroid.BOTTOM,
        );
      });

    });
  };

  useEffect(()=>{
    updateNotificationStatus()
  },[])
 

  const renderNotificationItems = ({item}: any): any => {
    return (
      <View
        style={{
          backgroundColor: 'white',
          shadowOpacity: 1,
          shadowRadius: 10,
          borderRadius: 10,
          elevation: 2,
          marginBottom: 10,
        }}>
        <View style={{flexDirection: 'row', padding: 8, gap: 10}}>
          <View
            style={{
              backgroundColor: Color.mainColor,
              padding: 10,
              borderRadius: 10,
              height: 50,
            }}>
            <FontAwesome name="bell" size={30} color="white" />
          </View>
          <View style={{flexDirection: 'column',width:width/1.4}}>
            <Text
              style={{
                color: Color.mainColor,
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              title
              {/* {item.name} */}
            </Text>
          <Text
            style={{
              color: Color.textColor,
              fontSize: 16,
              textAlign: 'justify',
              paddingRight: 10,
            }}>
            {item.message}
          </Text>
              </View>
        </View>
      </View>
    );
  };
  return (
    <View
      style={{
        backgroundColor: Color.white,
        flex:1,
        paddingHorizontal: 15,
        alignItems: 'center',
        paddingBottom:20
      }}>
      <Header navigation={navigation} backBtn noLogo />
      <Text
        style={{
          textAlign: 'center',
          fontSize: 18,
          marginVertical: 10,
          color: Color.mainColor,
          fontWeight: 'bold',
        }}>
        Notifications
      </Text>

      {userNotificarion.length > 0 ? (
        <FlatList
          data={userNotificarion}
          renderItem={renderNotificationItems}
          keyExtractor={(item: any) => item.id}
          showsVerticalScrollIndicator={false}
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
  );
};

export default Notification;

const styles = StyleSheet.create({});
