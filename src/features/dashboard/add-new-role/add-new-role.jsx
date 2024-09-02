import React, {useState} from 'react';
import './add-new-role.scss';
import '../add-new-user/add-new-user.scss'
import BasicInformation from './basic-information';
import AccessPermissions from './access-permissions';

const AddNewRole = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [notification, setNotification] = useState(null);

  const tabs = [
    { id: 1, label: 'Basic Information' },
    { id: 2, label: 'Access Permissions' },
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
    <div className="add-new-role-container add-new-user-container">
      <div className="title">
        <h3>Add New Role</h3>
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
          {activeTab === 2 && <AccessPermissions handleNext={handleNext} />}
        </div>
      </div>
    </div>
  );
};

export default AddNewRole;
