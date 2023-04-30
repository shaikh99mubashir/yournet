import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Animated,
  FlatList,
  Image,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import React, {useState, useRef, useEffect} from 'react';
import Header from '../../Components/Header';
import {Color} from '../../Constants';
const {height, width} = Dimensions.get('window');
const Home = ({navigation}: any) => {
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
  ];

  const [currentIndex, setCurrentIndex] = useState<any>(0);
  const flatListRef = useRef<any>(null);
  // Function to move to next image
  const nextImage = () => {
    const nextIndex = (currentIndex + 1) % data.length;
    setCurrentIndex(nextIndex);
    flatListRef.current.scrollToIndex({animated: true, index: nextIndex});
  };

  // Use effect to move to next image every 5 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      nextImage();
    }, 5000);

    // Cleanup function to clear interval on unmount
    return () => clearInterval(intervalId);
  }, [currentIndex]);

  return (
    <View style={{backgroundColor: Color.white, height: '100%'}}>
      <View style={{marginHorizontal: 10}}>
        <Header navigation={navigation} Drawer Notification title="YOURNET" />
        <Text style={{fontSize: 16, fontFamily: 'Poppins-SemiBold'}}>
          Hello, Mubashir
        </Text>
        <Text style={{fontSize: 14, fontFamily: 'Poppins-Regular'}}>
          User Id: 202020
        </Text>
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
            data={data}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            onScroll={e => {
              const x = e.nativeEvent.contentOffset.x;
              setCurrentIndex((x / (width - 50)).toFixed(0));
            }}
            horizontal
            renderItem={({item, index}) => {
              return (
                <View
                  style={{
                    width: width,
                    height: height / 4,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={item.image}
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
          {data.map((item, index) => {
            return (
              <View
                key={item.id}
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

      {/* mini Cards */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          gap: 20,
          marginTop: 20,
        }}>
        <View
          style={{
            backgroundColor: Color.white,
            elevation: 10,
            width: 90,
            height: 90,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10,
          }}>
          <Text
            style={{
              color: Color.mainColor,
              fontFamily: 'Poppins-SemiBold',
              fontSize: 18,
            }}>
            10Mb
          </Text>
          <Text
            style={{
              color: Color.textColor,
              fontFamily: 'Poppins-SemiBold',
              fontSize: 15,
            }}>
            Package
          </Text>
        </View>
        <View
          style={{
            backgroundColor: Color.white,
            elevation: 10,
            width: 90,
            height: 90,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10,
          }}>
          <Text
            style={{
              color: Color.mainColor,
              fontFamily: 'Poppins-SemiBold',
              fontSize: 18,
            }}>
            1000
          </Text>
          <Text
            style={{
              color: Color.textColor,
              fontFamily: 'Poppins-SemiBold',
              fontSize: 15,
            }}>
            Price
          </Text>
        </View>
        <View
          style={{
            backgroundColor: Color.white,
            elevation: 10,
            width: 90,
            height: 90,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10,
          }}>
          <Text
            style={{
              color: Color.mainColor,
              fontFamily: 'Poppins-SemiBold',
              fontSize: 18,
            }}>
            12 Days
          </Text>
          <Text
            style={{
              color: Color.textColor,
              fontFamily: 'Poppins-SemiBold',
              fontSize: 15,
            }}>
            Stay
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          gap: 20,
          marginTop: 20,
        }}>
        <View
          style={{
            backgroundColor: Color.white,
            elevation: 10,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10,
          }}>
          <Text
            style={{
              color: Color.mainColor,
              fontFamily: 'Poppins-SemiBold',
              fontSize: 18,
            }}>
            12.02.2023
          </Text>
          <Text
            style={{
              color: Color.textColor,
              fontFamily: 'Poppins-SemiBold',
              fontSize: 15,
            }}>
            Start Date
          </Text>
        </View>
        <View
          style={{
            backgroundColor: Color.white,
            elevation: 10,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10,
          }}>
          <Text
            style={{
              color: Color.mainColor,
              fontFamily: 'Poppins-SemiBold',
              fontSize: 18,
            }}>
            12.02.2023
          </Text>
          <Text
            style={{
              color: Color.textColor,
              fontFamily: 'Poppins-SemiBold',
              fontSize: 15,
            }}>
            End Date
          </Text>
        </View>
      </View>

            

    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
