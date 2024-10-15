import React, { useState, useEffect } from 'react';
import axios from '../../../utils/axios';
import { toast } from 'react-toastify';
import Input from '../../../components/ui/input/Input';

const EditCustomerModal = ({ customer, onClose, onCustomerUpdated }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    gender: '',
    membershipStatus: '',
  });

  useEffect(() => {
    if (customer) {
      setFormData({
        firstName: customer.name.split(' ')[0] || '',
        lastName: customer.name.split(' ')[1] || '',
        email: customer.email || '',
        phoneNumber: customer.phone || '',
        gender: customer.gender || '',
        membershipStatus: customer.membership || '',
      });
    }
  }, [customer]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const storeId = localStorage.getItem('storeId');
      const response = await axios.patch(`/${storeId}/customers/${customer.id}`, formData);

      if (response.data.status) {
        toast.success('Customer updated successfully!');
        onCustomerUpdated();
        onClose();
      } else {
        toast.error(response.data.message || 'Failed to update customer');
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          'An error occurred while updating the customer'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <div className="modal-title">
        <h3>Edit Customer</h3>
      </div>

      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          required
        />

        <Input
          type="text"
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          required
        />

        <Input
          type="email"
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />

        <Input
          type="tel"
          label="Mobile Number"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          placeholder="+234"
        />

        <div className="form-input">
          <label htmlFor="gender">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div className="form-input">
          <label htmlFor="membershipStatus">Membership Status</label>
          <select
            name="membershipStatus"
            value={formData.membershipStatus}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Membership Status</option>
            <option value="gold">Gold</option>
            <option value="diamond">Diamond</option>
            <option value="silver">Silver</option>
          </select>
        </div>

        <button id="submit" type="submit" disabled={loading}>
          {loading ? 'Updating customer info...' : 'Update Customer'}
        </button>
      </form>
    </div>
  );
};

export default EditCustomerModal;
