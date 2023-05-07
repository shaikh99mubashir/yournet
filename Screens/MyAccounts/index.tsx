import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView
} from 'react-native';
import React, {useState} from 'react';
import Header from '../../Components/Header';
import {Color} from '../../Constants';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const MyAccounts = () => {
  const [editNickName, setEditNickName] = useState<boolean>(false);
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{marginHorizontal: 10}}>
      <Header />
      <Text
        style={{
          fontSize: 26,
          fontWeight: 'bold',
          marginTop: 15,
          color: Color.mainColor,
        }}>
        My Account
      </Text>
      <Text style={{fontSize: 16, marginTop: 15, color: Color.textColor}}>
        Personnal Details
      </Text>
      {/* Nick Name */}
      <View
        style={{
          backgroundColor: Color.white,
          elevation: 10,
          padding: 10,
          borderRadius: 10,
          marginVertical: 15,
        }}>
        <Text
          style={{color: Color.textColor, fontWeight: 'bold', fontSize: 16}}>
          Nick Name
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 10,
          }}>
          {editNickName ? (
            <TextInput placeholder="Edit Your Nick Name" placeholderTextColor={Color.textColor} style={{color:Color.textColor}}/>
          ) : (
            <Text
              style={{
                color: Color.textColor,
                fontWeight: 'bold',
                fontSize: 24,
              }}>
              Mubashir
            </Text>
          )}
          <TouchableOpacity onPress={() => setEditNickName(!editNickName)}>
            <FontAwesome
              name={editNickName ? 'save' : 'edit'}
              size={25}
              color={Color.textColor}
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* userName */}
      <View
        style={{
          backgroundColor: Color.white,
          elevation: 10,
          padding: 10,
          borderRadius: 10,
          marginBottom: 15,
        }}>
        <Text
          style={{color: Color.textColor, fontWeight: 'bold', fontSize: 16}}>
          User Name
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <Text
            style={{
              color: Color.textColor,
              fontWeight: 'bold',
              fontSize: 24,
            }}>
            Mubashir
          </Text>
        </View>
      </View>
      {/* Mobile No */}
      <View
        style={{
          backgroundColor: Color.white,
          elevation: 10,
          padding: 10,
          borderRadius: 10,
          marginBottom: 15,
        }}>
        <Text
          style={{color: Color.textColor, fontWeight: 'bold', fontSize: 16}}>
          Mobile Number
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <Text
            style={{
              color: Color.textColor,
              fontWeight: 'bold',
              fontSize: 20,
            }}>
            +92 5151511511
          </Text>
        </View>
      </View>
      {/* E-mail */}
      <View
        style={{
          backgroundColor: Color.white,
          elevation: 10,
          padding: 10,
          borderRadius: 10,
          marginBottom: 15,
        }}>
        <Text
          style={{color: Color.textColor, fontWeight: 'bold', fontSize: 16}}>
          E-mail
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <Text
            style={{
              color: Color.textColor,
              fontWeight: 'bold',
              fontSize: 20,
            }}>
            shaikh99mubashir@gmail.com
          </Text>
        </View>
      </View>
      {/* Account Opening Date */}
      <View
        style={{
          backgroundColor: Color.white,
          elevation: 10,
          padding: 10,
          borderRadius: 10,
          marginBottom: 15,
        }}>
        <Text
          style={{color: Color.textColor, fontWeight: 'bold', fontSize: 16}}>
          Account Opening Date
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <Text
            style={{
              color: Color.textColor,
              fontWeight: 'bold',
              fontSize: 20,
            }}>
            20/20/20
          </Text>
        </View>
      </View>
      {/* Service Provider */}
      <View
        style={{
          backgroundColor: Color.white,
          elevation: 10,
          padding: 10,
          borderRadius: 10,
          marginBottom: 15,
        }}>
        <Text
          style={{color: Color.textColor, fontWeight: 'bold', fontSize: 16}}>
          Service Provider
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <Text
            style={{
              color: Color.textColor,
              fontWeight: 'bold',
              fontSize: 20,
            }}>
            Yournet
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default MyAccounts;

const styles = StyleSheet.create({});
