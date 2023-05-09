import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,ToastAndroid } from 'react-native';
import { Color } from '../../Constants';
import Header from '../../Components/Header';

const Payment = () => {
  const ShowMessage = () => {
    ToastAndroid.show('This Feature will Soon Avaiable !', ToastAndroid.SHORT);
  }
  return (
    <View style={styles.container}>
      <Header/>
      <Text style={{textAlign:'center', fontSize:22, marginVertical:10, color:Color.mainColor, fontWeight:'bold'}}>Payment</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Card Number</Text>
        <TextInput style={styles.input} placeholder="Enter card number" keyboardType="numeric" />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Expiration Date</Text>
        <TextInput style={styles.input} placeholder="MM/YY" keyboardType="numeric" />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>CVV</Text>
        <TextInput style={styles.input} placeholder="Enter CVV" keyboardType="numeric" />
      </View>
      <TouchableOpacity onPress={ShowMessage} style={styles.button}>
        <Text style={styles.buttonText}>Pay Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  button: {
    backgroundColor: Color.mainColor,
    borderRadius: 5,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Payment;
