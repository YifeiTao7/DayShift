import { makeAutoObservable } from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiFetch from '../services/api';
import UserStore from './UserStore'; // 引入 UserStore

class AuthStore {
  username = '';
  token = '';
  isLoggedIn = false;

  constructor() {
    makeAutoObservable(this);
    this.loadUserData(); // 在实例化时加载用户数据
  }

  setUsername(username: string) {
    this.username = username;
  }

  async login(password: string) {
    try {
      const response = await apiFetch('/auth/login', {
        method: 'POST',
        data: {
          username: this.username,
          password: password, // 传递原始密码
        },
      });

      if (response.token) {
        this.token = response.token;
        this.isLoggedIn = true;

        // 设置用户详细信息
        UserStore.setUserDetails(response.username, response.email, response.role);

        await AsyncStorage.setItem('username', this.username);
        await AsyncStorage.setItem('token', this.token);
        await AsyncStorage.setItem('role', response.role);
      } else {
        this.isLoggedIn = false;
      }
    } catch (error) {
      console.error('Login failed:', error.response ? error.response.data : error.message);
      this.isLoggedIn = false;
    }
  }

  async logout() {
    this.isLoggedIn = false;
    this.username = '';
    this.token = '';

    // 清除用户详细信息
    UserStore.clearUserDetails();

    await AsyncStorage.clear(); // 清除存储的用户数据
  }

  async loadUserData() {
    const savedUsername = await AsyncStorage.getItem('username');
    const savedToken = await AsyncStorage.getItem('token');
    if (savedUsername && savedToken) {
      this.username = savedUsername;
      this.token = savedToken;
      this.isLoggedIn = true;
      
      // 假设还需要从 AsyncStorage 或 API 中获取用户的详细信息
      const savedEmail = await AsyncStorage.getItem('email');
      const savedRole = await AsyncStorage.getItem('role');
      if (savedEmail && savedRole) {
        UserStore.setUserDetails(savedUsername, savedEmail, savedRole);
      }
    }
  }
}

export default new AuthStore();
