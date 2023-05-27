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
//   import DateTimePickerModal from 'react-native-modal-datetime-picker';
interface CountdownProps {
  pendingStatus: boolean;
}

const TrackYourComplaint = ({navigation,pendingStatus }: any) => {
  const [complaintData, setComplaintData] = useState([]);
  const [pendingComplaints, setPendingComplaints] = useState([]);
  const [completedComplaints, setCompletedComplaints] = useState([]);
  const [loading, setLoading] = useState(false);

  const [userId, setUserId] = useState<any>('');

  const gettingUserData = async () => {
    try {
      const value = await AsyncStorage.getItem('loginFields');
      if (value !== null) {
        setUserId(JSON.parse(value));
      } else {
        console.log('No login fields found');
      }
    } catch (error) {
      console.log('Error retrieving login fields: ', error);
    }
  };
  useEffect(() => {
    gettingUserData();
  }, []);

  const getComplaintData = () => {
    setLoading(true);
    if (!userId?.customer_id) {
      navigation.replace('Login');
      AsyncStorage.removeItem('token');
      AsyncStorage.removeItem('loginFields');
      return; // Don't make the API call if the userId is not valid
    }

    const formData = new FormData();
    formData.append('customer_id', userId.customer_id);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    axios
      .post(`${BaseUrl}getAllComplain`, formData, config)
      .then((res: any) => {
        setComplaintData(res?.data?.complaints);
        const pendingComplaints = res.data.complaints.filter(
          (complaint: any) => complaint.Status === 'Pending',
        );
        const completedComplaints = res.data.complaints.filter(
          (complaint: any) => complaint.Status === 'Completed',
        );

        // Set the filtered complaints in separate states
        setPendingComplaints(pendingComplaints);
        setCompletedComplaints(completedComplaints);
        setLoading(false);
      })
      .catch(error => {
        console.log('error==>', error);
        ToastAndroid.show('Internal Server Error', ToastAndroid.BOTTOM);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (userId?.customer_id) {
      getComplaintData();
    }
  }, [userId]);

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


  const renderAllComplaint: any = ({item}: any) => {
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
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}>
              <Text
                style={{
                  fontSize: 12,
                  top: 10,
                  color: 'black',
                  alignSelf: 'center',
                  paddingBottom: 2,
                }}>
                {/* {month} */}
                Ticket No.
              </Text>
              <Text
                style={{
                  fontSize: 23,
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
                fontSize: 12,
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
              20:20:20
            </Text>

            <View
              style={{
                // backgroundColor: '#22b14c',
                backgroundColor:
                  item.Status == 'Pending' ? '#f29339' : '#22b14c',
                width: 80,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 6,
                paddingVertical: 2,
                borderRadius: 50,
              }}>
              <Text style={{textAlign: 'center', color: 'white'}}>
                {item.Status}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.box1}>
          <View style={{gap: 10}}>
            <View>
              <Text style={{fontSize: 20, color: 'black', fontWeight: '500'}}>
                {item.complain_name}
              </Text>
              <Text style={{fontSize: 14, color: 'black'}}>
                {item?.description.length > 25
                  ? `${item?.description.slice(0, 25)} ...`
                  : item?.description}
              </Text>
            </View>
            <View>
              <Text style={{fontSize: 16, color: 'black', fontWeight: '500'}}>
                26 may 2023 | 52:23
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '500',
                  color: 'black',
                }}>
                {item.created_by_name}
              </Text>
            </View>
          </View>
          <View>
            {/* <Text style={{color:Color.mainColor, fontSize:14, fontWeight:'700'}}>View Details</Text> */}
            <AntDesign name="right" size={15} color={Color.textColor} />
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const renderPendingComplaints: any = ({item}: any) => {
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
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}>
            <Text
              style={{
                fontSize: 12,
                top: 10,
                color: 'black',
                alignSelf: 'center',
                paddingBottom: 2,
              }}>
              {/* {month} */}
              Ticket No.
            </Text>
            <Text
              style={{
                fontSize: 23,
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
              fontSize: 12,
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
            {/* {year}21 */}20:00:00
          </Text>

          <View
            style={{
              // backgroundColor: '#22b14c',
              backgroundColor:
                item.Status == 'Pending' ? '#f29339' : '#22b14c',
              width: 80,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 6,
              paddingVertical: 2,
              borderRadius: 50,
            }}>
            <Text style={{textAlign: 'center', color: 'white'}}>
              {item.Status}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.box1}>
        <View style={{gap: 10}}>
          <View>
            <Text style={{fontSize: 20, color: 'black', fontWeight: '500'}}>
              {item.complain_name}
            </Text>
            <Text style={{fontSize: 14, color: 'black'}}>
              {item?.description.length > 25
                ? `${item?.description.slice(0, 25)} ...`
                : item?.description}
            </Text>
          </View>
          <View>
            <Text style={{fontSize: 16, color: 'black', fontWeight: '500'}}>
              26 may 2023 | 52:23
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '500',
                color: 'black',
              }}>
              {item.created_by_name}
            </Text>
          </View>
        </View>
        <View>
          {/* <Text style={{color:Color.mainColor, fontSize:14, fontWeight:'700'}}>View Details</Text> */}
          <AntDesign name="right" size={15} color={Color.textColor} />
        </View>
      </View>
    </TouchableOpacity>
    );
  };
  const renderCompletedComplaints: any = ({item}: any) => {
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
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}>
            <Text
              style={{
                fontSize: 12,
                top: 10,
                color: 'black',
                alignSelf: 'center',
                paddingBottom: 2,
              }}>
              {/* {month} */}
              Ticket No.
            </Text>
            <Text
              style={{
                fontSize: 23,
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
              fontSize: 12,
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
            {/* {year}21 */}20:00:00
          </Text>

          <View
            style={{
              // backgroundColor: '#22b14c',
              backgroundColor:
                item.Status == 'Pending' ? '#f29339' : '#22b14c',
              width: 80,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 6,
              paddingVertical: 2,
              borderRadius: 50,
            }}>
            <Text style={{textAlign: 'center', color: 'white'}}>
              {item.Status}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.box1}>
        <View style={{gap: 10}}>
          <View>
            <Text style={{fontSize: 20, color: 'black', fontWeight: '500'}}>
              {item.complain_name}
            </Text>
            <Text style={{fontSize: 14, color: 'black'}}>
              {item?.description.length > 25
                ? `${item?.description.slice(0, 25)} ...`
                : item?.description}
            </Text>
          </View>
          <View>
            <Text style={{fontSize: 16, color: 'black', fontWeight: '500'}}>
              26 may 2023 | 52:23
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '500',
                color: 'black',
              }}>
              {item.created_by_name}
            </Text>
          </View>
        </View>
        <View>
          {/* <Text style={{color:Color.mainColor, fontSize:14, fontWeight:'700'}}>View Details</Text> */}
          <AntDesign name="right" size={15} color={Color.textColor} />
        </View>
      </View>
    </TouchableOpacity>
    );
  };

  const firstRoute = useCallback(() => {
    return (
      <View style={{marginVertical: 20, marginBottom: 10}}>
        {complaintData.length > 0 ? (
          <FlatList
            data={complaintData.length > 0 ? complaintData : []}
            renderItem={renderAllComplaint}
            scrollEnabled={true}
            nestedScrollEnabled={true}
            keyExtractor={(items: any, index: number): any => index}
          />
        ) : (
          <Text style={{fontWeight: 'bold', fontSize: 16}}>no data found</Text>
        )}
      </View>
    );
  }, [complaintData]);

  const secondRoute = useCallback(() => {
    return (
      <View style={{marginVertical: 20, marginBottom: 10}}>
        {pendingComplaints.length > 0 ? (
          <FlatList
            data={pendingComplaints}
            renderItem={renderPendingComplaints}
            nestedScrollEnabled={true}
            keyExtractor={(items: any, index: number): any => index}
          />
        ) : (
          <Text style={{fontWeight: 'bold', fontSize: 16}}>no data found</Text>
        )}
      </View>
    );
  }, [pendingComplaints]);
  const thirdRoute = useCallback(() => {
    return (
      <View style={{marginVertical: 20, marginBottom: 10}}>
        {completedComplaints.length > 0 ? (
          <FlatList
            data={completedComplaints}
            renderItem={renderCompletedComplaints}
            nestedScrollEnabled={true}
            keyExtractor={(items: any, index: number): any => index}
          />
        ) : (
          <Text style={{fontWeight: 'bold', fontSize: 16}}>no data found</Text>
        )}
      </View>
    );
  }, [completedComplaints]);

  return (
    <ScrollView
      nestedScrollEnabled={true}
      style={{
        backgroundColor: Color.white,
        height: Dimensions.get('window').height,
      }}>
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
              fontSize: 22,
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
    paddingHorizontal: 20,
    paddingVertical: 10,
    elevation: 5,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    flexDirection: 'row',
    width: '30%',
  },
  boxOne: {
    gap: 10,
  },
  box1: {
    backgroundColor: 'white',
    width: '69%',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    display: 'flex',
    padding: 10,
    elevation: 5,
    gap: 7,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  innerBox: {
    justifyContent: 'center',
    textAlign: 'center',
    width: 60,
    height: 100,
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'column',
  },
  fields: {
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 12,
    padding: 10,
  },
  button: {
    alignSelf: 'flex-end',
    textAlign: 'center',
    alignItems: 'center',
    width: '40%',
    borderRadius: 100,
    marginTop: 20,
    paddingVertical: 10,
    backgroundColor: 'red',
  },
});

export default TrackYourComplaint;
