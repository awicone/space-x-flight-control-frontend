import axios from 'axios';

const baseURL = process.env.APP_ENV === 'DEV' ?
  'http://localhost:8000' :
  'https://space-x-flight-control-app.herokuapp.com:8000';

const backend = axios.create({
  baseURL: process.env.APP_LAUNCHES_URL
});

const jsonServer = axios.create({
  baseURL
});

export { backend, jsonServer };
