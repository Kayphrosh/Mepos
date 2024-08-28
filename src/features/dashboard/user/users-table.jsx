import React from 'react';
import '../../../components/ui/table/table.scss';
import { usersData } from './users-data';
import { eyeIcon, editIcon, deleteIcon } from '../../../assets/images/icons';

const UsersTable = () => {
  return (
    <table>
      <thead>
        <tr>
          <th>User Name</th>
          <th>Name</th>
          <th>Role</th>
          <th>email</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {usersData.map((userData) => (
          <tr key={userData.id}>
            <td>{userData.userName}</td>
            <td>{userData.name}</td>
            <td>{userData.role}</td>
            <td>{userData.email}</td>
            <td>
              <div className="actions">
                <div>
                  <img src={eyeIcon} alt="" />
                </div>
                <div>
                  <img src={editIcon} alt="" />
                </div>
                <div>
                  <img src={deleteIcon} alt="" />
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
