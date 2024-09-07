import { makeAutoObservable } from 'mobx';

class UserStore {
  username = '';
  email = '';
  role = ''; // 假设您有用户角色，例如 "admin", "user" 等

  constructor() {
    makeAutoObservable(this);
  }

  setUserDetails(username: string, email: string, role: string) {
    this.username = username;
    this.email = email;
    this.role = role;
  }

  clearUserDetails() {
    this.username = '';
    this.email = '';
    this.role = '';
  }
}

export default new UserStore();
