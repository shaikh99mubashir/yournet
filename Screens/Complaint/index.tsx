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
  import React, {useState,useEffect} from 'react';
  import Color from '../../Constants/Color';
  import Header from '../../Components/Header';
  import Ionicons from 'react-native-vector-icons/Ionicons';
import { BaseUrl } from '../../Constants/BaseUrl';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
  const Complaint = ({navigation}: any) => {


    const [userId, setUserId] = useState<any>('');
    const [complainName, setComplainName ] = useState([])
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
  

    console.log('userId===>',userId);
    
  
  
    const getComplaintData = () => {
      if (!userId?.customer_id) {
        navigation.replace('Login');
        AsyncStorage.removeItem('token');
        AsyncStorage.removeItem('loginFields');
        return; // Don't make the API call if the userId is not valid
      }
  
      const formData = new FormData();
      formData.append('company_id', userId.customer_id);
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      axios
        .post(`${BaseUrl}getAllComplainName`, formData, config)
        .then((res: any) => {
          // console.log('res data====>', res?.data?.complain_names);
          setComplainName(res?.data?.complain_names)
        })
        .catch(error => {
          console.log('error==>', error);
          ToastAndroid.show('Internal Server Error', ToastAndroid.BOTTOM)
        });
    };
  
    useEffect(() => {
      if (userId?.customer_id) {
        getComplaintData();
      }
    }, [userId]);
  
  console.log('res?.data?.complain_names', complainName);
  

    const [selectedServicedata, setSelectedServicedata]: any = useState({});
    const [serviceDD, setServiceDD] = useState(false);
    const SelectedServices = (item: any) => {
      setSelectedServicedata(item);
      setServiceDD(!serviceDD);
    };

    console.log('selectedServicedata',selectedServicedata);
    
    
    return (
      <ScrollView nestedScrollEnabled={true}>
      <View
        style={{
          backgroundColor: Color.white,
          height: Dimensions.get('window').height,
          paddingHorizontal: 15,
          paddingVertical:20
        }}>
        <Header navigation={navigation} />
        <View>
            <View  style={{ borderRadius: 12, overflow:'hidden' }}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setServiceDD(!serviceDD)}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  borderWidth: 1,
                  borderTopLeftRadius:12,
                  borderTopRightRadius:12,
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
                      <Ionicons
                        name="chevron-up-sharp"
                        size={20}
                        color="black"
                      />
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
                      <Ionicons
                        name="chevron-up-sharp"
                        size={20}
                        color="black"
                      />
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
                top:-8
              }}>
                <ScrollView style={{maxHeight:100,}} nestedScrollEnabled={true}>
                {serviceDD == true &&
                Array.from(new Set(complainName.map((item:any) => item.complain_name)))
                .map((e,i)=>{
                  console.log('e',e);
                  
                  return(
                    <TouchableOpacity
                      onPress={() =>
                        SelectedServices(
                          complainName.find((item:any) => item.complain_name === e),
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
                  )
                })
                }
                </ScrollView>
            </View>
          </View>
    
        {/* Subject */}
        <View style={{marginHorizontal: 5, marginVertical: 5}}>
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              color: Color.textColor,
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            Subject
          </Text>
        </View>
        <View
          style={{
            width: Dimensions.get('window').width / 1.1,
            borderWidth: 1,
            borderRadius: 10,
            marginHorizontal: 5,
          }}>
          <TextInput
            placeholder="Subject"
            style={{width: Dimensions.get('window').width / 1.21, padding: 12}}
          />
        </View>
        {/* Message */}
        <View style={{marginHorizontal: 5, marginVertical: 5}}>
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              color: Color.textColor,
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            Message
          </Text>
        </View>
        <View
          style={[
            styles.textAreaContainer,
            {
              width: Dimensions.get('window').width / 1.1,
              borderWidth: 1,
              borderRadius: 10,
              marginHorizontal: 5,
            },
          ]}>
          <TextInput
            placeholder="Message"
            multiline={true}
            maxLength={300}
            style={[
              styles.textArea,
              {
                width: Dimensions.get('window').width / 1.21,
                // height: Dimensions.get('screen').height / 6,
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
            width: Dimensions.get('window').width / 1.1,
            borderWidth: 1,
            borderColor: Color.mainColor,
            borderRadius: 5,
            marginHorizontal: 5,
            marginVertical: 20,
          }}>
          <TouchableOpacity
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
  