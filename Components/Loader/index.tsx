import {
    ActivityIndicator,
    Dimensions,
    Modal,
    StyleSheet,
    Text,
    View,
  } from 'react-native';
  import React from 'react';
  import {Color} from '../../Constants';
  const {height, width} = Dimensions.get('window');
  
  const Loader = ({modal,}: any) => {
    return (
      <Modal animationType="fade" transparent={true} visible={modal}>
        <View
          style={{
            width: width,
            height: height,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: Color.white,
            opacity: 0.9,
          }}>
          <ActivityIndicator
            size="large"
            color={Color.mainColor}
          />
        </View>
      </Modal>
    );
  };
  
  export default Loader;
  
  const styles = StyleSheet.create({});