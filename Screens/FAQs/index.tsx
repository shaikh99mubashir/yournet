import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../../Components/Header';
import {Color} from '../../Constants';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
const FAQs = ({navigation}: any) => {
  const [open, setOpen] = useState(false);

  const [faqsData, setFaqsData] = useState([
    {
      id: 1,
      question: 'Question 1',
      answer:
        'Hey! Remember you have to attribute Ilham Fitrotul Hayat Every time you attribute, you get +10 to your Karma Select your favorite social network and share our icons with your contacts or friends. If you don’t have these social networks, simply copy the link and paste it in the one you use. For more information read the  or download the license.',
        open: false,
      },
    {
      id: 2,
      question: 'Question 2',
      answer:
        'Hey! Remember you have to attribute Ilham Fitrotul Hayat Every time you attribute, you get +10 to your Karma Select your favorite social network and share our icons with your contacts or friends. If you don’t have these social networks, simply copy the link and paste it in the one you use. For more information read the  or download the license.',
        open: false,
      },
  ]);

  const handleQuestionPress = (index: number) => {
    console.log('index',index);
    setFaqsData((prevData) =>
      prevData.map((faq, i) => ({
        ...faq,
        open: i == index ? !faq.open : false,
      }))
    );
  };
  return (
    <View
      style={{paddingHorizontal: 15, backgroundColor: 'white', height: '100%'}}>
      <ScrollView>
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
          showsHorizontalScrollIndicator={false}
          nestedScrollEnabled
          renderItem={({item, index}: any) => {
            return (
              <>
                <View
                key={index}
                  style={{
                    borderWidth: 1,
                    paddingHorizontal: 10,
                    paddingVertical: 15,
                    flexDirection: 'row',
                    width: '100%',
                    borderRadius: 5,
                    borderColor: 'gray',
                    borderBottomWidth: item.open ? 0 : 1,
                    borderBottomLeftRadius: item.open ? 1 : 5,
                    borderBottomRightRadius: item.open ? 1 : 5,
                    marginBottom: item.open? 0 :15,
                  }}>
                  <View style={{width: '93%'}}>
                    <Text
                      style={{fontSize: 15, fontWeight: '600', color: 'black'}}>
                      {item.question}
                    </Text>
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
                </View>
                {item.open ? (
                  <View
                    style={{
                      borderWidth: 1,
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      paddingBottom: 10,
                      flexDirection: 'row',
                      width: '100%',
                      borderRadius: 5,
                      borderColor: 'gray',
                      borderTopWidth: 0,
                      borderTopLeftRadius: 0,
                      borderTopRightRadius: 0,
                      marginBottom:15,
                      
                    }}>
                    <Text style={{color: 'black'}}>
                      {item.answer}
                    </Text>
                  </View>
                ) : (
                  ''
                )}
              </>
            );
          }}
        />
      </ScrollView>
    </View>
  );
};

export default FAQs;

const styles = StyleSheet.create({});
