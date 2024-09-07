import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { observer } from 'mobx-react-lite';
import AuthStore from './stores/AuthStore'; // 引入 AuthStore

const HomeScreen = observer(({ navigation }) => {
  const handleLogout = () => {
    AuthStore.logout();
    navigation.navigate('LoginScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Day Shift, {AuthStore.username}</Text>
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('MyShiftScreen')}
      >
        <Text style={styles.buttonText}>My Shift</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('NeedChangeScreen')}
      >
        <Text style={styles.buttonText}>Need Change</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5', // Light grey background color
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#333', // Dark grey text color
  },
  button: {
    width: '80%',
    height: 50,
    backgroundColor: '#4CAF50', // Green background color
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#fff', // White text color
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoutButton: {
    marginTop: 20,
    paddingVertical: 15,
    paddingHorizontal: 50,
    backgroundColor: '#FF3D00', // Red background color for logout
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logoutButtonText: {
    color: '#fff', // White text color
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
