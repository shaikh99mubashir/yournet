import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

const Profile = () => {
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image source={require('../../Images/avatar.png')} style={styles.profileImage} />
        <Text style={styles.profileName}>Mubashir</Text>
        <Text style={styles.profileEmail}>Mubashir@gmail.com</Text>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Account Balance</Text>
          <Text style={styles.infoAmount}>$200</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Data Usage</Text>
          <Text style={styles.infoAmount}>50 GB</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Payment Method</Text>
          <Text style={styles.infoAmount}>Visa **** **** **** 1234</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  profileEmail: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  editButton: {
    backgroundColor: '#1E90FF',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  infoContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  infoBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoAmount: {
    fontSize: 16,
    color: '#555',
  },
  logoutButton: {
    backgroundColor: '#DC143C',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Profile;
