import React from 'react';
import '../user/users.scss';
import { ExportIcon, plusIcon, searchIcon } from '../../../assets/images/icons';
import RolesTable from './roles-table';

const Roles = () => {
  return (
    <div className="users-container">
      <div className="title">
        <h3>Roles</h3>

        <div className="cta">
          <button id="export-csv">
            <img src={ExportIcon} alt="" />
            Export as .csv
          </button>
          <button>
            <img src={plusIcon} alt="" />
            Add new role
          </button>
        </div>
      </div>

      <div className="filter-container">
        <div className="search">
          <input type="search" placeholder="Search" />
          <button>
            <img src={searchIcon} alt="" />
          </button>
        </div>

        <div className="filter">
          <div className="label">filter by:</div>
          <select placeholder="Actions">
            <option>All Users</option>
            <option>View</option>
            <option>Edit</option>
            <option>Delete</option>
          </select>
        </div>
      </div>

      <RolesTable />
    </div>
  );
};

export default Roles;
