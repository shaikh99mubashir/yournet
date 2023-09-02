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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';
const Complaint = ({navigation}: any) => {
  const [complainName, setComplainName] = useState([]);
  const [getUserData, setUserData] = useState<any>([]);
  const cartData: any = useSelector(cartData => cartData);
  useEffect(() => {
    setComplainName(cartData?.user?.cart?.complainNames);
    setUserData(cartData?.user?.cart?.customer);
    // if (getUserData?.company_id) {
    //   getComplaintName();
    // }
  }, []);

  const [selectedServicedata, setSelectedServicedata]: any = useState({});

  const [serviceDD, setServiceDD] = useState(false);
  const SelectedServices = (item: any) => {
    setSelectedServicedata(item);
    setServiceDD(!serviceDD);
  };

  const [generateComplaint, setGenerateComplaint] = useState({
    customer_id: '',
    customer_name: '',
    package_name: '',
    mobile_number: '',
    address: '',
    complain: '',
    description: '',
    external_mobile: '',
    availability_time: 'any',
    company_id: '',
    status: 'Pending',
  });

  const sendComplaintData = () => {
    let data = {...generateComplaint};
    data.customer_id = getUserData?.customer_id;
    data.customer_name = getUserData?.first_name;
    data.package_name = getUserData?.package_name;
    data.mobile_number = getUserData?.mobile_number;
    data.address = getUserData?.FullAddress;
    data.external_mobile = getUserData?.external_moble;
    data.company_id = getUserData?.company_id;
    data.complain = selectedServicedata.ID;

    let flag = Object.values(data);
    let flag2 = flag.some((e, i) => e == '');
    // if (flag2) {
    //   ToastAndroid.show('Your Information is In Completed Contact Admin', ToastAndroid.SHORT);
    //   return;
    // }
    if (!selectedServicedata.ID) {
      ToastAndroid.show(
        'Your Information is In Completed Contact Admin',
        ToastAndroid.SHORT,
      );
      return;
    }
    const formData = new FormData();
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    axios
      .post(`${BaseUrl}generateComplain`, data, config)
      .then((res: any) => {
        // navigation.replace('Help');
        navigation.goBack()

        ToastAndroid.show(`${res.data.message}`, ToastAndroid.BOTTOM);
      })
      .catch(error => {
        ToastAndroid.show('Internal Server Error', ToastAndroid.BOTTOM);
      });
  };

  return (
    <View
      style={{
        backgroundColor: Color.white,
        paddingHorizontal: 15,
        height: '100%',
      }}>
      <ScrollView
        style={{height: '100%'}}
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}>
        <Header navigation={navigation} noLogo backBtn />
        <Text
          style={{
            textAlign: 'center',
            fontSize: 18,
            marginVertical: 10,
            color: Color.mainColor,
            fontWeight: 'bold',
          }}>
          Register Complaint
        </Text>
        <View style={{alignItems: 'center', marginTop: 20, marginBottom: 30}}>
          <Image
            source={require('../../Images/complaint.jpg')}
            style={{width: 120, height: 120}}
          />
        </View>
        <View>
          <View
            style={{
              borderRadius: 0,
              overflow: 'hidden',
              marginHorizontal: 0,
              marginVertical: 0,
              marginTop: 0,
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                color: Color.textColor,
                fontSize: 15,
                fontWeight: 'bold',
                marginVertical: 5,
              }}>
              Select Complaint
            </Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setServiceDD(!serviceDD)}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 15,
                height: 50,
                borderLeftWidth: 5,
                borderLeftColor: Color.mainColor,
                borderRightColor: 'darkgrey',
                borderTopColor: 'darkgrey',
                borderBottomColor: 'darkgrey',
                borderWidth: 1,
                borderRadius: 5,
                borderTopLeftRadius: 5,
                borderTopRightRadius: 5,
                borderBottomWidth: serviceDD ? 0 : 1,
                borderBottomLeftRadius: serviceDD ? 1 : 5,
                borderBottomRightRadius: serviceDD ? 1 : 5,
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
                      color: 'black',
                      fontSize: 14,
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
                      color: 'black',
                      fontSize: 14,
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
              borderBottomEndRadius: 5,
              borderBottomStartRadius: 5,
              borderWidth: !serviceDD ? 0 : 1,
              borderTopWidth: !serviceDD ? 0 : 1,
              borderColor: 'darkgrey',
              // borderColor: Color.textColor,
            }}>
            <ScrollView
              style={{maxHeight: 100}}
              nestedScrollEnabled={true}
              showsVerticalScrollIndicator={false}>
              {serviceDD == true &&
                Array.from(
                  new Set(complainName.map((item: any) => item.complain_name)),
                ).map((e, i) => {
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
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 10,
                        }}>
                        <FontAwesome
                          name="circle"
                          size={6}
                          color={Color.mainColor}
                        />
                        <Text
                          style={{
                            color: Color.textColor,
                            fontSize: 14,
                          }}>
                          {e}
                        </Text>
                      </View>
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
              fontSize: 15,
              fontWeight: 'bold',
              marginTop: 10,
            }}>
            Description
          </Text>
        </View>
        <View
          style={[
            styles.textAreaContainer,
            {
              borderWidth: 1,
              borderRadius: 5,
              marginHorizontal: 2,
            },
          ]}>
          <TextInput
            placeholder="Description"
            multiline={true}
            maxLength={300}
            onChangeText={e =>
              setGenerateComplaint({...generateComplaint, description: e})
            }
            style={[
              styles.textArea,
              {
                padding: 5,
                color: 'black',
              },
            ]}
            underlineColorAndroid="transparent"
            placeholderTextColor="grey"
          />
        </View>

        {/* Submit Button */}

        <View
          style={{
            borderWidth: 1,
            borderColor: generateComplaint.description
              ? Color.mainColor
              : 'darkgrey',
            width: Dimensions.get('window').width / 1.5,
            borderRadius: 30,
            marginVertical: 15,
            alignSelf: 'center',
          }}>
          <TouchableOpacity
            onPress={sendComplaintData}
            style={{
              alignItems: 'center',
              paddingVertical: 5,
              borderRadius: 30,

              backgroundColor: selectedServicedata.ID
                ? Color.mainColor
                : 'darkgrey',
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 18,
                fontFamily: 'Poppins-Regular',
              }}>
              Generate Complaint
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Complaint;

const styles = StyleSheet.create({
  textAreaContainer: {
    borderWidth: 1,
    borderColor: 'darkgrey',
    padding: 5,
  },
  textArea: {
    height: 100,
    justifyContent: 'flex-start',
    textAlignVertical: 'top',
  },
});
