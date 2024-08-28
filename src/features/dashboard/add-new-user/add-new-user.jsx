import React, { useState } from 'react';
import './add-new-user.scss';
import BasicInformation from './basic-information';
import BankInformation from './bank-information';
import MoreInformation from './more-information';
import RolesAndPermission from './roles-and-permission';

const AddNewUser = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [notification, setNotification] = useState(null);

  const tabs = [
    { id: 1, label: 'Basic Information' },
    { id: 2, label: 'Roles and Permissions' },
    { id: 3, label: 'More Information' },
    { id: 4, label: 'Bank Information' },
  ];

  const handleNext = () => {
    if (activeTab < tabs.length) {
      setActiveTab(activeTab + 1);
    } else {
      // Simulate a successful submission
      const isSuccessful = true; // Change this based on actual validation or API response
      setNotification(
        isSuccessful
          ? 'User created successfully!'
          : 'Failed to create user. Please try again.',
      );
    }
  };

  return (
    <div className="add-new-user-container">
      <div className="title">
        <h3>Add New User</h3>
      </div>

      {notification && <div className="notification">{notification}</div>}

      <div className="tab-container">
        <div className="tabs">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </div>
          ))}
        </div>
        <div className="tab-content">
          {activeTab === 1 && <BasicInformation handleNext={handleNext} />}
          {activeTab === 2 && <RolesAndPermission handleNext={handleNext} />}
          {activeTab === 3 && <MoreInformation handleNext={handleNext} />}
          {activeTab === 4 && <BankInformation handleNext={handleNext} />}
        </div>
      </div>
    </div>
  );
};

export default AddNewUser;
