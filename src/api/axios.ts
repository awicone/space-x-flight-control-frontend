import axios from 'axios';

const JSON_SERVER_API_URL = process.env.APP_ENV === 'DEV' ?
  'http://localhost:8000' :
  process.env.APP_JSON_API_URL;

const backend = axios.create({
  baseURL: process.env.APP_LAUNCHES_URL
});

const jsonServer = axios.create({
  baseURL: JSON_SERVER_API_URL
});

export { backend, jsonServer };
