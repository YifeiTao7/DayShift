import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { useNavigation } from '@react-navigation/native'; 

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fontsLoaded] = useFonts({
    'Pacifico-Regular': require('../assets/fonts/Pacifico-Regular.ttf'), // Replace with your custom font
  });

  const navigation = useNavigation(); 

  if (!fontsLoaded) {
    return null;
  }

  const handleLogin = () => {
    if (username === 'admin' && password === 'password') {
      navigation.navigate('HomeScreen');  // 导航到 HomeScreen
    } else {
      Alert.alert('Invalid Username or Password');
    }
  };

  const handleSocialLogin = (platform: string) => {
    Alert.alert(`Login with ${platform}`);
  };

  const navigateToRegister = () => {
    navigation.navigate('RegisterScreen'); 
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

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

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
    backgroundColor: '#006400', 
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 25,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  socialLoginContainer: {
    marginTop: 20,
    width: '100%',
  },
  socialButton: {
    flexDirection: 'row', 
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  socialIcon: {
    marginRight: 10, 
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
