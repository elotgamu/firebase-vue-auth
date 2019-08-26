import axios from 'axios';

const authService = axios.create({
  baseURL: process.env.VUE_APP_FIREBASE_AUTH_URL
});

export default authService;
