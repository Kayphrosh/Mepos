import React, { useState, useEffect } from 'react';
import axios from '../../../utils/axios';
import './add-new-user.scss';
import BasicInformation from './basic-information';
import MoreInformation from './more-information';
import RolesAndPermission from './roles-and-permission';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddNewUser = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    phoneNumber: '',
    dateOfBirth: '',
    ninNumber: '',
    gender: '',
    role: '',
    relationshipStatus: '',
  });

  const navigate = useNavigate();

  const tabs = [
    { id: 1, label: 'Basic Information' },
    { id: 2, label: 'Roles and Permissions' },
    { id: 3, label: 'More Information' },
  ];

  useEffect(() => {
    // Fetch roles from API and populate the role options
  }, []);

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const storeId = localStorage.getItem('storeId');
      const response = await axios.post(`/${storeId}/users`, formData);

      if (response.data.status) {
        toast.success('User created successfully!');
        navigate('/users'); // Redirect to the users page
      } else {
        toast.error('Failed to create user. Please try again.');
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'An error occurred. Please try again.';
      toast.error(errorMessage); // Show the error message from the API
    }
  };

  const handleNext = () => {
    if (activeTab < tabs.length) {
      setActiveTab(activeTab + 1);
    } else {
      handleSubmit();
    }
  };

  return (
    <div className="add-new-user-container">
      <div className="title">
        <h3>Add New User</h3>
      </div>

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
              formData={formData}
              handleInputChange={handleInputChange}
              handleNext={handleNext}
            />
          )}
          {activeTab === 2 && (
            <RolesAndPermission
              formData={formData}
              handleInputChange={handleInputChange}
              handleNext={handleNext}
            />
          )}
          {activeTab === 3 && (
            <MoreInformation
              formData={formData}
              handleInputChange={handleInputChange}
              handleNext={handleNext}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AddNewUser;
