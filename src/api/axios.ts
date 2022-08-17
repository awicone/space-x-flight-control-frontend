import axios from 'axios';

const backend = axios.create({
  baseURL: process.env.APP_LAUNCHES_URL
});

export default backend;
