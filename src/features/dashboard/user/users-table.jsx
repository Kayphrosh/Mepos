import React from 'react';
import '../../../components/ui/table/table.scss';
import { usersData } from './users-data';
import { eyeIcon, editIcon, deleteIcon } from '../../../assets/images/icons';

const UsersTable = ({ searchQuery }) => {
  const filteredUsers = usersData.filter((userData) =>
    [userData.userName, userData.name, userData.email, userData.role].some(
      (field) => field.toLowerCase().includes(searchQuery.toLowerCase()),
    ),
  );

  return (
    <table>
      <thead>
        <tr>
          <th>User Name</th>
          <th>Name</th>
          <th>Role</th>
          <th>Email</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {filteredUsers.map((userData) => (
          <tr key={userData.id}>
            <td>{userData.userName}</td>
            <td>{userData.name}</td>
            <td>{userData.role}</td>
            <td>{userData.email}</td>
            <td>
              <div className="actions">
                <div>
                  <img src={eyeIcon} alt="View" />
                </div>
                <div>
                  <img src={editIcon} alt="Edit" />
                </div>
                <div>
                  <img src={deleteIcon} alt="Delete" />
                </div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UsersTable;
