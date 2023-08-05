import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Image,
  Modal,
  TouchableOpacity,
  FlatList,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useCallback, useEffect} from 'react';
import Color from '../../Constants/Color';
//   import Header from '../../Component/Header';
//   import CustomTabView from '../../Component/CustomTabView';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../Components/Header';
import CustomTabView from '../../Components/CustomTabView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BaseUrl} from '../../Constants/BaseUrl';
import Loader from '../../Components/Loader';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

//   import DateTimePickerModal from 'react-native-modal-datetime-picker';
interface CountdownProps {
  pendingStatus: boolean;
}

const TrackYourComplaint = ({navigation, pendingStatus}: any) => {
  const [complaintData, setComplaintData] = useState([]);
  const [pendingComplaints, setPendingComplaints] = useState([]);
  const [completedComplaints, setCompletedComplaints] = useState([]);
  const [loading, setLoading] = useState(false);
  // console.log('completedComplaints==>', complaintData);


  const [userId, setUserId] = useState<any>('');
  const focus = useIsFocused();
  // const gettingUserData = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem('loginFields');
  //     if (value !== null) {
  //       setUserId(JSON.parse(value));
  //     } else {
  //       console.log('No login fields found');
  //     }
  //   } catch (error) {
  //     console.log('Error retrieving login fields: ', error);
  //   }
  // };
  // useEffect(() => {
  //   gettingUserData();
  // }, [focus]);

  // const trackcomplaintdata: any = useSelector(complaintData => complaintData);
  const cartData: any = useSelector(cartData => cartData);
  const registerComplaintData = () => {
    console.log('running');
    const complaintDataArray = cartData?.user?.cart?.complaints || [];
    setComplaintData(complaintDataArray);
    // setComplaintData(trackcomplaintdata?.user?.trackComplaint);

    const pendingComplaints = complaintDataArray?.filter(
      (complaint: any) => complaint.Status === 'Pending',
    );
    const completedComplaints = complaintDataArray?.filter(
      (complaint: any) => complaint.Status === 'Resolved',
    );

    setPendingComplaints(pendingComplaints);
    console.log('pendingComplaints',pendingComplaints);
    
    setCompletedComplaints(completedComplaints);
  };

  useEffect(() => {
    registerComplaintData();
  }, []);

  // const getComplaintData = () => {
  //   setLoading(true);
  //   if (!userId?.customer_id) {
  //     navigation.replace('Login');
  //     AsyncStorage.removeItem('token');
  //     AsyncStorage.removeItem('loginFields');
  //     return; // Don't make the API call if the userId is not valid
  //   }

  //   const formData = new FormData();
  //   formData.append('customer_id', userId.customer_id);
  //   const config = {
  //     headers: {
  //       'Content-Type': 'multipart/form-data',
  //     },
  //   };
  //   axios
  //     .post(`${BaseUrl}getAllComplain`, formData, config)
  //     .then((res: any) => {
  //       setComplaintData(res?.data?.complaints);

  //       const pendingComplaints = res.data.complaints.filter(
  //         (complaint: any) => complaint.Status === 'Pending',
  //       );
  //       const completedComplaints = res.data.complaints.filter(
  //         (complaint: any) => complaint.Status === 'Completed',
  //       );

  //       setPendingComplaints(pendingComplaints);
  //       setCompletedComplaints(completedComplaints);
  //       setLoading(false);
  //     })
  //     .catch(error => {
  //       ToastAndroid.show('Internal Server Error', ToastAndroid.BOTTOM);
  //       setLoading(false);
  //     });
  // };

  // useEffect(() => {
  //   if (userId?.customer_id) {
  //     getComplaintData();
  //   }
  // }, [userId, focus]);

  const [currentTab, setCurrentTab]: any = useState([
    {
      index: 0,
      name: 'completed',
      selected: true,
    },
    {
      index: 1,
      name: 'cancelled',
      selected: false,
    },
    {
      index: 2,
      name: 'cancelled',
      selected: false,
    },
  ]);

  const activateTab = (index: any) => {
    setCurrentTab(
      currentTab &&
        currentTab.length > 0 &&
        currentTab.map((e: any, i: any) => {
          if (e.index == index) {
            return {
              ...e,
              selected: true,
            };
          } else {
            return {
              ...e,
              selected: false,
            };
          }
        }),
    );
  };

  const [resolvedDateTime, setResolvedDateTime] = useState('');
  const [creationDateTime, setCreationDateTime] = useState('');

  const renderAllComplaint: any = ({item}: any) => {
    const dateTimeString: string = item?.created_it;
    const dateTime: Date = new Date(dateTimeString);
    const CreatedDate: string = dateTime.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
    const CreatedTime: string = dateTime.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false,
    });

    let resolvedDate: any;
    let resolvedTime: any;
    if (item?.resolved_it) {
      const resolved_it: string = item?.resolved_it;
      const date: Date = new Date(resolved_it);
      resolvedDate = date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
      resolvedTime = date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false,
      });
    }

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('ComplaintDetail', item)}
        key={item.ID}
        activeOpacity={1}
        style={[styles.mainBox, {marginTop: 10, marginBottom: 5}]}>
        <View style={[styles.box, {}]}>
          <View style={[styles.innerBox, {alignItems: 'center'}]}>
            {/* day or month */}
            <View
              style={{
                backgroundColor: '#eee',
                width: 60,
                // borderRadius: 10,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}>
              <Text
                style={{
                  fontSize: 10,
                  top: 10,
                  color: 'black',
                  alignSelf: 'center',
                  paddingVertical: 2,
                }}>
                Ticket No.
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  top: 5,
                  paddingBottom: 3,
                  color: 'black',
                  fontWeight: '700',
                  alignSelf: 'center',
                }}>
                {item.ID}
              </Text>
            </View>
            {/* year */}
            <Text
              style={{
                fontSize: 10,
                padding: 3,
                color: 'black',
                width: 60,
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
                fontWeight: '700',
                marginTop: 0,
                textAlign: 'center',
                // backgroundColor: '#e8e9eb',
                backgroundColor: '#e2e5de',
              }}>
              2023
            </Text>

            <View
              style={{
                // backgroundColor: '#22b14c',
                backgroundColor:
                  item.Status == 'Pending' ? '#f29339' : '#22b14c',
                width: 60,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 6,
                borderRadius: 50,
              }}>
              <Text style={{textAlign: 'center', color: 'white', fontSize: 12}}>
                {item.Status}
                {/* Resolved */}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.box1}>
          <View style={{gap: 0, width: '90%', borderWidth: 0}}>
            <View>
              <Text style={{fontSize: 14, color: 'black', fontWeight: '500'}}>
                {item.complain_name}
              </Text>
              <Text style={{fontSize: 12, color: 'grey',}}>
                {item?.description.length > 28
                  ? `${item?.description.slice(0, 28).trim()} ...`
                  : item?.description.trim()}
              </Text>
            </View>
            <View style={{top: 4}}>
              <Text style={{fontSize: 12, color: 'black', fontWeight: '500'}}>
               {item.Status == 'Resolved' ? 'Resolved Date' : 'Complaint Date:'}
              </Text>
              <Text style={{fontSize: 12, color: 'grey', fontWeight: '500'}}>
              {item.Status == 'Resolved' ? item.resolved_it : item.created_it}
              </Text>
              {/* <Text style={{fontSize: 12, color: 'black', fontWeight: '500'}}>
                {resolvedDate ? resolvedDate :''}
              </Text> */}
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '500',
                  color: 'black',
                }}>
                {item.created_by_name ? item.created_by_name : 'Me'}
              </Text>
            </View>
          </View>
          <View>
            <AntDesign name="right" size={12} color={Color.textColor} />
          </View>
        </View>
      </TouchableOpacity>
    );
  };


  const firstRoute = useCallback(() => {
    return (
      <View style={{marginVertical: 20, marginBottom: 10}}>
        {complaintData?.length > 0 ? (
          <FlatList
            data={complaintData?.length > 0 ? complaintData : []}
            renderItem={renderAllComplaint}
            scrollEnabled={true}
            nestedScrollEnabled={true}
            // keyExtractor={(items: any, index: number): any => index}
            keyExtractor={(item, index) => String(index)}
          />
        ) : (
          // <Text style={{fontWeight: 'bold', fontSize: 14,color:'grey'}}>No data found</Text>
          <Image source={require('../../Images/nodata.png')} resizeMode='contain' style={{height:150}}/>
        )}
      </View>
    );
  }, [complaintData]);

  const secondRoute = useCallback(() => {
    return (
      <View style={{marginVertical: 20, marginBottom: 10}}>
        {pendingComplaints?.length > 0 ? (
          <FlatList
            data={pendingComplaints}
            renderItem={renderAllComplaint}
            nestedScrollEnabled={true}
            // keyExtractor={(items: any, index: number): any => index}
            keyExtractor={(item, index) => String(index)}
          />
        ) : (
          // <Text style={{fontWeight: 'bold', fontSize: 14,color:'grey'}}>No data found</Text>
          <Image source={require('../../Images/nodata.png')} resizeMode='contain' style={{height:150}}/>
        )}
      </View>
    );
  }, [pendingComplaints]);

  const thirdRoute = useCallback(() => {
    return (
      <View style={{marginVertical: 20, marginBottom: 10}}>
        {completedComplaints?.length > 0 ? (
          <FlatList
            data={completedComplaints}
            renderItem={renderAllComplaint}
            nestedScrollEnabled={true}
            // keyExtractor={(items: any, index: number): any => index}
            keyExtractor={(item, index) => String(index)}
          />
        ) : (
          // <Text style={{fontWeight: 'bold', fontSize: 14,color:'grey'}}>No data found</Text>
          <Image source={require('../../Images/nodata.png')} resizeMode='contain' style={{height:150}}/>
        )}
      </View>
    );
  }, [completedComplaints]);

  return (
    <ScrollView
      nestedScrollEnabled={true}
      showsVerticalScrollIndicator={false}
      style={{
        backgroundColor: Color.white,
        height: Dimensions.get('window').height,
      }}>
      <>
        {loading ? (
          <Loader />
        ) : (
          <View
            style={{
              marginHorizontal: 15,
            }}>
            <Header navigation={navigation} backBtn={true} noLogo />
            <Text
              style={{
                textAlign: 'center',
                fontSize: 18,
                marginVertical: 10,
                color: Color.mainColor,
                fontWeight: 'bold',
              }}>
              Complaint Status
            </Text>
            <View style={{marginTop: 10}}></View>
            <CustomTabView
              currentTab={currentTab}
              firstRoute={firstRoute}
              secondRoute={secondRoute}
              thirdRoute={thirdRoute}
              activateTab={activateTab}
              firstRouteTitle="All"
              secondRouteTitle="Pending"
              thirdRouteTitle="Resolved"
            />
          </View>
        )}
      </>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainBox: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
  },
  box: {
    display: 'flex',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 0,
    paddingVertical: 0,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    flexDirection: 'row',
    width: '30%',
  },
  boxOne: {
    gap: 0,
  },
  box1: {
    backgroundColor: 'white',
    width: '69%',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    display: 'flex',
    // padding: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    elevation: 5,
    // gap: 7,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  innerBox: {
    // justifyContent: 'center',
    // textAlign: 'center',
    // width: 60,
    // height: 100,
    // borderRadius: 20,
    // display: 'flex',
    // flexDirection: 'column',
  },
  // fields: {
  //   marginTop: 20,
  // },
  // input: {
  //   borderWidth: 1,
  //   borderColor: 'gray',
  //   borderRadius: 12,
  //   padding: 10,
  // },
  // button: {
  //   alignSelf: 'flex-end',
  //   textAlign: 'center',
  //   alignItems: 'center',
  //   // width: '40%',
  //   borderRadius: 100,
  //   marginTop: 20,
  //   paddingVertical: 10,
  //   backgroundColor: 'red',
  // },
});

export default TrackYourComplaint;
