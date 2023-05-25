import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Color from '../../Constants/Color';
import Header from '../../Components/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {BaseUrl} from '../../Constants/BaseUrl';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Complaint = ({navigation}: any) => {
  const [complainName, setComplainName] = useState([]);
  const [user_id, setUser_id] = useState('');
  const gettingUserDatatoken = () => {
    AsyncStorage.getItem('user_id')
      .then(value => {
        if (value !== null) {
          setUser_id(JSON.parse(value));
        } else {
          console.log('No login fields found');
        }
      })
      .catch(error => console.log('Error retrieving login fields: ', error));
  };
  
  useEffect(() => {
    gettingUserDatatoken();
  }, []);
  // get User DATA
  const [getUserData, setUserData] = useState<any>([]);
  console.log('getUserData',getUserData);
  
  const [loading, setLoading] = useState(false);
  const getData = () => {
    setLoading(!loading);
    const config = {
      headers: {
        User_ID: user_id,
      },
    };
    axios
      .post(
        `${BaseUrl}getAllData`,
        null, 
        config,
      )
      .then((res: any) => {
        console.log('res data', res.data);
        setUserData(res.data.customer);
        setLoading(!loading);
      })
      .catch(error => {
        // console.log('error==>', error);
        ToastAndroid.show('Internal Server Error', ToastAndroid.BOTTOM);
        setLoading(!loading);
      });
    };
    
    useEffect(() => {
    getData();
  }, [user_id]);

  const getComplaintName = () => {
    if (!user_id) {
      navigation.replace('Login');
      AsyncStorage.removeItem('user_id');
      AsyncStorage.removeItem('loginFields');
      return; // Don't make the API call if the userId is not valid
    }

    const formData = new FormData();
    formData.append('company_id', getUserData?.company_id);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    axios
      .post(`${BaseUrl}getAllComplainName`, formData, config)
      .then((res: any) => {
        // console.log('res data====>', res?.data?.complain_names);
        setComplainName(res?.data?.complain_names);
      })
      .catch(error => {
        console.log('error==>', error);
        ToastAndroid.show('Internal Server Error', ToastAndroid.BOTTOM);
      });
  };

  useEffect(() => {
    if (getUserData?.company_id) {
      getComplaintName();
    }
  }, [getUserData?.company_id]);

  const [selectedServicedata, setSelectedServicedata]: any = useState({});
  console.log('selectedServicedata',selectedServicedata);
  
  const [serviceDD, setServiceDD] = useState(false);
  const SelectedServices = (item: any) => {
    setSelectedServicedata(item);
    setServiceDD(!serviceDD);
  };
  console.log('customer_id',getUserData?.customer_id);
  console.log('customer_name',getUserData?.first_name);
  console.log('package_name',getUserData?.package_name);
  console.log('mobile_number',getUserData?.mobile_number);
  console.log('address',getUserData?.address);
  console.log('external_mobile',getUserData?.external_moble);
  console.log('company_id',getUserData?.company_id);
  
  const [generateComplaint, setGenerateComplaint] = useState({
    customer_id:'',
    customer_name:'',
    package_name:'',
    mobile_number:'',
    address:'',
    complain:'',
    description:'',
    external_mobile:'',
    availability_time:'any',
    company_id:'',
    status:'Pending',
  })
  console.log('generateComplaint',generateComplaint);
  
  const sendComplaintData = () => {
    let data = {...generateComplaint}
    data.customer_id = getUserData?.customer_id
    data.customer_name = getUserData?.first_name
    data.package_name = getUserData?.package_name
    data.mobile_number = getUserData?.mobile_number
    data.address = getUserData?.address
    data.external_mobile = getUserData?.external_moble
    data.company_id = getUserData?.company_id
    data.complain = selectedServicedata.ID

    let flag = Object.values(data);
    let flag2 = flag.some((e, i) => e == '');
    if (flag2) {
      ToastAndroid.show('Required fields are missing', ToastAndroid.SHORT);
      return;
    }
    const formData = new FormData();
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    axios
    .post(
      `${BaseUrl}generateComplain`,
      data,
      config,
    )
    .then((res: any) => {
      console.log('res data', res.data.message);
      navigation.replace('Help')
      ToastAndroid.show(`${res.data.message}`, ToastAndroid.BOTTOM);
    })
    .catch(error => {
      ToastAndroid.show('Internal Server Error', ToastAndroid.BOTTOM);
    });
  }

  return (
    <ScrollView nestedScrollEnabled={true}>
      <View
        style={{
          backgroundColor: Color.white,
          height: Dimensions.get('window').height,
          paddingHorizontal: 15,
          paddingVertical: 20,
        }}>
        <Header navigation={navigation} noLogo backBtn />
        <Text
          style={{
            textAlign: 'center',
            fontSize: 22,
            marginVertical: 10,
            color: Color.mainColor,
            fontWeight: 'bold',
          }}>
          Register Complaint
        </Text>
        <View>
          <View style={{borderRadius: 12, overflow: 'hidden',marginHorizontal: 0, marginVertical: 5}}>
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              color: Color.textColor,
              fontSize: 16,
              fontWeight: 'bold',
              marginVertical:5,
              marginHorizontal:5
            }}>
            Select Complaint
          </Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setServiceDD(!serviceDD)}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: 10,
                paddingHorizontal: 15,
                borderWidth: 1,
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
                borderBottomWidth: serviceDD ? 0 : 1,
                borderBottomLeftRadius: serviceDD ? 1 : 12,
                borderBottomRightRadius: serviceDD ? 1 : 12,
                borderColor: Color.textColor,
                alignItems: 'center',
              }}>
              {selectedServicedata &&
              Object.keys(selectedServicedata).length > 0 ? (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}>
                  <Text
                    style={{
                      color: Color.textColor,
                      fontFamily: 'Poppins-SemiBold',
                      fontSize: 16,
                    }}>
                    {selectedServicedata.complain_name &&
                    selectedServicedata.complain_name > 10
                      ? selectedServicedata.complain_name.slice(0, 10)
                      : selectedServicedata.complain_name}
                  </Text>
                  {serviceDD ? (
                    <Ionicons name="chevron-up-sharp" size={20} color="black" />
                  ) : (
                    <Ionicons
                      name="chevron-down-sharp"
                      size={20}
                      color="black"
                    />
                  )}
                </View>
              ) : (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}>
                  <Text
                    style={{
                      color: Color.textColor,
                      fontFamily: 'Poppins-SemiBold',
                      fontSize: 16,
                    }}>
                    Select Complain
                  </Text>
                  {serviceDD ? (
                    <Ionicons name="chevron-up-sharp" size={20} color="black" />
                  ) : (
                    <Ionicons
                      name="chevron-down-sharp"
                      size={20}
                      color="black"
                    />
                  )}
                </View>
              )}
            </TouchableOpacity>
          </View>
          <View
            style={{
              borderBottomEndRadius: 12,
              borderBottomStartRadius: 12,
              borderWidth: !serviceDD ? 0 : 1,
              borderTopWidth: !serviceDD ? 0 : 1,
              borderColor: Color.textColor,
              top: -14,
            }}>
            <ScrollView style={{maxHeight: 100}} nestedScrollEnabled={true}>
              {serviceDD == true &&
                Array.from(
                  new Set(complainName.map((item: any) => item.complain_name)),
                ).map((e, i) => {
                  console.log('e', e);

                  return (
                    <TouchableOpacity
                      onPress={() =>
                        SelectedServices(
                          complainName.find(
                            (item: any) => item.complain_name === e,
                          ),
                        )
                      }
                      key={i}
                      style={{
                        flexDirection: 'row',
                        paddingHorizontal: 20,
                        marginVertical: 5,
                        gap: 10,
                      }}>
                      <Text
                        style={{
                          color: Color.textColor,
                          fontFamily: 'Poppins-SemiBold',
                          fontSize: 16,
                        }}>
                        {e}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
            </ScrollView>
          </View>
        </View>

        {/* Description */}
        <View style={{marginHorizontal: 5, marginVertical: 5}}>
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              color: Color.textColor,
              fontSize: 16,
              fontWeight: 'bold',
              marginHorizontal:3
            }}>
            Description
          </Text>
        </View>
        <View
          style={[
            styles.textAreaContainer,
            {
              borderWidth: 1,
              borderRadius: 12,
              marginHorizontal: 2,
            },
          ]}>
          <TextInput
            placeholder="Description"
            multiline={true}
            maxLength={300}
            onChangeText={(e)=> setGenerateComplaint({...generateComplaint, description:e})}
            style={[
              styles.textArea,
              {
                // width: Dimensions.get('window').width / 1.21,
                padding: 12,
              },
            ]}
            underlineColorAndroid="transparent"
            // placeholder="Type something"
            placeholderTextColor="grey"
          />
        </View>

        {/* Send Button */}
        <View
          style={{
            // width: Dimensions.get('window').width / 1.1,
            borderWidth: 1,
            borderColor: Color.mainColor,
            borderRadius: 5,
            marginVertical: 20,
          }}>
          <TouchableOpacity
          onPress={sendComplaintData}
            style={{
              alignItems: 'center',
              padding: 10,
              backgroundColor: Color.mainColor,
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 18,
                fontFamily: 'Poppins-Regular',
              }}>
              Send
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Complaint;

const styles = StyleSheet.create({
  textAreaContainer: {
    // borderColor: COLORS.grey20,
    borderWidth: 1,
    padding: 5,
  },
  textArea: {
    height: 150,
    justifyContent: 'flex-start',
    textAlignVertical: 'top',
  },
});
