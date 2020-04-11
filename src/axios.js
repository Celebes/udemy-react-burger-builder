import axios from 'axios';
import FIREBASE_URL from './secret/firebase';

const instance = axios.create({
    baseURL: FIREBASE_URL
});

export default instance;
