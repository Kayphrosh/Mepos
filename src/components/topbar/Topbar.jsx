import React from 'react';
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
  const userName = 'Segun Rotimi';
  const userEmail = 'segun@admin.com';
  return (
    <div className="topbar-container">
      <div className="select-store cta">
        <img src={storeIcon} alt="" />
        <div className="store-name">Supermarket Name</div>
        <img src={dropdownIcon} alt="" />
      </div>

      <div className="right-wrapper">
        <div className="calendar cta">
          <img src={calendarIcon} alt="" />
          <div className="date">22-04-2024 | 02:00PM</div>
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
            <div className='name'>{userName}</div>
            <div className='email'>{userEmail}</div>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
