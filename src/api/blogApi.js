import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000';

export const fetchBlogs = () => axios.get(`${API_URL}/`);
export const fetchBlog = (id) => axios.get(`${API_URL}/${id}/`);

export async function createBlog(data) {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Not authenticated');
  const res = await fetch('http://127.0.0.1:5000/create', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create blog");
  return res.json();
}

export const updateBlog = (id, data, token) =>
  axios.put(`${API_URL}/${id}/`, data, { headers: { Authorization: `Bearer ${token}` } });
export const deleteBlog = (id, token) =>
  axios.delete(`${API_URL}/${id}/`, { headers: { Authorization: `Bearer ${token}` } });

export async function fetchDashboard(token) {
  const res = await fetch(`${API_URL}/dashboard`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch dashboard");
  return res.json();
} 