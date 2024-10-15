import React, { useState } from 'react';
import '../../../components/ui/table/table.scss';
import { editIcon, deleteIcon } from '../../../assets/images/icons';
import axios from '../../../utils/axios';
import { useNavigate } from 'react-router-dom';
import Modal from '../../../components/ui/modal/modal';
import EditRole from './edit-role';

const RolesTable = ({ rolesData, setRolesData }) => {
  const navigate = useNavigate();

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  const handleEdit = (roleId) => {
    navigate(`/roles/edit/${roleId}`); // Redirect to edit page
  };

const handleDelete = async (roleId) => {
  console.log('Attempting to delete role with ID:', roleId); // Log the roleId to the console
  const confirmDelete = window.confirm(
    'Are you sure you want to delete this role?',
  );
  if (confirmDelete) {
    try {
      const response = await axios.delete(`/roles/${roleId}`);
      if (response.status === 200) {
        console.log('Role deleted successfully:', roleId); // Log success
        setRolesData((prev) => prev.filter((role) => role._id !== roleId)); // Update the state
      } else {
        console.log('Delete failed, response:', response.data); // Log the response in case of failure
        alert(response.data.message || 'Failed to delete the role.');
      }
    } catch (error) {
      console.error('Error deleting role:', error); // Log any error encountered
      alert('Failed to delete the role.');
    }
  }
};


  const handleEditClick = (roleData) => {
    setSelectedRole(roleData); // Set selected role for edit
    setModalOpen(true); // Open the modal
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedRole(null); // Reset selected role when modal closes
  };

  const handleUpdate = (updatedRole) => {
    setRolesData((prev) =>
      prev.map((role) => (role._id === updatedRole._id ? updatedRole : role)),
    );
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Role</th>
            <th>
              <div className="actions">Action</div>
            </th>
          </tr>
        </thead>
        <tbody>
          {rolesData.map((roleData) => (
            <tr key={roleData._id}>
              <td>{roleData.name}</td>
              <td>
                <div className="actions">
                  {roleData.name !== 'owner' && (
                    <>
                      <div
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleEditClick(roleData)}
                      >
                        <img src={editIcon} alt="Edit" />
                      </div>
                      <div
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleDelete(roleData._id)}
                      >
                        <img src={deleteIcon} alt="Delete" />
                      </div>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} closeModal={handleModalClose}>
          {selectedRole && (
            <EditRole
              roleData={selectedRole}
              onClose={handleModalClose}
              onUpdate={handleUpdate}
            />
          )}
        </Modal>
      )}
    </>
  );
};

export default RolesTable;
