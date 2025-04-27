import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu as MenuIcon } from '@mui/icons-material';

export default function Navbar() {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('token');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          Blogosaurus
        </Link>
        
        <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
          <MenuIcon />
        </button>
        
        <div className={`navbar-links ${isMobileMenuOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Dashboard</Link>
              <Link to="/create" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Create Blog</Link>
              <button onClick={() => {
                handleLogout();
                setIsMobileMenuOpen(false);
              }} className="nav-link logout-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
              <Link to="/signup" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
} 