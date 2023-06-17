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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {BaseUrl} from '../../Constants/BaseUrl';
import {logout} from '../../Redux/Reducer/Reducers';
const Notification = ({navigation}: any) => {
  const [userNotificarion, setUserNotificarion] = useState([]);
  const noti: any = useSelector(notification => notification);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  useEffect(() => {
    setUserNotificarion(noti.user.notification);
  }, []);
  const width = Dimensions.get('screen').width;
  const height = Dimensions.get('screen').height;

  const updateNotificationStatus = () => {
    const formData = new FormData();
    userNotificarion &&
      userNotificarion.map((e: any) => {
        formData.append('notification_id', e.id);

        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        };

        axios
          .post(`${BaseUrl}updateNotificationStatus`, formData, config)
          .then(({data}) => {
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

  // useEffect(()=>{
  //   updateNotificationStatus()
  // },[])

  {
    /* <View
            style={{
              backgroundColor: Color.mainColor,
              padding: 10,
              borderRadius: 10,
              height: 50,
            }}>
            <FontAwesome name="bell" size={30} color="white" />
          </View> */
  }
  const [modalData, setModalData] = useState('')
  const NotificationModal = (item: any) => {
    setModalVisible(true)
    const modalData = JSON.parse(item)
    setModalData(modalData)

  };

  console.log('modalData',modalData);
  
  const renderNotificationItems = ({item}: any): any => {
    return (
      <>
        <Text
          style={{
            color: Color.mainColor,
            fontSize: 14,
            fontWeight: '700',
            marginBottom: 3,
            textAlign:'left'
          }}>
          {/* {item.created_at} */}
          17th Jun 2023
        </Text>
      <View style={{alignItems:'center'}}>
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
            paddingHorizontal:8,
            paddingVertical:12
          }}>
          <View style={{flexDirection: 'row', gap: 10}}>
            <View style={{flexDirection: 'column', width: '85%'}}>
              <Text
                style={{
                  color: Color.textColor,
                  fontSize: 14,
                  fontWeight: '700',
                }}>
                title
                {/* {item.name} */}
              </Text>
              <Text
                style={{
                  color: 'grey',
                  fontSize: 14,
                  paddingRight: 10,
                }}>
                {item.message.length > 35
                  ? `${item.message.slice(0, 35).trim()}...`
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
                11:38
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
          {/* <Text style={{color: 'grey', fontSize: 12}}>{item.created_at}</Text> */}
        </TouchableOpacity>
      </View>
      </>
    );
  };
  return (
    <View
      style={{
        backgroundColor: Color.white,
        flex: 1,
        paddingHorizontal: 15,
        // alignItems: 'center',
        // paddingBottom: 20,
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

      {/* <Modal visible={modalVisible} animationType="fade" transparent={true}>
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
              // paddingHorizontal:15,
              paddingVertical:15
            }}>
              <View style={{borderBottomWidth:1, borderBottomColor:'grey'}}>
              <Text style={{textAlign:'center',fontSize:20, marginBottom:10, color:Color.mainColor, fontWeight:'700' }}>Notification Details</Text>
              </View>
              <Image source={{uri: modalData.image}} style={{width:150,height:150, borderWidth:1}} resizeMode='contain'/>
              <Text>{modalData.message}</Text>
            </View>
        </View>
      </Modal> */}
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({});
