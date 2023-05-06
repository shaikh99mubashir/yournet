import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Animated,
  FlatList,
  Image,
  ScrollView,
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
        {/* User Name Inage And Id */}
        <View style={{flexDirection: 'row', gap: 10}}>
          <Image
            source={require('../../Images/avatar.png')}
            style={{width: 45, height: 45, borderRadius: 50}}
            resizeMode="contain"
          />
          <View>
            <Text style={{fontSize: 15, fontFamily: 'Poppins-SemiBold'}}>
              Mubashir
            </Text>
            <Text style={{fontSize: 14, fontFamily: 'Poppins-Regular'}}>
              User Id: 202020
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
                <Text style={styles.package}>
                  Account Status:{'\n'}{' '}
                  <Text style={styles.status}>Activated</Text>
                </Text>
                <Text style={styles.package}>
                  Renewal Date: {'\n'}
                  <Text style={{color: Color.textColor}}>12/05/2023</Text>
                </Text>
                <Text style={styles.package}>
                  Expiry Date: {'\n'}
                  <Text style={{color: Color.textColor}}>12/05/2024</Text>
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: Color.mainColor,
                  paddingHorizontal: 20,
                  paddingVertical: 20,
                  borderRadius: 10,
                  alignItems: 'center',
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
                    color: Color.textColor,
                    fontSize: 25,
                    fontWeight: 'bold',
                  }}>
                  7Mbps
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
            <View
              style={{
                flexDirection: 'row',
                gap: 10,
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={require('../../Images/slider2.jpg')}
                style={{width: 100, height: 100, borderRadius: 10}}
              />
              <Image
                source={require('../../Images/slider2.jpg')}
                style={{width: 100, height: 100, borderRadius: 10}}
              />
              <Image
                source={require('../../Images/slider2.jpg')}
                style={{width: 100, height: 100, borderRadius: 10}}
              />
              <Image
                source={require('../../Images/slider2.jpg')}
                style={{width: 100, height: 100, borderRadius: 10}}
              />
              <Image
                source={require('../../Images/slider2.jpg')}
                style={{width: 100, height: 100, borderRadius: 10}}
              />
              <Image
                source={require('../../Images/slider2.jpg')}
                style={{width: 100, height: 100, borderRadius: 10}}
              />
            </View>
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
                      style={{borderRadius: 10, width: '90%', height: '94%'}}
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

        {/*  */}
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
    fontWeight: 'bold',
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
