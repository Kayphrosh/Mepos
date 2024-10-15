import React from 'react';
import '../../../components/ui/table/table.scss';
import { eyeIcon, editIcon, deleteIcon } from '../../../assets/images/icons';

const UsersTable = ({ users, searchQuery }) => {
  const filteredUsers = users.filter((user) =>
    [
      user.username,
      `${user.firstName} ${user.lastName}`,
      user.email,
      user.name, // You can remove this since the 'name' is now accessed from user.role.name
    ].some((field) => field.toLowerCase().includes(searchQuery.toLowerCase())),
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
        {filteredUsers.map((user) => (
          <tr key={user._id}>
            <td>{user.username}</td>
            <td>{`${user.firstName} ${user.lastName}`}</td>
            <td>{user.role?.name || `N/A`}</td> {/* Display the role name */}
            <td>{user.email}</td>
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
