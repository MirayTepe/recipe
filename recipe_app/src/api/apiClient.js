import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://192.168.1.35:5001/api', // Buraya backend URL'inizi girin
    headers: {
        'Content-Type': 'application/json'
    }
});

export default apiClient;
