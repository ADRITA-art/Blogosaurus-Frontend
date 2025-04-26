import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CreateBlog from './pages/CreateBlog';
import EditBlog from './pages/EditBlog';
import ViewBlog from './pages/ViewBlog';
import Index from './pages/Index';
import './styles/main.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/create" element={<CreateBlog />} />
        <Route path="/edit/:id" element={<EditBlog />} />
        <Route path="/view/:id" element={<ViewBlog />} />
      </Routes>
    </Router>
  );
}

export default App; 