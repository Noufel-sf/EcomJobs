import axios from 'axios';

const Api = axios.create({
  // baseURL: 'ht',
  baseURL: 'http://localhost:3000/api/v1',
  withCredentials: true,
});

export default Api;
