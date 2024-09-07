import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import apiFetch from './services/api'; // 引入 apiFetch 函数

export default function RegisterScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleRegister = async () => {
    if (!username || !password || !email) {
      Alert.alert('Validation Error', 'Username, email, and password are required.');
      return;
    }
  
    try {
      const response = await apiFetch('/auth/register', {
        method: 'POST',
        data: {
          username: username,
          password: password,
          email: email,
        },
      });
  
      if (response.success) {
        Alert.alert('Registration successful', 'You can now log in with your new account.');
        navigation.navigate('LoginScreen', { username, password });
      } else {
        Alert.alert('Registration failed', response.message || 'Username might be taken or another error occurred.');
      }
    } catch (error) {
      Alert.alert('Registration failed', `Error: ${error.message || 'Unknown error occurred.'}`);
    }
  };
  

  const navigateToLogin = () => {
    navigation.navigate('LoginScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {loading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <Button title="Register" onPress={handleRegister} color="#4CAF50" />
      )}

      <TouchableOpacity onPress={navigateToLogin} style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Already have an account? Login here</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', 
    paddingHorizontal: 20,
    backgroundColor: '#4CAF50',
  },
  title: {
    fontSize: 36, 
    fontWeight: 'bold',
    color: '#fff', 
    marginBottom: 40,
    textAlign: 'center',
    textTransform: 'uppercase', 
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
  },
  loginButton: {
    marginTop: 20,
  },
  loginButtonText: {
    color: '#fff',
    textDecorationLine: 'underline',
  },
});
