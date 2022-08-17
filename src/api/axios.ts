import axios from 'axios';

const backend = axios.create({
  baseURL: process.env.APP_LAUNCHES_URL
});

const jsonServer = axios.create({
  baseURL: 'http://localhost:8000'
});

export { backend, jsonServer };
