import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          Blogosaurus
        </Link>
        
        <div className="navbar-links">
          <Link to="/" className="nav-link">Home</Link>
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
              <Link to="/create" className="nav-link">Create Blog</Link>
              <button onClick={handleLogout} className="nav-link logout-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/signup" className="nav-link">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
} 