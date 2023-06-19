import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../Components/Header';
import Color from '../../Constants/Color';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {BaseUrl} from '../../Constants/BaseUrl';
import {useIsFocused} from '@react-navigation/native';
import { pushNotification} from '../../Redux/Reducer/Reducers';
const Notification = ({navigation}: any) => {
  const [refresh, setRefresh] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [userNotificarion, setUserNotificarion] = useState<any>([]);
  const [getUserData, setUserData] = useState<any>(null);
  const focus = useIsFocused();

  const cartData: any = useSelector(cartData => cartData);
  useEffect(()=>{
    setUserData(cartData?.user?.cart?.customer);
  },[focus])
  
  console.log('userNotificarion====================================notofication',userNotificarion);
  console.log('getUserData?.customer_id====================================notofication',getUserData?.customer_id);

  const getNotification = () => {
    const formData = new FormData();
    formData.append('customer_id', getUserData?.customer_id);
    formData.append('device_token', 'duCN8-hjSy6MaSe7wfMtOU:APA91bGybw4Ff3gPswAp1QurBNKbW6kECfLR-C1bx0huffL_z6KX3ib1P27NCjaE94IZXwsdPP_bUuYmxAm1EYUT1He_xtJ2Z63vtmIuUJ_kPuj6b0FKcCOsz5WQCzC1ipuHejo1X_6L');
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    axios
      .post(`${BaseUrl}getPushNotifications`, formData, config)
      .then(({data}: any) => {
        console.log('dara',data.push_notifications);
        setUserNotificarion(data.push_notifications)
        // dispatch(pushNotification(data.push_notifications));
      })
      .catch(error => {
        ToastAndroid.show(
          'Internal Server Error in Notification',
          ToastAndroid.BOTTOM,
        );
      });
  };

  useEffect(()=>{
    getNotification()
  },[getUserData?.customer_id])





  const width = Dimensions.get('screen').width;
  const height = Dimensions.get('screen').height;

  const [modalData, setModalData] = useState<any>('');
  const dispatch = useDispatch();

  const NotificationModal = (item: any) => {
    setModalVisible(true);
    setModalData(item);

    const formData = new FormData();
    formData.append('notification_id', item.id);
  
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
  
    // First API call: updateNotificationStatus
    axios
      .post(`${BaseUrl}updateNotificationStatus`, formData, config)
      .then(({ data }) => { 
        // Second API call: getPushNotifications
        formData.append('customer_id', item?.customer_id);
        getNotification()
        return axios.post(`${BaseUrl}getPushNotifications`, formData, config);
      })
      .then(({ data }) => {
        dispatch(pushNotification(data?.push_notifications));
      })
      .catch(error => {
        ToastAndroid.show(
          'Internal Server Error in Notification',
          ToastAndroid.BOTTOM,
        );
      });
  };

  const renderNotificationItems = ({item}: any): any => {
    // console.log('item',item);
    return (
      <>
        <Text
          style={{
            color: Color.mainColor,
            fontSize: 14,
            fontWeight: '700',
            marginBottom: 3,
            textAlign: 'left',
          }}>
          {item.Creation_Date}
        </Text>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => NotificationModal(item)}
            activeOpacity={0.8}
            style={{
              backgroundColor: 'white',
              // shadowOpacity: 1,
              shadowRadius: 10,
              borderRadius: 5,
              elevation: 2,
              marginBottom: 10,
              width: '99%',
              paddingHorizontal: 8,
              paddingVertical: 12,
            }}>
            <View style={{flexDirection: 'row', gap: 10}}>
              <View style={{flexDirection: 'column', width: '78%'}}>
                <Text
                  style={{
                    color: Color.textColor,
                    fontSize: 14,
                    fontWeight: '700',
                  }}>
                  {item.title}
                </Text>
                <Text
                  style={{
                    color: 'grey',
                    fontSize: 14,
                    paddingRight: 10,
                  }}>
                  {item.message.length > 30
                    ? `${item.message.slice(0, 30).trim()}...`
                    : item.message.trim()}
                </Text>
              </View>
              <View
                style={{justifyContent: 'space-between', alignItems: 'center'}}>
                <Text
                  style={{
                    paddingHorizontal: 8,
                    borderRadius: 8,
                    color: 'grey',
                    fontSize: 12,
                  }}>
                  {item.Creation_Time}
                </Text>
                {item.status == 'New' ? (
                  <Text
                    style={{
                      backgroundColor: Color.mainColor,
                      paddingHorizontal: 8,
                      borderRadius: 8,
                      color: 'white',
                      fontSize: 12,
                    }}>
                    {item.status}
                  </Text>
                ) : (
                  ''
                )}
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </>
    );
  };

 
  const CloseModal = () => {
    setModalVisible(false)
  }
  return (
    <View
      style={{
        backgroundColor: Color.white,
        flex: 1,
        paddingHorizontal: 15,
        paddingTop:7
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

      <Modal visible={modalVisible} animationType="fade" transparent={true}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 10,
              width: '90%',
              paddingVertical: 15,
            }}>
            <View style={{borderBottomWidth: 1, borderBottomColor: '#eee'}}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 20,
                  marginBottom: 10,
                  color: Color.mainColor,
                  fontWeight: '700',
                }}>
                Notification Details
              </Text>
            </View>

            {modalData?.image ? (
              <Image
                source={{uri: modalData?.image}}
                style={{
                  width: '90%',
                  height: 90,
                  borderWidth: 1,
                  alignSelf: 'center',
                  marginVertical: 5,
                }}
                resizeMode="contain"
              />
            ) : null}

            <View style={{paddingHorizontal: 15, marginBottom: 10}}>
              <Text style={{color: 'grey', textAlign: 'justify'}}>
                {modalData.message}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => CloseModal()}
              style={{borderTopWidth: 1, borderTopColor: '#eee'}}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 20,
                  marginVertical: 10,
                  color: Color.mainColor,
                  fontWeight: '700',
                }}>
                OK
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({});
