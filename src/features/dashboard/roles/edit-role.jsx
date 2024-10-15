import React, { useState } from 'react';
import Input from '../../../components/ui/input/Input';
import axios from '../../../utils/axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditRole = ({ roleData, onClose, onUpdate }) => {
  const [updatedRole, setUpdatedRole] = useState(roleData);
  const [loading, setLoading] = useState(false); // Optional: Loading state

  const handleInputChange = (e) => {
    setUpdatedRole({ ...updatedRole, [e.target.name]: e.target.value });
  };

  const handleUpdateRole = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.patch(`/roles/${roleData._id}`, updatedRole);
      onUpdate(response.data); // Notify parent component of the update
      toast.success('Role updated successfully!'); // Show success notification

      // Reload the page after a short delay to allow the toast to display
      setTimeout(() => {
        window.location.reload();
      }, 500); // 1 second delay to show the success message before reloading

      onClose(); // Close modal after successful update
    } catch (error) {
      toast.error('Error updating role.'); // Show error notification
      console.error('Error updating role:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <div className="modal-title">
        <h3>Edit Role</h3>
        {/* <button type="button" className="close-modal-btn" onClick={onClose}>
          X
        </button> */}
      </div>

      <form onSubmit={handleUpdateRole}>
        <Input
          type="text"
          label="Role Name"
          name="name"
          value={updatedRole.name}
          onChange={handleInputChange}
          required
        />

        <div className="description">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            placeholder="Enter a description"
            value={updatedRole.description || ''}
            onChange={handleInputChange}
          />
        </div>

        <div className="permissions">
          <h4>Permissions</h4>
          {['user-create', 'user-update'].map((permission) => (
            <div key={permission} className="permission-action">
              <input
                type="checkbox"
                id={permission}
                checked={updatedRole.permissions.includes(permission)}
                onChange={() =>
                  setUpdatedRole((prev) => ({
                    ...prev,
                    permissions: prev.permissions.includes(permission)
                      ? prev.permissions.filter((p) => p !== permission)
                      : [...prev.permissions, permission],
                  }))
                }
              />
              <label htmlFor={permission}>
                {permission === 'user-create' ? 'Create User' : 'Update User'}
              </label>
            </div>
          ))}
        </div>

        <button id="submit" type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update Role'}
        </button>
      </form>
    </div>
  );
};

export default EditRole;
