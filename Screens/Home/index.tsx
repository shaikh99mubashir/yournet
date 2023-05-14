import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import React, {useState, useRef, useEffect} from 'react';
import Header from '../../Components/Header';
import {Color} from '../../Constants';
import {BaseUrl} from '../../Constants/BaseUrl';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const {height, width} = Dimensions.get('window');
const Home = ({navigation}: any) => {
  // To retrieve the loginFields
  const [userId, setUserId] = useState<any>('');

  // console.log('userId',userId.customer_id);
  const gettingUserData = () => {
    AsyncStorage.getItem('loginFields')
      .then(value => {
        if (value !== null) {
          setUserId(JSON.parse(value));
        } else {
          console.log('No login fields found');
        }
      })
      .catch(error => console.log('Error retrieving login fields: ', error));
  };
  useEffect(() => {
    gettingUserData();
  }, []);
  const data = [
    {
      id: 1,
      image: require('../../Images/slider1.jpg'),
    },
    {
      id: 2,
      image: require('../../Images/slider2.jpg'),
    },
    {
      id: 3,
      image: require('../../Images/slider3.jpg'),
    },
    {
      id: 4,
      image: require('../../Images/slider1.jpg'),
    },
  ];
  const [getUserData, setUserData] = useState<any>([]);
  const getData = () => {
    const formData = new FormData();
    formData.append('customer_id', userId?.customer_id);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    axios
      .post(`${BaseUrl}getdata`, formData, config)
      .then((res: any) => {
        // console.log('res',res.data);
        setUserData(res.data.customer);
      })
      .catch(error => {
        console.log('error==>', error);
        ToastAndroid.show('Internal Server Error', ToastAndroid.BOTTOM);
      });
  };

  useEffect(() => {
    getData();
  }, [userId?.customer_id]);
  const [userPackage, setUserPackage] = useState<any>([]);
  // console.log('userPackage',userPackage);

  const getPackageData = () => {
    const formData = new FormData();
    formData.append('package_id', getUserData?.package_id);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    axios
      .post(`${BaseUrl}getPackageDetails`, formData, config)
      .then((res: any) => {
        setUserPackage(res.data.package);
      })
      .catch(error => {
        console.log('error==>', error);
        ToastAndroid.show('Internal Server Error', ToastAndroid.BOTTOM);
      });
  };
  useEffect(() => {
    getPackageData();
  }, [getUserData?.package_id]);

  const [promotionData, setPromotionData] = useState([]);
  const getPromotionData = () => {
    const formData = new FormData();
    formData.append('company_id', getUserData?.company_id);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    axios
      .post(`${BaseUrl}getPromotionsByCompanyId`, formData, config)
      .then((res: any) => {
        setPromotionData(res.data.promotions);
      })
      .catch(error => {
        console.log('error==>', error);
        ToastAndroid.show('Internal Server Error', ToastAndroid.BOTTOM);
      });
  };
  console.log('promotionData====>', promotionData);

  useEffect(() => {
    getPromotionData();
  }, [getUserData?.company_id]);
  const [currentIndex, setCurrentIndex] = useState<any>(0);
  const flatListRef = useRef<any>(null);
  // Function to move to next image
  const nextImage = () => {
    if (promotionData && promotionData.length > 0) {
      const nextIndex = (currentIndex + 1) % promotionData.length;
      flatListRef.current?.scrollToIndex({index: nextIndex});
      setCurrentIndex(nextIndex);
    }
  };

  // Use effect to move to next image every 5 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      nextImage();
    }, 5000);

    // Cleanup function to clear interval on unmount
    return () => clearInterval(intervalId);
  }, [currentIndex]);

  const ShowMessage = () => {
    ToastAndroid.show('This Feature will Soon Avaiable !', ToastAndroid.SHORT);
  };

  return (
    <View style={{backgroundColor: Color.white, height: '100%'}}>
      <View style={{marginHorizontal: 10}}>
        <Header navigation={navigation} Drawer Notification />
        {/* User Name Inage And Id */}

        <View style={{flexDirection: 'row', gap: 10, marginTop: 20}}>
          <Image
            source={require('../../Images/avatar.png')}
            style={{width: 45, height: 45, borderRadius: 50}}
            resizeMode="contain"
          />
          <View>
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Poppins-SemiBold',
                color: Color.textColor,
              }}>
              {getUserData?.first_name}
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'Poppins-Regular',
                color: Color.textColor,
              }}>
              User Id: {getUserData?.customer_id}
            </Text>
          </View>
        </View>
      </View>
      <ScrollView>
        <View style={{marginHorizontal: 10}}>
          <Text
            style={{
              fontSize: 25,
              fontFamily: 'Poppins-SemiBold',
              marginLeft: 5,
              marginTop: 5,
              color: Color.mainColor,
            }}>
            Welcome Back!
          </Text>
          {/* Account Information */}
          <View style={styles.container}>
            <View style={styles.body}>
              <View style={{}}>
                <View></View>
                <Text
                  style={[styles.package, {fontSize: 30, textAlign: 'center'}]}>
                  Account {'\n'} Status{' '}
                </Text>
                <View style={{alignItems: 'center'}}>
                  <Text
                    style={[
                      styles.status,
                      {
                        color: Color.white,
                        fontSize: 25,
                        backgroundColor:
                          getUserData?.status == 'Active'
                            ? '#4ecc05'
                            : getUserData?.status == 'Inactive '
                            ? 'red'
                            : getUserData?.status == 'Registered'
                            ? '#eee'
                            : getUserData?.status == 'Terminate'
                            ? 'darkgrey'
                            : 'pink',
                        paddingHorizontal: 10,
                        paddingVertical: 3,
                      },
                    ]}>
                    {getUserData?.status == 'Inactive'
                      ? 'Expire'
                      : getUserData?.status}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                    marginTop: 10,
                  }}>
                  <Image
                    source={require('../../Images/redIcon.png')}
                    style={{width: 20, height: 26}}
                  />
                  <Text
                    style={[
                      styles.package,
                      {fontWeight: 'bold', fontSize: 18},
                    ]}>
                    Renewal Date: {'\n'}
                    <Text style={{color: Color.textColor}}>
                      {getUserData?.activation_date}
                    </Text>
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                    marginVertical: 10,
                  }}>
                  <Image
                    source={require('../../Images/redIcon.png')}
                    style={{width: 20, height: 26}}
                  />
                  <Text
                    style={[
                      styles.package,
                      {fontWeight: 'bold', fontSize: 18},
                    ]}>
                    Expiry Date: {'\n'}
                    <Text style={{color: Color.textColor}}>
                      {getUserData?.expiry_date}
                    </Text>
                  </Text>
                </View>
              </View>
              <View style={{flex: 1}}>
                <View
                  style={{
                    backgroundColor: Color.mainColor,
                    paddingHorizontal: 10,
                    paddingVertical: 15,
                    borderRadius: 10,
                    alignItems: 'center',
                    // height: 150,
                  }}>
                  <Text
                    style={{
                      color: Color.white,
                      fontSize: 25,
                      fontWeight: 'bold',
                    }}>
                    Package
                  </Text>
                  <Text
                    style={{
                      color: '#f9e208',
                      fontSize: 25,
                      fontWeight: 'bold',
                    }}>
                    {userPackage?.package_mbps == null
                      ? '0'
                      : userPackage.package_mbps}{' '}
                    Mbps
                  </Text>
                  <Text
                    style={{
                      color: Color.white,
                      fontSize: 25,
                      fontWeight: 'bold',
                    }}>
                    unlimited
                  </Text>
                </View>
                <Image
                  source={require('../../Images/leaf.png')}
                  style={{
                    width: 100,
                    height: 120,
                    marginTop: 15,
                    marginLeft: 20,
                  }}
                  resizeMode="contain"
                />
              </View>
            </View>
          </View>
          {/* Web POrtal */}
          <View style={{marginVertical: 20}}>
            <Text
              style={{
                fontSize: 25,
                fontFamily: 'Poppins-SemiBold',
                color: Color.mainColor,
                textAlign: 'center',
              }}>
              Web Portals
            </Text>
            <FlatList
              data={data}
              showsHorizontalScrollIndicator={false}
              nestedScrollEnabled
              horizontal
              renderItem={({item, index}: any) => {
                return (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={{paddingRight: 10}}>
                    <Image
                      source={item.image}
                      style={{width: 100, height: 100, borderRadius: 10}}
                    />
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
        {/* Slider */}
        <View>
          <View
            style={{
              height: height / 4,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <FlatList
              ref={flatListRef}
              data={promotionData ?? []}
              showsHorizontalScrollIndicator={false}
              nestedScrollEnabled={true}
              pagingEnabled
              onScroll={e => {
                const x = e.nativeEvent.contentOffset.x;
                setCurrentIndex((x / (width - 50)).toFixed(0));
              }}
              horizontal
              renderItem={({item, index}: any) => {
                return (
                  <View
                    style={{
                      width: width,
                      height: height / 4,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={{ uri: item.image }}
                      style={{borderRadius: 10, width: '94%', height: '94%'}}
                      resizeMode="contain"
                    />
                  </View>
                );
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: width,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {promotionData &&
              promotionData.map((item: any, index: number) => {
                return (
                  <View
                    key={item.ID}
                    style={{
                      width: currentIndex == index ? 20 : 8,
                      height: currentIndex == index ? 10 : 8,
                      borderRadius: currentIndex == index ? 5 : 4,
                      backgroundColor:
                        currentIndex == index ? Color.mainColor : 'gray',
                      marginLeft: 5,
                    }}></View>
                );
              })}
          </View>
        </View>

        {/* Help And Support */}
        <View
          style={{
            flexDirection: 'row',
            gap: 10,
            alignItems: 'center',
            backgroundColor: Color.white,
            elevation: 5,
            marginVertical: 20,
            marginHorizontal: 10,
            borderRadius: 10,
            padding: 10,
          }}>
          <Image
            source={require('../../Images/headphone.png')}
            style={{width: 80, height: 80}}
            resizeMode="contain"
          />
          {/* <AntDesign name="customerservice" color={Color.mainColor} size={80} /> */}
          <View style={{}}>
            <Text style={{fontSize: 16, fontWeight: 'bold', color: 'black'}}>
              Help & Customer Support
            </Text>
            <Text style={{fontSize: 14, color: Color.textColor}}>
              Register a complaint or get quick {'\n'} help on quries related to
              <Text style={{color: Color.mainColor, fontWeight: 'bold'}}>
                {' '}
                Yournet
              </Text>
            </Text>
            <TouchableOpacity
              onPress={ShowMessage}
              activeOpacity={0.8}
              style={{
                borderWidth: 1,
                width: 120,
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 8,
                borderRadius: 50,
                borderColor: Color.mainColor,
                marginVertical: 10,
                flexDirection: 'row',
                gap: 10,
              }}>
              <Text
                style={{
                  color: Color.textColor,
                  fontWeight: 'bold',
                  fontSize: 16,
                }}>
                Get Help
              </Text>
              <AntDesign name="arrowright" color={Color.mainColor} size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.white,
    elevation: 10,
    padding: 10,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  body: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 20,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  status: {
    fontSize: 16,
    color: 'green',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  package: {
    fontSize: 16,
    marginBottom: 5,
    color: Color.mainColor,
    // fontWeight: 'bold',
  },
  renewal: {
    fontSize: 16,
    marginBottom: 5,
  },
  expiry: {
    fontSize: 16,
    marginBottom: 5,
  },
});
