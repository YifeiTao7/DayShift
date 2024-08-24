import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icons
import { useNavigation } from '@react-navigation/native'; // 导入导航钩子

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fontsLoaded] = useFonts({
    'Pacifico-Regular': require('../assets/fonts/Pacifico-Regular.ttf'), // Replace with your custom font
  });

  const navigation = useNavigation(); // 使用导航钩子

  if (!fontsLoaded) {
    return null;
  }

  const handleLogin = () => {
    if (username === 'admin' && password === 'password') {
      Alert.alert('Login Successful');
    } else {
      Alert.alert('Invalid Username or Password');
    }
  };

  const handleSocialLogin = (platform: string) => {
    Alert.alert(`Login with ${platform}`);
  };

  const navigateToRegister = () => {
    navigation.navigate('RegisterScreen'); // 导航到注册页面
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { fontFamily: 'Pacifico-Regular' }]}>DAY SHIFT</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} color="#4CAF50" />

      <View style={styles.socialLoginContainer}>
        <TouchableOpacity style={[styles.socialButton, styles.facebookButton]} onPress={() => handleSocialLogin('Facebook')}>
          <Icon name="facebook" size={20} color="#fff" style={styles.socialIcon} />
          <Text style={styles.socialButtonText}>Login with Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.socialButton, styles.twitterButton]} onPress={() => handleSocialLogin('Twitter')}>
          <Icon name="twitter" size={20} color="#fff" style={styles.socialIcon} />
          <Text style={styles.socialButtonText}>Login with Twitter</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.socialButton, styles.instagramButton]} onPress={() => handleSocialLogin('Instagram')}>
          <Icon name="instagram" size={20} color="#fff" style={styles.socialIcon} />
          <Text style={styles.socialButtonText}>Login with Instagram</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={navigateToRegister} style={styles.registerButton}>
        <Text style={styles.registerButtonText}>Don't have an account? Register here</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', // Center the content horizontally
    paddingHorizontal: 20,
    backgroundColor: '#4CAF50', // Set background color to green
  },
  title: {
    fontSize: 36, // Larger font size for the title
    fontWeight: 'bold',
    color: '#fff', // White color for the title text
    marginBottom: 40, // Increase margin to create space between title and inputs
    textAlign: 'center',
    textTransform: 'uppercase', // Make the text uppercase
  },
  input: {
    width: '100%', // Make the input field take full width
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 25, // Round corners
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
  },
  socialLoginContainer: {
    marginTop: 20,
    width: '100%',
  },
  socialButton: {
    flexDirection: 'row', // Align icon and text in a row
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  socialIcon: {
    marginRight: 10, // Add space between icon and text
  },
  facebookButton: {
    backgroundColor: '#3b5998',
  },
  twitterButton: {
    backgroundColor: '#00aced',
  },
  instagramButton: {
    backgroundColor: '#C13584',
  },
  socialButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  registerButton: {
    marginTop: 20,
  },
  registerButtonText: {
    color: '#fff',
    textDecorationLine: 'underline',
  },
});
