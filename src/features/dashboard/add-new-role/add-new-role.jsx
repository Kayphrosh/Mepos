import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './add-new-role.scss';
import '../add-new-user/add-new-user.scss';
import BasicInformation from './basic-information';
import AccessPermissions from './access-permissions';
import instance from '../../../utils/axios';
import { toast } from 'react-toastify';
const AddNewRole = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [notification, setNotification] = useState(null);
  const [roleData, setRoleData] = useState({
    name: '',
    permissions: [],
  });
  const navigate = useNavigate();
  const tabs = [
    { id: 1, label: 'Basic Information' },
    { id: 2, label: 'Access Permissions' },
  ];

  const createRole = async (roleData) => {
    try {
      const response = await instance.post('/roles', JSON.stringify(roleData), {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

const handleNext = async () => {
  if (activeTab < tabs.length) {
    setActiveTab(activeTab + 1);
  } else {
    if (!roleData.name.trim()) {
      toast.error('Role name cannot be empty. Please provide a name.');
      return;
    }

    try {
      const result = await createRole(roleData);
      if (result.status) {
        toast.success('Role created successfully!'); // Success notification
        setRoleData({ name: '', permissions: [] });
        setActiveTab(1);
        navigate('/roles');
        // Redirect to another page
        // e.g., history.push('/roles'); // If using react-router
      } else {
        throw new Error(result.message || 'Failed to create role');
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message); // Show specific error message
      } else {
        toast.error('Failed to create role. Please try again.');
      }
      console.error('Error creating role:', error);
    }
  }
};

  const updateRoleData = (data) => {
    setRoleData((prevData) => {
      const updatedData = { ...prevData, ...data };
      console.log('Updated role data:', updatedData); // Ensure it's logging the correct data
      return updatedData;
    });
  };

  return (
    <div className="add-new-role-container add-new-user-container">
      <div className="title">
        <h3>Add New Role</h3>
      </div>

      {notification && (
        <div
          className={`notification ${
            notification.includes('successfully') ? 'success' : 'error'
          }`}
        >
          {notification}
        </div>
      )}

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
          {activeTab === 1 && (
            <BasicInformation
              handleNext={handleNext}
              updateRoleData={updateRoleData}
              roleData={roleData}
            />
          )}
          {activeTab === 2 && (
            <AccessPermissions
              handleNext={handleNext}
              updateRoleData={updateRoleData}
              roleData={roleData}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AddNewRole;
