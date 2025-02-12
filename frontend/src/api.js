import axios from 'axios';

// Create an axios instance with a base URL for the iTunes API
const API = axios.create({
    baseURL: 'http://localhost:5005/api'
});

// Export the API instance
export default API;
