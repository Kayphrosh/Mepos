import React from 'react';
import '../../../components/ui/table/table.scss';
import { rolesData } from './roles-data.jsx';
import { eyeIcon, editIcon, deleteIcon } from '../../../assets/images/icons';

const RolesTable = () => {
  return (
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
          <tr key={roleData.id}>
            <td>{roleData.role}</td>
            <td>
              <div className="actions">
                {roleData.role !== 'Admin' && (
                  <>
                    <div>
                      <img src={eyeIcon} alt="View" />
                    </div>
                    <div>
                      <img src={editIcon} alt="Edit" />
                    </div>
                    <div>
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
  );
};

export default RolesTable;
