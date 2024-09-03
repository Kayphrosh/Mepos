import React, { useState, useEffect, useRef } from 'react';
import './topbar.scss';
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
  const stores = ['OAU Pharmacy', 'OAU Bakery', 'OAU Bookshop'];
  const [selectedStore, setSelectedStore] = useState(stores[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  const dropdownRef = useRef(null);
  const userName = 'Segun Rotimi';
  const userEmail = 'segun@admin.com';

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleStoreSelect = (store) => {
    setSelectedStore(store);
    setIsDropdownOpen(false);
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

      const dateAndTime = formattedTime
        .replace(/\//g, '-') 
        .replace(',', ' |');

      setCurrentTime(dateAndTime);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="topbar-container">
      <div
        className="select-store cta"
        onClick={toggleDropdown}
        ref={dropdownRef}
      >
        <img src={storeIcon} alt="" />
        <div className="store-name">{selectedStore}</div>
        <img src={dropdownIcon} alt="" />
        {isDropdownOpen && (
          <div className="dropdown-menu">
            {stores.map((store, index) => (
              <div
                key={index}
                className="dropdown-item"
                onClick={() => handleStoreSelect(store)}
              >
                {store}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="right-wrapper">
        <div className="calendar cta">
          <img src={calendarIcon} alt="" />
          <div className="date">{currentTime}</div>
        </div>

        <div className="scanner cta">
          <img src={scannerIcon} alt="" />
        </div>

        <div className="calculator cta">
          <img src={calculatorIcon} alt="" />
        </div>

        <div className="bell cta">
          <img src={bellIcon} alt="" />
        </div>

        <div className="profile-details">
          <img src={userPic} alt="" />
          <span>
            <div className="name">{userName}</div>
            <div className="email">{userEmail}</div>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
