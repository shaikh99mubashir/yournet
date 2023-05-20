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
} from 'react-native';
import React, {useState, useCallback} from 'react';
import Color from '../../Constants/Color';
//   import Header from '../../Component/Header';
//   import CustomTabView from '../../Component/CustomTabView';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../Components/Header';
import CustomTabView from '../../Components/CustomTabView';
//   import DateTimePickerModal from 'react-native-modal-datetime-picker';
const TrackYourComplaint = ({navigation}: any) => {
  const [user, setUser] = useState(true);

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

  const upComming = [
    {
      ticketNumber: '5111615',
      status: 'closed',
      date: '20/20/2000',
      time: '20:00',
      complaintReason: 'false',
      ert: '151/62/26',
      rc: 'update',
    },
    {
      ticketNumber: '5111615',
      status: 'closed',
      date: '20/20/2000',
      time: '20:00',
      complaintReason: 'false',
      ert: '151/62/26',
      rc: 'update',
    },
    {
      ticketNumber: '5111615',
      status: 'closed',
      date: '20/20/2000',
      time: '20:00',
      complaintReason: 'false',
      ert: '151/62/26',
      rc: 'update',
    },
  ];
  const History = [
    {
      ticketNumber: '5111615',
      status: 'closed',
      date: '20/20/2000',
      time: '20:00',
      complaintReason: 'false',
      ert: '151/62/26',
      rc: 'update',
    },
    {
      ticketNumber: '5111615',
      status: 'closed',
      date: '20/20/2000',
      time: '20:00',
      complaintReason: 'false',
      ert: '151/62/26',
      rc: 'update',
    },
  ];
  const Cancle = [
    {
      ticketNumber: '5111615',
      status: 'closed',
      date: '20/20/2000',
      time: '20:00',
      complaintReason: 'false',
      ert: '151/62/26',
      rc: 'update',
    },
    {
      ticketNumber: '5111615',
      status: 'closed',
      date: '20/20/2000',
      time: '20:00',
      complaintReason: 'false',
      ert: '151/62/26',
      rc: 'update',
    },
  ];
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

  const renderUpCommingData: any = ({item}: any) => {
    return (
        <View style={{marginTop: 15, backgroundColor:'white', elevation:5, borderRadius:10}}>
        <View
          style={{
            width: '100%',
            borderWidth: 1,
            borderColor: Color.mainColor,
            borderRadius: 10,
          //   paddingVertical: 10,
          //   paddingHorizontal: 10,
            flexDirection:'row',
            gap:10
            
          }}>
          <View style={{width: '35%', backgroundColor:'#eee',paddingVertical: 10, paddingHorizontal: 10, }}>
            <View style={{alignItems: 'center'}}>
              <Text style={{fontSize:14, fontWeight:'bold', color:Color.textColor}}>Ticket Number</Text>
              <Text style={{fontSize:24, fontWeight:'bold',color:Color.mainColor}}>{item.ticketNumber}</Text>
            </View>
            <View style={{alignItems: 'center', }}>
              <Text style={{fontSize:14, fontWeight:'bold', color:Color.textColor, marginTop:5}}>Status</Text>
              <Text style={{backgroundColor:Color.mainColor, color:'white', paddingVertical:5, paddingHorizontal:15, fontSize:20, borderRadius:20, marginTop:5, fontWeight:'bold'}}>{item.status}</Text>
            </View>

            <TouchableOpacity style={{alignItems: 'center', marginTop:10}}>
              <Text style={{color:Color.mainColor, fontSize:15}}>View Details</Text>
            </TouchableOpacity>
          </View>
          <View style={{width:'65%',paddingVertical: 10, paddingHorizontal: 10,}}>
              <Text style={{color:Color.textColor, fontSize:15}}>17 mar 2023 10:2060</Text>
              <Text style={{color:Color.textColor, fontSize:15, marginTop:5}}>Complaint Reason</Text>
              <Text style={{color:Color.textColor, fontSize:15, fontWeight:'bold'}}>false</Text>
              <Text style={{color:Color.textColor, fontSize:15, marginTop:5}}>Estimate Time</Text>
              <Text style={{color:Color.textColor, fontSize:17}}>17 mar 2023 10:2060</Text>
              <Text style={{color:Color.textColor, fontSize:15, marginTop:5}}>Resolution comment</Text>
              <Text style={{color:Color.textColor, fontSize:17}}>Resolved</Text>
              
          </View>
        </View>
      </View>
    );
  };
  const renderUpHistoryData: any = ({item}: any) => {
    return (
      <>
        <View style={{marginTop: 15, backgroundColor:'white', elevation:5, borderRadius:10}}>
          <View
            style={{
              width: '100%',
              borderWidth: 1,
              borderColor: Color.mainColor,
              borderRadius: 10,
            //   paddingVertical: 10,
            //   paddingHorizontal: 10,
              flexDirection:'row',
              gap:10
              
            }}>
            <View style={{width: '35%', backgroundColor:'#eee',paddingVertical: 10, paddingHorizontal: 10, }}>
              <View style={{alignItems: 'center'}}>
                <Text style={{fontSize:14, fontWeight:'bold', color:Color.textColor}}>Ticket Number</Text>
                <Text style={{fontSize:24, fontWeight:'bold',color:Color.mainColor}}>{item.ticketNumber}</Text>
              </View>
              <View style={{alignItems: 'center', }}>
                <Text style={{fontSize:14, fontWeight:'bold', color:Color.textColor, marginTop:5}}>Status</Text>
                <Text style={{backgroundColor:Color.mainColor, color:'white', paddingVertical:5, paddingHorizontal:15, fontSize:20, borderRadius:20, marginTop:5, fontWeight:'bold'}}>{item.status}</Text>
              </View>

              <TouchableOpacity style={{alignItems: 'center', marginTop:10}}>
                <Text style={{color:Color.mainColor, fontSize:15}}>View Details</Text>
              </TouchableOpacity>
            </View>
            <View style={{width:'65%',paddingVertical: 10, paddingHorizontal: 10,}}>
                <Text style={{color:Color.textColor, fontSize:15}}>17 mar 2023 10:2060</Text>
                <Text style={{color:Color.textColor, fontSize:15, marginTop:5}}>Complaint Reason</Text>
                <Text style={{color:Color.textColor, fontSize:15, fontWeight:'bold'}}>false</Text>
                <Text style={{color:Color.textColor, fontSize:15, marginTop:5}}>Estimate Time</Text>
                <Text style={{color:Color.textColor, fontSize:17}}>17 mar 2023 10:2060</Text>
                <Text style={{color:Color.textColor, fontSize:15, marginTop:5}}>Resolution comment</Text>
                <Text style={{color:Color.textColor, fontSize:17}}>Resolved</Text>
                
            </View>
          </View>
        </View>
      </>
    );
  };
  const [selectedServicedata, setSelectedServicedata]: any = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const [serviceDD, setServiceDD] = useState(false);
  const SelectService = [
    {
      id: 1,
      service: 'All',
    },
    {
      id: 2,
      service: 'This Month',
    },
    {
      id: 3,
      service: 'This Year',
    },
  ];
  const SelectHistory = [
    {
      id: 1,
      service: 'All',
    },
    {
      id: 2,
      service: 'Completed',
    },
    {
      id: 3,
      service: 'No show',
    },
  ];

  const SelectedServices = (item: any) => {
    console.log(item);
    setSelectedServicedata(item);
    setServiceDD(!serviceDD);
  };
  const [apply, setApply] = useState(false);
  const [cancel, setCancel] = useState(false);
  const [filterData, setFilterData]: any = useState([]);


  const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);

  const [isCalender, setisCalender] = useState(false);
  const firstRoute = useCallback(() => {
    return (
      <View style={{marginVertical: 20, marginBottom:10}}>
        <FlatList
          data={filterData.length > 0 ? filterData : upComming}
          renderItem={renderUpCommingData}
          scrollEnabled={true}
          keyExtractor={(items: any, index: number): any => index}
        />
      </View>
    );
  }, [
    modalVisible,
    apply,
    serviceDD,
    selectedServicedata,
    SelectService,
    filterData,
    isStartDatePickerVisible,
    isEndDatePickerVisible,
  ]);

  const secondRoute = useCallback(() => {
    return (
      <View style={{marginVertical: 0}}>
        <FlatList
          data={History}
          renderItem={renderUpHistoryData}
          keyExtractor={(items: any, index: number): any => index}
        />
      </View>
    );
  }, [
    modalVisible,
    apply,
    serviceDD,
    selectedServicedata,
    SelectHistory,
    filterData,
    isStartDatePickerVisible,
    isEndDatePickerVisible,
  ]);
  const thirdRoute = useCallback(() => {
    return (
      <View style={{marginVertical: 0}}>
        <FlatList
          data={Cancle}
          renderItem={renderUpHistoryData}
          keyExtractor={(items: any, index: number): any => index}
        />
      </View>
    );
  }, [
    modalVisible,
    apply,
    serviceDD,
    selectedServicedata,
    SelectHistory,
    filterData,
    isStartDatePickerVisible,
    isEndDatePickerVisible,
  ]);

  return (
    <View
      style={{
        backgroundColor: Color.white,
        height: Dimensions.get('window').height,
      }}>
      <View
        style={{
          marginHorizontal: 10,
        }}>
        <Header navigation={navigation} backBtn={true} />

        <Text
          style={{
            textAlign: 'center',
            fontSize: 22,
            marginVertical: 20,
            color: Color.textColor,
            fontWeight: 'bold',
          }}>
          Track Complaint
        </Text>
        <CustomTabView
          currentTab={currentTab}
          firstRoute={firstRoute}
          secondRoute={secondRoute}
          thirdRoute={thirdRoute}
          activateTab={activateTab}
          firstRouteTitle="All"
          secondRouteTitle="Pending"
          thirdRouteTitle="Completed"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: '#fff',
    borderColor: Color.textColor,
    borderRadius: 10,
    width: '90%',
    borderWidth: 1,
  },
  modalText: {
    color: 'black',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  closeButton: {
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  closeButtonText: {
    color: Color.mainColor,
    fontWeight: 'bold',
    textAlign: 'right',
    paddingHorizontal: 10,
  },
});

export default TrackYourComplaint;
