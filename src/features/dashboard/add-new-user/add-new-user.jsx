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
  const [rolesData, setRolesData] = useState([]);
  const [loadingRoles, setLoadingRoles] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const tabs = [
    { id: 1, label: 'Basic Information' },
    { id: 2, label: 'Roles and Permissions' },
    { id: 3, label: 'More Information' },
  ];

  const logRequestPayload = (formData) => {
    console.log('Request Payload:', JSON.stringify(formData, null, 2));
  };

  // Call this function just before making the axios request in handleSubmit
  logRequestPayload(formData);
  // Fetch roles when the component mounts
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        setLoadingRoles(true);
        const response = await axios.get('/roles');
        console.log('Roles API response:', response.data); // Add this line for debugging
        if (response.data.status) {
          setRolesData(response.data.data || []);
        } else {
          setError(response.data.message || 'Failed to fetch roles');
        }
      } catch (err) {
        console.error('Error fetching roles:', err);
        setError('Failed to fetch roles. Please try again.');
      } finally {
        setLoadingRoles(false);
      }
    };

    fetchRoles();
  }, []);

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

const handleSubmit = async () => {
  try {
    const storeId = localStorage.getItem('storeId');
    logRequestPayload(formData);
    const response = await axios.post(`/${storeId}/users`, formData);

    if (response.data.status) {
      toast.success('User created successfully!');
      navigate('/users');
    } else {
      toast.error(`Failed to create user: ${response.data.message}`);
      console.error('Server response:', response.data);
    }
  } catch (error) {
    let errorMessage = 'An error occurred. Please try again.';
    if (error.response) {
      errorMessage = error.response.data.message || errorMessage;
      console.error('Server error response:', error.response.data);
      console.error('Status code:', error.response.status);
      console.error('Headers:', error.response.headers);
    } else if (error.request) {
      errorMessage =
        'No response received from server. Please try again later.';
      console.error('No response received:', error.request);
    } else {
      errorMessage = error.message;
      console.error('Error setting up request:', error.message);
    }
    console.error('Full error object:', error);
    toast.error(errorMessage);
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
              rolesData={rolesData}
              loadingRoles={loadingRoles}
              error={error}
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
