import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../Components/Header';
import {Color} from '../../Constants';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import HTML from 'react-native-render-html';
const FAQs = ({navigation}: any) => {
  // const [faqsData, setFaqsData] = useState([
  //   {
  //     id: 1,
  //     question: 'Question 1',
  //     answer:
  //       'Hey! Remember you have to attribute Ilham Fitrotul Hayat Every time you attribute, you get +10 to your Karma Select your favorite social network and share our icons with your contacts or friends. If you don’t have these social networks, simply copy the link and paste it in the one you use. For more information read the  or download the license.',
  //       open: false,
  //     },
  //   {
  //     id: 2,
  //     question: 'Question 2',
  //     answer:
  //       'Hey! Remember you have to attribute Ilham Fitrotul Hayat Every time you attribute, you get +10 to your Karma Select your favorite social network and share our icons with your contacts or friends. If you don’t have these social networks, simply copy the link and paste it in the one you use. For more information read the  or download the license.',
  //       open: false,
  //     },
  // ]);
  const [open, setOpen] = useState(false);
  const [faqsData, setFaqsData] = useState([]);
  
  const cartData: any = useSelector(cartData => cartData);
  const getfaqs = cartData?.user?.cart?.faqs;
  const getData = () => {
    
    const updatedFaqs = getfaqs.map((faq: any) => {
      return {
        ...faq,
        open: false,
      };
    });
    setFaqsData(updatedFaqs);
  }


  useEffect(()=>{
    getData()
  },[])




  const handleQuestionPress = (index: number) => {
    console.log('index',index);
    setFaqsData((prevData:any) =>
      prevData.map((faq:any, i:number) => ({
        ...faq,
        open: i == index ? !faq.open : false,
      }))
    );
  };
  return (
    <View
      style={{paddingHorizontal: 15, backgroundColor: 'white', height: '100%',flex:1}}>
      {/* <ScrollView> */}
        <Header navigation={navigation} backBtn noLogo />
        <Text
          style={{
            textAlign: 'center',
            fontSize: 22,
            marginVertical: 10,
            color: Color.mainColor,
            fontWeight: 'bold',
          }}>
          FAQs
        </Text>

        <FlatList
          data={faqsData ?? []}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
          renderItem={({item, index}: any) => {
            return (
              <View style={{elevation:10}}>
                <TouchableOpacity
                onPress={() => handleQuestionPress(index)}
                key={index}
                  style={{
                    borderWidth: 1,
                    paddingHorizontal: 10,
                    paddingVertical: 15,
                    flexDirection: 'row',
                    width: '100%',
                    borderRadius: 10,
                    borderColor: '#eee',
                    borderBottomWidth: item.open ? 0 : 1,
                    borderBottomLeftRadius: item.open ? 1 : 5,
                    borderBottomRightRadius: item.open ? 1 : 5,
                    marginBottom: item.open? 0 :15,
                  }}>
                  <View style={{width: '93%'}}>
                    {/* <Text
                      style={{fontSize: 15, fontWeight: '600', color: 'black'}}>
                      {item.title}
                    </Text> */}
                    <HTML
                    source={{html: item.title}}
                    ignoredDomTags={['o:p']}
                    contentWidth={300} // Set the content width as per your design
                    baseStyle={
                      {
                        // textAlign: 'justify',
                        // fontSize: 14,
                        // color: Color.textColor,
                        color: 'black',
                      }
                    }/>
                  </View>
                  <TouchableOpacity onPress={() => handleQuestionPress(index)}>
                    {item.open ? (
                      <Image
                        source={require('../../Images/minus.png')}
                        style={{width: 20, height: 20}}
                        resizeMode="contain"
                      />
                    ) : (
                      <Image
                        source={require('../../Images/plus.png')}
                        style={{width: 20, height: 20}}
                        resizeMode="contain"
                      />
                    )}
                  </TouchableOpacity>
                </TouchableOpacity>
                {item.open ? (
                  <View
                    style={{
                      borderWidth: 1,
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      paddingBottom: 10,
                      flexDirection: 'row',
                      width: '100%',
                      borderRadius: 10,
                      borderColor: '#eee',
                      borderTopWidth: 0,
                      borderTopLeftRadius: 0,
                      borderTopRightRadius: 0,
                      marginBottom:15,
                      
                    }}>
                    {/* <Text style={{color: 'black'}}>
                      {item.description}
                    </Text> */}
                    <HTML
                    source={{html: item.description}}
                    ignoredDomTags={['o:p']}
                    contentWidth={300} // Set the content width as per your design
                    baseStyle={
                      {
                        // textAlign: 'justify',
                        // fontSize: 14,
                        // color: Color.textColor,
                        color: 'black',
                      }
                    }/>
                  </View>
                ) : (
                  ''
                )}
              </View>
            );
          }}
        />
      {/* </ScrollView> */}
    </View>
  );
};

export default FAQs;

const styles = StyleSheet.create({});
