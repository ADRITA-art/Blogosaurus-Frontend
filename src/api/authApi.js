import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000/';

export const login = (credentials) => axios.post(`${API_URL}login/`, credentials);
export const signup = (data) => axios.post(`${API_URL}signup/`, data); 