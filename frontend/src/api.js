import axios from 'axios';

// Create an axios instance with a base URL for the iTunes API
const API = axios.create({
    baseURL: 'https://itunes-app-u5dm.onrender.com'
});

// Export the API instance
export default API;
