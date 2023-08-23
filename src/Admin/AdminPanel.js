import React, { useState } from 'react';
import './AdminPanel.css'; // Import the CSS file for styles
import Departments from './Departments';
import DepHead from './DepHead';
import Employees from './Employees';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const [department, setDepartment] = useState('');
  const [depHead, setDepHead] = useState('');
  const [image, setImage] = useState(null);

  const handleDepNameChange = (event) => {
    setDepartment(event.target.value);
  };

  const handleDepHeadChange = (event) => {
    setDepHead(event.target.value);
  };

  const handleImage = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const [showMenu, setShowMenu] = useState(false);

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };
  const navigate = useNavigate(); // Don't forget to call the hook

  const handleSignOut = () => {
    // Show a confirmation dialog when the "Sign Out" button is clicked
    const confirmSignOut = window.confirm('Do you want to Sign Out?');
    if (confirmSignOut) {
      // User clicked "OK", navigate to the desired route
      navigate('/');
    }
    // User clicked "Cancel", stay on the current page
  };
  const handleHomePage = () => {
    // Show a confirmation dialog when the "Sign Out" button is clicked
    const confirmSignOut = window.confirm('Do you want to leave current page and navigate to Homepage?');
    if (confirmSignOut) {
      // User clicked "OK", navigate to the desired route
      navigate('/');
    }
    // User clicked "Cancel", stay on the current page
  };

  return (
    <div className='admin-container'>
      <div>
        <header className='admin-header'>
          <img src="/Mediplus_Logo.jpg" alt="Hospital Image" className="admin-logo" />

          <nav className={`navbar ${showMenu ? 'show-menu' : ''}`}>
            <a href='#home' className='nav-link' onClick={handleHomePage}>Home</a>
            <a href='#departments' className='nav-link'>Departments</a>
            <a href='#dephead' className='nav-link'>Department Head</a>
            <a href='#employees' className='nav-link'>Employees</a>
            <button className='signout' onClick={handleSignOut}>Sign Out</button>
          </nav>
        </header>
      </div>
      <div className='dept'>
        <div id='departments' ><Departments /></div>
        <div id='dephead' ><DepHead /></div>
        <div id='employees'><Employees /></div>
      </div>
    </div>

  );
};

export default AdminPanel;
