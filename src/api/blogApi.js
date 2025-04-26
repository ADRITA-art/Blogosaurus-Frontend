import axios from 'axios';

const API_URL = 'http://localhost:8000/api/blogs/';

export const fetchBlogs = () => axios.get(API_URL);
export const fetchBlog = (id) => axios.get(`${API_URL}${id}/`);
export const createBlog = (data, token) =>
  axios.post(API_URL, data, { headers: { Authorization: `Bearer ${token}` } });
export const updateBlog = (id, data, token) =>
  axios.put(`${API_URL}${id}/`, data, { headers: { Authorization: `Bearer ${token}` } });
export const deleteBlog = (id, token) =>
  axios.delete(`${API_URL}${id}/`, { headers: { Authorization: `Bearer ${token}` } }); 