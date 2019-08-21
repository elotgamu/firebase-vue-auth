import axios from 'axios';

const FirebaseApiService = axios.create({
  baseURL: process.env.VUE_APP_FIREBASE_APP_URL,
});

export default FirebaseApiService;
