import React, { useState, useEffect, useRef } from 'react';
import axios from '../../utils/axios';
import './topbar.scss';
import Calculator from '../calculator';
import {
  storeIcon,
  dropdownIcon,
  calendarIcon,
  scannerIcon,
  calculatorIcon,
  bellIcon,
} from '../../assets/images/icons';
import userPic from '../../assets/images/icons/profile-pic.svg';

const Topbar = () => {
  const localUser = JSON.parse(localStorage.getItem('user')) || {};
  const [user, setUser] = useState({
    firstName: localUser.firstName || 'Guest',
    lastName: localUser.lastName || 'User',
    email: localUser.email || 'guest@example.com',
    store: localUser.store?.name || 'Default Store',
  });
  const [stores, setStores] = useState([]);
  const [error, setError] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  const dropdownRef = useRef(null);
  const userName = `${user.firstName} ${user.lastName}`;
  const userEmail = user.email;

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formattedTime = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      }).format(now);

      const dateAndTime = formattedTime.replace(/\//g, '-').replace(',', ' |');
      setCurrentTime(dateAndTime);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // Fetch stores
  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await axios.get('/stores');
        if (response.data.status) {
          setStores(response.data.data);
          setError(null);
        } else {
          setError(response.data.message);
          setStores([]);
        }
      } catch (error) {
        console.error('Error fetching stores:', error);
        setError('Unable to fetch stores. Please try again later.');
        setStores([]);
      }
    };

    fetchStores();
  }, []);

  const handleStoreSelect = (store) => {
    setUser((prevUser) => ({ ...prevUser, store: store.name }));
    setIsDropdownOpen(false);
  };

  const toggleCalculator = () => {
    setIsCalculatorOpen((prev) => !prev);
  };

  return (
    <div className="topbar-container">
      <div
        className="select-store cta"
        onClick={toggleDropdown}
        ref={dropdownRef}
      >
        <img src={storeIcon} alt="Store Icon" />
        <div className="store-name">{user.store}</div>
        <img src={dropdownIcon} alt="Dropdown Icon" />
        {isDropdownOpen && (
          <div className="dropdown-menu">
            {stores.map((store) => (
              <div
                key={store._id}
                className="dropdown-item"
                onClick={() => handleStoreSelect(store)}
              >
                {store.name}
              </div>
            ))}
          </div>
        )}
      </div>
      {error && <div className="error-message">{error}</div>}
      <div className="right-wrapper">
        <div className="calendar cta">
          <img src={calendarIcon} alt="Calendar Icon" />
          <div className="date">{currentTime}</div>
        </div>

        <div className="scanner cta">
          <img src={scannerIcon} alt="Scanner Icon" />
        </div>

        <div className=" cta" onClick={toggleCalculator}>
          <img src={calculatorIcon} alt="Calculator Icon" />
        </div>

        <div className="bell cta">
          <img src={bellIcon} alt="Bell Icon" />
        </div>

        <div className="profile-details">
          <img src={userPic} alt="User Profile" />
          <span>
            <div className="name">{userName}</div>
            <div className="email">{userEmail}</div>
          </span>
        </div>
      </div>

      {isCalculatorOpen && (
        <Calculator onClose={toggleCalculator} /> // Render the Calculator component
      )}
    </div>
  );
};

export default Topbar;
